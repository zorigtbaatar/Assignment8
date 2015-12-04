/* 
 *Name: Zorigtbaatar Chuluundorj
 *Email: zorigtbaatar_chuluundorj@student.uml.edu
 *Undergraduate at Umass Lowell, currently taking GUI 1
 *Date: December, 4 2015
 *Assignment 8: This Javascript file is used to dynamically add a tab
 *and delete it if necessary. The table will be filled with values obtained from multyplying
 *inputs of an html form. This javascript function is used by Assignment8.html and validation.js
 */


"use strict";




$(document).ready(function () {
    $("div#tabs").tabs();
});

/**Creates a new tab 
 * tableNumbers are the values entered in the form
 * tableNumbers is used as the title of the tab
 * this function always returns false
 ***/
var createTab = function (tableNumbers) {

    var tabInfo = "Table" + tableNumbers[0] + "x" + tableNumbers[1]
            + "x" + tableNumbers[2] + "x" + tableNumbers[3],
            tabExists;

    tabExists = doesTabExist(tabInfo);

    if (tabExists === true) {
        return false;
    }


    /**Dynamically creating a tab head**/
    $("div#tabs ul").append(
            "<li><a href='#tab" + tabInfo
            + "'>"
            + tabInfo
            + "</a>"
            + "<button class='deleteButton' onclick='deleteTab(tab"
            + tabInfo
            + ")'"
            + ">Delete</button>"
            + "<input type='checkbox' class='checkDeleteTab'>"
            + "</li>"
            );

    /**Dunamically creating a tab content**/
    $("div#tabs").append(
            "<div id='tab" + tabInfo + "' class='tabMult'>"
            + "<table id="
            + tabInfo + ">"
            + "</table>"
            + "</div>"
            );

    /*Clear table of previous values*/
    /*Not required anymore*/
    clearTable(tabInfo);
    /*crate a table within a specific tab*/
    createTable(tableNumbers, tabInfo);

    /*refresh tabs to show changes*/
    $("div#tabs").tabs("refresh");
    return false;
};

/*Delete a tab*/
var deleteTab = function (tabObject) {
    var tabId = tabObject.id;
    $("a[href='#" + tabId + "']").closest("li").remove();
    $("#" + tabId).remove();
    $("div#tabs").tabs("refresh");
};

/*Checks whether a specific tab exists provided its ID*/
var doesTabExist = function (tabName) {
    var tabNameExists = false;

    $("div#tabs ul li a").each(function () {
        if ($(this).text() === tabName) {
            tabNameExists = true;
            return false;
        }
    });

    return tabNameExists;
};

/*Deletes all checked tabs*/
var deleteCheckedTabs = function() {
    $(":checked").parent().children("button.deleteButton").click();
    return true;
};