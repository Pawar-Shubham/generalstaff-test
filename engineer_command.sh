#!/usr/bin/env bash
set -euo pipefail

BUDGET_MINUTES="${1:-30}"
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
WORKTREE_DIR="$PROJECT_ROOT/.bot-worktree"
BRANCH="bot/work"

echo "=== generalstaff-test Bot Launcher ==="
echo "Budget: ${BUDGET_MINUTES} min"
echo "Project: $PROJECT_ROOT"
echo "Worktree: $WORKTREE_DIR"
echo "Branch: $BRANCH"
echo "Started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "======================================"

# Ensure bot branch exists (assumes your main branch is master; change if needed)
if ! git -C "$PROJECT_ROOT" rev-parse --verify "$BRANCH" >/dev/null 2>&1; then
  git -C "$PROJECT_ROOT" branch "$BRANCH" main
fi

git -C "$PROJECT_ROOT" worktree prune 2>/dev/null || true
if [ -d "$WORKTREE_DIR" ]; then
  git -C "$PROJECT_ROOT" worktree remove "$WORKTREE_DIR" --force 2>/dev/null || true
  rm -rf "$WORKTREE_DIR" 2>/dev/null || true
fi

git -C "$PROJECT_ROOT" worktree add "$WORKTREE_DIR" "$BRANCH"

cd "$WORKTREE_DIR"

# Install deps (if your project uses something else, change this)
bun install || true

claude -p "You are an autonomous engineering bot working on the generalstaff-test project.

## Your task
Read \$GENERALSTAFF_ROOT/state/generalstaff-test/tasks.json and pick the highest-priority unfinished task (status: pending).
Work on exactly that task, run: bun test, and commit.

## Mark task done (IMPORTANT)
Use the CLI to mark completion (do NOT hand-edit tasks.json):
  bun \"\$GENERALSTAFF_ROOT/src/cli.ts\" task done --project=generalstaff-test --task=<task-id>

Stop after one task." \
  --output-format text