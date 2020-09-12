/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */






$(document).ready(() => {

  
  $("#compose-button").click(() => {
    $("#tweet-submit").toggleClass("show");
  });


  const time2TimeAgo = (ts) => {
   

    const tsSec   = ts / 1000;
    const d       = new Date();
    const nowTs   = Math.floor(d.getTime() / 1000);
    const seconds = nowTs - tsSec;

    const minInSec   = 60;
    const hourInSec  = 60 * minInSec;
    const dayInSec   = 24 * hourInSec;
    const monthInSec = 30 * dayInSec;
    const yearInSec  = 12 * monthInSec;

    
    if (seconds < minInSec) {
      return "Posted less than one minute ago";
    }

    if (seconds > minInSec && seconds < hourInSec) {
      return Math.floor(seconds / minInSec) + " minutes ago";
    }

    if (seconds > hourInSec && seconds < 2 * hourInSec) {
      return `Posted 1 hour ago`;
    }
  
    if (seconds > 2 * hourInSec && seconds < dayInSec) {
      return `Posted ${Math.floor(seconds / hourInSec)} hours ago`;
    }

    if (seconds > dayInSec && seconds < 2 * dayInSec) {
      return `Posted 1 day ago`;
    }
  
    if (seconds > 2 * dayInSec && seconds < monthInSec) {
      return `Posted ${Math.floor(seconds / dayInSec)} days ago`;
    }
    
    if (seconds > monthInSec && seconds < 2 * monthInSec) {
      return `Posted 1 month ago`;
    }

    if (seconds > 2 * monthInSec && seconds < yearInSec) {
      return `Posted ${Math.floor(seconds / monthInSec)} months ago`;
    }
    
    if (seconds > yearInSec && seconds < 2 * yearInSec) {
      return `Posted 1 year ago`;
    }

    if (seconds > 2 * yearInSec) {
      return `Posted ${Math.floor(seconds / yearInSec)} years ago`;
    }
    
  };
  
  const createTweetElement = tweetData => {
    
    let $tweet = $(`<article class="single-tweet">
    <header class="art-around">
      <div class="user">
        <img class="icon" src=${tweetData.user.avatars}>
        <p class="username">${tweetData.user.name}</p>
      </div>
      <p class="handle">${tweetData.user.handle}</p>
    </header>
    <p class="user-tweet">${tweetData.content.text}</p>
    <footer class="art-around">
      <p class="timeMark">${time2TimeAgo(tweetData.created_at)}</p>
      <div class="icons">
        <img src="/images/flag.svg">
        <img src="/images/repeat.svg">
        <img src="/images/heart.svg">
      </div>
    </footer>
  </article>`);

    return $tweet;
  };

  

  const renderTweet = (tweetList) => {
    for (let tweet in tweetList) {
      let $tweet = createTweetElement(tweetList[tweet]);
      $('#tweets-container').prepend($tweet);

      $tweet.mouseenter(() => {
     
        $tweet.addClass("single-tweethover");
        $tweet.find(".icons").addClass("icons-hover");
        $tweet.find(".handle").addClass("handlehover");
      }).mouseleave(() => {
     
        $tweet.removeClass("single-tweethover");
        $tweet.find(".icons").removeClass("icons-hover");
        $tweet.find(".handle").removeClass("handlehover");
      });
    }
  
  };
   
  
  const $form = $("#tweet-submit");
  const $tweet = $("#tweet-text");
  const $error = $("#error-message");

  $form.submit(function(event) {
    event.preventDefault();
    $error.text("");

    console.log(`${$tweet.val().length}`);
    if ($tweet.val() === "") {
        
      $error.text("Oops! It seems like you didn't humm!").slideDown("slow");
    } else if ($tweet.val().length > 140) {

      $error.text("Oops! Tweets must stay under 140 characters!");
    } else {

      $.ajax("/tweets", {method: "POST", data: $form.serialize()}).then(() => {
      
        loadTweets();
            
        $tweet.val("");
      });
    }
 
    
  });


  

  //will fetch tweets fromn page
  const loadTweets = () => {
    
    $.ajax("/tweets", {method: "GET"}).then((result) => {
      renderTweet(result) || console.log(result);
    });
  
  };
  
  loadTweets();
  
});


 