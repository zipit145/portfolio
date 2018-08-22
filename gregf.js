var span = document.getElementsByClassName("close")[0];
$(".jsEx").click(function() {
  $(".modal").removeClass('inactive');
});
$( ".close" ).click(function() {
  $(".modal").addClass('inactive');
});
$(".calculate").click(function() {
  var c1v1c2v2 = [
    $(".c1").val(),
    $(".v1").val(),
    $(".c2").val(),
    $(".v2").val()
  ]
  var c1 = $(".c1").val();
  var v1 = $(".v1").val();
  var c2 = $(".c2").val();
  var v2 = $(".v2").val();
  switch (!!c1v1c2v2) {
    case c1v1c2v2[0] !=="", c1v1c2v2[1] !=="", c1v1c2v2[2] !=="":
      var result = $(".c1").val() * $(".v1").val() / $(".c2").val();
      $(".v2").val(result);
      break;
    case c1v1c2v2[0] !=="", c1v1c2v2[1] !=="", c1v1c2v2[3] !=="":
      var result = $(".c1").val() * $(".v1").val() / $(".v2").val();
      $(".c2").val(result);
      break;
    case c1v1c2v2[0] !=="", c1v1c2v2[2] !=="", c1v1c2v2[3] !=="":
      var result = $(".c2").val() * $(".v2").val() / $(".c1").val();
      $(".v1").val(result);
      break;
    case c1v1c2v2[1] !=="", c1v1c2v2[2] !=="", c1v1c2v2[3] !=="":
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
// $(".calculate").click(function() {
//   var result = $(".numerator").val() / $(".denominator").val();
//   $(".answer").html("The answer is: ".concat(result));
// });
