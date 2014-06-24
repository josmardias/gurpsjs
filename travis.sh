#!/usr/bin/env bash

if [ "$1" == "browserstack" ]; then
    if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
        grunt browserstack;
        exit $?;
    fi
fi

if [ "$1" == "coverage" ]; then
    grunt coverage || exit $?;

    if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
        codeclimate < coverage/*/lcov.info; 
    fi
fi
