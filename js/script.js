$(document).ready(function () {

  var x = "X",
    o = "O";
  var player, computer;
  var win = 0,
    lose = 0,
    draw = 0;
  var turns = 0

  var info = $('#info');

  var space = ['#s1', '#s2', '#s3', '#s4', '#s5', '#s6', '#s7', '#s8',
    '#s9'
  ];

  var random = [, , , , , , , , ]
  for (var i in space) {
    random.push(space[i]);
  };
  random.sort(function () {
    return Math.random() - 0.5;
  });



  $('#ex').on('click', function () {
    player = 'X', computer = 'O';
    $('#player1').html('Player: X');
    $('#player1').css("color", "#BA4545");
    $('#computer').html('Computer: O');
    $('#computer').css("color", "#51BA45");
    choose();
  });

  $('#oh').on('click', function () {
    player = 'O', computer = 'X';
    $('#player1').html('Player: O');
    $('#player1').css("color", "#51BA45");
    $('#computer').html('Computer: X');
    $('#computer').css("color", "#BA4545");
    choose();
  });

  function choose() {
    $('#choice').hide();
    $('#board').show('normal');
    $('#new').show('normal');
    $('#hud').show('normal');
    if (player === 'X') {
      compTurn();
    }
  };

  function init() {
    $('#board li').html("");
    $('#board li').addClass('open');
    $('#player1').html('Player: ');
    $('#computer').html('Computer: ');
    $('#wins').html('W <br>L <br> D  ')
    player = '';
    computer = '';
    turns = 0;
    $('#board').hide();
    $('#new').hide();
    $('#choice').show();
    $('#hud').hide();
    info.html("tic tac toe");
  }

  function reset() {

    $('#board li').html("");
    $('#board li').removeClass();
    $('#board li').addClass('open');
    $('#player1').html('Player: ');
    $('#computer').html('Computer: ');
    player = '';
    computer = '';
    turns = 0;
    $('#board').hide('normal');
    $('#new').hide('normal');
    $('#choice').show('normal');
    $('#hud').hide('normal');
    info.html("tic tac toe");
    info.css("color", "#eee");
  };

  function updateScore() {
    $('#wins').html('W ' + win + '<br>L ' + lose + '<br>D ' + draw)
  };

  function playerWins() {
    if (player === 'X' || player === 'O') {
      if ($(space[0]).hasClass(player) && $(space[1]).hasClass(player) &&
        $(space[2]).hasClass(player) ||
        $(space[3]).hasClass(player) && $(space[4]).hasClass(player) && $(
          space[5]).hasClass(player) ||
        $(space[6]).hasClass(player) && $(space[7]).hasClass(player) && $(
          space[8]).hasClass(player) ||
        $(space[0]).hasClass(player) && $(space[3]).hasClass(player) && $(
          space[6]).hasClass(player) ||
        $(space[1]).hasClass(player) && $(space[4]).hasClass(player) && $(
          space[7]).hasClass(player) ||
        $(space[2]).hasClass(player) && $(space[5]).hasClass(player) && $(
          space[8]).hasClass(player) ||
        $(space[0]).hasClass(player) && $(space[4]).hasClass(player) && $(
          space[8]).hasClass(player) ||
        $(space[2]).hasClass(player) && $(space[4]).hasClass(player) && $(
          space[6]).hasClass(player)
      ) {
        return true;
      } else return false;
    }
  };

  function computerWins() {
    if (computer === 'X' || computer === 'O') {
      if ($(space[0]).hasClass(computer) && $(space[1]).hasClass(computer) &&
        $(space[2]).hasClass(computer) ||
        $(space[3]).hasClass(computer) && $(space[4]).hasClass(computer) &&
        $(space[5]).hasClass(computer) ||
        $(space[6]).hasClass(computer) && $(space[7]).hasClass(computer) &&
        $(space[8]).hasClass(computer) ||
        $(space[0]).hasClass(computer) && $(space[3]).hasClass(computer) &&
        $(space[6]).hasClass(computer) ||
        $(space[1]).hasClass(computer) && $(space[4]).hasClass(computer) &&
        $(space[7]).hasClass(computer) ||
        $(space[2]).hasClass(computer) && $(space[5]).hasClass(computer) &&
        $(space[8]).hasClass(computer) ||
        $(space[0]).hasClass(computer) && $(space[4]).hasClass(computer) &&
        $(space[8]).hasClass(computer) ||
        $(space[2]).hasClass(computer) && $(space[4]).hasClass(computer) &&
        $(space[6]).hasClass(computer)
      ) {
        return true;
      } else return false;
    }
  };

  function youWin() {
    info.html("YOU WON!");
    info.css("color", "#51BA45")
    win++;
    updateScore();
    gameOver();
  };

  function youLose() {
    info.html("YOU LOST!");
    info.css("color", "#BA4545");
    lose++
    updateScore();
    gameOver();
  }

  function gameOver() {
    $('#board li').removeClass();
  };


  init();

  $('#reset').on('click', function () {
    reset();
    for (var i in random) {
      random.pop(random[i]);
    }

    for (var i in space) {
      random.push(space[i]);
    };
    random.sort(function () {
      return Math.random() - 0.5;
    });
  });

  var compTurn = function () {

    for (var i in random) {

      if ($(random[i]).hasClass('open')) {
        $(random[i]).html(computer).addClass(computer).removeClass('open');
        turns++;
        if (playerWins()) {
          youWin();
        } else if (computerWins()) {
          youLose();
        } else if (turns > 8) {
          info.html("It's a draw!");
          draw++;
          updateScore();
          gameOver();
        }
        break;
      }
    }
  };

  $('#board li').on('click', function () {
    if ($(this).hasClass('open')) {
      $(this).html(player).addClass(player).removeClass('open');
      turns++;
      if (playerWins()) {
        youWin();
      } else if (computerWins()) {
        youLose();
      } else if (turns > 8) {
        info.html("It's a draw!");
        draw++;
        updateScore();
        gameOver();
      }
      compTurn();
    }

  });




});