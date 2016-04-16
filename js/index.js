'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Messenger = function () {
  function Messenger() {
    _classCallCheck(this, Messenger);

    this.messageList = [];
    this.deletedList = [];

    this.me = 1; // completely arbitrary id
    this.them = 5; // and another one

    this.onRecieve = function (message) {
      return console.log('Recieved: ' + message.text);
    };
    this.onSend = function (message) {
      return console.log('Sent: ' + message.text);
    };
    this.onDelete = function (message) {
      return console.log('Deleted: ' + message.text);
    };
  }

  Messenger.prototype.send = function send() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    text = this.filter(text);

    if (this.validate(text)) {
      var message = {
        user: this.me,
        text: text,
        time: new Date().getTime()
      };

      this.messageList.push(message);

      this.onSend(message);
    }
  };

  Messenger.prototype.recieve = function recieve() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    text = this.filter(text);

    if (this.validate(text)) {
      var message = {
        user: this.them,
        text: text,
        time: new Date().getTime()
      };

      this.messageList.push(message);

      this.onRecieve(message);
    }
  };

  Messenger.prototype.delete = function _delete(index) {
    index = index || this.messageLength - 1;

    var deleted = this.messageLength.pop();

    this.deletedList.push(deleted);
    this.onDelete(deleted);
  };

  Messenger.prototype.filter = function filter(input) {
    var output = input.replace('bad input', 'good output'); // such amazing filter there right?
    return output;
  };

  Messenger.prototype.validate = function validate(input) {
    return !!input.length; // an amazing example of validation I swear.
  };

  return Messenger;
}();

var BuildHTML = function () {
  function BuildHTML() {
    _classCallCheck(this, BuildHTML);

    this.messageWrapper = 'message-wrapper';
    this.circleWrapper = 'circle-wrapper';
    this.textWrapper = 'text-wrapper';

    this.meClass = 'me';
    this.themClass = 'them';
  }

  BuildHTML.prototype._build = function _build(text, who) {
    return '<div class="' + this.messageWrapper + ' ' + this[who + 'Class'] + '">\n              <div class="' + this.circleWrapper + ' animated bounceIn"></div>\n              <div class="' + this.textWrapper + ' animated fadeIn">...</div>\n            </div>';
  };

  BuildHTML.prototype.me = function me(text) {
    return this._build(text, 'me');
  };

  BuildHTML.prototype.them = function them(text) {
    return this._build(text, 'them');
  };

  return BuildHTML;
}();


var RandomCatSound = function() {

        function RandomCat() {
                this.messages = ["Meow", "Prrrr", "RRRAAAARRRRR"];
        }

        RandomCat.prototype = Object(null);
        RandomCat.prototype.constructor = RandomCat;

        RandomCat.prototype.getSound = function() {
           var random =  Math.floor(Math.random() * this.messages.length);
            return this.messages[random];
        }

    return new RandomCat();
}();

$(document).ready(function () {
  var messenger = new Messenger();
  var buildHTML = new BuildHTML();

  var $input = $('#input');
  var $send = $('#send');
  var $content = $('#content');
  var $inner = $('#inner');

  function safeText(text) {
    $content.find('.message-wrapper').last().find('.text-wrapper').text(text);
  }

  function animateText() {
      var anon = function() {
          $content.find('.message-wrapper').last().find('.text-wrapper').addClass('animated fadeIn');
      };
    setTimeout(anon, 350);
  }

  function scrollBottom() {
      $($inner).animate({ scrollTop: $(".content").height() });


  }

  function buildSent(message) {
    console.log('sending: ', message.text);

    $content.append(buildHTML.me(message.text));
    safeText(message.text);
    animateText();

    scrollBottom();
  }

  function buildRecieved(message) {
    console.log('recieving: ', message.text);

    $content.append(buildHTML.them(message.text));
    safeText(message.text);
    animateText();

    scrollBottom();
  }

  function sendMessage() {
    var text = $input.val();
    messenger.send(text);

    $input.val('');
    $input.focus();
      var anon = function() {
          messenger.recieve(RandomCatSound.getSound());

      }
      setTimeout(anon, 1500);
      if (navigator.userAgent.indexOf("Safari") > -1) {
          console.log("is safari!");
          document.activeElement.blur();
      }
  }

  messenger.onSend = buildSent;
  messenger.onRecieve = buildRecieved;

  $input.focus();

  $send.on('click', function (e) {
    sendMessage();
  });

    var isOptionsOpen = false;
    $(".options").on("click", function(e) {
        console.log("CLICKED OPTIONS!");
        if (window.innerWidth < 560) {
            if (isOptionsOpen == false) {
                isOptionsOpen = true;
                $('.wrapper').css({
                    '-webkit-transform': 'translateX(-90%)',
                    '-moz-transform': 'translateX(-90%)',
                    '-ms-transform': 'translateX(-90%)',
                    '-o-transform': 'translateX(-90%)',
                    'transform': 'translateX(-90%)'
                });
            } else {
                isOptionsOpen = false;
                $('.wrapper').css({
                    '-webkit-transform': '',
                    '-moz-transform': '',
                    '-ms-transform': '',
                    '-o-transform': '',
                    'transform': ''
                });
            }
        }

    });

    $(document).ready(function() {
        var userAgent = window.navigator.userAgent;
        console.log("ON LOAD")
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
            $('#bottom').css({
                'bottom': '55px'
            });
        }    });

  $input.on('keydown', function (e) {
    var key = e.which || e.keyCode;

    if (key === 13) {
      // enter key
      e.preventDefault();

      sendMessage();
    }
  });
});
