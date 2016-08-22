#!/bin/bash
result=0

if [ "$TRAVIS_BRANCH" == "master" ]; then
  thisTag=`git describe --tags --abbrev=0`
  lastTag=`git describe --tags --abbrev=0 HEAD^`

  if [ "$thisTag" == "$lastTag" ]; then
    thisTag="HEAD"
  fi

  echo "Commits since $lastTag to $thisTag"
  echo
  git log $lastTag..HEAD --oneline --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
  echo
  echo
fi

echo "Running ESLint..."
eslint *.js lib/ || result=1
echo

istanbul cover test.js || result=1

if [ "$TRAVIS" == "true" ]; then
  echo
  echo "Sending coverage report to Coveralls..."
  cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js -v || result=1
fi

exit $result
