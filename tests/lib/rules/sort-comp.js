/**
 * @fileoverview Tests for sort-comp rule
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/sort-comp"),

	RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("sort-comp", rule, {

valid: [

		{ code: "Polymer({is: '', behaviors: [], properties: {type: Boolean, readOnly: true}, observers: [], listeners: {}, created: function() {}, ready: function() {}, attached: function() {}, detached: function() {}, attributeChanged: function() {}, _a: function() {}, _b: function() {}, a: function() {}, b: function() {}});" },
		{ code: "Polymer({is: '', behaviors: [], properties: {type: Boolean, readOnly: true}, observers: [], listeners: {}, _a: function() {}, _b: function() {}, a: function() {}, b: function() {},});" },
		{ code: "Polymer({is: '', behaviors: [], properties: {type: Boolean, readOnly: true}, observers: [], listeners: {}, a: function() {}, b: function() {},});" },
		{ code: "Polymer({is: '', behaviors: [], properties: {type: Boolean, readOnly: true}, observers: [], listeners: {}, created: function() {}, ready: function() {}, attached: function() {}, detached: function() {}, attributeChanged: function() {},});" },
		{ code: "Polymer({is: '', _a: function() {}, _b: function() {}, a: function() {}, b: function() {},});" }

	],
	invalid: [
		// Polymer-specific keys not in standard order
		{
			code: "Polymer({ behaviors: [], is: '', properties: {}, observers: [], listeners: {}, created: function() {}, ready: function() {}, attached: function() {}, detached: function() {}, attributeChanged: function() {}, _a: function() {}, _b: function() {}, a: function() {}, b: function() {}});",
			errors: ["Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'is' should be before 'behaviors'."]
		},
		// Polymer-specific keys not in standard order
		{
			code: "Polymer({ is: '', properties: {}, behaviors: [], observers: [], listeners: {}, created: function() {}, ready: function() {}, attached: function() {}, detached: function() {}, attributeChanged: function() {}, _a: function() {}, _b: function() {}, a: function() {}, b: function() {}});",
			errors: ["Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'behaviors' should be before 'properties'."]
		},
		// Private keys before public keys
		{
			code: "Polymer({ is: '', behaviors: [], properties: {}, observers: [], listeners: {}, created: function() {}, ready: function() {}, attached: function() {}, detached: function() {}, attributeChanged: function() {}, a: function() {}, _a: function() {}});",
			errors: ["Expected Polymer component keys to be in standard order and all other keys to be in ascending order. '_a' should be before 'a'."]
		},
		// Non-Polymer-specific keys not alphabetized
		{
			code: "Polymer({ is: '', behaviors: [], properties: {}, observers: [], listeners: {}, created: function() {}, ready: function() {}, attached: function() {}, detached: function() {}, attributeChanged: function() {}, b: function() {}, a: function() {}});",
			errors: ["Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'a' should be before 'b'."]
		},
		// Polymer lifecycle callbacks not in the order in which they're called
		{
			code: "Polymer({ is: '', behaviors: [], properties: {}, observers: [], listeners: {}, attached: function() {}, created: function() {}, ready: function() {}, detached: function() {}, attributeChanged: function() {}, _a: function() {}, _b: function() {}, a: function() {}, b: function() {}});",
			errors: ["Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'created' should be before 'attached'."]
		},

		// Polymer property configurations should have "type" as their first key
		{
			code: "Polymer({is: '', behaviors: [], properties: {readOnly: true, type: Boolean}, observers: [], listeners: {}, created: function() {}, ready: function() {}, attached: function() {}, detached: function() {}, attributeChanged: function() {}, _a: function() {}, _b: function() {}, a: function() {}, b: function() {}});",
			errors: ["Expected Polymer component keys to be in standard order and all other keys to be in ascending order. 'type' should be before 'readOnly'."]
		},

	]
});