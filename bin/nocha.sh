#!/bin/bash

usage() {
    echo "Usage: $0 [options] [file/files/pattern]"
    echo ""
    echo "This script runs Node.js tests with specified options."
    echo ""
    echo "Options:"
    echo "  --help"
    echo "  --experimental-test-coverage"
    echo "                                  Enable experimental test coverage."
    echo "  --experimental-test-isolation=mode"
    echo "                                  Set the test isolation mode."
    echo "  --experimental-test-module-mocks"
    echo "                                  Enable experimental test module mocks."
    echo "  --test-concurrency <number|boolean>"
    echo "                                  Set the concurrency level for tests."
    echo "                                  If a number is provided, that many test processes run in parallel."
    echo "                                  If true, runs os.availableParallelism() - 1 test files in parallel."
    echo "                                  If false, runs one test file at a time. Default: false."
    echo "  --test-coverage-branches=threshold"
    echo "                                  Set the branch coverage threshold."
    echo "  --test-coverage-exclude"
    echo "                                  Exclude files from coverage."
    echo "  --test-coverage-functions=threshold"
    echo "                                  Set the function coverage threshold."
    echo "  --test-coverage-include"
    echo "                                  Include files for coverage."
    echo "  --test-coverage-lines=threshold"
    echo "                                  Set the line coverage threshold."
    echo "  --test-force-exit"
    echo "                                  Force exit after tests complete even if the event loop remains active."
    echo "  --test-name-pattern"
    echo "                                  Run tests matching the pattern."
    echo "  --test-only"
    echo "                                  Run only the specified tests."
    echo "  --test-reporter"
    echo "                                  Specify the test reporter."
    echo "  --test-reporter-destination"
    echo "                                  Specify the destination for the test report."
    echo "  --test-shard"
    echo "                                  Run a specific shard of tests."
    echo "  --test-skip-pattern"
    echo "                                  Skip tests matching the pattern."
    echo "  --test-timeout"
    echo "                                  Set the test timeout in milliseconds."
    echo "  --test-update-snapshots"
    echo "                                  Update snapshots."
    echo ""
    echo "Examples:"
    echo "  $0 --test test/file1.js"
    echo "  $0 --test --test-reporter spec test/file1.js test/file2.js"
    echo "  $0 --test --test-timeout 5000 'test/**/*.js'"
    echo ""
    echo "--test will be added automatically to the node arguments."
    echo ""
    echo "Run node --help for more options."
    exit 1
}

# Check if no arguments are provided
if [ $# -eq 0 ] || [[ "$1" == "--help" ]]; then
    usage
fi

# Check if only one argument is provided and it's a file
if [ $# -eq 1 ] && [ -f "$1" ]; then
    echo "Running tests for $1"
    node --test "$1"
else
    node --test "$@"
fi
