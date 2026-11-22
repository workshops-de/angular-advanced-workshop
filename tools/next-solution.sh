#!/bin/bash
set -euo pipefail

# Checks out the next commit (in chronological order) whose message starts
# with "solution--", following the "solution" branch from the current HEAD.
# The "solution--" commits live on the solution branch, not on main, so we
# walk forward along solution's history starting at the common ancestor
# with HEAD.

solution_branch="solution"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree not clean. Commit or stash your changes first." >&2
  exit 1
fi

if ! git rev-parse --verify "$solution_branch" >/dev/null 2>&1; then
  echo "Branch '$solution_branch' not found." >&2
  exit 1
fi

base_sha=$(git merge-base HEAD "$solution_branch")

mapfile -t next_shas < <(git log --reverse --format='%H' "$base_sha".."$solution_branch")

next_sha=""
for sha in "${next_shas[@]}"; do
  message=$(git log -1 --format='%s' "$sha")
  if [[ "$message" == solution--* ]]; then
    next_sha="$sha"
    break
  fi
done

if [[ -z "$next_sha" ]]; then
  echo "No further solution-- commit found after HEAD on '$solution_branch'." >&2
  exit 1
fi

echo "Switching to $(git log -1 --format='%h %s' "$next_sha")"
git checkout "$next_sha"
