# cz-jira-smart-commit

![Screenshot](other/screenshot.png)

## Installation

1. Have Commitizen installed
2. copy this folder into your npm project, but not node_modules (because we want to check this into version control)
3. Add this line to your package.json

```
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-jira-smart-commit"
    }
  }
```



### Day to day work

Instead of `git commit -m 'Your message'`, you type: `git cz` with this adapter and it prompts you for:

- commit message
- Jira Issue Key(s)
- Workflow command
- Time Spent
- Comment

And generates your commit based on that.

