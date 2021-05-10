$(document).ready(function(){
    $body.html('');
    createRefresh();
    displayTweet();
    
});

var $body = $('body');

function createRefresh(){
    var $butt = $('<a></a>');
    $("a").css("type", "button")
    $("a").css("cursor", "pointer")
    $butt.text("TEST BUTTON")
    $butt.click( function(){
        displayTweet();
    });
    $butt.appendTo($body);
  }
  

  function displayTweet(){
    
    
    var $div = $('div')
    $div.html("");
    var index = streams.home.length - 1;
    while(index >= 0){
        var tweet = streams.home[index];
        var $tweet = $('<div></div>');
        $tweet.text('@' + tweet.user + ': ' + tweet.message);
        $tweet.appendTo($body);
        index -= 1;
    }
  }

