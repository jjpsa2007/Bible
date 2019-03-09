sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History'
], function(Controller, History) {
    'use strict';
    return Controller.extend("Bible.controller.readBible",{
        onInit: function(){
            this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this._oRouter.attachRouteMatched(this._handelRouteMatched, this);
        },
        _handelRouteMatched: function(event){
            // alert("The Read Bible view got triggered");
            debugger
            this.paramsChap = event.getParameter("arguments").name;
            this.chap = event.getParameter("arguments").chapter;
            this.id = event.getParameter('arguments').id;
            this.getView().byId("readBiblePage").setTitle(this.paramsChap + "-" + ((parseInt(this.chap))+1));
            var readModel = this.getOwnerComponent().getModel('bibleModel');
            var data = readModel.oData[this.id].chapters[this.chap];
            if(data){
            var ver = [];
            data.forEach(function(verse, index){
                ver.push({verse: (index+1) + ': ' + verse});
            })
            var readBibleModel = new sap.ui.model.json.JSONModel(ver);
            readBibleModel.setSizeLimit(200);
            this.getView().setModel(readBibleModel, "readBibleModel");
        }
        },
        onBackPress: function(){
            var history = History.getInstance();
            var preHash = history.getPreviousHash();
            if(preHash !== undefined){
                window.history.go(-1);
            }else{
                debugger;
                var router = sap.ui.core.UIComponent.getRouterFor(this);
                router.navTo("detail", {
                    id: 0
                });
            }
        }

    });
});