sap.ui.define([
    'sap/ui/core/mvc/Controller',
], function(Controller) {
    'use strict';
    return Controller.extend("Bible.controller.app",{
        pressIt: function(){
            alert("testing");
        }
    });
    
});