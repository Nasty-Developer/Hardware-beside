---
name: Project import handoff
description: Imported repository files can remain in the temporary conversation workspace after moving into a persistent project.
---

When a repository is imported before a conversation is moved into a persistent project, verify that the source is present in the active project root. If it is only under `.local/conversation-workspace/files`, copy the repository contents into the root while preserving the active project's own `.git` and tooling directories.

**Why:** The project transition can preserve the imported files separately from the new project's initialized workspace, leaving the app absent from the active root until it is materialized.

**How to apply:** After a project handoff involving an imported repository, check the active root and the conversation-workspace copy before starting or presenting the app.