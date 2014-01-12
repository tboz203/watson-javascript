/**
 * Watson Reboot Project
 * javascript/js/function.js
 * Tommy Bozeman (tboz203)
 * 2014/01/12
 *
 * a sub-piece of the javascript puzzle
 */

define([], function() {
    var functionModule = function() {
        // because it seems that this will be a linked list...
        this.head = null;
        this.tail = null;
        this.curr = null;

        // how will this piece communicate with the calling function? or with
        // sub-functions? hmm...
        // we'll need to be able to handle parameters and return values going
        // both directions. 
