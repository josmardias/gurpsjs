#!/usr/bin/env bash

function codeclimate() {
    ./node_modules/.bin/codeclimate
    return $?
}

npm run test-ci || exit $?;

# Skip everything relying on travis secure variables when on a pull requests

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    if [ "$TRAVIS_BRANCH" == "master" ]; then
        codeclimate < coverage/lcov.info;
    else
        echo "Not sending coverage report (it's not master branch).";
    fi
else
    echo "Not sending coverage reports (it's a pull request)"
fi
