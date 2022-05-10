/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.event');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');


// Blockly.defineBlocksWithJsonArray([
//   {
//     "type": "event_whenflagclicked",
//     "message0": "when flag clicked",
//     "style": "hat_blocks",
//     "nextStatement": null,
//     "extensions": []
//   }
// ]);


Blockly.Blocks['event_whenflagclicked'] = {
  /**
   * Block for print statement.
   * @this {Blockly.Block}
   */
  init: function() {
    this.jsonInit({
      // "type": "event_whenflagclicked",
      "message0": "when %1 clicked",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "green-flag.svg",
          "width": 24,
          "height": 24,
          "alt": "flag"
        }
      ],
      "style": "hat_blocks",
      "nextStatement": null,
      "extensions": []
    });
    // this.setEditable(false);
    // this.setMovable(false);
    // this.setDeletable(false);
  }
};
