const inquirer = require("inquirer");

module.exports = {
  prompter: prompter,
  formatCommit: formatCommit,
};

// This is a set up for the github project board, with co-working in mind.

const questions = [
  {
    type: "input",
    name: "message",
    message: "GitHub commit message (required):\n",
    validate: exists,
  },
  {
    type: "input",
    name: "closes",
    message: "Closes issue number (optional):\n",
  },
  {
    type: "input",
    name: "references",
    message: "References issues (space separated integers)(optional):\n",
  },
  {
    type: "input",
    name: "coauthorship",
    message: "coauthor formatted as username <email> (optional):\n",
  },
];

function prompter(cz, commit) {
  inquirer.prompt(questions).then((answers) => {
    formatCommit(commit, answers);
  });
}

function formatCommit(commit, answers) {
    // you might want to consider conditional chaining here
  commit(
    filter([
      answers.message,
      answers.closes ? "\nCloses #" + answers.closes : undefined,
      answers.references ? "\nRelates #" + answers.references.split(" ").join(" #") : undefined,
      answers.coauthorship ? "\n\n" + answers.coauthorship : undefined
    ]).join(" ")
  );
}

function filter(array) {
  return array.filter(function (item) {
    return !!item;
  });
}

function exists(input) {
  if (input) {
    return true;
  }
  return "input required";
}
