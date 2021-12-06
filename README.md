# Create/Delete Label Action

This GitHub Action allows you to create or delete a label.

## Usage

This action only needs the GITHUB_TOKEN secret as it interacts with the GitHub API to modify labels. The action can be used as such:

```yaml
on: create
name: Create label on branch or tag create
jobs:
  create-label:
    name: Create Label
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@1.0.0
      - uses: aarontwf/create-delete-label-action@v1.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          name: My Label
          description: My first GitHub label # optional
          color: #9b59b6
          action: create # set this to create or delete
```
