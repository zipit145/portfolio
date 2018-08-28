var span = document.getElementsByClassName("close")[0];
$(".jsEx").click(function() {
  $(".modal").removeClass('inactive');
});
$(".jsEx2").click(function() {
  $(".modal2").removeClass('inactive');
});
$( ".close" ).click(function() {
  $(".modal").addClass('inactive');
});
$( ".close" ).click(function() {
  $(".modal2").addClass('inactive');
});
$(".calculate").click(function() {
  var c1v1c2v2 = [
    $(".c1").val(),
    $(".v1").val(),
    $(".c2").val(),
    $(".v2").val()
  ]
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
  // if ($(".c1").val() !=="" && $(".c2").val() !=="" && $(".v1").val() !=="") {
  //   var result = $(".c1").val() * $(".v1").val() / $(".c2").val();
  //   $(".v2").val(result);
  // } else if ($(".c1").val() !=="" && $(".v2").val() !=="" && $(".v1").val() !=="") {
  //   var result = $(".c1").val() * $(".v1").val() / $(".v2").val();
  //   $(".c2").val(result);
  // } else if ($(".v1").val() !=="" && $(".c2").val() !=="" && $(".v2").val() !=="") {
  //   var result = $(".v2").val() * $(".c2").val() / $(".v1").val();
  //   $(".c1").val(result);
  // } else if ($(".c1").val() !=="" && $(".v2").val() !=="" && $(".c2").val() !=="") {
  //   var result = $(".c2").val() * $(".v2").val() / $(".c1").val();
  //   $(".v1").val(result);
  // }
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
  i = 0;
  if (operator) {
    while (unitmod === true) {
      var factor = Number(factor)+3;
        i++;
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
  var calc = calc.toExponential();
  var calc = calc.match(/[^e]*/);
  var calc = Number(calc+"e+0");
  alert (count);
  var mwanswer = Math.pow(10,factor) * calc;
  $("."+location).val(mwanswer);
  $("."+location+"units").val(Number(count)*3);
});

//old basic division
// $(".calculate").click(function() {
//   var result = $(".numerator").val() / $(".denominator").val();
//   $(".answer").html("The answer is: ".concat(result));
// });

//old calculator work
// $( ".calculatemw" ).click(function() {
//   var variables = [
//     $(".volume").val(),
//     $(".mass").val(),
//     $(".concentration").val(),
//     $(".mw").val(),
//   ]
//   var units = [
//     Math.pow(10,$(".volumeunits").val()),
//     Math.pow(10,$(".massunits").val()),
//     Math.pow(10,$(".concentrationunits").val()),
//     1,
//   ] 
//   switch (!!variables && !!units) {
//     case variables[0] !=="" && variables[2] !=="" && variables[3] !=="" && units[2] !=="" && units[0] !=="":
//       var unit = units[2] * units[0];
//       var calc = variables[2] * variables[0] * variables[3];
//       //check for unit change on answer
//       var result = unit*calc;
//       if ( result > 10 || result < 0.1){
//         var exponent = result.toExponential().match(/e.*/);
        
//         $(".massunits").val(exponent[0].substring(1));
//         var result = calc;
//         $(".mass").val(result);
//       } else {
//         $(".massunits").val("0");
//         $(".mass").val(result);
//       }
//       break;
//     case variables[1] !=="" && variables[2] !=="" && variables[3] !=="" && units[2] !=="" && units[1] !=="":
//       var unit = units[1] / units[2];
//       var calc = variables[1] / (variables[2] * variables[3]);
//       //check for unit change on answer
//       var result = unit*calc;
//       if ( result > 10 || result < 0.1){
//         var exponent = result.toExponential().match(/e.*/);
//         $(".volumeunits").val(exponent[0].substring(1));
//         var result = calc;
//         $(".volume").val(result);
//       } else {
//         $(".volumeunits").val("0");
//         $(".volume").val(result);
//       }
//       break;
//     case variables[0] !=="" && variables[1] !=="" && variables[3] !=="" && units[0] !=="" && units[1] !=="":
//       var unit = units[1] / units[0];
//       var calc = variables[1] / (variables[0] * variables[3]);
//       //check for unit change on answer
//       var result = unit*calc;
//       if ( result > 10 || result < 0.1){
//         var exponent = result.toExponential().match(/e.*/);
//         $(".concentrationunits").val(exponent[0].substring(1));
//         var result = calc;
//         $(".concentration").val(result);
//       } else {
//         $(".concentrationunits").val("0");
//         $(".concentration").val(result);
//       }
//       break;
//     default:
//       alert("Please be sure you have a MW and 2/3 mass, volume, concentration values and units entered and try again.");
//   }
// });