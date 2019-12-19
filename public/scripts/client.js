/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <div class="timestamp">
        <span>${new Date(tweet.created_at)}</span>
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
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.tweet-container').prepend($tweet);
  }
};

const createTweet = function() {
  const form = $('.new-tweet form');
  form.on('submit', function(event) {
    event.preventDefault();
    $('.new-tweet .error-message').css("visibility", "hidden");
    const tweetContent = $('.new-tweet textarea');
    const length = tweetContent.val().length;
    if (tweetContent.val() === "") {
      $('.new-tweet .error-message').html("Your tweet is empty!");
      $('.new-tweet .error-message').css("visibility", "visible");
      return;
    } else if (length > 140) {
      $('.new-tweet .error-message').html("Tweet over 140 characters!");
      $('.new-tweet .error-message').css("visibility", "visible");
      return;
    }
    const inputData = $(this).serialize();
    $.ajax('/tweets/', {
      method: 'POST',
      data: inputData
    })
    .then(function() {
      //clear the content of the tweet upon successful submission of tweet
      $('.new-tweet textarea').val("");
      $('.new-tweet .counter').html("140");
      return $.ajax('/tweets/', { method: 'GET' });
    })
    .then(function(data) {
      renderTweets([data[data.length - 1]]);
    });
  });
};

const loadTweets = function() {
  $.ajax('/tweets/', { method: 'GET' })
  .then(function(data) {
    renderTweets(data);
  });
};

const toggleNewTweet = function() {
  $('.new-tweet-btn').on('click', function(event) {
    event.stopPropagation();
    console.log("toggled");
    $('.new-tweet').toggle(100, function() {
      $('#tweet-text').focus();
    });
  });
};

const scrollTop = function() {
  $('.scroll-to-top').on('click', function(event) {
    $('html').stop().animate({
      scrollTop: $(".container").offset().top - $("nav").outerHeight()
    }, 500);
    $("#tweet-text").focus();
  });
};

// hides the create new tweet toggle and show the bottom scroll to top button when user starts scrolling
// down from top. Hides the bottom scroll to top button and show the create new tweet toggle when user
// scrolls to the top
const toggleNavButtons = function() {
  let lastScrollTop = 0;
  $(window).scroll(function(event){
    let st = $(this).scrollTop();
    if (st > lastScrollTop){
      $('.scroll-to-top').show();
      $('div.new-tweet-btn').hide();
    } else if (st === 0) {
        $('div.new-tweet-btn').show();
        $('.scroll-to-top').hide();
      }
    lastScrollTop = st;
  });
};

$(document).ready(function() {
  $('.scroll-to-top').hide();
  loadTweets();
  createTweet();
  toggleNewTweet();
  scrollTop();
  toggleNavButtons();
});
