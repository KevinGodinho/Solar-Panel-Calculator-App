/*jslint browser:true */
"use strict";


// wrap everything up in a function, setup parameter to take the element id of the desired element to be accessed
function addMonths(elem) {

    // declaring variables
    var annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;

    // target the inputs within the element that has the id of mpc
    var months = document.getElementById(elem).getElementsByTagName('input');

    // loop through the values of the inputs
    for(i = 0; i <months.length; i++){
        x = Number(months[i].value); // translate value type from string to number. you can do this vice-versa with String()
        annualUseKw += x; // this adds each index of the array to each other to get the total
    
    } // end loop

    // finding annual usage by taking yearly total and dividing by days in a year
    dailyUseKw = annualUseKw / 365; 

    return dailyUseKw; // have the function returned the desired calculation, which is the daily usage of kw. That is the purpose of this particular function with the parameter mpc as the element id we are targetting

} // end function



// wrap everything up in a function
function sunHours() {

    var hrs; // hours of sun
    var theZone = document.forms.solarForm.zone.selectedIndex;
    theZone += 1; // because selectedIndex returns an array and array indexes start at 0, we are adding 1 to theZone's output so that it is a 1 for 1 number match with the numbers for zone in the dropdown

    // convert zone numbers into hours of sunshine in zone
    switch (theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default:
            hrs = 0;
        
    } // end switch

    return hrs; // you want to return what this function is intended to produce so that you can call it later and attach that call into another function that is linked to a button
    
} // end function



// get the value and the name of the panel choise the user selects via the dropdown
function calculatePanel() {

    var userChoice = document.forms.solarForm.panel.selectedIndex; // target panel choice by index
    var panelOptions = document.forms.solarForm.panel.options; // target panel choice by dropdown options

    // target the value and text of the dropdown selected
    var power = panelOptions[userChoice].value; // this uses the targeted index that we have stored in userChoice variable to ouput the value of the selected dropdown according to index, which is then stored in the power variable
    var name = panelOptions[userChoice].text; // this does the same as power, but outputs the content of the dropdown as opposed to its value
    var x = [power, name];

    return x;
    
} // end function



// place previous 2 functions into a function that can call both of them on an event, button click. Also, find out minimum Kw needs, factor in stormy weather to get real needs, and then convert from kw to w for solar pannels
function calculateSolar() {
    
    var dailyUseKw = addMonths('mpc'); // assign first function to a variable
//    console.log(dailyUseKw);
    
    var sunHoursPerDay = sunHours(); // assign second function to a variable
//    console.log(sunHoursPerDay);
    
    var minKwNeeds = dailyUseKw / sunHoursPerDay;
//    console.log(minKwNeeds);
    
    var realKwNeeds = minKwNeeds * 1.25; // increase the minimum need due to factoring in rainy days with less sun, add 25%, do this by multiplying by 1.25
//    console.log(realKwNeeds);
    
    var realWattNeeds = realKwNeeds * 1000; // energy usage is interpreted in Kw while solar pannels are Watts. This converts Kw to W.
//    console.log(realWattNeeds);
    
    // this grabs and ouputs the value and name of the panel choice
    var panelInfo = calculatePanel();
    var panelOutput = panelInfo[0];
    var panelName = panelInfo[1];
//    console.log(panelOutput);
//    console.log(panelName);
    
    var panelsNeeded = Math.ceil(realWattNeeds / panelOutput); // wrap the calculation in Math.ceil() to round up because no one is buying a fraction of a panel, needs to be a whole number
//    console.log(panelsNeeded);
    
    
    // display the calculations to the screen. Math.round() rounds down
    var feedback = "";
    feedback += '<p>Based on your average daily use of ' + Math.round(dailyUseKw) + ' kWh, you will need to purchase ' + panelsNeeded + ' ' + panelName + ' solar panels to offset 100% of your electricity bill.</p>';
    feedback += '<h1>Additional Details</h1>';
    feedback += '<p>Your average daily electricity consumption: ' + Math.round(dailyUseKw) + 'Kwh per day.</p>';
    feedback += '<p>Average sunshine hours per day: ' + sunHoursPerDay + ' hours</p>';
    feedback += '<p>Realistic watts needed per hour: ' + Math.round(realWattNeeds) + ' watts/hour.</p>';
    feedback += '<p>The ' + panelName + ' panel you selected generates about ' + panelOutput + ' watts per hour.</p>';
    
    document.getElementById('feedback').innerHTML = feedback;

} // end function

























