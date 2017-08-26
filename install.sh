#!/bin/bash
echo "Installing Commitizen Globally"
npm install -g commitizen
echo "Installing JIRA smart commits"
npm install -g cz-jira-smart-commit
echo "Creating a global config file"
echo '{ "path": "/usr/local/lib/node_modules/cz-jira-smart-commit/" }' > ~/.czrc
echo "You can view documentation at the link: https://fixico.atlassian.net/wiki/pages/resumedraft.action?draftId=39425512"
