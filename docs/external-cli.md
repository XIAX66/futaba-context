# External CLI ecosystem

Futaba should orchestrate established public CLIs instead of rebuilding their
APIs. Skills explain the workflow; tools provide safe, stable wrappers where a
raw command is too complex or environment-specific.

## GitHub and source control

Use `git` for local branches, commits, diffs, and pushes. Use
[GitHub CLI](https://cli.github.com/manual/) (`gh`) for GitHub operations:

```bash
git status
git add <paths>
git commit

gh issue list
gh pr create
gh pr checks
gh run list
gh run view --log-failed
gh workflow run <workflow>
gh release create
gh api <endpoint>
```

`gh` is the closest public equivalent to a unified internal engineering CLI,
but it covers GitHub rather than every infrastructure provider.

## CI and CD

GitHub Actions is the default CI system for this repository. Agents can inspect
runs and failed logs through `gh run` and `gh pr checks`.

Deployment commands depend on the target platform. Common choices include:

| Environment | CLI |
| --- | --- |
| Containers | `docker`, `docker compose` |
| Kubernetes | `kubectl`, `helm` |
| AWS | `aws` |
| Google Cloud | `gcloud` |
| Azure | `az` |
| Infrastructure as code | `terraform`, `tofu` |
| Vercel | `vercel` |
| Cloudflare | `wrangler` |

## Logs

There is no universal public log command because logs belong to the deployment
platform. Typical entry points are:

```bash
gh run view --log-failed
docker logs <container>
docker compose logs <service>
kubectl logs <pod>
aws logs tail <group>
gcloud logging read <filter>
```

Futaba can later expose provider-neutral commands such as
`futaba run ci-logs` or `futaba run service-logs`. Each project would configure
which underlying CLI the wrapper should call.

## Documentation

Agents can edit Markdown and documentation source directly, validate it with
the project's own build command, then use `git` and `gh` to submit the change.
Documentation frameworks such as Docusaurus, MkDocs, and VitePress each retain
their native CLI rather than requiring a Futaba replacement.
