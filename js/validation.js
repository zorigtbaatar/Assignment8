/* 
 *Name: Zorigtbaatar Chuluundorj
 *Email: zorigtbaatar_chuluundorj@student.uml.edu
 *Undergraduate at Umass Lowell, currently taking GUI 1
 *Date: October, 20 2015
 *Assignment 8: This Javascript file is used to dynamically create a table
 *and update it. The table will be filled with values obtained from multyplying
 *inputs of an html form. This javascript function is used by Assignment8.html
 *Furthermore, this file uses functions from tabsjavascript.js to create tabs.
 *The tabs are where the table will be located.
 */


"use strict";

/* The below function uses jquery to validate the inputs entered
 * in the form. Furthermore, new methods are added to help validate
 * the form.
 */

$(function () {

    /*Test if the value is a whole number*/
    $.validator.addMethod('wholeNumber', function (value) {
        if (value % 1 === 0) {
            return true;
        }
        else {
            return false;
        }
    }, 'Please enter an integer');

    /*Tests if the value is more than the parameter provided*/
    $.validator.addMethod('moreThan', function (value, element, param) {
        var comp = $(param).val();
        if (parseInt(value) >= parseInt(comp)) {
            return true;
        }
        else {
            return false;
        }
    }, '');

    /*Updates the state of the form if the form has no invalid inputs*/
    $.validator.addMethod('update', function (value, element, param) {
        $(param).valid();
        return true;
    }, '');


    /*Validates each of the forms inputs*/
    $("#inputNumbers").validate({
        rules: {
            firstColumn: {
                required: true,
                number: true,
                wholeNumber: true,
                range: [-9999, 9999],
                update: '#lastColumn'
            },
            lastColumn: {
                required: true,
                number: true,
                wholeNumber: true,
                range: [-9999, 9999],
                moreThan: '#firstColumn'
            },
            firstRow: {
                required: true,
                number: true,
                wholeNumber: true,
                range: [-9999, 9999],
                update: '#lastRow'
            },
            lastRow: {
                required: true,
                number: true,
                wholeNumber: true,
                range: [-9999, 9999],
                moreThan: '#firstRow'
            }
        },
        messages: {
            lastColumn: {
                moreThan: 'This value cannot be less than the value of First Column'
            },
            lastRow: {
                moreThan: 'This value cannot be less than the value of First Row'
            }
        },
        errorElement: "div"
    });
});

/*This function calls a function to validate
 *the inputs entered into form with id inputNumbers
 *and calls functions to update the table with id multiplicationTable
 *with values obtained from multypling the input numbers.
 *
 *returns: This function always returns false
 **/

var validate = function () {
    var formId = "inputNumbers", /* id of the form containing input values*/
            form = document.getElementById(formId),
            counter,
            lengthOfArray,
            tableNumbers = [];

    /*Call jquery validation to validate the form*/
    /*If the form does not pass the tests, a table will not be printed*/
    if ($("#inputNumbers").valid() === false) {
        return false;
    }

    /*If the form passed the tests, a table will be printed with update values*/
    else {
        /*This function copies the inputs of the form into an array of numbers called tableNumbers*/
        for (counter = 0, lengthOfArray = form.length; counter < lengthOfArray; counter++) {
            tableNumbers[counter] = Number(form.elements[counter].value);
        }

        /*The inputs of the form passed all the validation tests and will be printed in a multiplication table*/
        /*Clear the Table of previous value*/
        createTab(tableNumbers);
        /*Print multiplication table*/
        return false;
    }
};

/*This function erases all the elements of a table*
 * 
 * tableId: is the id of the table that needs to be erased
 * returns: this function does not return any values.
 */
var clearTable = function (tableId) {
    var table = document.getElementById(tableId);
    for (; table.rows.length > 0; ) {
        table.deleteRow(0);
    }
};

/*This function creates a multiplacation table using the inputs entered in the form
 *
 *tableNumbers: The inputs of the form are four numbers and they are in tableNumbers which is an
 *array of numbers
 *tableId: Provides the Id of the table where the multiplied values will go
 *returns: This function does not return anything
 */
var createTable = function (tableNumbers, tableId) {
    var firstColumn = tableNumbers[0],
            lastColumn = tableNumbers[1],
            firstRow = tableNumbers[2],
            lastRow = tableNumbers[3],
            rowCounter,
            columnCounter,
            currentRow,
            newTableElement,
            table = document.getElementById(tableId);

    /*Initiliazing top left corner element*/
    currentRow = table.insertRow(0);
    newTableElement = currentRow.insertCell(0);
    newTableElement.innerHTML = 0;


    /*Initiliazing the first row elements*/
    for (columnCounter = 1, firstColumn = tableNumbers[0]; firstColumn <= lastColumn; firstColumn++, columnCounter++) {
        newTableElement = currentRow.insertCell(columnCounter);
        newTableElement.innerHTML = firstColumn;
    }
    /*Initiliazing the first column elements*/
    for (rowCounter = 1, firstRow = tableNumbers[2]; firstRow <= lastRow; firstRow++, rowCounter++) {
        currentRow = table.insertRow(rowCounter);
        newTableElement = currentRow.insertCell(0);
        newTableElement.innerHTML = firstRow;
        /*Filling out the body of the table*/
        for (columnCounter = 1, firstColumn = tableNumbers[0]; firstColumn <= lastColumn; firstColumn++, columnCounter++) {
            newTableElement = currentRow.insertCell(columnCounter);
            newTableElement.innerHTML = (firstRow * firstColumn);
        }
    }
};