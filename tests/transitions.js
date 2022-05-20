// eslint-disable-next-line no-unused-vars
function unlockExpandingIf() {
  Blockly.Blocks['controls_if'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
      Blockly.Extensions.apply('inline-svgs', this, false);
      this.elseifCount_ = 0;
      this.elseCount_ = 0;
      this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
      this.appendValueInput('IF0')
          .setCheck('Boolean')
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
      this.appendDummyInput('THEN0')
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
      this.appendStatementInput('DO0');
      this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
      this.updateShape_();
      this.setInputsInline(true);
      this.setStyle('loop_blocks');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION.call(this);
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
      if (!this.elseifCount_ && !this.elseCount_) {
        return null;
      }
      var container = Blockly.utils.xml.createElement('mutation');
      if (this.elseifCount_) {
        container.setAttribute('elseif', this.elseifCount_);
      }
      if (this.elseCount_) {
        container.setAttribute('else', 1);
      }
      return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
      if (!xmlElement) return;
      this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
      this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
      this.rebuildShape_();
    },
    /**
     * Store pointers to any connected child blocks.
     */
    storeConnections_: function(arg) {
      if (!arg) arg = 0;
      this.valueConnections_ = [null];
      this.statementConnections_ = [null];
      this.elseStatementConnection_ = null;
      for (var i = 1; i <= this.elseifCount_; i++) {
        if (arg != i) {
          this.valueConnections_.push(this.getInput('IF' + i).connection.targetConnection);
          this.statementConnections_.push(this.getInput('DO' + i).connection.targetConnection);
        }
      }
      if (this.getInput('ELSE')) this.elseStatementConnection_ = this.getInput('ELSE').connection.targetConnection;
    },
    /**
     * Restore pointers to any connected child blocks.
     */
    restoreConnections_: function() {
      for (var i = 1; i <= this.elseifCount_; i++) {
        Blockly.Mutator.reconnect(this.valueConnections_[i], this, 'IF' + i);
        Blockly.Mutator.reconnect(this.statementConnections_[i], this, 'DO' + i);
      }
      if (this.getInput('ELSE')) Blockly.Mutator.reconnect(this.elseStatementConnection_, this, 'ELSE');
    },
    addElse_: function() {
      this.storeConnections_();
      var update = function() {
        this.elseCount_++;
      };
      this.update_(update);
      this.restoreConnections_();
    },
    removeElse_: function() {
      this.storeConnections_();
      var update = function() {
        this.elseCount_--;
      };
      this.update_(update);
      this.restoreConnections_();
    },
    addElseIf_: function() {
      this.storeConnections_();
      var update = function() {
        this.elseifCount_++;
      };
      this.update_(update);
      this.restoreConnections_();
    },
    removeElseIf_: function(arg) {
      this.storeConnections_(arg);
      var update = function() {
        this.elseifCount_--;
      };
      this.update_(update);
      this.restoreConnections_();
    },
    update_: function(update) {
      Blockly.Events.setGroup(true);
      var block = this;
      var oldMutationDom = block.mutationToDom();
      var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
      // Switch off rendering while the source block is rebuilt.
      var savedRendered = block.rendered;
      block.rendered = false;
      // Update the mutation
      if (update) update.call(this);
      // Allow the source block to rebuild itself.
      this.updateShape_();
      // Restore rendering and show the changes.
      block.rendered = savedRendered;
      // Mutation may have added some elements that need initializing.
      block.initSvg();
      // Ensure that any bump is part of this mutation's event group.
      var group = Blockly.Events.getGroup();
      var newMutationDom = block.mutationToDom();
      var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
      if (oldMutation != newMutation) {
        Blockly.Events.fire(new Blockly.Events.BlockChange(
            block, 'mutation', null, oldMutation, newMutation));
        setTimeout(function() {
          Blockly.Events.setGroup(group);
          block.bumpNeighbours();
          Blockly.Events.setGroup(false);
        }, Blockly.BUMP_DELAY);
      }
      if (block.rendered) {
        block.render();
      }
      Blockly.Events.setGroup(false);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function() {
      var that = this;
      // Delete everything.
      if (this.getInput('ELSE')) {
        this.removeInput('ELSE');
        this.removeInput('ELSETITLE');
        this.removeInput('ELSEBUTTONS');
      }
      var i = 1;
      while (this.getInput('IF' + i)) {
        this.removeInput('IF' + i);
        this.removeInput('IFTITLE' + i);
        this.removeInput('IFBUTTONS' + i);
        this.removeInput('DO' + i);
        i++;
      }
      // Rebuild block.
      for (var i = 1; i <= this.elseifCount_; i++) {
        var removeElseIf = function(arg) {
          return function() {
            that.removeElseIf_(arg);
          };
        }(i);
        this.appendValueInput('IF' + i)
            .setCheck('Boolean')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
        this.appendDummyInput('IFTITLE' + i)
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.appendDummyInput('IFBUTTONS' + i)
            .appendField(
                new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, 24, 24, "*", removeElseIf, false))
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendStatementInput('DO' + i);
      }
      if (this.elseCount_) {
        this.appendDummyInput('ELSETITLE')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        this.appendDummyInput('ELSEBUTTONS')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
                new Blockly.FieldImage(this.REMOVE_IMAGE_DATAURI, 24, 24, "*", that.removeElse_.bind(that), false));
        this.appendStatementInput('ELSE');
      }
      if (this.getInput('ADDBUTTON')) this.removeInput('ADDBUTTON');
      var that = this;
      var addElseIf = function() {
        return function() {
          if (that.elseCount_ == 0) {
            that.addElse_();
          } else {
            if (!that.elseifCount_) that.elseifCount_ = 0;
            that.addElseIf_();
          }
        };
      }();
      this.appendDummyInput('ADDBUTTON')
          .appendField(
              new Blockly.FieldImage(this.ADD_IMAGE_DATAURI, 24, 24, "*", addElseIf, false));
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function() {
      var valueConnections = [null];
      var statementConnections = [null];
      var elseStatementConnection = null;
  
      if (this.getInput('ELSE')) {
        elseStatementConnection = this.getInput('ELSE').connection.targetConnection;
      }
      var i = 1;
      while (this.getInput('IF' + i)) {
        var inputIf = this.getInput('IF' + i);
        var inputDo = this.getInput('DO' + i);
        valueConnections.push(inputIf.connection.targetConnection);
        statementConnections.push(inputDo.connection.targetConnection);
        i++;
      }
      this.updateShape_();
      this.reconnectChildBlocks_(valueConnections, statementConnections,
          elseStatementConnection);
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
     * connectsions for if input.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
    reconnectChildBlocks_: function(valueConnections, statementConnections,
        elseStatementConnection) {
      for (var i = 1; i <= this.elseifCount_; i++) {
        Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
        Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
      }
      Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    }
  };
}

