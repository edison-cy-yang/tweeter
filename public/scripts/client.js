/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(tweet) {
 const tweetElement = `
  <article class="tweet">
    <header>
      <div>
        <img class="avatar" src="${tweet.user.avatars}">
        <span class="name">${tweet.user.name}</span>
      </div>
      <div class="username">
        <span>${tweet.user.handle}</span>
      </div>              
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <div class="timestamp">
        <span>${tweet.created_at}</span>
      </div>  
      <div class="icons">
        <i class="fa fa-flag"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart"></i>
      </div>           
    </footer>
  </article>
 `;
  return tweetElement;
}

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.tweet-container').prepend($tweet);
  }
}

const createTweet = function() {
  const form = $('.new-tweet form');
  form.on('submit', function(event) {
    event.preventDefault();
    const tweetContent = $('.new-tweet textarea');
    const length = tweetContent.val().length;
    if (tweetContent.val() === "") {
      alert("Your tweet is empty!");
      return;
    } else if (length > 140) {
      alert("Your tweet is too long!");
    }
    const inputData = $(this).serialize();
    $.ajax('/tweets/', {
      method: 'POST',
      data: inputData
    })
    .then(function() {
      $.ajax('/tweets/', { method: 'GET' })
      .then(function(data) {
        renderTweets([data[data.length - 1]]);
      });
    });
  });
};

const loadTweets = function() {
  $.ajax('/tweets/', { method: 'GET' })
  .then(function(data) {
    renderTweets(data);
  });
};

$(document).ready(function() {
  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   },
  //   {
  //     "user": {
  //       "name": "Edison",
  //       "avatars": "images/profile-hex.png",
  //       "handle": "@ed" },
  //     "content": {
  //       "text": "this is my tweet"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]
  
  // renderTweets(tweetData);
  loadTweets();
  createTweet();
});
