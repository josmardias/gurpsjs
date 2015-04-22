#!/usr/bin/env bash

function grunt() {
    node -e "require('grunt').tasks(['$BUILD_SUBTASK'])"
    return $?
}

function codeclimate() {
    ./node_modules/.bin/codeclimate
    return $?
}

# Skip everything relying on travis secure variables when on a pull requests

if [ "$BUILD_SUBTASK" == "browserstack" ]; then
    if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
        grunt browserstack;
        exit $?;
    else
        echo "Skipping browserstack. (it's a pull request)"
    fi
fi

if [ "$BUILD_SUBTASK" == "coverage" ]; then
    grunt coverage || exit $?;

    if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
        if [ "$TRAVIS_BRANCH" == "master" ]; then
            codeclimate < coverage/lcov.info;
        else
            echo "Not sending coverage report (it's not master branch).";
        fi
    else
        echo "Not sending coverage reports (it's a pull request)"
    fi
fi
