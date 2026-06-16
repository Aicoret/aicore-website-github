#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  git-release.sh [--skip-tag]

Options:
  --skip-tag         Commit and push only, without creating a tag
  -h, --help         Show this help message

Examples:
  git-release.sh

  git-release.sh --skip-tag

Generated automatically:
  commit message: tasks: company-website backend edits before tagging <current-date-time>
  tag name:       company-website-v01-<current-date-time>
  tag message:    app locked v01 (<current-date-time>)
EOF
}

skip_tag="false"

timestamp_compact="$(date '+%Y-%m-%d-%H%M%S')"
timestamp_readable="$(date '+%Y-%m-%d %H:%M:%S')"

commit_message="tasks: company-website backend edits before tagging ${timestamp_readable}"
tag_name="company-website-v01-${timestamp_compact}"
tag_message="app locked v01 (${timestamp_readable})"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --skip-tag)
      skip_tag="true"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

current_branch="$(git branch --show-current)"
if [[ -z "$current_branch" ]]; then
  echo "Unable to determine the current branch." >&2
  exit 1
fi

git add -A

if git diff --cached --quiet; then
  echo "No staged changes found after git add -A. Nothing to commit." >&2
  exit 1
fi

git commit -m "$commit_message"
git push origin "$current_branch"

if [[ "$skip_tag" != "true" ]]; then
  if git rev-parse "$tag_name" >/dev/null 2>&1; then
    echo "Tag already exists locally: $tag_name" >&2
    exit 1
  fi

  git tag -a "$tag_name" -m "$tag_message"
  git push origin "$tag_name"
fi

echo "Release push complete on branch '$current_branch'."
if [[ "$skip_tag" != "true" ]]; then
  echo "Tag pushed: $tag_name"
fi
