/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json

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
      <p>${contents.text}</p>
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

$("form").on("submit", function (event) {
  event.preventDefault();
  const text = $(this).serialize();
  if (text.length > 140) {
    return alert("You are over the character limit!!");
  }

  $.ajax({
    method: "POST",
    url: "/tweets",
    data: text,
  }).done((data) => {
    loadTweets(data);
  });
});

const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET",
  })
    .then((url) => {
      renderTweets(url);
    })
    .catch((error) => {
      console.log("error:", error);
    });
};

loadTweets();
