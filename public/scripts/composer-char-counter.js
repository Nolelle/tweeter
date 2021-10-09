const MAX_TWEET_LENGTH = 140;
$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").on("input", function (e) {
    const maxLength = MAX_TWEET_LENGTH;
    const txtLength = $(this).val().length;
    const lettersLeft = maxLength - txtLength;
    const counter = $(this).parent().find(".counter");
    counter.html(`${lettersLeft}`);
    if (lettersLeft < 0) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  });
});
