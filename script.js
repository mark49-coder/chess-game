let main = {

  variables: {
    turn: 'w',
    selectedpiece: '',
    highlighted: [],
    pieces: pieces
  },

  methods: {
    createboard: function() {
      let game = $('#game');
      for (let y = 8; y >= 1; y--) {
        game.append("<div class='cellprefix'>" + y + "</div>");
        for (let x = 1; x <= 8; x++) {
          let color = (x + y) % 2 == 0 ? 'grey' : '';
          game.append("<div class='gamecell " + color + "' id='" + x + "_" + y + "'></div>");
        }
        game.append('<br>');
      }
      game.append("<div class='cellprefix'></div>");
      let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      for (let i = 0; i < letters.length; i++) {
        game.append("<div class='cellprefix'>" + letters[i] + "</div>");
      }
      game.append('<br>');
    },

    gamesetup: function() {
      main.methods.createboard();
      $('.gamecell').attr('chess', 'null');
      for (let gamepiece in main.variables.pieces) {
        $('#' + main.variables.pieces[gamepiece].position).html(main.variables.pieces[gamepiece].img);
        $('#' + main.variables.pieces[gamepiece].position).attr('chess', gamepiece);
      }
    },

    moveoptions: function(selectedpiece) {

      let position = { x: '', y: '' };
      position.x = main.variables.pieces[selectedpiece].position.split('_')[0];
      position.y = main.variables.pieces[selectedpiece].position.split('_')[1];

      // these options need to be var instead of let
      var options = []; 
      var coordinates = [];
      var startpoint = main.variables.pieces[selectedpiece].position;
      var c1,c2,c3,c4,c5,c6,c7,c8;

      if (main.variables.highlighted.length != 0) {
        main.methods.togglehighlight(main.variables.highlighted);
      }

      switch (main.variables.pieces[selectedpiece].type) {
        case 'w_king':

          if ($('#6_1').attr('chess') == 'null' && $('#7_1').attr('chess') == 'null' && main.variables.pieces['w_king'].moved == false && main.variables.pieces['w_rook2'].moved == false) {
            coordinates = [{ x: 1, y: 1 },{ x: 1, y: 0 },{ x: 1, y: -1 },{ x: 0, y: -1 },{ x: -1, y: -1 },{ x: -1, y: 0 },{ x: -1, y: 1 },{ x: 0, y: 1 },{x: 2, y: 0}].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });
          } else {
            coordinates = [{ x: 1, y: 1 },{ x: 1, y: 0 },{ x: 1, y: -1 },{ x: 0, y: -1 },{ x: -1, y: -1 },{ x: -1, y: 0 },{ x: -1, y: 1 },{ x: 0, y: 1 }].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });
          }

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        case 'b_king':

        if ($('#6_8').attr('chess') == 'null' && $('#7_8').attr('chess') == 'null' && main.variables.pieces['b_king'].moved == false && main.variables.pieces['b_rook2'].moved == false) {
          coordinates = [{ x: 1, y: 1 },{ x: 1, y: 0 },{ x: 1, y: -1 },{ x: 0, y: -1 },{ x: -1, y: -1 },{ x: -1, y: 0 },{ x: -1, y: 1 },{ x: 0, y: 1 },{x: 2, y: 0}].map(function(val){
            return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
          });
        } else {
          coordinates = [{ x: 1, y: 1 },{ x: 1, y: 0 },{ x: 1, y: -1 },{ x: 0, y: -1 },{ x: -1, y: -1 },{ x: -1, y: 0 },{ x: -1, y: 1 },{ x: 0, y: 1 }].map(function(val){
            return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
          });
        }
          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        case 'w_queen':

          c1 = main.methods.w_options(position,[{x: 1, y: 1},{x: 2, y: 2},{x: 3, y: 3},{x: 4, y: 4},{x: 5, y: 5},{x: 6, y: 6},{x: 7, y: 7}]);
          c2 = main.methods.w_options(position,[{x: 1, y: -1},{x: 2, y: -2},{x: 3, y: -3},{x: 4, y: -4},{x: 5, y: -5},{x: 6, y: -6},{x: 7, y: -7}]);
          c3 = main.methods.w_options(position,[{x: -1, y: 1},{x: -2, y: 2},{x: -3, y: 3},{x: -4, y: 4},{x: -5, y: 5},{x: -6, y: 6},{x: -7, y: 7}]);
          c4 = main.methods.w_options(position,[{x: -1, y: -1},{x: -2, y: -2},{x: -3, y: -3},{x: -4, y: -4},{x: -5, y: -5},{x: -6, y: -6},{x: -7, y: -7}]);
          c5 = main.methods.w_options(position,[{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 6, y: 0},{x: 7, y: 0}]);
          c6 = main.methods.w_options(position,[{x: 0, y: 1},{x: 0, y: 2},{x: 0, y: 3},{x: 0, y: 4},{x: 0, y: 5},{x: 0, y: 6},{x: 0, y: 7}]);
          c7 = main.methods.w_options(position,[{x: -1, y: 0},{x: -2, y: 0},{x: -3, y: 0},{x: -4, y: 0},{x: -5, y: 0},{x: -6, y: 0},{x: -7, y: 0}]);
          c8 = main.methods.w_options(position,[{x: 0, y: -1},{x: 0, y: -2},{x: 0, y: -3},{x: 0, y: -4},{x: 0, y: -5},{x: 0, y: -6},{x: 0, y: -7}]);

          coordinates = c1.concat(c2).concat(c3).concat(c4).concat(c5).concat(c6).concat(c7).concat(c8);
          
          options = coordinates.slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        case 'b_queen':
          
            c1 = main.methods.b_options(position,[{x: 1, y: 1},{x: 2, y: 2},{x: 3, y: 3},{x: 4, y: 4},{x: 5, y: 5},{x: 6, y: 6},{x: 7, y: 7}]);
            c2 = main.methods.b_options(position,[{x: 1, y: -1},{x: 2, y: -2},{x: 3, y: -3},{x: 4, y: -4},{x: 5, y: -5},{x: 6, y: -6},{x: 7, y: -7}]);
            c3 = main.methods.b_options(position,[{x: -1, y: 1},{x: -2, y: 2},{x: -3, y: 3},{x: -4, y: 4},{x: -5, y: 5},{x: -6, y: 6},{x: -7, y: 7}]);
            c4 = main.methods.b_options(position,[{x: -1, y: -1},{x: -2, y: -2},{x: -3, y: -3},{x: -4, y: -4},{x: -5, y: -5},{x: -6, y: -6},{x: -7, y: -7}]);
            c5 = main.methods.b_options(position,[{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 6, y: 0},{x: 7, y: 0}]);
            c6 = main.methods.b_options(position,[{x: 0, y: 1},{x: 0, y: 2},{x: 0, y: 3},{x: 0, y: 4},{x: 0, y: 5},{x: 0, y: 6},{x: 0, y: 7}]);
            c7 = main.methods.b_options(position,[{x: -1, y: 0},{x: -2, y: 0},{x: -3, y: 0},{x: -4, y: 0},{x: -5, y: 0},{x: -6, y: 0},{x: -7, y: 0}]);
            c8 = main.methods.b_options(position,[{x: 0, y: -1},{x: 0, y: -2},{x: 0, y: -3},{x: 0, y: -4},{x: 0, y: -5},{x: 0, y: -6},{x: 0, y: -7}]);
  
            coordinates = c1.concat(c2).concat(c3).concat(c4).concat(c5).concat(c6).concat(c7).concat(c8);
            
            options = coordinates.slice(0);
            main.variables.highlighted = options.slice(0);
            main.methods.togglehighlight(options);
  
            break;
        
        case 'w_bishop':

          c1 = main.methods.w_options(position,[{x: 1, y: 1},{x: 2, y: 2},{x: 3, y: 3},{x: 4, y: 4},{x: 5, y: 5},{x: 6, y: 6},{x: 7, y: 7}]);
          c2 = main.methods.w_options(position,[{x: 1, y: -1},{x: 2, y: -2},{x: 3, y: -3},{x: 4, y: -4},{x: 5, y: -5},{x: 6, y: -6},{x: 7, y: -7}]);
          c3 = main.methods.w_options(position,[{x: -1, y: 1},{x: -2, y: 2},{x: -3, y: 3},{x: -4, y: 4},{x: -5, y: 5},{x: -6, y: 6},{x: -7, y: 7}]);
          c4 = main.methods.w_options(position,[{x: -1, y: -1},{x: -2, y: -2},{x: -3, y: -3},{x: -4, y: -4},{x: -5, y: -5},{x: -6, y: -6},{x: -7, y: -7}]);

          coordinates = c1.concat(c2).concat(c3).concat(c4);

          options = coordinates.slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        
        case 'b_bishop':

          c1 = main.methods.b_options(position,[{x: 1, y: 1},{x: 2, y: 2},{x: 3, y: 3},{x: 4, y: 4},{x: 5, y: 5},{x: 6, y: 6},{x: 7, y: 7}]);
          c2 = main.methods.b_options(position,[{x: 1, y: -1},{x: 2, y: -2},{x: 3, y: -3},{x: 4, y: -4},{x: 5, y: -5},{x: 6, y: -6},{x: 7, y: -7}]);
          c3 = main.methods.b_options(position,[{x: -1, y: 1},{x: -2, y: 2},{x: -3, y: 3},{x: -4, y: 4},{x: -5, y: 5},{x: -6, y: 6},{x: -7, y: 7}]);
          c4 = main.methods.b_options(position,[{x: -1, y: -1},{x: -2, y: -2},{x: -3, y: -3},{x: -4, y: -4},{x: -5, y: -5},{x: -6, y: -6},{x: -7, y: -7}]);

          coordinates = c1.concat(c2).concat(c3).concat(c4);

          options = coordinates.slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);
          break;
        case 'w_knight':

          coordinates = [{ x: -1, y: 2 },{ x: 1, y: 2 },{ x: 1, y: -2 },{ x: -1, y: -2 },{ x: 2, y: 1 },{ x: 2, y: -1 },{ x: -2, y: -1 },{ x: -2, y: 1 }].map(function(val){
            return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
          });

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        case 'b_knight':

          coordinates = [{ x: -1, y: 2 },{ x: 1, y: 2 },{ x: 1, y: -2 },{ x: -1, y: -2 },{ x: 2, y: 1 },{ x: 2, y: -1 },{ x: -2, y: -1 },{ x: -2, y: 1 }].map(function(val){
            return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
          });

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;
        case 'w_rook':

          c1 = main.methods.w_options(position,[{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 6, y: 0},{x: 7, y: 0}]);
          c2 = main.methods.w_options(position,[{x: 0, y: 1},{x: 0, y: 2},{x: 0, y: 3},{x: 0, y: 4},{x: 0, y: 5},{x: 0, y: 6},{x: 0, y: 7}]);
          c3 = main.methods.w_options(position,[{x: -1, y: 0},{x: -2, y: 0},{x: -3, y: 0},{x: -4, y: 0},{x: -5, y: 0},{x: -6, y: 0},{x: -7, y: 0}]);
          c4 = main.methods.w_options(position,[{x: 0, y: -1},{x: 0, y: -2},{x: 0, y: -3},{x: 0, y: -4},{x: 0, y: -5},{x: 0, y: -6},{x: 0, y: -7}]);

          coordinates = c1.concat(c2).concat(c3).concat(c4);

          options = coordinates.slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);
          
          break;
        case 'b_rook':
        
          c1 = main.methods.b_options(position,[{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 6, y: 0},{x: 7, y: 0}]);
          c2 = main.methods.b_options(position,[{x: 0, y: 1},{x: 0, y: 2},{x: 0, y: 3},{x: 0, y: 4},{x: 0, y: 5},{x: 0, y: 6},{x: 0, y: 7}]);
          c3 = main.methods.b_options(position,[{x: -1, y: 0},{x: -2, y: 0},{x: -3, y: 0},{x: -4, y: 0},{x: -5, y: 0},{x: -6, y: 0},{x: -7, y: 0}]);
          c4 = main.methods.b_options(position,[{x: 0, y: -1},{x: 0, y: -2},{x: 0, y: -3},{x: 0, y: -4},{x: 0, y: -5},{x: 0, y: -6},{x: 0, y: -7}]);

          coordinates = c1.concat(c2).concat(c3).concat(c4);

          options = coordinates.slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);
          
          break;
        case 'w_pawn':

          if (main.variables.pieces[selectedpiece].moved == false) {

            coordinates = [{ x: 0, y: 1 },{ x: 0, y: 2 },{ x: 1, y: 1 },{ x: -1, y: 1 }].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });

          }
          else if (main.variables.pieces[selectedpiece].moved == true) {

            coordinates = [{ x: 0, y: 1 },{ x: 1, y: 1 },{ x: -1, y: 1 }].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });

          }

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;

        case 'b_pawn':

          // calculate pawn options
          if (main.variables.pieces[selectedpiece].moved == false) {

            coordinates = [{ x: 0, y: -1 },{ x: 0, y: -2 },{ x: 1, y: -1 },{ x: -1, y: -1 }].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });

          }
          else if (main.variables.pieces[selectedpiece].moved == true) {

            coordinates = [{ x: 0, y: -1 },{ x: 1, y: -1 },{ x: -1, y: -1 }].map(function(val){
              return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
            });

          }

          options = (main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type)).slice(0);
          main.variables.highlighted = options.slice(0);
          main.methods.togglehighlight(options);

          break;

      }
    },

    options: function(startpoint, coordinates, piecetype) { // first check if any of the possible coordinates is out of bounds;
        
      coordinates = coordinates.filter(val => {
        let pos = { x: 0, y: 0 };
        pos.x = parseInt(val.split('_')[0]);
        pos.y = parseInt(val.split('_')[1]);

        if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) { // if it is not out of bounds, return the coordinate;
          return val;
        }
      });

      switch (piecetype) {

        case 'w_king':

          coordinates = coordinates.filter(val => {
            return ($('#' + val).attr('chess') == 'null' || ($('#' + val).attr('chess')).slice(0,1) == 'b');
          });

          break;
        case 'b_king':
        
          coordinates = coordinates.filter(val => {
            return ($('#' + val).attr('chess') == 'null' || ($('#' + val).attr('chess')).slice(0,1) == 'w');
          });

          break;
        case 'w_knight':

          coordinates = coordinates.filter(val => {
            return ($('#' + val).attr('chess') == 'null' || ($('#' + val).attr('chess')).slice(0,1) == 'b');
          });

          break;

        case 'b_knight':

          coordinates = coordinates.filter(val => {
            return ($('#' + val).attr('chess') == 'null' || ($('#' + val).attr('chess')).slice(0,1) == 'w');
          });

          break;

        case 'w_pawn':

            coordinates = coordinates.filter(val => {
              let sp = { x: 0, y: 0 };
              let coordinate = val.split('_');

              sp.x = startpoint.split('_')[0];
              sp.y = startpoint.split('_')[1];
              
              if (coordinate[0] < sp.x || coordinate[0] > sp.x){ // if the coordinate is on either side of the center, check if it has an opponent piece on it;
                return ($('#' + val).attr('chess') != 'null' && ($('#' + val).attr('chess')).slice(0,1) == 'b'); // return coordinates with opponent pieces on them
              } else { // else if the coordinate is in the center;
                if (coordinate[1] == (parseInt(sp.y) + 2) && $('#' + sp.x + '_' + (parseInt(sp.y) + 1)).attr('chess') != 'null'){
                  // do nothing if this is the pawns first move, and there is a piece in front of the 2nd coordinate;
                } else {
                  return ($('#' + val).attr('chess') == 'null'); // otherwise return the coordinate if there is no chess piece on it;
                }
              }
                          
            });
         
          break;

        case 'b_pawn':

          coordinates = coordinates.filter(val => {
            let sp = { x: 0, y: 0 };
            let coordinate = val.split('_');

            sp.x = startpoint.split('_')[0];
            sp.y = startpoint.split('_')[1];
            
            if (coordinate[0] < sp.x || coordinate[0] > sp.x){ // if the coordinate is on either side of the center, check if it has an opponent piece on it;
              return ($('#' + val).attr('chess') != 'null' && ($('#' + val).attr('chess')).slice(0,1) == 'w'); // return coordinates with opponent pieces on them
            } else { // else if the coordinate is in the center;
              if (coordinate[1] == (parseInt(sp.y) - 2) && $('#' + sp.x + '_' + (parseInt(sp.y) - 1)).attr('chess') != 'null'){
                // do nothing if this is the pawns first move, and there is a piece in front of the 2nd coordinate;
              } else {
                return ($('#' + val).attr('chess') == 'null'); // otherwise return the coordinate if there is no chess piece on it;
              }
            }
          });

          break;
      }      

      return coordinates;
    },

    w_options: function (position,coordinates) {
      
      let flag = false;
      
      coordinates = coordinates.map(function(val){ // convert the x,y into actual grid id coordinates;
          return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
        }).filter(val => {
          let pos = { x: 0, y: 0 };
          pos.x = parseInt(val.split('_')[0]);
          pos.y = parseInt(val.split('_')[1]);
  
          if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) { // if it is not out of bounds, return the coordinate;
            return val;
          }
        }).filter(val => { // algorithm to determine line-of-sight movement options for bishop/rook/queen;
          if (flag == false){
            if ($('#' + val).attr('chess') == 'null'){
              return val;
            } else if (($('#' + val).attr('chess')).slice(0,1) == 'b') {
              flag = true;
              return val;
            } else if (($('#' + val).attr('chess')).slice(0,1) == 'w') {
              flag = true;
            }
          }
        });

      return coordinates;
      
    },

    b_options: function (position,coordinates) {
      
      let flag = false;
      
      coordinates = coordinates.map(function(val){ // convert the x,y into actual grid id coordinates;
          return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
        }).filter(val => {
          let pos = { x: 0, y: 0 };
          pos.x = parseInt(val.split('_')[0]);
          pos.y = parseInt(val.split('_')[1]);
  
          if (!(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8)) { // if it is not out of bounds, return the coordinate;
            return val;
          }
        }).filter(val => { // algorithm to determine line-of-sight movement options for bishop/rook/queen;
          if (flag == false){
            if ($('#' + val).attr('chess') == 'null'){
              return val;
            } else if (($('#' + val).attr('chess')).slice(0,1) == 'w') {
              flag = true;
              return val;
            } else if (($('#' + val).attr('chess')).slice(0,1) == 'b') {
              flag = true;
            }
          }
        });

      return coordinates;
      
    },

    capture: function (target) {
      let selectedpiece = {
        name: $('#' + main.variables.selectedpiece).attr('chess'),
        id: main.variables.selectedpiece
      };

      
        //new cell
        $('#' + target.id).html(main.variables.pieces[selectedpiece.name].img);
        $('#' + target.id).attr('chess',selectedpiece.name);
        //old cell
        $('#' + selectedpiece.id).html('');
        $('#' + selectedpiece.id).attr('chess','null');
        //moved piece
        main.variables.pieces[selectedpiece.name].position = target.id;
        main.variables.pieces[selectedpiece.name].moved = true;
        // captured piece
        main.variables.pieces[target.name].captured = true;
      
    },

    move: function (target) {

      let selectedpiece = $('#' + main.variables.selectedpiece).attr('chess');

      // new cell
      $('#' + target.id).html(main.variables.pieces[selectedpiece].img);
      $('#' + target.id).attr('chess',selectedpiece);
      // old cell
      $('#' + main.variables.selectedpiece).html('');
      $('#' + main.variables.selectedpiece).attr('chess','null');
      main.variables.pieces[selectedpiece].position = target.id;
      main.variables.pieces[selectedpiece].moved = true;
    },

    endturn: function(){

      if (main.variables.turn == 'w') {
        main.variables.turn = 'b';
        
        // toggle highlighted coordinates
        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;
        // set the selected piece to '' again
        main.variables.selectedpiece = '';

        $('#turn').html("It's Blacks Turn");

        $('#turn').addClass('turnhighlight');
        window.setTimeout(function(){
          $('#turn').removeClass('turnhighlight');
        }, 1500);

      } else if (main.variables.turn = 'b'){
        main.variables.turn = 'w';

        // toggle highlighted coordinates
        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;
        // set the selected piece to '' again
        main.variables.selectedpiece = '';

        $('#turn').html("It's Whites Turn");

        $('#turn').addClass('turnhighlight');
        window.setTimeout(function(){
          $('#turn').removeClass('turnhighlight');
        }, 1500);

      }

    },

    togglehighlight: function(options) {
      options.forEach(function(element, index, array) {
        $('#' + element).toggleClass("green shake-little neongreen_txt");
      });
    },

  }
};

