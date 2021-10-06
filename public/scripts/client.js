/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  user: {
    name: "Descartes",
    avatars: "https://i.imgur.com/nlhLi3I.png",
    handle: "@rd",
  },
  content: {
    text: "Je pense , donc je suis",
  },
  created_at: 1633469791318,
};

const createTweetElement = function (tweet) {
  const user = tweet.user;
  const contents = tweet.content;
  const createdAt = tweet.created_at;

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
      <div>${createdAt}</div>
      <div>
        <div class="fas fa-flag icon"></div>
        <div class="fas fa-retweet icon"></div>
        <div class="fas fa-heart icon"></div>
      </div>
    </footer>
  </article>`);

  return $tweetHTML;
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
