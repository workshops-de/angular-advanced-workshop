#!/bin/bash

# Prefix that marks commits/tags belonging to a solution step
solutionTagPrefix='solution--'

# First delete all old tags
deletedTags=$(git tag | grep "^${solutionTagPrefix}" | xargs git tag -d)

# Read all commits (one per line) whose message starts with the solution prefix
logs=$(git log --oneline | grep -E "^[0-9a-f]+ ${solutionTagPrefix}")

# read every line of git log
IFS=$'\n'
tagNames=()
for line in $logs; do
  # split to $sha and rest(commit $message) by first space
  IFS=' '
  read -r sha message <<< $line

  # Replace some special chars
  message=${message// /-}
  message=${message//'*'/}
  message=${message//'('/}
  message=${message//')'/}

  echo $message
  git tag $message $sha
  tagNames+=("$message")
done

# Push all (re-)created tags in a single network round-trip, overwriting
# any remote tags of the same name instead of deleting+recreating each one.
git push --force origin "${tagNames[@]}"
