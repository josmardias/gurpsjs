#!/usr/bin/env bash

# Skip everything relying on travis secure variables when on a pull requests

function grunt() {
    node -e "require('grunt').tasks(['$1'])"
    return $?
}

function codeclimate() {
    ./node_modules/.bin/codeclimate
    return $?
}

if [ "$1" == "browserstack" ]; then
    if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
        grunt browserstack;
        exit $?;
    else
        echo "Skipping browserstack. (it's a pull request)"
    fi
fi

if [ "$1" == "coverage" ]; then
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
