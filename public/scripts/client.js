/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function (tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
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

    <div class="main">
      <p>${escape(contents.text)}</p>
      <hr>
    </div>

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
$("#error").hide();

$("form").on("submit", function (event) {
  event.preventDefault();
  const text = $(this).serialize();
  console.log(text);
  if (text.length > 140) {
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
    })
    .fail((error) => {
      console.log("error:", error);
    });
};

loadTweets();
