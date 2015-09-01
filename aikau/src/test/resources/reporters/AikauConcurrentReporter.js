/**
 * Copyright (C) 2005-2015 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Reporter for running concurrent Intern tests.<br />
 * <br />
 * NOTE: If getting unexplained errors, try turning on BreakOnError in the CONFIG constants object.
 *
 * @author Martin Doyle
 * @module AikauConcurrentReporter
 */
define([
   "dojo/node!charm"
], function(Charm) {

   /**
    * ANSI codes for terminal text decoration
    *
    * @constant
    * @type {Object}
    * @see  https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
    */
   var ANSI_CODES = {
      Reset: "\x1b[0m",
      Bright: "\x1b[1m",
      Dim: "\x1b[2m",
      Underline: "\x1b[4m",
      Blink: "\x1b[5m",
      Reverse: "\x1b[7m",
      Hidden: "\x1b[8m",
      FgBlack: "\x1b[30m",
      FgRed: "\x1b[31m",
      FgGreen: "\x1b[32m",
      FgYellow: "\x1b[33m",
      FgBlue: "\x1b[34m",
      FgMagenta: "\x1b[35m",
      FgCyan: "\x1b[36m",
      FgWhite: "\x1b[37m",
      BgBlack: "\x1b[40m",
      BgRed: "\x1b[41m",
      BgGreen: "\x1b[42m",
      BgYellow: "\x1b[43m",
      BgBlue: "\x1b[44m",
      BgMagenta: "\x1b[45m",
      BgCyan: "\x1b[46m",
      BgWhite: "\x1b[47m"
   };

   /**
    * Constants relating to charm
    *
    * @constant
    * @type {Object}
    */
   var CHARM = {
      BottomMargin: 1,
      Col: {
         Default: 3,
         MessageString: 3,
         MessageTitle: 3,
         ProgressName: 3,
         ProgressValue: 21,
         StatusName: 60,
         StatusValue: 74
      },
      Row: {
         Title: 3,
         StatusTitle: 6,
         Environments: 7,
         Total: 8,
         Passed: 9,
         Failed: 10,
         Skipped: 11,
         Errors: 12,
         Warnings: 13,
         Deprecations: 14,
         ProgressTitle: 6,
         PercentComplete: 12,
         TimeTaken: 13,
         TimeRemaining: 14,
         ProgressBar: 9,
         MessagesLine: 16
      },
      ProblemIndent: 2,
      ProblemPrefix: "  - ",
      ProblemsCroppedMessage: "[previous messages hidden ...]",
      ProgressBar: {
         CompleteChar: "=",
         EmptyChar: ".",
         Length: 50,
         LineChar: "-"
      },
      TitleIndent: 1
   };

   /**
    * Configuration constants
    *
    * @constant
    * @type {Object}
    */
   var CONFIG = {
      BreakOnError: false,
      Title: "AIKAU UNIT TESTS",
      TitleHelp: "(Ctrl-C to abort)"
   };

   /**
    * Problem types
    * 
    * @readonly
    * @enum {string}
    */
   var PROBLEM_TYPE = {
      Deprecation: "deprecations",
      Error: "errors",
      Warning: "warnings"
   };

   /**
    * The charm instance
    *
    * @type {Object}
    */
   var charm = null;

   /**
    * @namespace The helper namespace, which contains the state and functionality to support the Reporter.
    */
   var helper = {

      /**
       * A type that represents a problem-collection, e.g. errors
       *
       * @typedef ProblemCollection
       * @property {Object} group An object under which to group problems (e.g. "Reporter")
       * @property {Object} group.problem The problem object (key is problem message)
       * @property {string} group.problem.message The problem's message
       * @property {int} group.problem.count The number of times this problem has occurred
       * @property {string} [group.problem.stack] The stacktrace if the problem is an error
       */

      /**
       * The deprecations container object. Will contain zero-or-more message properties.
       *
       * @instance
       * @type {Object}
       * @property {string} _name The name to use when outputting this collection
       * @property {int} message The deprecation message with its number of occurrences as its value
       */
      deprecations: {
         _name: "Deprecations"
      },

      /**
       * The environments within which the tests are being run
       *
       * @type {Object}
       * @property {boolean} envName The name of the environment as the key, with true as the value
       */
      environments: {},

      /**
       * The errors container object
       *
       * @instance
       * @type {Object}
       * @property {string} _name The name to use when outputting this collection
       * @property {Object[]} label The errors grouped by label
       * @property {Object} label.error The Error object
       * @property {int} label.count The number of times this error occurred (grouped by error message)
       */
      errors: {
         _name: "Errors"
      },

      /**
       * The failures container object
       *
       * @instance
       * @type {Object}
       * @property {Object} suiteName The suite in which the failure occurred (key is suite name)
       * @property {Object} suiteName.testName The test in which the failure occurred (key is test name)
       * @property {string} suiteName.testName.message The failure message, where the key is the name of the environment in which it failed
       */
      failures: {},

      /**
       * Problems (deprecations, errors or warnings) encountered during the test run
       *
       * @type {Object}
       * @property {ProblemCollection} deprecations Deprecations
       * @property {ProblemCollection} errors Errors
       * @property {ProblemCollection} warnings Warnings
       */
      problems: {
         deprecations: {},
         errors: {},
         warnings: {}
      },

      /**
       * How often to update the progress bar animation in milliseconds
       *
       * @instance
       * @type {int}
       * @default
       */
      progressAnimInterval: 100,

      /**
       * The pointer for the timeout used to help prevent redraws happening too often
       *
       * @instance 
       * @type {Object}
       */
      redrawTimeout: null,

      /**
       * When the redraw function last ran as an epoch value in ms
       *
       * @instance
       * @type {number}
       */
      redrawLastRun: 0,

      /**
       * How often to redraw as a minimum interval in milliseconds
       *
       * @instance
       * @type {number}
       * @default
       */
      redrawIntervalMs: 200,

      /**
       * The start time of the test run as an epoch value in ms
       *
       * @instance
       * @type {int}
       */
      startTime: 0,

      /**
       * The current state
       *
       * @type {Object}
       * @property {Object} charm State values relating to charm
       * @property {int} charm.progressBarCurrPos Where the progress bar animation should be drawn (column index)
       * @property {int} charm.finalRow Where the cursor should finish after redraws (row index)
       */
      state: {
         charm: {
            progressBarCurrPos: 0,
            finalRow: 0
         }
      },

      /**
       * Information about the terminal window
       *
       * @type {Object}
       * @property {int} cols Number of columns available
       * @property {int} rows Number of rows available
       */
      terminalInfo: null,

      /**
       * Running totals of test states
       *
       * @instance
       * @type {Object}
       */
      testCounts: {
         deprecations: 0,
         errors: 0,
         failed: 0,
         passed: 0,
         run: 0,
         skipped: 0,
         total: 0,
         warnings: 0
      },

      /**
       * How many rows are available for displaying messages
       *
       * @instance
       * @type {number}
       */
      totalMessageRows: 0,

      /**
       * The warnings container object
       *
       * @instance
       * @type {Object}
       * @property {string} _name The name to use when outputting this collection
       * @property {Object[]} label The label under which to group the warnings
       * @property {string} label.warning The warning message
       * @property {int} label.count The number of times this warning occurred
       */
      warnings: {
         _name: "Warnings"
      },

      /**
       * Augment the suite. Specifically, modify the setup() to: function read the
       * environment name and populate the environments collection, before continuing
       * with its normal behaviour.
       *
       * @instance
       * @param {Object} suite The suite
       */
      augmentSuite: function(suite) {
         var setupFunc = suite.setup,
            environments = this.environments;
         if (setupFunc) {
            suite.setup = function() {
               var rootSuite = this,
                  envName;
               do {
                  envName = rootSuite.name;
               }
               while ((rootSuite = rootSuite.parent));
               if (envName) {
                  envName = envName[0].toUpperCase() + envName.substr(1);
               }
               // var myErrorMessage = Object.keys(this).join(", ") + "\n" + JSON.stringify(this, null, 2);
               // helper.exitWithError(new Error(myErrorMessage), "Suite object for environment '" + envName + "'");
               environments[envName] = true;
               return setupFunc.apply(this, arguments);
            };
         } else if (suite.name) {
            this.addWarning(suite.name, "Suite does not have setup() method");
         }
      },

      /**
       * Debug-only function that will take a message and immediately break and log it to console
       *
       * @instance
       * @param {string} message The message
       */
      abortAndLog: function(message) {
         this.exitWithError(new Error(message));
      },

      /**
       * Capitalise the supplied string
       *
       * @instance
       * @param {string} input The string to be capitalised
       * @returns {string} The capitalised string or the input if it was falsy
       */
      capitalise: function(input) {
         return input && input[0].toUpperCase() + input.substr(1).toLowerCase();
      },

      /**
       * Exit the process with the specified error
       *
       * @instance
       * @param {Error} err The offending err
       * @param {string} [message] An optional extra message string
       */
      exitWithError: function(err, message) {
         if (charm) {
            this.resetCursor();
            charm.destroy();
         }
         console.error("");
         message && console.error(message);
         console.error(err.stack || err);
         process.exit(1);
      },

      /**
       * Increment the specified counter
       *
       * @instance
       * @param {string} counterName The name of the counter to increment
       */
      incrementCounter: function(counterName) {
         this.testCounts[counterName]++;
         this.requestRedraw();
      },

      /**
       * Initialise charm
       *
       * @instance
       */
      initCharm: function() {
         /*jshint maxstatements:false*/

         // Setup function variables
         var i;

         // Setup charm
         charm = new Charm();
         charm.pipe(process.stdout);
         charm.reset();

         // Calculate message space
         this.totalMessageRows = this.terminalInfo.rows - CHARM.Row.MessagesLine - CHARM.BottomMargin;

         // Always cast to string when using charm.write()
         var originalWriteMethod = charm.write;
         charm.write = function(str) {
            originalWriteMethod.call(charm, "" + str);
         };

         // Output the title
         var titleMessageParts = [CONFIG.Title, CONFIG.TitleHelp],
            underOverLineLength = titleMessageParts.join(" ").length + (CHARM.TitleIndent * 2);
         charm.position(CHARM.Col.Default, CHARM.Row.Title - 1);
         charm.display("bright");
         for (i = 0; i < underOverLineLength; i++) {
            charm.write("=");
         }
         charm.position(CHARM.Col.Default + CHARM.TitleIndent, CHARM.Row.Title);
         charm.write(CONFIG.Title);
         if (CONFIG.TitleHelp) {
            charm.display("reset");
            charm.write(" " + CONFIG.TitleHelp);
            charm.display("bright");
         }
         charm.position(CHARM.Col.Default, CHARM.Row.Title + 1);
         for (i = 0; i < underOverLineLength; i++) {
            charm.write("=");
         }
         charm.display("reset");

         // Create the status section
         charm.position(CHARM.Col.StatusName, CHARM.Row.StatusTitle);
         charm.display("bright");
         charm.write("STATUS");
         charm.position(CHARM.Col.StatusName, CHARM.Row.Environments);
         charm.display("reset");
         charm.write("Environments: ");
         charm.position(CHARM.Col.StatusName, CHARM.Row.Total);
         charm.write("Total tests: ");
         charm.position(CHARM.Col.StatusName, CHARM.Row.Passed);
         charm.write("Passed: ");
         charm.position(CHARM.Col.StatusName, CHARM.Row.Failed);
         charm.write("Failed: ");
         charm.position(CHARM.Col.StatusName, CHARM.Row.Skipped);
         charm.write("Skipped: ");
         charm.position(CHARM.Col.StatusName, CHARM.Row.Errors);
         charm.write("Errors: ");
         charm.position(CHARM.Col.StatusName, CHARM.Row.Warnings);
         charm.write("Warnings: ");
         charm.position(CHARM.Col.StatusName, CHARM.Row.Deprecations);
         charm.write("Deprecations: ");

         // Create the progress section
         charm.position(CHARM.Col.ProgressName, CHARM.Row.ProgressTitle);
         charm.display("bright");
         charm.write("PROGRESS");
         charm.display("reset");
         charm.position(CHARM.Col.ProgressName, CHARM.Row.PercentComplete);
         charm.write("Percent complete: ");
         charm.position(CHARM.Col.ProgressName, CHARM.Row.TimeTaken);
         charm.write("Time Taken: ");
         charm.position(CHARM.Col.ProgressName, CHARM.Row.TimeRemaining);
         charm.write("Time Remaining: ");

         // Draw progress bar
         charm.position(CHARM.Col.ProgressName, CHARM.Row.ProgressBar - 1);
         for (i = 0; i < CHARM.ProgressBar.Length; i++) {
            charm.display("bright");
            charm.write(CHARM.ProgressBar.LineChar);
            charm.display("reset");
         }
         charm.position(CHARM.Col.ProgressName, CHARM.Row.ProgressBar);
         for (i = 0; i < CHARM.ProgressBar.Length; i++) {
            charm.write(CHARM.ProgressBar.EmptyChar);
         }
         charm.position(CHARM.Col.ProgressName, CHARM.Row.ProgressBar + 1);
         for (i = 0; i < CHARM.ProgressBar.Length; i++) {
            charm.display("bright");
            charm.write(CHARM.ProgressBar.LineChar);
            charm.display("reset");
         }
      },

      /**
       * Log a test failure
       *
       * @instance
       * @param {Object} test The failed test
       */
      logFailure: function(test) {

         // Wrap all in try/catch
         try {

            // Setup variables
            var testName = test.name,
               suiteName = test.parent.name,
               errorMessage = test.error.message;

            // Calculate the environment name
            var parentTest = test,
               envName;
            do {
               envName = this.capitalise(parentTest.name);
            }
            while ((parentTest = parentTest.parent));

            // Sanitise the error message
            var lineBreakIndex = errorMessage.indexOf("\n");
            if (lineBreakIndex !== -1) {
               errorMessage = errorMessage.substr(0, lineBreakIndex);
            }

            // Add to the failures object
            var suiteFailures = this.failures[suiteName] || {},
               testFailures = suiteFailures[testName] || {};
            testFailures[envName] = errorMessage;
            suiteFailures[testName] = testFailures;
            this.failures[suiteName] = suiteFailures;

            // Increment the counter (this will automatically redraw)
            this.incrementCounter("failed");

         } catch (e) {
            this.exitWithError(e, "Error handling failed test");
         }
      },

      /**
       * Log the occurrence of a problem
       *
       * @instance
       * @param {PROBLEM_TYPE} type The type of problem (use the enum)
       * @param {string} groupName The name of the problem group (e.g. "Reporter")
       * @param {Error|string} errorOrMessage An Error object or an error message
       */
      logProblem: function(type, groupName, errorOrMessage) {

         // Do we need to break out immediately?
         var isErrorObj = errorOrMessage instanceof Error;
         if (isErrorObj && CONFIG.BreakOnError) {

            // Break immediately and display error in console
            this.exitWithError(errorOrMessage, groupName + " error!");

         } else {

            // Catch errors
            try {

               // Log as normal
               var collectionObj = this.problems[type],
                  groupObj = collectionObj[groupName] || {},
                  message = isErrorObj ? errorOrMessage.message : errorOrMessage,
                  problem = groupObj[message];
               if (!problem) {
                  problem = isErrorObj ? errorOrMessage : {
                     message: errorOrMessage
                  };
                  problem.count = 0;
               }
               problem.count++;
               groupObj[message] = problem;
               collectionObj[groupName] = groupObj;
               this.testCounts[type]++;
               this.requestRedraw();

            } catch (e) {
               this.exitWithError(e, "Error logging problem");
            }
         }
      },

      /**
       * Convert a milliseconds value to a human readable minutes and seconds value
       *
       * @instance
       * @param {int} ms The number of milliseconds
       * @returns {string} The human readable time string
       */
      msToHumanReadable: function(ms) {
         var wholeMins = Math.floor(ms / 1000 / 60),
            roundedSecs,
            minText,
            secText,
            timeInMinsAndSecs;
         if (wholeMins) {
            roundedSecs = Math.floor(ms / 1000) % (wholeMins * 60);
            minText = wholeMins === 1 ? "minute" : "minutes";
            secText = roundedSecs === 1 ? "second" : "seconds";
            if (roundedSecs) {
               timeInMinsAndSecs = wholeMins + " " + minText + " " + roundedSecs + " " + secText;
            } else {
               timeInMinsAndSecs = wholeMins + " " + minText;
            }
         } else {
            roundedSecs = Math.floor(ms / 1000);
            secText = roundedSecs === 1 ? "second" : "seconds";
            timeInMinsAndSecs = roundedSecs + " " + secText;
         }
         return timeInMinsAndSecs;
      },

      /**
       * Convert a milliseconds value to a human readable minutes and seconds value
       *
       * @instance
       * @param {int} ms The number of milliseconds
       * @returns {string} The human readable time string
       */
      msToTimeLeft: function(ms) {

         // Declare result variable
         var timeLeftMessage;

         // Just go by minutes remaining, unless over 10 minutes, then go by 5 minute intervals
         var minsRemaining = ms / 1000 / 60,
            modifiedMins;
         if (minsRemaining === 0) {
            timeLeftMessage = "0 mins";
         } else if (minsRemaining < 1) {
            timeLeftMessage = "< 1 min";
         } else {
            modifiedMins = Math.ceil(minsRemaining);
            if (modifiedMins > 10) {
               modifiedMins = Math.ceil(minsRemaining / 5) * 5;
            }
            timeLeftMessage = modifiedMins + " mins";
         }
         timeLeftMessage += " remaining";

         // Pass back the message
         return timeLeftMessage;
      },

      /**
       * Output final results in full detail
       *
       * @instance
       */
      outputFinalResults: function() {

         // Do one final redraw to make sure the display's up to date
         this.redraw();

         // Next, stop using charm ... it's all console logging from now on
         charm.destroy();

         // Log the failures
         var loggedSectionTitle = false;
         Object.keys(this.environments).forEach(function(envName) {

            // Build up suite/test/error object
            var failingSuites = {};
            Object.keys(this.failures).forEach(function(suiteName) {
               var testFailures = this.failures[suiteName];
               Object.keys(testFailures).forEach(function(testName) {
                  var failingEnvs = testFailures[testName],
                     errorMessage = failingEnvs[envName];
                  if (errorMessage) {
                     var failingTests = failingSuites[suiteName] || {};
                     failingTests[testName] = errorMessage;
                     failingSuites[suiteName] = failingTests;
                  }
               });
            }, this);

            // Check if there are failures to display
            var failingSuiteNames = Object.keys(failingSuites);
            if (failingSuiteNames.length) {

               // Output the section title (break "fail" to avoid grunt output weirdness)
               if (!loggedSectionTitle) {
                  console.log(ANSI_CODES.Bright + "====================" + ANSI_CODES.Reset);
                  console.log(ANSI_CODES.Bright + "===== FA" + ANSI_CODES.Bright + "ILURES =====" + ANSI_CODES.Reset);
                  console.log(ANSI_CODES.Bright + "====================" + ANSI_CODES.Reset);
                  loggedSectionTitle = true;
               }

               // Log the environment name
               console.log("");
               console.log(ANSI_CODES.Bright + "--- " + envName.toUpperCase() + " ---" + ANSI_CODES.Reset);

               // Output the suites/tests/errors
               Object.keys(failingSuites).forEach(function(suiteName) {
                  console.log("");
                  console.log(ANSI_CODES.Bright + ANSI_CODES.FgRed + suiteName + ANSI_CODES.Reset);
                  var failingTests = failingSuites[suiteName];
                  Object.keys(failingTests).forEach(function(testName) {
                     var errorMessage = failingTests[testName];
                     console.log(ANSI_CODES.Bright + "\"" + testName + "\"" + ANSI_CODES.Reset);
                     console.log(errorMessage);
                  });
               });
            }

         }, this);

         // Log the other problems
         loggedSectionTitle = false;
         Object.keys(this.problems).forEach(function(problemType) {

            // Run through the problems
            var problems = this.problems[problemType];
            Object.keys(problems).forEach(function(groupName) {

               // Log title
               if (!loggedSectionTitle) {
                  var sectionTitle = "===== " + problemType.toUpperCase() + " =====",
                     underOverLine = new Array(sectionTitle.length + 1).join("=");
                  console.log("");
                  console.log("");
                  console.log(ANSI_CODES.Bright + underOverLine + ANSI_CODES.Reset);
                  console.log(ANSI_CODES.Bright + sectionTitle + ANSI_CODES.Reset);
                  console.log(ANSI_CODES.Bright + underOverLine + ANSI_CODES.Reset);
                  loggedSectionTitle = true;
               }

               // Log group name
               console.log("");
               console.log(ANSI_CODES.Bright + ANSI_CODES.FgRed + groupName + ANSI_CODES.Reset);

               // Log groups' problems
               var groupProblems = problems[groupName];
               Object.keys(groupProblems).forEach(function(problemMessage) {
                  var problem = groupProblems[problemMessage],
                     messageToOutput = "\"" + problemMessage + "\"";
                  if (problem.count > 1) {
                     messageToOutput += " (x" + problem.count + ")";
                  }
                  console.log(ANSI_CODES.Bright + messageToOutput + ANSI_CODES.Reset);
                  if (problem.stack) {
                     console.log(problem.stack);
                  }
               });
            });

            // Reset title flag
            loggedSectionTitle = false;
         }, this);

         // Couple of lines space
         console.log("");
         console.log("");
      },

      /**
       * Pad the supplied string
       *
       * @instance
       * @param {string} str The string to pad (will be converted to string if necessary)
       * @param {int} paddedLength The new length
       * @param {string} [padChar] The character to use to pad (default is space)
       * @param {boolean} [padRight] Whether to pad from the right (default is left)
       * @returns {string} The padded string, or the original if paddedLength is less than original length
       */
      pad: function(str, paddedLength, padChar, padRight) {
         if (!str || (paddedLength || 0) < str.length) {
            return str;
         }
         str = "" + (str || ""); // Cast to string
         padChar = padChar || " ";
         var padding = new Array(paddedLength).join(padChar),
            preTrim = padRight ? str + padding : padding + str;
         return padRight ? preTrim.slice(0, paddedLength) : preTrim.slice(0 - paddedLength);
      },

      /**
       * Do a redraw of the latest information
       *
       * @instance
       */
      redraw: function() {
         /*jshint maxstatements:false,maxcomplexity:false*/

         // Catch all errors
         try {

            // Setup variables
            var environmentNames = Object.keys(this.environments),
               messagesRow = CHARM.Row.MessagesLine;

            // Hide cursor
            charm.cursor(false);

            // Position, write, repeat (status info)
            charm.position(CHARM.Col.StatusValue, CHARM.Row.Environments);
            charm.write(environmentNames.length ? environmentNames.join(", ") : "Updating...");
            charm.position(CHARM.Col.StatusValue, CHARM.Row.Total);
            charm.write(this.testCounts.total);
            charm.position(CHARM.Col.StatusValue, CHARM.Row.Passed);
            charm.write(this.testCounts.passed);
            charm.position(CHARM.Col.StatusValue, CHARM.Row.Failed);
            charm.write(this.testCounts.failed);
            charm.position(CHARM.Col.StatusValue, CHARM.Row.Skipped);
            charm.write(this.testCounts.skipped);
            charm.position(CHARM.Col.StatusValue, CHARM.Row.Errors);
            charm.write(this.testCounts.errors);
            charm.position(CHARM.Col.StatusValue, CHARM.Row.Warnings);
            charm.write(this.testCounts.warnings);
            charm.position(CHARM.Col.StatusValue, CHARM.Row.Deprecations);
            charm.write(this.testCounts.deprecations);

            // Prepare object to contain messages
            var messages = {
               deprecations: [],
               errors: [],
               failures: [],
               warnings: []
            };

            // Generate failure messages
            var failures = this.failures;
            if (!Object.keys(failures).length) {
               failures = {
                  "N/A": {}
               };
            }
            Object.keys(failures).forEach(function(suiteName) {
               messages.failures.push(suiteName);
               var failingTests = failures[suiteName];
               Object.keys(failingTests).forEach(function(testName) {
                  var testFailingEnvironments = failingTests[testName],
                     environments = Object.keys(testFailingEnvironments).join(", "),
                     failureMessage = CHARM.ProblemPrefix + testName;
                  failureMessage += ANSI_CODES.Bright + " [" + environments + "]" + ANSI_CODES.Reset;
                  messages.failures.push(failureMessage);
               });
            });

            // Generate problem messages
            Object.keys(this.problems).forEach(function(problemType) {

               // Get the problem collection and construct artificially if empty
               var problems = this.problems[problemType];
               if (!Object.keys(problems).length) {
                  problems = {
                     "N/A": {}
                  };
               }

               // Log the groups and their counts
               Object.keys(problems).forEach(function(groupName) {
                  messages[problemType].push(groupName);
                  var groupProblems = problems[groupName];
                  Object.keys(groupProblems).forEach(function(problemMessage) {
                     var messageCount = groupProblems[problemMessage].count,
                        messageOutput = CHARM.ProblemPrefix + problemMessage;
                     if (messageCount && messageCount > 1) {
                        messageOutput += " (x" + messageCount + ")";
                     }
                     messages[problemType].push(messageOutput);
                  });
               });
            }, this);

            // Calculate how many rows of messages to show
            var availableRowsForMessages = this.totalMessageRows - 7, // Four titles, three blank rows between
               failureLines = messages.failures.length,
               errorLines = messages.errors.length,
               warningLines = messages.warnings.length,
               deprecationLines = messages.deprecations.length;
            if ((failureLines + errorLines + warningLines + warningLines) > availableRowsForMessages) {

               // Work out the ostensible max height of each message group if all are full
               var maxLines = Math.floor(availableRowsForMessages / 4),
                  newFailureLines = Math.min(failureLines, maxLines),
                  newErrorLines = Math.min(errorLines, maxLines),
                  newWarningLines = Math.min(warningLines, maxLines),
                  newDeprecationLines = Math.min(deprecationLines, maxLines),
                  linesPool = (availableRowsForMessages - newFailureLines - newErrorLines - newWarningLines - newDeprecationLines);

               // Add more lines to each message group (note priority order)
               while (linesPool) {
                  (newFailureLines < failureLines) && linesPool-- && newFailureLines++;
                  (newErrorLines < errorLines) && linesPool-- && newErrorLines++;
                  (newWarningLines < warningLines) && linesPool-- && newWarningLines++;
                  (newDeprecationLines < deprecationLines) && linesPool-- && newDeprecationLines++;
               }

               // Update the collections
               messages.failures = messages.failures.reverse().slice(0, newFailureLines).reverse();
               messages.errors = messages.errors.reverse().slice(0, newErrorLines).reverse();
               messages.warnings = messages.warnings.reverse().slice(0, newWarningLines).reverse();
               messages.deprecations = messages.deprecations.reverse().slice(0, newDeprecationLines).reverse();

               // Indicate on first line if previous lines hidden
               if (newFailureLines < failureLines) {
                  messages.failures[0] = ANSI_CODES.Dim + CHARM.ProblemsCroppedMessage + ANSI_CODES.Reset;
               }
               if (newErrorLines < errorLines) {
                  messages.errors[0] = ANSI_CODES.Dim + CHARM.ProblemsCroppedMessage + ANSI_CODES.Reset;
               }
               if (newWarningLines < warningLines) {
                  messages.warnings[0] = ANSI_CODES.Dim + CHARM.ProblemsCroppedMessage + ANSI_CODES.Reset;
               }
               if (newDeprecationLines < deprecationLines) {
                  messages.deprecations[0] = ANSI_CODES.Dim + CHARM.ProblemsCroppedMessage + ANSI_CODES.Reset;
               }
            }

            // Remove previous messages
            charm.position(0, messagesRow);
            charm.erase("down");

            // Output the messages (array literal determines output order)
            var messageGroups = ["failures", "errors", "warnings", "deprecations"];
            messageGroups.forEach(function(groupName) {

               // Display the title (broken to avoid weird grunt formatting)
               charm.position(CHARM.Col.MessageTitle, messagesRow);
               charm.display("bright");
               charm.write(groupName.toUpperCase().substr(0, 1));
               charm.position(CHARM.Col.MessageTitle + 1, messagesRow++);
               charm.write(groupName.toUpperCase().substr(1));
               charm.display("reset");

               // Display the messages
               var messageLines = messages[groupName];
               messageLines.forEach(function(nextLine) {
                  charm.position(CHARM.Col.MessageTitle, messagesRow++);
                  var maxLineLength = this.terminalInfo.cols - 7; // 7 = ellipsis length (3) + side-margins (2x2)
                  if (nextLine.length > maxLineLength) {
                     nextLine = nextLine.slice(0, maxLineLength) + "...";
                  }
                  charm.write(nextLine + ANSI_CODES.Reset);
               }, this);

               // Line-break before next set of messages
               messagesRow++;
            }, this);

            // Update last-row state-variable
            this.state.charm.finalRow = messagesRow;

            // Reset cursor
            this.resetCursor();

         } catch (e) {
            this.exitWithError(e, "Error running redraw()");
         }
      },

      /**
       * Request a redraw (called to prevent it happening too often)
       *
       * @instance
       */
      requestRedraw: function() {
         if (!charm) {
            return;
         }
         var timeSinceLastRedraw = Date.now() - this.redrawLastRun,
            runNow = timeSinceLastRedraw > this.redrawIntervalMs,
            that = this;
         if (runNow) {
            this.redraw();
            this.redrawLastRun = Date.now();
         } else {
            clearTimeout(this.redrawTimeout);
            setTimeout(function() {
               that.redrawLastRun = Date.now();
               that.redraw();
            }, this.redrawIntervalMs - timeSinceLastRedraw);
         }
      },

      /**
       * Reset the cursor
       *
       * @instance
       */
      resetCursor: function() {
         charm.position(0, this.state.charm.finalRow);
         charm.cursor(true);
      },

      /**
       * Start the progress animation
       *
       * @instance
       */
      startProgressAnimation: function() {
         var spinnerChars = "-\\|/-\\|/".split(""),
            nextSpinnerIndex = 0,
            that = this;
         this.progressAnimInterval = setInterval(function() {

            // Hide the cursor
            charm.cursor(false);

            // Update progress info
            var ratioComplete = that.testCounts.run / that.testCounts.total,
               percentComplete = Math.floor(ratioComplete * 100) + "%",
               timeTaken = Date.now() - that.startTime,
               timeTakenMessage = that.msToHumanReadable(timeTaken),
               timeLeftMs = timeTaken * ((1 / ratioComplete) - 1),
               timeLeftMins = that.msToTimeLeft(timeLeftMs),
               timeLeftMessage = that.pad(timeLeftMins, CHARM.Col.StatusName - CHARM.Col.ProgressValue, " ", true);
            charm.position(CHARM.Col.ProgressValue, CHARM.Row.PercentComplete);
            charm.write(percentComplete);
            charm.position(CHARM.Col.ProgressValue, CHARM.Row.TimeTaken);
            charm.write(timeTakenMessage);
            charm.position(CHARM.Col.ProgressValue, CHARM.Row.TimeRemaining);
            if (ratioComplete > 0.1 || (timeTaken > 60000 && ratioComplete > 0.05)) {
               charm.write(timeLeftMessage);
            } else {
               charm.write("Calculating...");
            }

            // Update the progress bar
            var progressBarPartsComplete = Math.floor(ratioComplete * CHARM.ProgressBar.Length);
            charm.position(CHARM.Col.ProgressName, CHARM.Row.ProgressBar);
            for (var i = 0; i < progressBarPartsComplete; i++) {
               charm.write(CHARM.ProgressBar.CompleteChar);
            }
            that.state.charm.progressBarCurrPos = CHARM.Col.ProgressName + progressBarPartsComplete;

            // Update the animation
            charm.position(that.state.charm.progressBarCurrPos, CHARM.Row.ProgressBar);
            charm.display("bright");
            charm.write(spinnerChars[nextSpinnerIndex++ % spinnerChars.length]);
            charm.display("reset");

            // Put the cursor back
            that.resetCursor();

         }, this.progressAnimInterval);
      },

      /**
       * End the progress animation
       *
       * @instance
       */
      endProgressAnimation: function() {
         clearInterval(this.progressAnimInterval);
         charm.position(CHARM.Col.Default, CHARM.Row.ProgressBar);
         charm.display("bright");
         for (var i = 0; i < CHARM.ProgressBar.Length; i++) {
            charm.write(CHARM.ProgressBar.CompleteChar);
         }
         charm.display("reset");
         charm.write(" ");
         this.resetCursor();
      }
   };

   /**
    * The reporter class.
    *
    * @class
    * @constructor
    * @param {Object} config Config object from Intern
    */
   function Reporter( /*jshint unused:false*/ config) {
      // NOOP
   }

   /**
    * Augment the reporter (JSDoc for each function comes from Intern website)
    *
    * @type {Object}
    * @lends AikauConcurrentReporter/Reporter.prototype
    */
   Reporter.prototype = {

      /**
       * This method is called when code coverage data has been retrieved from an environment.
       * This will occur once per remote environment when all unit tests have completed, and
       * again any time a new page is loaded.
       * 
       * @instance
       * @param {string} sessionId Corresponds to a single remote environment. Will be null
       *                           for a local environment (e.g. in the Node.js client)
       * @param {Object} data The coverage data
       */
      coverage: function() {
         // Not currently used
      },

      /**
       * This method is called when a deprecated function is called.
       *
       * @instance
       * @param {string} name Name of the deprecated function
       * @param {string} [replacement] The replacement, if available
       * @param {string} [extra] Any extra information
       */
      deprecated: function(name, replacement, extra) {
         var msg = name + " has been deprecated and replaced by " + replacement;
         if (extra) {
            msg += " (" + extra + ")";
         }
         helper.logProblem(PROBLEM_TYPE.Deprecation, "General", msg);
      },

      /**
       * This method is called when an error occurs within the test system that is non-recoverable (e.g. a bug within Intern).
       *
       * @instance
       * @param {Error} error The error
       */
      fatalError: function(error) {
         helper.logProblem(PROBLEM_TYPE.Error, "Fatal", error);
      },

      /**
       * This method is called when a new test suite is created.
       *
       * @instance
       * @param {Object} suite The new suite
       */
      newSuite: function( /*jshint unused:false*/ suite) {
         helper.augmentSuite(suite);
      },

      /**
       * This method is called when a new test is created.
       *
       * @instance
       * @param {Object} test The new test
       */
      newTest: function( /*jshint unused:false*/ test) {
         helper.incrementCounter("total");
      },

      /**
       * This method is called once the built-in HTTP server has finished shutting down.
       *
       * @instance
       * @param {Object} config The proxy config
       */
      proxyEnd: function( /*jshint unused:false*/ config) {
         // Not currently used
      },

      /**
       * This method is called once the built-in HTTP server has finished starting up.
       *
       * @instance
       * @param {Object} config The proxy config
       */
      proxyStart: function( /*jshint unused:false*/ config) {
         // Not currently used
      },

      /**
       * This method is called when a reporter throws an error during execution of a command. If a reporter throws an error in response to a reporterError call, it will not be called again to avoid infinite recursion.
       *
       * @instance
       * @param {Object} reporter The reporter
       * @param {Error} error The error
       */
      reporterError: function( /*jshint unused:false*/ reporter, error) {
         helper.logProblem(PROBLEM_TYPE.Error, "Reporter", error);
      },

      /**
       * This method is called after all test suites have finished running and the test system is preparing to shut down.
       *
       * @instance
       * @param {Object} executor The test executor
       */
      runEnd: function( /*jshint unused:false*/ executor) {
         helper.endProgressAnimation();
         helper.outputFinalResults();
      },

      /**
       * This method is called after all tests have been registered and the test system is about to begin running tests.
       *
       * @instance
       * @param {Object} executor The test executor
       */
      runStart: function( /*jshint unused:false*/ executor) {
         var terminalInfo = executor.config.terminalInfo;
         helper.terminalInfo = {
            cols: terminalInfo.cols || 150,
            rows: terminalInfo.rows || 35
         };
         helper.startTime = Date.now();
         helper.initCharm();
         helper.requestRedraw();
         helper.startProgressAnimation();
      },

      /**
       * This method is called when a test suite has finished running.
       *
       * @instance
       * @param {Object} suite The ended suite
       */
      suiteEnd: function( /*jshint unused:false*/ suite) {
         // Not currently used
      },

      /**
       * This method is called when an error occurs within one of the suite's lifecycle
       * methods (setup, beforeEach, afterEach, or teardown), or when an error occurs
       * when a suite attempts to run a child test.
       *
       * @instance
       * @param {Object} suite The suite
       * @param {Error} error The error
       */
      suiteError: function(suite, error) {
         if (suite.name) {
            helper.logProblem(PROBLEM_TYPE.Error, suite.name, error);
         }
      },

      /**
       * This method is called when a test suite starts running.
       *
       * @instance
       * @param {Object} suite The suite
       */
      suiteStart: function( /*jshint unused:false*/ suite) {
         // Not currently used
      },

      /**
       * This method is called when a test has finished running.
       *
       * @instance
       * @param {Object} test The test
       */
      testEnd: function( /*jshint unused:false*/ test) {
         helper.incrementCounter("run");
      },

      /**
       * This method is called when a test has failed.
       *
       * @instance
       * @param {Object} test The test
       */
      testFail: function(test) {
         helper.logFailure(test);
      },

      /**
       * This method is called when a test has passed.
       *
       * @instance
       * @param {Object} test The test
       */
      testPass: function( /*jshint unused:false*/ test) {
         helper.incrementCounter("passed");
      },

      /**
       * This method is called when a test has been skipped.
       *
       * @instance
       * @param {Object} test The test
       */
      testSkip: function( /*jshint unused:false*/ test) {
         helper.incrementCounter("skipped");
      },

      /**
       * This method is called when a test starts running.
       *
       * @instance
       * @param {Object} test The test
       */
      testStart: function( /*jshint unused:false*/ test) {
         // Not currently used
      },

      /**
       * This method is called every time a tunnel download has progressed.
       *
       * @instance
       * @param {Object} tunnel The tunnel
       * @param {Object} progress The progress information
       * @param {number} progress.loaded Number of bytes received
       * @param {number} progress.total Number of bytes to download
       */
      tunnelDownloadProgress: function( /*jshint unused:false*/ tunnel, /*jshint unused:false*/ progress) {
         // Not currently used
      },

      /**
       * This method is called after the WebDriver server tunnel has shut down.
       *
       * @instance
       * @param {Object} tunnel The tunnel
       */
      tunnelEnd: function( /*jshint unused:false*/ tunnel) {
         // Not currently used
      },

      /**
       * This method is called immediately before the WebDriver server tunnel is started.
       *
       * @instance
       * @param {Object} tunnel The tunnel
       */
      tunnelStart: function( /*jshint unused:false*/ tunnel) {
         // Not currently used
      },

      /**
       * This method is called whenever the WebDriver server tunnel reports a status change.
       *
       * @instance
       * @param {Object} tunnel The tunnel
       * @param {string} status The status update
       */
      tunnelStatus: function( /*jshint unused:false*/ tunnel, /*jshint unused:false*/ status) {
         // Not currently used
      }
   };

   // Pass back the reporter object
   return Reporter;
});