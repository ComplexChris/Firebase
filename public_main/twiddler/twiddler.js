
var $body = $('body');
var OLD_TWEETS = [];
var $AUTO_UPDATE = false

$(document).ready(function(){
    //$body.html('');
    start();
});

function user_input(){

}

function start(){
    var styles = "display:flex; width:auto; height:400px; overflow-y:auto; border:4px solid black"
    $container = $('<div></div>', {id:"container", style:styles+"; flex-direction:column; "});
    $tool_container = $('<div></div>', {id:"tool_container", style:styles+"flex-direction:row; flex-flow:row wrap; align-content: flex-start;   " });
    $modal_container = $('<div></div>', {id:"modal_container", style:styles+"; flex-direction:column;   " });
    $modal_container.hide()
    $tool_container.css("height","100px");
    $tool_container.css("display", "inline-flex")
    $tool_container.css("width", "50%")
    

    $tool_container.appendTo($body);
    $container.appendTo($body);
    $modal_container.appendTo($body);
    setTimeout( () => {$("#CloseUser").hide()}, 100);

    createRefresh();
    setInterval(function(){
        //while(true){
        //console.log("Awating tweets")
        $("#NewTweets").text(`New Tweets: ${streams.home.length}`)
        if($AUTO_UPDATE){       
            displayTweet();
        }
    }, 1000);
}

function auto_up(){
    $AUTO_UPDATE = !$AUTO_UPDATE
    var s = $AUTO_UPDATE ? "On" : "Off"
    $("#AutoUpdate").text ( "Auto Update Is: "+s
)}

function createRefresh(){
    var clear = () => $container.text("");
    var butt_styles = "border:2px solid black; cursor:pointer; height:40px; width:100px "
    var button_def = {"Refresh": displayTweet, "Auto Update": auto_up, "Clear Tweets": clear, "Close User": modal }
    for(button in button_def){
        console.log(button)
        var $butt = $('<button></button>', {text:button, style:butt_styles, id:button.replaceAll(" ","")} );
        $butt.click( button_def[button] )
        $butt.css( "order", Object.keys(button_def).indexOf(button) )
        $butt.appendTo( $("#tool_container") );
    }
    $("<div></div>", {width:"100%"}).appendTo( $("#tool_container") );

    var tb_styles = "padding:10px; "
    var text_boxes = {"New Tweets": ""}
    for(tb in text_boxes){
        console.log(tb)
        var $tb = $('<div></div>', {text:tb, style:tb_styles, id:tb.replaceAll(" ","")} );
        $tb.click( button_def[button] )
        // Add event listener to constantly call time function
        $tb.appendTo($("#tool_container"));
    }
}


var test;
async function displayTweet(event, database=[], main_container = $container, match=""){
    console.log("Updating Tweets")
    var index = streams.home.length - 1;
    if(database.length<=0){
        var newTweets = streams.home.splice(0, index);
        OLD_TWEETS = OLD_TWEETS.concat(newTweets)
    }
    else{
        var newTweets = database
    }
    test = newTweets
    for(atweet of newTweets){
        if(match.length>1){
            if (atweet.user !== match){
                console.log("Skipping: "+atweet.user)
                continue
            }
        }
        var $parent = $('<div></div>', {})
        var $href = $('<a></a>', {href:"#", onclick:`modal(event, name="${atweet.user}");`, text:`@${atweet.user}`, id:"tweet_container"} );
        var $tweet =  $('<a></a>')
        $tweet.text(`(${atweet.created_at}): ${atweet.message}`).fadeIn(500);
        $href.appendTo($parent);
        $tweet.appendTo($parent);
        main_container.prepend ($parent);
    }
}

function parse_time(time_var){
    var t = new Date();
    var diff = t - time_var;
}
function modal(event, name){
    event.stopPropagation();
    console.log(arguments)
    // Called to show user tweets only
    if (name in streams.users){   // || $modal_container.is(":hidden")
        showModal(name)
        //$("#CloseUser").appendTo($modal_container)
        //$("#CloseUser").show()
        //window.container.innerHTML = ""
    }
    else{
        if(event.target.id==="CloseUser"){
            $modal_container.text("")
            //$modal_container.fadeOut();
            $("#CloseUser").hide()
        }
    }
}

function showModal(name){
    //alert("Adding only: "+name)
    //event.stopPropagation();
    //$modal_container.text("")
    
    //$modal_container.fadeIn()
    $("#CloseUser").show()
    var test = $(".tingle-modal-box__content")
    test.empty()

    let contain = $("<div></div>", {id:"modal_container", style:"overflow-y:auto; height: 50%"})
    contain.appendTo(test)
    test.innerHTML = ''
    displayTweet( "", OLD_TWEETS, contain, name )
    tingle_modal.open();
    // displayTweet( "", OLD_TWEETS, $modal_container, name )
    //$("#CloseUser").appendTo($modal_container)

    //$("#CloseUser").show()
    //setTimeout( () => { $modal_container.prepend( $("#CloseUser") ) }, 1500);
}



// instanciate new modal
var tingle_modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
});

// set content
tingle_modal.setContent('<h1>here\'s some content</h1>');

// add a button

/*
tingle_modal.addFooterBtn('Button label', 'tingle-btn tingle-btn--primary', function() {
    // here goes some logic
    tingle_modal.close();
});
*/

// add another button
tingle_modal.addFooterBtn('Close', 'tingle-btn tingle-btn--danger', function() {
    // here goes some logic
    tingle_modal.close();
});

// open modal
//tingle_modal.open();

// close modal
//tingle_modal.close();