$(document).ready(function() {
  main.methods.gamesetup();

  $('#game').on('click', '.gamecell', function(e) {

    var selectedpiece = {
      name: '',
      id: main.variables.selectedpiece
    };

    if (main.variables.selectedpiece == ''){
      selectedpiece.name = $('#' + e.target.id).attr('chess');
    } else {
      selectedpiece.name = $('#' + main.variables.selectedpiece).attr('chess');
    }

    var target = {
      name: $(this).attr('chess'),
      id: e.target.id
    };

    if (main.variables.selectedpiece == '' && target.name.slice(0,1) == main.variables.turn) { // show options

      // moveoptions
      main.variables.selectedpiece = e.target.id;
      main.methods.moveoptions($(this).attr('chess'));

    } else if (main.variables.selectedpiece !='' && target.name == 'null') { // move selected piece piece

      if (selectedpiece.name == 'w_king' || selectedpiece.name == 'b_king'){
        
        let t0 = (selectedpiece.name == 'w_king');
        let t1 = (selectedpiece.name == 'b_king');
        let t2 = (main.variables.pieces[selectedpiece.name].moved == false);
        let t3 = (main.variables.pieces['b_rook2'].moved == false);
        let t4 = (main.variables.pieces['w_rook2'].moved == false);
        let t5 = (target.id == '7_8');
        let t6 = (target.id == '7_1');
  
        if (t0 && t2 && t4 &&t6){ // castle w_king
  
          let k_position = '5_1';
          let k_target = '7_1';
          let r_position = '8_1';
          let r_target = '6_1';
  
          main.variables.pieces['w_king'].position = '7_1';
          main.variables.pieces['w_king'].moved = true;
          $('#'+k_position).html('');
          $('#'+k_position).attr('chess','null');
          $('#'+k_target).html(main.variables.pieces['w_king'].img);
          $('#'+k_target).attr('chess','w_king');
  
          main.variables.pieces['w_rook2'].position = '6_1';
          main.variables.pieces['w_rook2'].moved = true;
          $('#'+r_position).html('');
          $('#'+r_position).attr('chess','null');
          $('#'+r_target).html(main.variables.pieces['w_rook2'].img);
          $('#'+r_target).attr('chess','w_rook2');
  
          main.methods.endturn();
  
        } else if (t1 && t2 && t3 && t5){ // castle b_king
  
          let k_position = '5_8';
          let k_target = '7_8';
          let r_position = '8_8';
          let r_target = '6_8';
  
          // w_king
          main.variables.pieces['b_king'].position = '7_8';
          main.variables.pieces['b_king'].moved = true;
          $('#'+k_position).html('');
          $('#'+k_position).attr('chess','null');
          $('#'+k_target).html(main.variables.pieces['b_king'].img);
          $('#'+k_target).attr('chess','b_king');
  
          main.variables.pieces['b_rook2'].position = '6_8';
          main.variables.pieces['b_rook2'].moved = true;
          $('#'+r_position).html('');
          $('#'+r_position).attr('chess','null');
          $('#'+r_target).html(main.variables.pieces['b_rook2'].img);
          $('#'+r_target).attr('chess','b_rook2');
  
          main.methods.endturn();
          
        } else { // move selectedpiece
          main.methods.move(target);
          main.methods.endturn();
        }
  
      } else { // else if selecedpiece.name is not white/black king than move

        main.methods.move(target);
        main.methods.endturn();

      }
        
    } else if (main.variables.selectedpiece !='' && target.name != 'null' && target.id != selectedpiece.id && selectedpiece.name.slice(0,1) != target.name.slice(0,1)){ // capture a piece
      
      if (selectedpiece.id != target.id && main.variables.highlighted.indexOf(target.id) != (-1)) { // if it's not trying to capture pieces not in its movement range
        
        // capture
        main.methods.capture(target)
        main.methods.endturn();
        
      }

    } else if (main.variables.selectedpiece !='' && target.name != 'null' && target.id != selectedpiece.id && selectedpiece.name.slice(0,1) == target.name.slice(0,1)){ // toggle move options

      // toggle
      main.methods.togglehighlight(main.variables.highlighted);
      main.variables.highlighted.length = 0;

      main.variables.selectedpiece = target.id;
      main.methods.moveoptions(target.name);

    }

  });

  $('body').contextmenu(function(e) {
    e.preventDefault();
  });

});