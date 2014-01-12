/**
 * Watson Reboot Project
 * javascript/js/program.js
 * Tommy Bozeman (tboz203)
 * 2014/01/11
 *
 * sub-piece of the javascript puzzle
 */

define([], function() {
    var stepModule = function() {
        this.assignStep = function() { // {{{
            // ok. this step, in reality, will need a parameter. however, we
            // can't take a 'parameter', because when this step is
            // instantiated, we don't know what that parameter will be yet, and
            // there's the possibility that it will be changed. so what we need
            // is some manner of reference to something in the variable table.
            this.variableObject = null;
            this.valueFunction = null;

            // every step is going to be effectively a linked list.
            // we'd handle this with inheritance, but right now i'd rather
            // duplicate code than try and mess with all that noise. maybe
            // later
            this.next = null;
            this.prev = null;

            // everything will have a function to determine if the entire
            // program is ready. this function won't have any assertions it in,
            // just things that need to be added by the user before execution
            // can happen.
            this.isReady = function() {
                return (this.variableObject != null && this.value != null);
            }

            // throughout this project, setters are mostly for use w/in angular
            // bindings

            this.setVariableObject = function(vo) {
                this.variableObject = vo;
            }

            this.setValueFunction = function(vf) {
                // okay, this needs to be able to handle things like other
                // variables and itself and math and whatnot. make it a
                // function? making it a function.
                this.valueFunction = vf;
            }

            // every step will have a `call` function. this is what happens
            // when we get to this step.
            this.call = function() {
                this.variableObject.value = this.valueFunction();
                return this.next;
            }
        } // }}}

        this.writeStep = function() { // {{{
            this.valueFunction = null;

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                return (valueFunction != null);
            }

            this.setValueFunction = function(vf) {
                this.valueFunction = vf;
            }

            this.call = function() {
                // TODO: print our value to some screen. we'll handle this later
                return this.next;
            }
        } // }}}

        this.writelnStep = function() { // {{{
            this.valueFunction = null;

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                return (valueFunction != null);
            }

            this.setValueFunction = function(vf) {
                this.valueFunction = vf;
            }

            this.call = function() {
                // TODO: print our value, plus a newline
            }
        } // }}}

        this.promptStep = function() { // {{{
            this.variableObject = null;
            this.type = null;
            this.promptString = null;
            this.defaultValue = null;

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                return (this.variableObject != null && this.type != null &&
                        this.promptString != null && this.defaultValue != null);
            }

            this.call = function() {
                // TODO: need to call up some manner of modal
                // will need to depend on that type, and display our prompt and
                // default value
                var value = 'lol, no idea';
                this.variableObject.value = value;
            }
        } // }}}

        this.whileStep = function() { // {{{
            this.conditionFunction = null;
            // this is going to be a reference to the end of the loop
            this.loopEnd = null;

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                return (this.conditionFunction != null);
            }

            this.call = function() {
                if (this.conditionFunction()) {
                    // if the condition is true, we procede to the body of the
                    // loop. the end of the loop will have a reference to us.
                    return this.next;
                } else {
                    // if the condition is false, go to the thing after the end
                    // of the loop
                    return this.loopEnd.next;
                }
            }
        } // }}}

        this.forInitStep = function() { // {{{
            // do we have to do something here? can the first part of a
            // for-loop statement be empty? does it have to be an assignment?
            //
            // right now we will assume all of these things will be true.

            this.variableObject = null;
            this.valueFunction = null;

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                return (this.variableObject != null && this.valueFunction != null);
                // we should probably really do some assertions at one point...
            }

            this.call = function() {
                this.variableObject.value = this.valueFunction();
                // we're going to automatically do the next step too, because
                // it's part of this one. at least, for now we are.
                return this.next.call();
            }
        } // }}}

        this.forConditionStep = function() { // {{{
            this.conditionFunction = null;
            this.loopEnd = null;

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                return (this.conditionFunction != null);
            }

            this.call = function() {
                if (this.conditionFunction()) {
                    return this.next;
                } else {
                    return this.loopEnd.next;
                }
            }
        } // }}}

        this.forIncrementStep = function() { // {{{
            // you know, i want this to be able to do more than just increment
            // a value. do we want to let users do that? it's easy enough to
            // create infinite loops already. why not.

            this.incrementFunction = null;

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                return (incrementFunction != null);
            }

            this.call = function() {
                this.incrementFunction();
                return this.next;
            }
        } // }}}

        this.loopEndStep = function() { // {{{
            // we don't actually do a whole lot here. this step is mostly just
            // for knowing where to go. if we get to this step, our job is to
            // jump back to the beginning
            this.loopStart = null;

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                // ... there's nothing the user has to do for this step. that's
                // a first, lol

                return true;
            }

            this.call = function() {
                return this.loopStart;
            }
        } // }}}

        /**
        * you know, if we do the entire step list/execution stack as a linked
        * list, then there's no need for the program.stepList anymore...
        */

        this.ifStep = function() { // {{{
            // i keep defering the logic to somewhere else. where is this going
            // to eventually happen? are we going to have some generic
            // 'conditionFunction' and 'valueFunction' generators?
            this.conditionFunction = null;
            this.elseStep = null;
            this.ifEndStep = null;

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                return (this.conditionFunction != null);
            }

            this.call = function() {
                if (this.conditionFunction()) {
                    return this.next;
                } else if (this.elseStep != null) {
                    // we're going to the one after the else step, because the else
                    // step simply marks the end of the 'if/then' block
                    return this.elseStep.next;
                } else {
                    // the end step will automatically go to the next step when
                    // it's called.
                    return this.ifEndStep;
                }
            }
        } // }}}

        this.elseStep = function() { // {{{
            // this step is like the loopEndStep in that it's mostly here as a
            // reference.
            this.ifEndStep = null;

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                return true;
            }

            this.call = function() {
                return this.ifEndStep;
            }
        } // }}}

        this.ifEndStep = function() { // {{{

            this.next = null;
            this.prev = null;

            this.isReady = function() {
                return true;
            }

            this.call = function() {
                return this.next.call();
            }
        } // }}}
    }

    return stepModule;
});

