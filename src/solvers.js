/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme
  /*
  input: is a number, also should equal dimensions and number of pieces on board with NO conflict

  output: matrix (an array of arrays) with no conflicts that has n rooks on board AND dimensions of NxN

    instantiate a new board
      gives us access to helper functions
    iterate over board
      iterate over row
        toggle piece on
          check if there are any row or column conflicts
            if so, toggle piece off
    
    return board.rows()?
  */
  var solution = new Board({'n': n});
  
  for (var i = 0; i < solution.get('n'); i++) {
    var row = solution.get(i);
    for (var j = 0; j < row.length; j++) {
      // var piece = row[j];
      solution.togglePiece(i, j);
      if (solution.hasAnyRowConflicts() || solution.hasAnyColConflicts()) {
        solution.togglePiece(i, j);  
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  /*
  input: n 
  output: number of nxn chessboards that exist with passing solutions 
  have a solution count and a starting index count 

  strategy:
    isolate top row and check every possible solution for each position in top row.
      iterate over top row 
        iterate over everything else below top row
          store position in row         
          clear board below top row
          find next possible solution starting from position after stored position
          check for rooks conflicts
        recursive case
  */
  var solutionCount = 0; 
  var board = new Board({'n':n});

  var recurse = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        recurse(row+1);
      }

      board.togglePiece(row, i);
    }
  }
  recurse(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
