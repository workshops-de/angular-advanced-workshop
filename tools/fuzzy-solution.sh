#!/usr/bin/env bash
set -euo pipefail
shopt -s extglob

# Fuzzy-find a "solution--" solution tag and check it out.
#
# Usage:
#   tools/fuzzy-solution.sh [search-term]
#   npm run solution.fuzzy -- form
#
# With no search term you are prompted for one. Matches are shown as a
# radio-button group:
#   * Up / Down (or k / j) to move
#   * Enter to check out the highlighted tag (detached HEAD, like
#     `npm run solution.next`)
#   * q or Esc to cancel
#
# Fuzzy means "characters in order": "fav" matches "form-async-validation".

tag_prefix="solution--"
tty=/dev/tty

die() { printf '%s\n' "$1" >&2; exit 1; }

# --- colours (only when stderr is a real terminal) -----------------------
if [[ -t 2 ]] && command -v tput >/dev/null 2>&1 && [[ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]]; then
  c_reset=$(tput sgr0);  c_dim=$(tput dim);      c_bold=$(tput bold)
  c_cyan=$(tput setaf 6); c_green=$(tput setaf 2); c_yellow=$(tput setaf 3)
else
  c_reset=""; c_dim=""; c_bold=""; c_cyan=""; c_green=""; c_yellow=""
fi

# --- preconditions -----------------------------------------------------
git rev-parse --is-inside-work-tree >/dev/null 2>&1 \
  || die "Not inside a git repository."

if [[ -n "$(git status --porcelain)" ]]; then
  die "Working tree not clean. Commit or stash your changes first."
fi

# --- search term -----------------------------------------------------
term=${1-}
if [[ -z "$term" ]]; then
  printf '%s' "${c_cyan}Search solution tags:${c_reset} " >&2
  IFS= read -r term < "$tty" || true
fi
term=${term##+([[:space:]])}
term=${term%%+([[:space:]])}
[[ -n "$term" ]] || die "No search term given."

# --- fuzzy match: build "f.*o.*r.*m.*" from the term --------------------
pattern=""
for (( i = 0; i < ${#term}; i++ )); do
  ch=${term:i:1}
  [[ $ch == [a-zA-Z0-9] ]] || ch="\\$ch"
  pattern+="${ch}.*"
done

mapfile -t matches < <(git tag --list "${tag_prefix}*" | grep -iE "$pattern" | sort || true)

if (( ${#matches[@]} == 0 )); then
  printf '%s\n' "${c_yellow}Nothing found for \"${term}\". Try another search term.${c_reset}" >&2
  exit 0
fi

# --- radio-button group -------------------------------------------------
selected=0
count=${#matches[@]}

draw() {
  local i label
  for (( i = 0; i < count; i++ )); do
    label=${matches[i]#"$tag_prefix"}
    if (( i == selected )); then
      printf '  %s(*)%s %s%s%s\n' "$c_green" "$c_reset" "$c_bold" "$label" "$c_reset" >&2
    else
      printf '  ( ) %s%s%s\n' "$c_dim" "$label" "$c_reset" >&2
    fi
  done
}

printf '%s%d match(es) for "%s" - Up/Down move - Enter checkout - q cancel%s\n' \
  "$c_dim" "$count" "$term" "$c_reset" >&2
draw

while true; do
  IFS= read -rsn1 key < "$tty" || key=""
  if [[ $key == $'\x1b' ]]; then
    read -rsn2 -t 0.05 rest < "$tty" || rest=""
    key+=$rest
  fi
  case $key in
    $'\x1b[A'|k) (( selected = (selected - 1 + count) % count )) ;;
    $'\x1b[B'|j) (( selected = (selected + 1) % count )) ;;
    ""|$'\n'|$'\r')     break ;;
    q|$'\x1b')  printf '%sCancelled.%s\n' "$c_dim" "$c_reset" >&2; exit 130 ;;
    *) continue ;;
  esac
  tput cuu "$count" >&2 2>/dev/null || true
  draw
done

target=${matches[selected]}
printf '%sChecking out%s %s%s%s\n' "$c_dim" "$c_reset" "$c_cyan" "$target" "$c_reset" >&2
git checkout "$target"
