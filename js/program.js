/**
 * Watson Reboot Project
 * javascript/js/program.js
 * Tommy Bozeman (tboz203)
 * 2014/01/11
 *
 * main piece of the javascript puzzle
 */

define([], function() {
    var programModule = function() {
        this.stepList = [];
        this.functionList = [];
        this.variableList = [];

        this.nextStep = null;
        this.timeoutHandle = null;
        this.insertPointer = 0;

        this.walk = function() {
            if (this.nextStep != null) {
                this.nextStep = this.nextStep.call();
            }
        }

        this.runSlow = function() {
            this.timeoutHandle = setInterval(function() {
                if (this.nextStep != null) {
                    this.walk();
                } else {
                    clearTimeout(this.timeoutHandle);
                }
            }, 250);
        }

        this.runQuick = function() {
            while (this.nextStep != null) {
                this.walk();
            }
        }
    }

    return programModule;
});
