![GitHub repo size](https://img.shields.io/github/repo-size/Ivo-Evans/transparent-commitizen)
![Version](https://img.shields.io/npm/v/transparent-commitizen)
![License](https://img.shields.io/npm/l/transparent-commitizen)
# transparent-commitizen.

A stripped-down, simple commitizen adapter that exposes its logic. This lets you check project-specific configs into source control. Be a transparent commitizen.

Forked from [cs-jira-smart-commit](https://www.npmjs.com/package/cz-jira-smart-commit).

## Installation

1. If you don't already have commitizen, run `npm install -g commitizen`
2. Install this adapter with `npm i -D transparent-commitzen`
3. Copy commitconfig from node_modules/transparent-commitizen/ into the top level of your project 
4. Add this line to your package.json

```
  "config": {
    "commitizen": {
      "path": "./commitconfig"
    }
  }
```

## Writing your own questions and format

I recommend you look at index.js, which is extremely simple, but here are some instructions anyway. 

To add a question, you need ask it by adding to the the array  passed to inquirer.prompt, and handle the answer by adding to the function formatAnswers. 

Questions in the array passed to inquirer.prompt are a series of objects. Each one should have a type property (`type: 'input'` is a good place to start), a name for the question, and a message that the user will see as a prompt. 

Question objects take a function called validate as an optional property. This should return true if the message passes. I omit the validate function from most of my projects, but you could write your own. If you're curious about input types or validate functions, head over to the [inquirer.js docs](https://www.npmjs.com/package/inquirer).

Adding questions to the array of objects makes them available in the answers object. Each answer is a value keyed to the name you gave the question. So, to put to the answers to questions in your commit message, access them by their names in the formatCommit function. 


## Day to day work

instead of `git commit`, use `git cz`: 

```
$ git add .
$ git cz
```
