$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function (e) {
    const maxLength = 140;
    const txtLength = $(this).val().length;
    const counterValue = maxLength - txtLength;
    const negativeCounterValue = txtLength - maxLength;
    const counter = $(".button").find(".counter");
    if (txtLength maxLength) {
      counter.html(`${negativeCounterValue}`);
      counter.css("color", "red");
    }

    counter.html(`${counterValue}`);
  });
});
