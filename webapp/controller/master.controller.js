sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';
    return Controller.extend("Bible.controller.master",{
        onInit: function(){
            // var that = this;
            // var url = "https://" + "raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json"
            // jQuery.ajax({
            //     url: url,
            //     method: 'GET',
            //     dataType: 'json',
            //     success: function(data){
            //         var oModel = new sap.ui.model.json.JSONModel(data);
            //         that.getView().setModel(oModel,"bibleModel");
            //         console.log(data);
            //         console.log(oModel);
            //     },
            //     error: function(err){
            //         console.log('Something went wrong' + err);
            //     }
            // });
        },
        
        navToDetail: function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("detail");
        },
        selectChapter: function(event){
            var selected = event.getSource().getSelectedContextPaths()[0].split("/");
            // var model = this.getOwnerComponent().getModel("bibleModel");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                id: selected[1]
            });
        },
        onSearchBible: function(event){
            var value = event.getParameter("newValue");
            var filter = [];
            if(value){
                var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains,value);
                filter.push(oFilter);
            }
            var list = this.getView().byId("chapterList");
            var binding = list.getBinding("items");
            binding.filter(filter);
        }
    });
});