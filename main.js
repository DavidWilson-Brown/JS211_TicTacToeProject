'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// creates an empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = 'X';

// is a function that prints the current status of the board using the variable - board
const printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
};

// assume that
// let board = [
//  [0, 1, 2],
//  [3, 4, 5],
//  [6, 7, 8]
//  ];

const horizontalWin = () => {
  // Your code here to check for horizontal wins
  // if [0][0] == [0][1] && [0][0] == [0][2] --> return true
  // if [1][0] == [1][1] && [1][0] == [1][2] --> return true
  // if [2][0] == [2][1] && [2][0] == [2][2] --> return true
  if (board[0][0] == board[0][1] && board[0][0] === board[0][2]) {
    return true;
  } else if (board[1][0] == board[1][1] && board[1][0] === board[1][2]) {
    return true;
  } else if (board[2][0] == board[2][1] && board[2][0] === board[2][2]) {
    return true;
  }
};

const verticalWin = () => {
  // Your code here to check for horizontal wins
  // if [0][0] == [0][1] && [0][0] == [0][2] --> return true
  // if [0][1] == [1][1] && [0][1] == [1][2] --> return true
  // if [0][2] == [1][2] && [0][2] == [2][2] --> return true
  if (board[0][0] == board[0][1] && board[0][0] === board[0][2]) {
    return true;
  } else if (board[0][1] == board[1][1] && board[0][1] === board[1][2]) {
    return true;
  } else if (board[0][2] == board[1][2] && board[0][2] === board[2][2]) {
    return true;
  }
};

const diagonalWin = () => {
  // Your code here to check for diagonal wins
  // if [0][0] == [1][1] && [0][0] == [2][2] --> return true
  // if [0][2] == [1][1] && [0][2] == [2][0] --> return true
  if (board[0][0] == board[1][1] && board[0][0] === board[2][2]) {
    return true;
  } else if (board[0][2] == board[1][1] && board[0][2] === board[2][0]) {
    return true;
  }
};

// these functions will only return a win if the condition is met or is true
const checkForWin = () => {
  // Your code here call each of the check for types of wins
  if (horizontalWin() ) {
    return true 
   } else if(verticalWin()) {
    return true
   } else if(diagonalWin()) {
    return true
  }
};

const ticTacToe = (row, column) => {
  // Your code here to place a marker on the board
  // then check for a win

  // assign the player's turn to the specified row & column
  board[row][column] = playerTurn;

  // alternate between players
  if(playerTurn === 'X') {
    playerTurn = 'O'
  } else if(playerTurn === 'O') {
    playerTurn = 'X';
  }
  // check for a win
    checkForWin();
};

const getPrompt = () => {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
};

// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {
  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [
        [' ', ' ', ' '],
        [' ', 'X', ' '],
        [' ', ' ', ' '],
      ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [
        ['O', ' ', ' '],
        [' ', 'X', ' '],
        [' ', ' ', ' '],
      ]);
    });
    it('should check for vertical wins', () => {
      board = [
        [' ', 'X', ' '],
        [' ', 'X', ' '],
        [' ', 'X', ' '],
      ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [
        ['X', 'X', 'X'],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
      ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [
        ['X', ' ', ' '],
        [' ', 'X', ' '],
        [' ', ' ', 'X'],
      ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      ticTacToe(0, 0);
      ticTacToe(0, 1);
      ticTacToe(1, 1);
      ticTacToe(0, 2);
      ticTacToe(2, 2);
      assert.equal(checkForWin(), true);
    });
  });
} else {
  getPrompt();
}
