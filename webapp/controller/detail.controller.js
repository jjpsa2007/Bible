sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';
    var controller;
    return Controller.extend("Bible.controller.detail",{
        onInit: function(){
            controller = this;
            // var pageItem = [{pageNo: 1},{pageNo: 2}, {pageNo: 3}];
            // var pageModel = new sap.ui.model.json.JSONModel(pageItem);
            // this.getView().setModel(pageModel,"item");
            // console.log(pageModel);
            this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this._oRouter.attachRouteMatched(this._handleRouteMatched, this);
        },
        _handleRouteMatched: function(oEvent){
            this.arug = oEvent.getParameter("arguments").id;
            var model = controller.getOwnerComponent().getModel("bibleModel");
            this.chapName = model.oData[this.arug].name;
            this.loadData(model.oData[this.arug].chapters.length);
        },
        loadData: function(val){
            this.getView().byId('detailPage').setTitle('Bible Chapter - ' + this.chapName + ' - Select verse')
            var items = [];
            for(var i=0; i<val; i++){
                items.push({pageNo: i+1});
            }
            var oModel = new sap.ui.model.json.JSONModel(items);
            oModel.setSizeLimit(200);
            this.getView().setModel(oModel,"item");
        },
        onPressChapter: function(eve){
            this.params = eve.getParameters().id.substring(29,32);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("readBible", {
                id: this.arug,
                chapter: this.params,
                name: this.chapName
            })
        }
    });
});