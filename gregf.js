var span = document.getElementsByClassName("close")[0];
//Click to expand and close calc modals
$(".jsEx").click(function() {
  $(".modal").removeClass('inactive');
});
$(".jsEx2").click(function() {
  $(".modal2").removeClass('inactive');
});
// $( ".close" ).click(function() {
//   $(".modal").addClass('inactive');
// });
// $( ".close" ).click(function() {
//   $(".modal2").addClass('inactive');
// });

//c1v1=c2v2 calculator
$(".calculate").click(function() {
  //Get values from calc boxes
  var c1v1c2v2 = [
    $(".c1").val(),
    $(".v1").val(),
    $(".c2").val(),
    $(".v2").val()
  ]
  //Which box is blank and what is the formula for that box
  switch (!!c1v1c2v2) {
    case c1v1c2v2[0] !=="" && c1v1c2v2[1] !=="" && c1v1c2v2[2] !=="":
      var result = $(".c1").val() * $(".v1").val() / $(".c2").val();
      $(".v2").val(result);
      break;
    case c1v1c2v2[0] !=="" && c1v1c2v2[1] !=="" && c1v1c2v2[3] !=="":
      var result = $(".c1").val() * $(".v1").val() / $(".v2").val();
      $(".c2").val(result);
      break;
    case c1v1c2v2[0] !=="" && c1v1c2v2[2] !=="" && c1v1c2v2[3] !=="":
      var result = $(".c2").val() * $(".v2").val() / $(".c1").val();
      $(".v1").val(result);
      break;
    case c1v1c2v2[1] !=="" && c1v1c2v2[2] !=="" && c1v1c2v2[3] !=="":
      var result = $(".c2").val() * $(".v2").val() / $(".v1").val();
      $(".c1").val(result);
      break;
    default:
      alert("default");
  }
});

//Molarity calculator
$( ".elements" ).change(function() {
  $(".mw").val($(".elements").val());
});

$( ".calculatemw" ).click(function() {
  //content of boxes
  var variables = [
    $(".volume").val(),
    $(".mass").val(),
    $(".concentration").val(),
    $(".mw").val(),
  ]
  //units converted to 10^unit value.
  var units = [
    Math.pow(10,$(".volumeunits").val()),
    Math.pow(10,$(".massunits").val()),
    Math.pow(10,$(".concentrationunits").val()),
    1,
  ] 
  //which box is empty
  switch (!!variables) {
    case variables[0] !=="" && variables[2] !=="" && variables[3] !=="":
      var calc = variables[2] * variables[0] * variables[3];
      var location = "mass";
      break;
    case variables[1] !=="" && variables[2] !=="" && variables[3] !=="":
      var calc = variables[1] / (variables[2] * variables[3]);
      var location = "volume";
      break;
    case variables[0] !=="" && variables[1] !=="" && variables[3] !=="":
      var calc = variables[1] / (variables[0] * variables[3]);
      var location = "concentration";
      break;
    default:
      alert("Please be sure you have a MW and 2/3 mass, volume, concentration values and units entered and try again.");
  }
  //what is the unit factor and are the units filled out
  switch (!!units) {
    case units[0] !=="" && units[2] !=="":
      var unit = units[2] * units[0];
      break;
    case units[1] !=="" && units[2] !=="":
      var unit = units[1] / units[2];
      break;
    case units[0] !=="" && units[1] !=="":
      var unit = units[1] / units[0];
      break;
    default:
      alert("Please be sure you have a MW and 2/3 mass, volume, concentration values and units entered and try again.");
  }
  //check initial calculation
  if(unit !=="" && calc !==""){
    var result = unit*calc;
    //variables used to check the units and modify the numeric answer accordingly later
    var exponent = result.toExponential().match(/e.*/);
    var factor = exponent[0].substring(1);
  }
  ///unit direction
  if (factor.substring(0,1) ==="-") {
    operator = true;
  } else {
    operator = false;
  }
  //unit factors are multiples of 3, this checks to see if units are a factor of three and which direction
  if (factor % 3 === 0) {
    var result = calc;
    var unitmod = false;
    var count = factor / 3;
    var factor = 0;
  } else if (factor % 3 !==0) {
    var unitmod = true;
  }

  //this needs a refactor
  //If the units are not divisible by 3 (since the unit drop down values are multiples of 3)
  //This while loop determines how many times the unit factor is divisible by 3 then saves that number as a count
  // the remainder is stored as the factor to be used later.
  //Example: a factor of -6 is cleanly divisible by 3 and would result in 2 (count) unit changes down on the final answer
  //and a remainder factor of 0
  //Solving for mass = C V MW in the  the above example with units as numbers would be 2 (0.001) * 2 (0.001) * 2 (1)
  //That example is solving for the answer in grams, and would be 0.000008 (8e-6) grams however if you move the decimal point 6 places,
  //which is equivalent to representing 0.000008 grams as 8 micro grams. Another way for the calculator to say this is the answer is 8, count is -2, and factor is 0
  //An example that doesnt involve a clean unit conversion is: 2 (0.001) * 20 (0.001) * 2 (1)
  //If the above is solved for grams it would be one decimal point larger than the previous example at 0.00008 (8e-5)
  //In this case the correct answer would be to convert this to be either 80 micrograms or 0.08 milligrams.
  //consider the unit factor at this point of -5, which can be thought of -5/3 units on the drop down.
  //In this while -5 is divided by 3 one time leaving a remainder of -2.
  //the calcluator will flatten the calculated value out from 80->8 (ignoring units 2*2*20=80), count = -1, and factor -2
  //The answer will be 8.0 with the decimal point moved twice to the left (smaller number since factor is negative), which is 
  //0.08 and the units will be set to the negative value 1 or mg. 80 micrograms is the same as 0.08 milligrams, which is the same 0.00008 grams.

  i = 0;
  if (operator) {
    while (unitmod === true) {
      var factor = Number(factor)+3;
        i--;
      if ((factor+3) > -1) {
         var unitmod = false;
      }
      var count = i;
      // result = result*(count*1000);
    }
  } else if (!operator) {
    while (unitmod === true) {
      var factor = factor-3;
        i++;
      if ((factor-3) < 1) {
         var unitmod = false;
      }
      var count = i;
      // result = result/(count*1000); 
    }
  }
  //this calculator is designed to calculate a 1 digit number at the end. This involves converting a number like 80
  //to be 8e+1, a regular expression truncates that string to get the number before e, which is added to a str where the
  //it is set to 0 for e. This ensures 80, 0.8, or 800 all enter the final calculation as the number 8
  //the difference between them is tracked through the factor and count variables.
  //Factor variable is used to alter the final calclation, it represents the number of decimal points the final answer
  // will be moved.
  //Count variable on the other hand is an indication of how the final units need to be modified, each count represents a change of a factor of 1000

  var calc = calc.toExponential();
  var calc = calc.match(/[^e]*/);
  var calc = Number(calc+"e+0");
  var mwanswer = Math.pow(10,factor) * calc;
  $("."+location).val(mwanswer);
  $("."+location+"units").val(Number(count)*3);
});