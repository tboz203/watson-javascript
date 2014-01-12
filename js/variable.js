/**
 * Watson Reboot Project
 * javascript/js/variable.js
 * Tommy Bozeman (tboz203)
 * 2014/01/11
 *
 * a sub-piece of the javascript puzzle
 */

define([], function() {
    var variableObject = function() {
        this.name = null;
        this.type = null;
        this.value = null;

        // ----------
        // making some functions for things that will have to be accessed from
        // angular
        // ----------

        this.isReady = function() {
            return (this.type != null && this.name != null);
        }

        this.displayString = function() {
            return this.name + ' = ' + this.value + '\n';
        }

        this.setName = function(n) {
            this.name = n;
        }

        this.setType = function(t) {
            this.type = t;
        }
    }

    return variableObject;
});
