var inquirer = require('inquirer')

module.exports = {
  prompter: prompter,
  formatCommit: formatCommit
};

// By default, we'll de-indent your commit
// template and will keep empty lines.

const questions = [
    {
      type: 'input',
      name: 'message',
      message: 'GitHub commit message (required):\n',
      validate: function(input) {
        if (!input) {
          return 'empty commit message';
        } else {
          return true;
        }
      }
    },
    {
      type: 'input',
      name: 'issues',
      message: 'Jira Issue ID(s) (required):\n',
      validate: function(input) {
        if (!input) {
          return 'Must specify issue IDs, otherwise, just use a normal commit message';
        } else {
          return true;
        }
      }
    },
    {
      type: 'input',
      name: 'workflow',
      message: 'Workflow command (testing, closed, etc.) (optional):\n',
      validate: function(input) {
        if (input && input.indexOf(' ') !== -1) {
          return 'Workflows cannot have spaces in smart commits. If your workflow name has a space, use a dash (-)';
        } else {
          return true;
        }
      }
    },
    {
      type: 'input',
      name: 'time',
      message: 'Time spent (i.e. 3h 15m) (optional):\n'
    },
    {
      type: 'input',
      name: 'comment',
      message: 'Jira comment (optional):\n'
    },
  ]

function prompter(cz, commit) {
  inquirer.prompt(questions).then((answers) => {
    formatCommit(commit, answers);
  });
}

function formatCommit(commit, answers) {
  commit(filter([
    answers.message,
    answers.issues,
    answers.workflow ? '#' + answers.workflow : undefined,
    answers.time ? '#time ' + answers.time : undefined,
    answers.comment ? '#comment ' + answers.comment : undefined,
  ]).join(' '));
}

function filter(array) {
  return array.filter(function(item) {
    return !!item;
  });
}
