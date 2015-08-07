# cz-jira-smart-commit

A commitizen adapter for [Jira smart commits](https://confluence.atlassian.com/display/FISHEYE/Using+smart+commits)

## Usage

### Add this adapter

Install this adapter

```
npm install cz-jira-smart-commit
```

Reference it in your `.cz.json` of your project

```json
{
  "path": "node_modules/cz-jira-smart-commit/"
}
```


### Day to day work

Instead of `git commit -m 'Your message'`, you type: `git gz` with this adapter and it prompts you for:

- Jira Issue Key(s)
- Time Spent
- Workflow command
- Comment

And generates your commit based on that.

