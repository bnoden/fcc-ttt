$(document).ready(function () {

  (function splash(game){
  $('#container').hide()
  game = $('#container')

  var tc = [$('#titlecard0'), $('#titlecard1'), $('#titlecard2')];

  tc[0].attr('src', 'https://goo.gl/2xon26')
  tc[1].hide(); tc[1].attr('src', 'https://goo.gl/c6e6ht')
  tc[2].hide(); tc[2].attr('src', 'https://goo.gl/LvR9VY')

  var bootSpd = 1800

  var showtc1 = function(){
    tc[1].fadeIn(bootSpd)
  }, showtc2 = function(){
    tc[1].fadeOut(bootSpd)
    tc[2].fadeIn(bootSpd)
  }, closeSplash = function(){
    tc[2].fadeOut(bootSpd)
    tc[0].fadeOut(bootSpd)
  }, start = function(){
    game.show()
  }
  $("#boot img").on("click",function(){$("#boot").hide(),game.show()})
  setTimeout(showtc1, bootSpd)
  setTimeout(showtc2, bootSpd*3)
  setTimeout(closeSplash, bootSpd*5)
  setTimeout(start, bootSpd*6.5)


}());

  

  var x = "X",
    o = "O";
  var player, cpu;
  var cpuColor;
  var open = 'open';
  var lv1, lv2, lv3, lv4, lv5, lv6, lv7;
  var win = 0,
    lose = 0,
    draw = 0,
    round = 1+win+lose+draw;
  var turns = 0

  var info = $('#info');

  var space = ['#s1', '#s2', '#s3', '#s4', '#s5', '#s6', '#s7', '#s8',
    '#s9'
  ];

  var s1 = $('#s1'), s2 = $('#s2'), s3 = $('#s3'),
      s4 = $('#s4'), s5 = $('#s5'), s6 = $('#s6'),
      s7 = $('#s7'), s8 = $('#s8'), s9 = $('#s9');

  function character(name, hp){
    this.name = name;
    this.hp = hp;
  };
  
  var noName = function(){
    var names = ['Mario', 'Luigi', 'Link', 'Zelda', 'Samus', 'Cecil', 'Rydia',
      'Galuf', 'Butz', 'Celes', 'Mog', 'Cloud', 'Cid', 'Mega Man', 'Rock',
      'Ness', 'Ryu', 'Snake', 'Linus', 'Mr. Saturn', 'Lufia', 'Aeris',
      'Erdrick', 'Don Corneo', 'Bobby Corwen', 'David Wonn', 'bnoden', 'Citan',
      'Frog', 'Schala', 'Nobuo', 'BUN BUN', 'S. MIYAHON', 'Nasir', 'Namingway',
      'Flammie', 'Itoi', 'Bucket Mouse', 'THIEF', 'Nu', 'Apple Kid', 'Exit Mouse'];
    var rNames = new Array(names.length);
    for (var i in names) {
      rNames.push(names[i]);
    };
    rNames.sort(function () {
      return Math.random() - 0.5;
    });
    return rNames[0];
  };

  var myName = function(){
    if($('#name').val().length < 1){
      return noName();
    }
    return $('#name').val();
  };

  $('#wins').on('click', function(){
    console.log(typeof noName());
  });

  var hero = new character(myName(), 100);

  var random = [, , , , , , , , ]
  for (var i in space) {
    random.push(space[i]);
  };
  random.sort(function () {
    return Math.random() - 0.5;
  });

var level = function(num){
    num = 0;
    if (win < 3){
      num = 1;
    } else if (win < 6){
      num = 2;
    } else if (win < 9){
      num = 3;
    } else if (win < 12){
      num = 4;
    }
    return num;
  };

  function bosser(){
    if (win < 3){
      cpuColor = '#BA4545';
      $('#cpu').html('Level 1').css("color", cpuColor);
    } else if (win < 6){
      cpuColor = '#45A1BA';
      $('#cpu').html('Level 2').css("color", cpuColor);
    } else if (win < 9){
      cpuColor = '#9345BA';
      $('#cpu').html('Level 3').css("color", cpuColor);
    } else if (win < 12){
      cpuColor = '#FFEA00';
      $('#cpu').html('Level 4').css("color", cpuColor);
    }
  };

  

  function beEx(){
    player = 'X', cpu = 'O';
    $('#player1').val(myName()).css("color", "#51BA45");
    bosser();
    choose();
  };
  function beOh(){
    player = 'O', cpu = 'X';
    $('#player1').val(myName()).css("color", "#51BA45");
    bosser();
    choose();
  }

  $('#ex').on('click', function () {
    beEx();
  });

  $('#oh').on('click', function () {
    beOh();
  });

  //$('body').on('click', )

  function setName(e){
    var key = e.which;
 if(key == 13){
    if(round % 2 === 0){
      beEx();
    } else beOh();
  }
  };

  $('#name').keypress(function (e) {
  setName(e);
});
  $('#player1').keypress(function (e) {
  $('#name').val($('#player1').val());
});

  function choose() {
    $('#choice').hide();
    $('#board li').css('border-color', '#eee')
    $('#board').show('normal');
    $('#hud').show('normal');
    if (player === 'X') {
      compTurn();
    }
  };

  function init() {
    $('#board li').html("");
    $('#board li').addClass(open);
    $('#player1').html('Player: ');
    $('#cpu').html('Computer: ');
    updateScore();
    player = '';
    cpu = '';
    turns = 0;
    $('#board').hide();
    $('#new').hide();
    $('#choice').show();
    $('#name').focus();
    $('#hud').hide();
    info.html("tic tac toe");
    info.css("color", "#eee");
  }

  function reset() {
    $('#board li').fadeTo('fast', 1.0);
    if (lose % 3 === 0){
      init();
    } else {
        $('#board li').html("").removeClass().addClass(open);
        
        $('#player1').html('Player: ');
        $('#cpu').html('Computer: ');
        player = '';
        cpu = '';
        turns = 0;
        $('#board').hide('normal');
        $('#new').hide('normal');
        $('#choice').show('normal');
        $('#hud').hide('normal');
        info.html("tic tac toe");
        info.css("color", "#eee");
  }
  };

  function updateScore() {
    if (lose === 3){
      win = 0; lose = 0; draw = 0;
    }
    $('#wins').html('W ' + win + '<br>L ' + lose + '<br>D ' + draw)
  };

  function ttt(){
    var winner;
    if (playerWins()){
      winner = player;
    } else if (cpuWins()){
      winner = cpu;
    } else {return;}
    if (s1.hasClass(winner) && s2.hasClass(winner) && s3.hasClass(winner)){
        s1.addClass('ttt'); s2.addClass('ttt'); s3.addClass('ttt');

    } else if (s4.hasClass(winner) && s5.hasClass(winner) && s6.hasClass(winner)){
               s4.addClass('ttt');    s5.addClass('ttt');    s6.addClass('ttt');

    } else if (s7.hasClass(winner) && s8.hasClass(winner) && s9.hasClass(winner)){
               s7.addClass('ttt');    s8.addClass('ttt');    s9.addClass('ttt');

    } else if (s1.hasClass(winner) && s4.hasClass(winner) && s7.hasClass(winner)){
               s1.addClass('ttt');    s4.addClass('ttt');    s7.addClass('ttt');

    } else if (s2.hasClass(winner) && s5.hasClass(winner) && s8.hasClass(winner)){
               s2.addClass('ttt');    s5.addClass('ttt');    s8.addClass('ttt');

    } else if (s3.hasClass(winner) && s6.hasClass(winner) && s9.hasClass(winner)){
               s3.addClass('ttt');    s6.addClass('ttt');    s9.addClass('ttt');

    } else if (s1.hasClass(winner) && s5.hasClass(winner) && s9.hasClass(winner)){
               s1.addClass('ttt');    s5.addClass('ttt');    s9.addClass('ttt');

    } else if (s3.hasClass(winner) && s5.hasClass(winner) && s7.hasClass(winner)){
               s3.addClass('ttt');    s5.addClass('ttt');    s7.addClass('ttt');
    }
    $('#board li').css('border-color', '#333');
    $('#board li').fadeTo('fast', 0.15);
    for (var i in space){
      if ($(space[i]).hasClass('ttt')){
        $(space[i]).fadeTo('slow', 1.0);
      }
    }
  };

  function playerWins() {
    if (player === 'X' || player === 'O') {
      if (s1.hasClass(player) && s2.hasClass(player) && s3.hasClass(player) ||
        s4.hasClass(player) && s5.hasClass(player) && s6.hasClass(player) ||
        s7.hasClass(player) && s8.hasClass(player) && s9.hasClass(player) ||
        s1.hasClass(player) && s4.hasClass(player) && s7.hasClass(player) ||
        s2.hasClass(player) && s5.hasClass(player) && s8.hasClass(player) ||
        s3.hasClass(player) && s6.hasClass(player) && s9.hasClass(player) ||
        s1.hasClass(player) && s5.hasClass(player) && s9.hasClass(player) ||
        s3.hasClass(player) && s5.hasClass(player) && s7.hasClass(player)
      ) {
        return true;
      } else return false;
    }
  };

  function cpuWins() {
    if (cpu === 'X' || cpu === 'O') {
      if (s1.hasClass(cpu) && s2.hasClass(cpu) &&
        s3.hasClass(cpu) ||
        s4.hasClass(cpu) && s5.hasClass(cpu) &&
        s6.hasClass(cpu) ||
        s7.hasClass(cpu) && s8.hasClass(cpu) &&
        s9.hasClass(cpu) ||
        s1.hasClass(cpu) && s4.hasClass(cpu) &&
        s7.hasClass(cpu) ||
        s2.hasClass(cpu) && s5.hasClass(cpu) &&
        s8.hasClass(cpu) ||
        s3.hasClass(cpu) && s6.hasClass(cpu) &&
        s9.hasClass(cpu) ||
        s1.hasClass(cpu) && s5.hasClass(cpu) &&
        s9.hasClass(cpu) ||
        s3.hasClass(cpu) && s5.hasClass(cpu) &&
        s7.hasClass(cpu)
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
    newGame();
  };

  function youLose() {
    //$('#board li').fadeTo('slow', 0.1);
    if (lose === 2){
      gameOver()
    } else {
        info.html("YOU LOST!");
        info.css("color", cpuColor);
        lose++
        updateScore();
        newGame();
      }
  }

  function newGame() {
    $('#new').show('slow');
    $('#board li').removeClass();
  };

  function gameOver(){
    $('#board').fadeOut('fast');
    info.html("GAME OVER...");
    info.css("color", "#BA4545");
    $('#new').css("color", cpuColor);
    lose++
    updateScore();
    newGame();
  }


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

  

  function conclude(){
    
    if (playerWins()) {
          ttt();
          youWin();
        } else if (cpuWins()) {
          ttt();
          youLose();
        } else if (turns > 8) {
          info.html("It's a draw!");
          draw++;
          updateScore();
          newGame();
        }
      };

  var fool = function(){
      for (var i in random) {

      if ($(random[i]).hasClass(open)) {
        $(random[i]).html(cpu).css('color', cpuColor).addClass(cpu).removeClass(open);
        turns++;
        conclude();
        break;
      }
    }
    };

  var predictable = function(){
    for (var i in space) {

      if ($(space[i]).hasClass(open)) {
        $(space[i]).html(cpu).css('color', cpuColor).addClass(cpu).removeClass(open);
        turns++;
        conclude();
        break;
      }
    }
  };

  lv1 = function(){
    fool();
  };
  lv2 = function(){
    predictable();
  };
  lv3 = function(){
    fool();
  };
  lv4 = function(){
    fool();
  };

  var compTurn = function () {
    if (level() === 1){
      lv1();
    } else if (level() === 2){
      lv2();
    } else if (level() === 3){
      lv3();
    } else if (level() === 4){
      lv4();
    }

  };

  $('#board li').on('click', function () {
    if ($(this).hasClass(open)) {
      $(this).html(player).css("color", "#51BA45").addClass(player).removeClass(open);
      turns++;
      conclude();
      compTurn();
    }

  });






});