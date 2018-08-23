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

  //calculate the answer

$( ".calculatemw" ).click(function() {
  var variables = [
    $(".volume").val(),
    $(".mass").val(),
    $(".concentration").val(),
    $(".mw").val(),
  ]
  var units = [
    Math.pow(10,$(".volumeunits").val()),
    Math.pow(10,$(".massunits").val()),
    Math.pow(10,$(".concentrationunits").val()),
    1,
  ] 
  switch (!!variables && !!units) {
    case variables[0] !=="" && variables[2] !=="" && variables[3] !=="" && units[2] !=="":
      var unit = units[2] * units[0];
      var calc = variables[2] * variables[0] * variables[3];
      //check for unit change on answer
      var result = unit*calc;
      if ( result > 10 || result < 0.1){
        var exponent = result.toExponential().match(/e.*/);
        $(".massunits").val(exponent[0].substring(1));
        var result = calc;
        $(".mass").val(result);
      } else {
        $(".massunits").val("0");
        $(".mass").val(result);
      }
      break;
    case variables[1] !=="" && variables[2] !=="" && variables[3] !=="":
    alert("volume");
      var calc = variables[1] / (variables[2] * variables[3]);
      $(".volume").val(result);
      break;
    case variables[0] !=="" && variables[1] !=="" && variables[3] !=="":
    alert("conc");
      var calc = variables[1] / (variables[0] * variables[3]);
      $(".concentration").val(result);
      break;
    default:
      alert("default");
  }
});

//old basic division
// $(".calculate").click(function() {
//   var result = $(".numerator").val() / $(".denominator").val();
//   $(".answer").html("The answer is: ".concat(result));
// });
