/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function (tweets) {
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};

const createTweetElement = function (tweet) {
  const user = tweet.user;
  const contents = tweet.content;
  const createdAt = tweet.created_at;
  const timeCreated = timeago.format(createdAt);

  const $tweetHTML = $(`<article class="tweet"> 
  <header>
      <div class ='user'>
        <img src="${user.avatars}" alt ="avatar">
        <span class="tweet-name">${user.name}</span>
      </div>
      <div class= "username">${user.handle}</div>
    </header>

    <main>
     <p>${escape(contents.text)}</p>
      <hr>
    </main>
     
    <footer>
      <div>${timeCreated}</div>
      <div>
        <div class="fas fa-flag icon"></div>
        <div class="fas fa-retweet icon"></div>
        <div class="fas fa-heart icon"></div>
      </div>
    </footer>
  </article>`);

  return $tweetHTML;
};

const createError = function (msg) {
  const $errorMsg = $(
    `<span><i class="fas fa-exclamation-triangle"></i></span>
    <span>${msg}</span>
    <i class="fas fa-exclamation-triangle"></i></span>
    `
  );

  return $errorMsg;
};

//hide error (default behavior)
$("#error").hide();

$("form").on("submit", function (event) {
  event.preventDefault();
  const text = $(this).serialize();
  if (text.length > 140) {
    $("#error").html(createError("Please keep within character limit"));
    $("#error").slideDown();
    return;
  }
  $("#error").slideUp();

  $.ajax({
    method: "POST",
    url: "/tweets",
    data: text,
  })
    .done((data) => {
      loadTweets(data);
    })
    .fail(() => {
      $("#error").html(createError("Please enter something before tweeting."));
      $("#error").slideDown();
    });
});

const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET",
  })
    .done((url) => {
      renderTweets(url);
      $("#tweet-text").val("");
      $(".counter").html("140");
    })
    .fail((error) => {
      console.log("error:", error);
    });
};

loadTweets();
