sap.ui.define([
    'sap/ui/core/UIComponent',
    'sap/ui/Device',
    "Bible/model/models"
], function(UIComponent, Device, models) {
    'use strict';
    return UIComponent.extend("Bible.Component",{
        metadata: {
            "manifest": "json"
        },
        init: function(){

            var that = this;
            var url = "https://" + "raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json";
            jQuery.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data){
                    var oModel = new sap.ui.model.json.JSONModel(data);
                    that.setModel(oModel,"bibleModel");
                },
                error: function(err){
                    console.log('Something went wrong' + err);
                }
            });
            
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(models.createDeviceModel(),"device");
            this.getRouter().initialize();
        }
    });
});