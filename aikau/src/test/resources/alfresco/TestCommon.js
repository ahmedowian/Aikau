/*jshint unused:false,devel:true*/

/**
 * Copyright (C) 2005-2014 Alfresco Software Limited.
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
 * This provides the common capabilities for widget unit tests.
 *
 * @author Dave Draper
 */
define(["intern/dojo/node!fs",
        "intern/dojo/node!http",
        "intern/dojo/node!os",
        "intern/dojo/lang",
        "intern",
        "config/Config",
        "intern/dojo/Promise",
        "intern/dojo/node!leadfoot/helpers/pollUntil",
        "intern/chai!assert"],
        function(fs, http, os, lang, intern, Config, Promise, pollUntil, assert) {
   return {

      /**
       * Generates the URL to use for loading unit test WebScripts
       *
       * @instance
       * @param {string} webScriptURL The WebScript URL
       * @param {string} webScriptPrefix Optional prefix to the test page.
       */
      testWebScriptURL: function (webScriptURL, webScriptPrefix) {
         if (!Config.urls.unitTestAppBaseUrl) {
            var testServer = "http://" + this._getLocalIP() + ":8089";
            Config.urls.unitTestAppBaseUrl = testServer;
            // console.log("Using test-server URL: " + testServer);
         }
         var prefix = webScriptPrefix || "/tp/ws";
         return Config.urls.unitTestAppBaseUrl + "/aikau/page" + prefix + webScriptURL;
      },

      /**
       * This function can be called to post coverage results.
       *
       * @param {object} test The test object that allows access to the async() function
       * @param {object} browser The browser object to work on
       */
      alfPostCoverageResults: function(test, browser) {
         if(intern.args.doCoverage === "true")
         {
            var dfd = test.async(90000);
            var js = "var coverageData = {" +
               "name : name || ''," +
               "lines : $$_l.lines," +
               "runLines : $$_l.runLines," +
               "code : $$_l.code," +
               "allConditions : $$_l.allConditions," +
               "conditions : $$_l.conditions," +
               "allFunctions : $$_l.allFunctions," +
               "runFunctions : $$_l.runFunctions" +
            "};" +
            "return JSON.stringify(coverageData);";
            browser.execute(js)
               .then(function(data) {
                  console.log("Retrieved coverage data from browser...");
                  try {
                     var post_options = {
                        host: "localhost",
                        port: "8082",
                        path: "/node-coverage-store",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        }
                     };
                     console.log("Posting coverage data...");
                  
                     // Set up the request
                     var post_req = http.request(post_options, function(res) {
                        res.setEncoding("utf8");
                        res.on("data", function (data) {
                            console.log("Coverage data posted successfully");
                            dfd.resolve();
                        });
                     });
                     post_req.on("error", function(e) {
                        console.log("Coverage data post failed", e);
                        dfd.reject(e);
                     });
                     post_req.write(data);
                     post_req.end();
                  }
                  catch (e) {
                     console.log("An error occurred handling coverage data", e);
                  }
               });
         }
         else
         {
            return browser;
         }
      },

      /**
       * This function should be used to load the test pages.
       *
       * @instance
       * @param {object} browser The browser context to use
       * @param {string} testWebScriptURL The URL of the test WebScript
       * @param {string} testName The name of the test to run
       * @param {string} testWebScriptPrefix Optional prefix to use before the WebScript URL
       * @param {boolean} noPageLoadError Optional boolean to suppress page load failure errors
       */
      loadTestWebScript: function (browser, testWebScriptURL, testName, testWebScriptPrefix, noPageLoadError) {
         this._applyTimeouts(browser);
         this._maxWindow(browser);
         this._cancelModifierKeys(browser);
         var command = browser.get(this.testWebScriptURL(testWebScriptURL, testWebScriptPrefix))
            .then(pollUntil(
               function() {
                  /*jshint browser:true*/
                  var elements = document.getElementsByClassName("aikau-reveal");
                  return elements.length > 0 ? true : null;
               }, [], 10000, 1000))
            .then(
               function (element) {
               },
               function (error) {
                  // Failed to load, trying again...
                  browser.refresh();
               })
            .then(pollUntil(
               function() {
                  /*jshint browser:true*/
                  var elements = document.getElementsByClassName("aikau-reveal");
                  return elements.length > 0 ? true : null;
               }, [], 10000, 1000))
            .then(
               function (element) {
                  // Loaded successfully
               },
               function (error) {
                  // Failed to load after two attempts
                  if (noPageLoadError === true)
                  {
                     // Don't output an error message
                  }
                  else
                  {
                     assert.fail(null, null, "Test page could not be loaded");
                  }
               })
            .end();
         command.session.alfPostCoverageResults = function (newBrowser) { 
            return newBrowser; 
         };
         command.session.screenieIndex = 0;
         command.session.screenie = function(description) {
            var safeBrowserName = browser.environmentType.browserName.replace(/\W+/g, "_")
               .split("_")
               .map(function(namePart) {
                  return namePart.length > 1 ? namePart.substr(0, 1)
                     .toUpperCase() + namePart.substr(1)
                     .toLowerCase() : namePart.toUpperCase();
               })
               .join("_"),
               screenshotName = safeBrowserName + "-" + testName + "-" + command.session.screenieIndex++ + ".png",
               screenshotPath = "src/test/screenshots/" + screenshotName,
               infoId = "TestCommon__webpage-info",
               dfd = new Promise.Deferred();
            browser.executeAsync(function(id, desc, asyncComplete) {
                  var oldInfo = document.getElementById(id);
                  oldInfo && document.body.removeChild(oldInfo);
                  var urlDisplay = document.createElement("DIV");
                  urlDisplay.id = id;
                  urlDisplay.style.background = "#666";
                  urlDisplay.style.borderRadius = "0 0 0 5px";
                  urlDisplay.style.color = "#fff";
                  urlDisplay.style.fontFamily = "Open Sans Bold, sans-serif";
                  urlDisplay.style.fontSize = "12px";
                  urlDisplay.style.lineHeight = "18px";
                  urlDisplay.style.opacity = ".9";
                  urlDisplay.style.padding = "10px";
                  urlDisplay.style.position = "fixed";
                  urlDisplay.style.right = "0";
                  urlDisplay.style.top = "0";
                  urlDisplay.appendChild(document.createTextNode("Time: " + (new Date()).toISOString()));
                  urlDisplay.appendChild(document.createElement("BR"));
                  urlDisplay.appendChild(document.createTextNode("URL: " + location.href));
                  if (desc) {
                     urlDisplay.appendChild(document.createElement("BR"));
                     urlDisplay.appendChild(document.createTextNode("Description: \"" + desc + "\""));
                  }
                  document.body.appendChild(urlDisplay);
                  setTimeout(asyncComplete, 0);
               }, [infoId, description])
               .takeScreenshot()
               .then(function(screenshot) {
                  fs.writeFile(screenshotPath, screenshot.toString("binary"), "binary", function(err) {
                     if (err) {
                        dfd.reject(err);
                     } else {
                        dfd.resolve();
                     }
                  });
               });
            return dfd.promise;
         };
         command.session.clearLog = function() {
            return browser.findByCssSelector(".alfresco_logging_DebugLog__clear-button")
               .click();
         };
         command.session.getLastPublish = function(topicName) {
            var isGlobal,
               messageIfError,
               queryTimeout;
            Array.prototype.slice.call(arguments, 1).forEach(function(arg, index) {
               if (typeof arg === "boolean") {
                  isGlobal = arg;
               } else if (typeof arg === "number") {
                  queryTimeout = arg;
               } else {
                  messageIfError = arg;
               }
            });
            return this.getLogEntries({
               type: "PUBLISH",
               topic: topicName,
               pos: "last"
            }, isGlobal, messageIfError, queryTimeout);
         };
         command.session.getAllPublishes = function(topicName) {
            var isGlobal,
               messageIfError,
               queryTimeout;
            Array.prototype.slice.call(arguments, 1).forEach(function(arg) {
               if (typeof arg === "boolean") {
                  isGlobal = arg;
               } else if (typeof arg === "number") {
                  queryTimeout = arg;
               } else {
                  messageIfError = arg;
               }
            });
            return this.getLogEntries({
               type: "PUBLISH",
               topic: topicName,
               pos: "all"
            }, isGlobal, messageIfError, queryTimeout);
         };
         command.session.getLogEntries = function(filter, isGlobal, messageIfError, queryTimeout) {

            // Normalise arguments to single object
            var opts = lang.mixin({
               pos: "all",
               isGlobal: !!isGlobal,
               queryTimeout: queryTimeout || 500
            }, filter || {});

            // Build the selector
            var selectorBits = [".alfresco_logging_DebugLog__log__entry"];
            opts.type && selectorBits.push("[data-aikau-log-type=\"" + opts.type + "\"]"); // Type is "..."
            if (opts.isGlobal) {
               opts.topic && selectorBits.push("[data-aikau-log-topic=\"" + opts.topic + "\"]"); // Topic is "..."
            } else {
               opts.topic && selectorBits.push("[data-aikau-log-topic$=\"" + opts.topic + "\"]"); // Topic ends with "..."
            }
            opts.object && selectorBits.push("[data-aikau-log-object=\"" + opts.object + "\"]"); // Object is "..."
            if (opts.debug) {
               console.log("Log entry selector: \"" + selectorBits.join("") + "\"");
            }

            // Declare variable to hold the existing async timeout
            var existingTimeout;

            // Store the async timeout and then perform the search and reset the timeout
            return browser.getExecuteAsyncTimeout()
               .then(function(timeout) {
                  existingTimeout = timeout;
               })
               .setExecuteAsyncTimeout(opts.queryTimeout + 500)
               .executeAsync(function(entriesSelector, timeout, asyncComplete) {

                  // Store the start-time and start the interval
                  var before = Date.now(),
                     intervalPointer = setInterval(function() {

                        // Perform the search and grab the payloads
                        var entries = document.querySelectorAll(entriesSelector),
                           dataObjs = Array.prototype.map.call(entries, function(entry) {
                              return JSON.parse(entry.getAttribute("data-aikau-log-data"));
                           });

                        // Finish if we have data or if timeout exceeded
                        if (dataObjs.length || (Date.now() - before > timeout)) {
                           clearInterval(intervalPointer);
                           asyncComplete(dataObjs);
                        }

                     }, 50);

               }, [selectorBits.join(""), opts.queryTimeout])
               .then(function(entries) {

                  // Return value depends upon "pos" attribute
                  if (entries.length || opts.pos === "all") {

                     // Entries found, or empty collection acceptable
                     var returnValue = entries;
                     if (opts.pos === "first") {
                        returnValue = entries.pop();
                     } else if (opts.pos === "last") {
                        returnValue = entries.shift();
                     }
                     return returnValue;

                  } else {

                     // Construct the error message
                     var customMessage = messageIfError ? messageIfError + ": " : "",
                        entryType = opts.type || "PUBorSUB",
                        topic = opts.isGlobal ? opts.topic : "*" + opts.topic,
                        errorMessage = "Unable to find a " + entryType + " of " + topic + " (timeout=" + opts.queryTimeout + "ms)";

                     // Throw the error
                     throw new Error(customMessage + errorMessage);
                  }
               })
               .then(function(entries) {
                  browser.setExecuteAsyncTimeout(existingTimeout);
                  return entries;
               }, function(error) {
                  browser.setExecuteAsyncTimeout(existingTimeout);
                  throw error;
               });
         };

         return command;
      },

      /**
       * Set browser timeouts - refer to Config files
       *
       * @instance
       * @param {browser}
       */
      _applyTimeouts: function(browser) {
         browser.setTimeout("script", Config.timeout.base);
         browser.setTimeout("implicit", Config.timeout.base);
         browser.setFindTimeout(Config.timeout.find);
         browser.setPageLoadTimeout(Config.timeout.pageLoad);
         browser.setExecuteAsyncTimeout(Config.timeout.executeAsync);
      },

      /**
       * Get the local machine IP address (for us from other machines on the network). Specifically,
       * it will pass back the first IPv4, external IP address whose name begins with an "e".
       * 
       * [MJD 2015-03-30] Hopefully this will be robust enough (examples seen = en0,en1,eth0,ethernet0)
       *
       * @instance
       * @protected
       * @returns  {string} The local IP address
       */
      _getLocalIP: function() {
         var networkInterfaces = os.networkInterfaces(),
            validNameRegex = /^e[a-z]+[0-9]$/i,
            ipAddress = null;
         Object.keys(networkInterfaces).every(function(interfaceName) {
            if (validNameRegex.test(interfaceName)) {
               networkInterfaces[interfaceName].every(function(interface) {
                  if (interface.family === "IPv4" && !interface.internal) {
                     ipAddress = interface.address;
                     return false;
                  }
                  return true;
               });
            }
            if (ipAddress) {
               return false;
            }
            return true;
         });
         return ipAddress;
      },

      /**
       * Maximises the browser window if not already maximised
       *
       * @instance
       * @param {browser}
       */
      _maxWindow: function(browser) {
         // browser.maximizeWindow();
         browser.setWindowSize(null, 1024, 768);
      },

      /**
       * Cancels modifier keys
       *
       * @instance
       * @param {browser}
       */
      _cancelModifierKeys: function(browser) {
         browser.pressKeys(null);
      },

      /**
       * Internal function used to determine whether to use nth-child or last-child pseudo selector
       *
       * @instance
       * @param {number} expectedRow
       * @returns {string} The pseudo selector to use
       */
      _determineRow: function(expectedRow) {
         var row = "last-child";
         if (expectedRow !== "last")
         {
            row = "nth-child(" + expectedRow + ")";
         }
         return row;
      },

      /**
       * This generates a CSS selector that attempts to select a publication payload entry from the SubscriptionLog
       * widget. It's looking for a specific publish topic so could return multiple results.
       *
       * @instance
       * @param {string} publishTopic The topic published on
       * @param {string} key The key for the data
       * @param {string} value The value for the data
       * @returns {string} The CSS selector
       */
      pubDataCssSelector: function(publishTopic, key, value) {
         var selector = "" +
         "td[data-publish-topic='" + publishTopic + "'] + " +
         "td.sl-data > table > tr.sl-object-row > " +
         "td[data-pubsub-object-key=" + key + "] + " +
         "td[data-pubsub-object-value=\"" + value + "\"]";
         return selector;
      },

      pubDataRowsCssSelector: function(publishTopic, key) {
         var selector = "" +
            "tr.sl-row:last-child td[data-publish-topic='" + publishTopic + "'] + " +
            "td.sl-data tr.sl-object-row " +
            "td[data-pubsub-object-key=" + key + 
            "]+td > table > tr";
         return selector;
      },

      /**
       * This generates a CSS selector that attempts to select a publication payload entry from the SubscriptionLOg
       * widget where the payload contains a nested key/value pair that is the value of a key
       *
       * @instance
       * @param {string} publishTopic The topic published on
       * @param {string} key The key for the data
       * @param {string} nestedKey The key nested as the value for the data
       * @param {string} nestedValue The value of the nested data.
       * @returns {string} The CSS selector
       */
      pubDataNestedValueCssSelector: function(publishTopic, key, nestedKey, nestedValue) {
         var selector = "" +
            "td[data-publish-topic='" + publishTopic + "'] + " +
            "td.sl-data tr.sl-object-row " +
            "td[data-pubsub-object-key=" + key +
            "]+ td td[data-pubsub-object-key='" + nestedKey + "'] " +
            "+ td[data-pubsub-object-value='" + nestedValue + "']";
         return selector;
      },

      /**
       * This generates a CSS selector that attempts to select a publication payload entry from the SubscriptionLOg
       * widget where the payload contains a nested array that is the value of a key
       *
       * @instance
       * @param {string} publishTopic The topic published on
       * @param {string} key The key for the data
       * @param {string} arrayIndex The index of the nested array
       * @param {string} value The expected value of the nested data.
       * @returns {string} The CSS selector
       */
      pubDataNestedArrayValueCssSelector: function(publishTopic, key, arrayIndex, value) {
         var selector = "" +
            "td[data-publish-topic='" + publishTopic + "'] + " +
            "td.sl-data tr.sl-object-row " +
            "td[data-pubsub-object-key=" + key +
            "]+ td td[data-pubsub-object-value='" + value + "']:nth-child(" + arrayIndex + ")";
         return selector;
      },

      /**
       * This generates a CSS selector that attempts to select a publication payload entry from the SubscriptionLog
       * widget. It looks on a specific row of the table for an entry with a specific key/value pair. It's important to
       * remember that the first generated row will be 3 (!! THREE !!) because the index starts at 1 NOT 0 and the first
       * row is the header and the second row will be the publication indicating that the page has loaded.
       *
       * @instance
       * @param {number} expectedRow The row that the data is expected to be found in (can be set to "last")
       * @param {string} key The key for the data
       * @param {string} value The value for the data
       * @returns {string} The CSS selector
       */
      pubSubDataCssSelector: function(expectedRow, key, value) {
         var row = "";
         if (expectedRow === "any")
         {
            // Don't specify a row
         }
         else if (expectedRow === "last")
         {
            row = ":last-child";
         }
         else if (expectedRow !== "last")
         {
            row = ":nth-child(" + expectedRow + ")";
         }
         var selector = "" +
            ".alfresco-testing-SubscriptionLog tr.sl-row" + row +
            " td[data-pubsub-object-key=" + key +
            "]+td[data-pubsub-object-value='" + value + "']";
         return selector;
      },

      /**
       * Selects the data value element for a specific key in a specific row.
       * 
       * @instance
       * @param {number} expectedRow The row that the data is expected to be found in (can be set to "last")
       * @param {string} key The key for the data
       * @returns {string} The CSS selector
       */
      pubSubDataValueCssSelector: function(expectedRow, key) {
         var row = "";
         if (expectedRow === "any")
         {
            // Don't specify a row
         }
         else if (expectedRow === "last")
         {
            row = ":last-child";
         }
         else if (expectedRow !== "last")
         {
            row = ":nth-child(" + expectedRow + ")";
         }
         var selector = "" +
            ".alfresco-testing-SubscriptionLog tr.sl-row" + row +
            " td[data-pubsub-object-key=" + key +
            "]+td";
         return selector;
      },

      /**
       * This generates a CSS selector that gets the topic cell for a specific row
       *
       * @instance
       * @param {number} expectedRow The row to get the topic for
       */
      nthTopicSelector: function(expectedRow) {
         var row = this._determineRow(expectedRow);
         var selector = ".alfresco-testing-SubscriptionLog tr.sl-row:" + row + " td.sl-topic";
         // console.log("Selector: " + selector);
         return selector;
      },

      /**
       * This generates a CSS selector that attempts to find all elements that match a subscription topic entry from the
       * SubscriptionLog widget.
       *
       * @instance
       * @param {string} topic The topic to search
       * @param {string} type (optional) The topic action (e.g. "publish" or "subscribe") defaults to "subscribe"
       * @param {string} expectedRow (optional) A specific row to check for ("last" is an accepted option). Negative numbers trigger a backwards count.
       * @param {string} [matchType="exact"] Choose between a partial, prefix, suffix or exact match on topic.
       * @returns {string} The CSS selector
       */
      topicSelector: function(topic, type, expectedRow, matchType) {
         type = type || "subscribe";
         var row = "";
         if (expectedRow === "any")
         {
            // Don't specify a row
         }
         else if (expectedRow === "last")
         {
            row = ":last-child";
         }
         else if (expectedRow !== null && expectedRow !== undefined)
         {
            var rowSelector = "nth-child";
            if (expectedRow.indexOf("-") !== -1)
            {
               // If the expected row contains a negative number, count backwards. -1 is last, -2 is penultimate, etc.
               rowSelector = "nth-last-child";
               expectedRow = expectedRow.slice(1, expectedRow.length);
            }
            row = ":" + rowSelector + "(" + expectedRow + ")";
         }

         // Allow partial matching, match prefix or suffix.
         matchType = matchType || "exact";
         var comparison = "=";

         switch (matchType) {
            case "partial":
               comparison = "*=";
               break;
            case "prefix":
               comparison = "$=";
               break;
            case "suffix":
               comparison = "^=";
               break;
            default:
               comparison = "=";
         }

         var selector = ".alfresco-testing-SubscriptionLog tr.sl-row" + row + " td[data-" + type + "-topic" + comparison + topic + "]";
         // console.log("Topic selector: " + selector);
         return selector;
      },

      /**
       * This generates a CSS selector that attempts to find all elements that match a subscription topic entry from the
       * SubscriptionLog widget, and returns the associated data column.
       *
       * @instance
       * @param {string} topic The topic to search
       * @param {string} type (optional) The topic action (e.g. "publish" or "subscribe") defaults to "subscribe"
       * @param {string} expectedRow (optional) A specific row to check for ("last" is an accepted option). Negative numbers trigger a backwards count.
       * @param {string} [matchType="exact"] Choose between a partial, prefix, suffix or exact match on topic.
       * @returns {string} The CSS selector
       */
      topicDataSelector: function(topic, type, expectedRow, matchType) {
         return this.topicSelector(topic, type, expectedRow, matchType) + " + td.sl-data";
      },

      /**
       * This generates an xpath selector that matches the supplied value in the console log.
       *
       * @instance
       * @param {string} value The value to search for
       * @returns {string} The XPATH selector
       */
      consoleXpathSelector: function(value) {
         return "//table[@class=\"log\"]/tbody/tr[@class=\"cl-row\"]/td[contains(.,'" + value + "')]";
      },

      /**
       * This function provides common logging for tests
       *
       * @instance
       * @param {string} test The name of the test running
       * @param {string} desc The test description
       */
      log: function(test, desc) {
         console.log(">> " + test + ": " + desc);
      }
   };
});