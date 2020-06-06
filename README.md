# transparent-commitizen.

A stripped-down, simple commitizen adapter that exposes its logic to be checked in to source control. This lets you have project-specific configs. Be a transparent commitizen!

Forked from [cs-jira-smart-commit](https://www.npmjs.com/package/cz-jira-smart-commit) with love.

## Installation

1. Have Commitizen installed (if it's not, run `npm install -g commitizen`)
2. Copy index.js and .cz.json into a folder in your project called `commitconfig`. `commitconfig` shouldn't be inside node_modules (because we want to check this into version control)
3. if you've cloned this from a git repo, then inside `commitconfig/` run `git rm -rf .git`
4. Add this line to your package.json

```
  "config": {
    "commitizen": {
      "path": "./commitconfig"
    }
  }
```

## Writing your own questions and format

Configuring transparent-commitizen is easy. All you need to do is modify the array passed to inquirer.prompt with your questions, and the function formatAnswers to add the answers to the message. It's a very simple file so you won't get lost.

Questions are a series of objects stored in an array. Each one should have `type: 'input'`, a name for the question, and a message that the user will see as a prompt. 

They also take an optional function called validate, which should return true if the message passes. I omit the validate function from most of my projects, but you could write your own using `match()` or something. If you want to get fancy about input types or validation, head over to the [inquirer.js docs](https://www.npmjs.com/package/inquirer).

Adding questions to the array of objects makes them available in the answers object. Each answer is a value keyed to the name you gave the question. So, to put to the answers to questions in your commit message, access them by their names in the formatCommit function. 

## Day to day work

instead of `git commit`, use `git cz`: 

```
$ git add .
$ git cz
```
