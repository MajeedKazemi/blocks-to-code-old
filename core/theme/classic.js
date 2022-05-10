/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Classic theme.
 * Contains multi-coloured border to create shadow effect.
 */
'use strict';

goog.provide('Blockly.Themes.Classic');

goog.require('Blockly.Colours');
goog.require('Blockly.Theme');


// Temporary holding object.
Blockly.Themes.Classic = {};

Blockly.Themes.Classic.defaultBlockStyles = {
  "colour_blocks": {
    "colourPrimary": "20"
  },
  "field_blocks": {
    "colourPrimary": Blockly.Colours.textField,
    "colourSecondary": Blockly.Colours.textField,
    "colourTertiary": Blockly.Colours.textField,
  },
  "list_blocks": {
    "colourPrimary": "260"
  },
  "logic_blocks": {
    "colourPrimary": "210"
  },
  "loop_blocks": { //Control
    "colourPrimary": "#FFAB19",
    "colourSecondary": "#CF8B17"
  },
  "math_blocks": { //Operators
    "colourPrimary": "#40BF4A",
    "colourSecondary": "#389438"
  },
  "procedure_blocks": {
    "colourPrimary": "290"
  },
  "text_blocks": { // Looks
    "colourPrimary": "#9966FF",
    "colourSecondary": "#774DCB"
  },
  "sensing_blocks": { // Sensing
    "colourPrimary":"#4CBFE6",
    "colourSecondary":"#2E8EB8"
  },
  "variable_blocks": {
    "colourPrimary": "330"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "310"
  },
  "hat_blocks": { // Events
    "colourPrimary": "#FFD500",
    "colourSecondary": "#CC9900",
    "hat": "cap"
  }
};

Blockly.Themes.Classic.categoryStyles = {
  "colour_category": {
    "colour": "20"
  },
  "list_category": {
    "colour": "260"
  },
  "logic_category": {
    "colour": "210"
  },
  "loop_category": {
    "colour": "120"
  },
  "math_category": {
    "colour": "230"
  },
  "procedure_category": {
    "colour": "290"
  },
  "text_category": {
    "colour": "160"
  },
  "variable_category": {
    "colour": "330"
  },
  "variable_dynamic_category": {
    "colour": "310"
  }
};


Blockly.Themes.Classic =
    new Blockly.Theme('classic', Blockly.Themes.Classic.defaultBlockStyles,
        Blockly.Themes.Classic.categoryStyles);