// eslint-disable-next-line no-unused-vars
function unlockPythonComparators() {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "logic_compare",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "A"
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options": [
            ["==", "EQ"],
            ["!=", "NEQ"],
            ["\u200F<", "LT"],
            ["\u200F<=", "LTE"],
            ["\u200F>", "GT"],
            ["\u200F>=", "GTE"]
          ]
        },
        {
          "type": "input_value",
          "name": "B"
        }
      ],
      "inputsInline": true,
      "output": "Boolean",
      "outputShape": Blockly.OUTPUT_SHAPE_HEXAGONAL,
      "style": "math_blocks",
      "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
      "extensions": ["logic_compare", "logic_op_tooltip"]
    },
  ]);
}

// eslint-disable-next-line no-unused-vars
function unlockWhile() {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "controls_whileUntil",
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "MODE",
          "options": [
            ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}", "WHILE"],
            // ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}", "UNTIL"]
          ]
        },
        {
          "type": "input_value",
          "name": "BOOL",
          "check": "Boolean"
        }
      ],
      "message1": " %1",
      "args1": [{
        "type": "input_statement",
        "name": "DO"
      }],
      "previousStatement": null,
      "nextStatement": null,
      "style": "loop_blocks",
      "helpUrl": "%{BKY_CONTROLS_WHILEUNTIL_HELPURL}",
      "extensions": ["controls_whileUntil_tooltip"]
    },
  ]);
}
