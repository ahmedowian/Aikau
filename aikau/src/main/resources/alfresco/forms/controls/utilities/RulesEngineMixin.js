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
 * This mixin provides the ability to evaluate form control rules that define whether or not a given attribute
 * is in a positive or negative state based on the changing values of other fields within the same form. The contents
 * of this module were originally part of the [BaseFormControl]{@link module:alfresco/forms/controls/BaseFormControl}
 * (into which this module is now mixed in) but was abstracted in order for the rules engine to be easily applied to
 * other form modules (in particular the ability to support banner display with [Forms]{@link module:alfresco/forms/Form}).
 * 
 * @module alfresco/forms/controls/utilities/RulesEngineMixin
 * @since 1.0.32
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array"], 
        function(declare, lang, array) {

   return declare([], {

      /**
       * This holds all the data about rules that need to be processed for the various attributes of the widget. By default this
       * will handle rules for visibility, requirement and disability.
       *
       * @instance
       * @type {object}
       * @default
       */
      _rulesEngineData: null,

      /**
       * <p>This function is reused to process the configuration for the visibility, disablement and requirement attributes of the form
       * control. The format for the rules is as follows:</p>
       * <p><pre>"visibilityConfig": {
       *    "initialValue": true,
       *    "rules": [
       *       {
       *          "targetId": "fieldId1",
       *          "is": ["a", "b", "c"],
       *          "isNot": ["d", "e", "f"]
       *       }
       *    ],
       *    "callbacks": {
       *          "id": "functionA"
       *    }
       * }</pre></p>
       * <p>This structure applied to the following attributes:<ul>
       * <li>[visibilityConfig]{@link module:alfresco/forms/controls/BaseFormControl#visibilityConfig}</li>
       * <li>[requirementConfig]{@link module:alfresco/forms/controls/BaseFormControl#requirementConfig}</li>
       * <li>[disablementConfig]{@link module:alfresco/forms/controls/BaseFormControl#disablementConfig}</li></ul></p>
       *
       * @mmethod processConfig
       * @param {string} attribute
       * @param {object} config
       */
      processConfig: function alfresco_forms_controls_BaseFormControl__processConfig(attribute, config) {
         if (config)
         {
            // Set the initial value...
            if (typeof config.initialValue !== "undefined")
            {
               this[attribute](config.initialValue);
            }

            // Process the rule subscriptions...
            if (typeof config.rules !== "undefined")
            {
               this.processRulesConfig(attribute, config.rules);
            }
            else
            {
               // Debug output when instantiation data is incorrect. Only log when some data is defined but isn't an object.
               // There's no point in logging messages for unsupplied data - just incorrectly supplied data.
               this.alfLog("log", "The rules configuration for attribute '" + attribute + "' for property '" + this.fieldId + "' was not an Object");
            }

            // Process the callback subscriptions...
            if (typeof config.callbacks === "object")
            {
               this._processCallbacksConfig(attribute, config.callbacks);
            }
            else if (typeof config.callbacks !== "undefined")
            {
               // Debug output when instantiation data is incorrect. Only log when some data is defined but isn't an object.
               // There's no point in logging messages for unsupplied data - just incorrectly supplied data.
               this.alfLog("log", "The callback configuration for attribute '" + attribute + "' for property '" + this.fieldId + "' was not an Object");
            }
         }
      },

      /**
       * This function sets up the subscriptions for processing rules relating to attributes.
       *
       * @instance
       * @param {string} attribute E.g. visibility, editability, requirement
       * @param {object} rules
       */
      processRulesConfig: function alfresco_forms_controls_utilities_RulesEngineMixin__processRulesConfig(attribute, rules) {
         // TODO: Implement rules for handling changes in validity (each type could have rule type of "isValid"
         //       and should subscribe to changes in validity. The reason for this would be to allow changes
         //       on validity. Validity may change asynchronously from value as it could be performed via a
         //       remote request.

         // Set up the data structure that will be required for processing the rules for the target property changes...
         if (!this._rulesEngineData)
         {
            // Ensure that the rulesEngineData object has been created
            this._rulesEngineData = {};
         }
         if (typeof this._rulesEngineData[attribute] === "undefined")
         {
            // Ensure that the rulesEngineData object has specific information about the form control attribute...
            this._rulesEngineData[attribute] = {};
         }
         array.forEach(rules, lang.hitch(this, this.processRule, attribute));
      },

      /**
       * This function processes an individual attribute rule (e.g. to change the visibility, disablement or
       * requirement status).
       *
       * @instance
       * @param {string} attribute The attribute that the rule effects (e.g. visibility)
       * @param {object} rule The rule to process.
       * @param {number} index The index of the rule.
       */
      processRule: function alfresco_forms_controls_utilities_RulesEngineMixin__processRule(attribute, rule, /*jshint unused:false*/ index) {
         if (rule.targetId)
         {
            if (typeof this._rulesEngineData[attribute][rule.targetId] === "undefined")
            {
               this._rulesEngineData[attribute][rule.targetId] = {};
            }

            // Set the rules to be processed for the current rule...
            // NOTE: Previous rules can be potentically overridden here...
            this._rulesEngineData[attribute][rule.targetId].rules = rule;

            // Subscribe to changes in the relevant property...
            this.alfSubscribe("_valueChangeOf_" + rule.targetId, lang.hitch(this, this.evaluateRules, attribute));
         }
         else
         {
            this.alfLog("warn", "The following rule is missing a 'name' attribute", rule, this);
         }
      },

      /**
       * This function evaluates all the rules configured for a particular attribute (e.g. "visibility") for the
       * current form control. It is triggered whenever one of the other fields configured as part of a rule changes,
       * but ALL the rules are evaluated for that attribute.
       *
       * @instance
       * @param {string} attribute
       * @param {object} payload The publication posted on the topic that triggered the rule
       */
      evaluateRules: function alfresco_forms_controls_utilities_RulesEngineMixin__evaluateRules(attribute, payload) {
         this.alfLog("log", "RULES EVALUATION('" + attribute + "'): Field '" + this.fieldId + "'");

         // Set the current value that triggered the evaluation of rules...
         this._rulesEngineData[attribute][payload.fieldId].currentValue = payload.value;

         // Make the assumption that the current status is true (i.e. the rule is PASSED). This is done so that
         // we can AND the value against the result of each iteration (we can also stop processing the rules once
         // the rule is negated...
         var status = true;

         // The exception to the above comment is when NO rules are configured - in that case we leave the status
         // as false by default
         var hasProps = false;

         // jshint forin:false
         for (var key in this._rulesEngineData[attribute])
         {
            // Need this assignment to "prove" there are properties (this approach is used for compatibility with older
            // browsers)...
            hasProps = true;

            // Keep processing rules until the rule status is negated...
            if (status)
            {
               var currentValue = this._rulesEngineData[attribute][key].currentValue;
               var validValues = this._rulesEngineData[attribute][key].rules.is;
               var invalidValues = this._rulesEngineData[attribute][key].rules.isNot;

               // Assume that its NOT valid value (we'll only do the actual test if its not set to an INVALID value)...
               // UNLESS there are no valid values specified (in which case any value is valid apart form those in the invalid list)
               var isValidValue = typeof validValues === "undefined" || validValues.length === 0;

               // Initialise the invalid value to be false if no invalid values have been declared (and only check values if defined)...
               var isInvalidValue = typeof invalidValues !== "undefined" && invalidValues.length > 0;
               if (isInvalidValue)
               {
                  // Check to see if the current value is set to an invalid value (i.e. a value that negates the rule)
                  isInvalidValue = array.some(invalidValues, lang.hitch(this, this.ruleValueComparator, currentValue));
               }

               // Check to see if the current value is set to a valid value...
               if (!isInvalidValue && typeof validValues !== "undefined" && validValues.length > 0)
               {
                  isValidValue = array.some(validValues, lang.hitch(this, this.ruleValueComparator, currentValue));
               }

               // The overall status is true (i.e. the rule is still passing) if the current status is true and the
               // current value IS set to a valid value and NOT set to an invalid value
               status = status && isValidValue && !isInvalidValue;
            }
         }

         // This last AND ensures that we negate the rule if there were no rules to process...
         status = status && hasProps;
         this[attribute](status);
         return status;
      },

      /**
       * The default comparator function used for comparing a rule value against the actual value of a field.
       * Note that the target value is expected to be an object from the arrays (assigned to the  "is" or "isNot"
       * attribute) and by default the "value" attribute of those objects are compared with the current value
       * of the field. It is possible to override this comparator to allow a more complex comparison operation.
       *
       * It's important to note that values are compared as strings. This is done to ensure that booleans can
       * be compared. This is important as it should be possible to construct rules dynamically and values
       * should be entered as text.
       *
       * @instance
       * @param {object} currentValue The value currently
       * @param {object} targetValue The value to compare against
       */
      ruleValueComparator: function alfresco_forms_controls_utilities_RulesEngineMixin__ruleValueComparator(currentValue, targetValue) {
         this.alfLog("log", "Comparing", currentValue, targetValue);

         // If both values aren't null then compare the .toString() output, if one of them is null
         // then it doesn't really matter whether or not we get the string output for the value or not
         if (currentValue && targetValue && targetValue.value)
         {
            return currentValue.toString() === targetValue.value.toString();
         }
         else
         {
            // return currentValue == targetValue.value; // Commented out because I think this is wrong (shouldn't have .value)
            return currentValue === targetValue;
         }
      },

      /**
       * The payload of property value changing publications should have the following attributes...
       *    1) The name of the property that has changed ("name")
       *    2) The old value of the property that has changed ("oldValue")
       *    3) The new value of the property that has changed ("value")
       *  Callbacks should take the following arguments (nameOfChangedProperty, oldValue, newValue, callingObject, attribute)
       *
       *  @instance
       *  @param {string} attribute
       *  @param {object} callbacks
       */
      _processCallbacksConfig: function alfresco_forms_controls_utilities_RulesEngineMixin___processCallbacksConfig(attribute, callbacks) {
         /*jshint loopfunc:true*/
         // TODO Should refactor this to both avoid the loop functions and also reduce duplication
         var _this = this;
         for (var key in callbacks) {
            if (typeof callbacks[key] === "function")
            {
               // Subscribe using the supplied function (this will only be possible when form controls are created
               // dynamically from widgets (rather than in configuration)...
               _this.alfSubscribe("_valueChangeOf_" + key, function(payload) {
                  var status = callbacks[payload.name](payload.name, payload.oldValue, payload.value, _this, attribute);
                  _this[attribute](status);
               });
            }
            else if (typeof callbacks[key] === "string" &&
                     typeof _this[callbacks[key]] === "function")
            {
               // Subscribe using a String reference to a function defined in this widget...
               _this.alfSubscribe(_this.pubSubScope + "_valueChangeOf_" + key, function(payload) {
                  var status = _this[callbacks[payload.name]](payload.name, payload.oldValue, payload.value, _this, attribute);
                  _this[attribute](status);
               });
            }
            else
            {
               // Log a message if the callback supplied isn't actually a function...
               this.alfLog("log", "The callback for property '" + _this.name + "' for handling changes to property '" + key + "' was not a function or was not a String that references a local function");
            }
         }
      }
   });
});