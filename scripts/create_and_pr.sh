#!/usr/bin/env bash

# Usage: ./create_and_pr.sh <branch-name> "<commit-message>"
# Example: ./create_and_pr.sh feature/add-foo "add: new feature foo"

set -euo pipefail

# Check arguments
if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <branch-name> \"<commit-message>\""
  exit 1
fi

BRANCH=$1
COMMIT_MSG=$2

# Ensure we're on the latest master
git checkout master
 git pull

# Create new branch
if git rev-parse --verify "$BRANCH" > /dev/null 2>&1; then
  echo "Branch $BRANCH already exists. Skipping creation."
else
  git checkout -b "$BRANCH"
fi

# Stage all changes
git add -A

# Commit changes
if git diff --cached --quiet; then
  echo "No changes staged. Nothing to commit."
else
  git commit -m "$COMMIT_MSG"
fi

# Push branch to remote
git push -u origin "$BRANCH"

# Create Pull Request using GitHub CLI
if command -v gh > /dev/null 2>&1; then
  echo "Creating Pull Request for branch $BRANCH..."
  gh pr create --fill --base master --head "$BRANCH"
else
  echo "gh CLI not found. Skipping PR creation."
fi

echo "Done."
