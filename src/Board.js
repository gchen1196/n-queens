// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change   ');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      /*
      input: number, index of one row.
      output: boolean
        return true if conflict is found
        return false if no conflict
      what is a conflict???
        if more than one element in current row has value equal to 1
          return true
        else return false
      how to access the board??
        use keyword this to access board
          this.rows()
      iterate over this.rows()[rowIndex]
      */
      // var currentRow = this.rows()[rowIndex];
      var count = 0;
      for (var i = 0; i < this.get(rowIndex).length; i++) {
        var element = this.get(rowIndex)[i];
        if (element === 1) {
          count += 1;
        }
      }
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
     /*
     consider using attributes to access rows
     */
     for (var i = 0; i < Object.keys(this.attributes).length; i++) {
       var currentRow = Object.keys(this.attributes)[i];
       var count = 0;
       if (this.hasRowConflictAt(currentRow)) {
         return true;
       }
      //  for (var j = 0; j < currentRow.length; j++) {
      //    var element = currentRow[j];
      //    if (element === 1) {
      //     count++;
      //    }
      //  }
      //  if (count > 1) {
      //    return true;
      //  }
     }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      /*
      is it possible to turn each column into a row to then use row functions on columns
      iterate over boad
        use colIndex to access column element in each row
        store each column element in new array
      somehow use hasRowConflictAt on new array
      */
      var columnArray = [];
      for (var i = 0; i < this.rows().length; i++) {
        var row = this.rows()[i];
        columnArray.push(row[colIndex]);
      }

      var count = 0;
      for (var i = 0; i < columnArray.length; i++) {
        var element = columnArray[i];
        if (element === 1) {
          count += 1;
        }
      }
      if (count > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      /*
      iterate over board
        invoke hasColConflictAt(i)
        if true return true
      */
     for (var i = 0; i < Object.keys(this.attributes).length; i++) {
       var ele = Object.keys(this.attributes)[i]
       if (this.hasColConflictAt(ele)) {
         return true;
       }
     }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      /*
      input: index number of column at the first row
      output: boolean
      example:  
        input is 0
        store input as a variable
        count variable
        iterate over board
          check input var value to see if eqauls 1
            if so, increase count +1  
          next iteration increase input var + 1 to see if equal 1

          need formula that gives us a range to iterate over based on input index number
      */
     

      var input = majorDiagonalColumnIndexAtFirstRow; //-2
      var count = 0;
      for (var i = -(Object.keys(this.attributes).length - 1); i < (Object.keys(this.attributes).length - 1); i++) {
        if (i >= 0) {
          var rowElement = this.attributes[i][input];
          if (rowElement === 1) {
            count++;
          }
          input++;
        }  
     }
     if (count > 1) {
       return true;
     }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (var i = -(Object.keys(this.attributes).length - 1); i < (Object.keys(this.attributes).length - 1); i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) { //4
      /*
      need a count variable that increments when row element = 1
      need to decrease input every iteration
      range of iteration should be (Object.keys(this.attributes).length - 1) * 2
      Use i only if it is less than Object.keys(this.attributes).length - 1

      */
      var count = 0;
      var input = minorDiagonalColumnIndexAtFirstRow; //4
      var range = this.get('n') * 2; //8

      for (var i = 0; i < range; i++) {
        if (i < this.get('n')) {
          var rowElement = this.attributes[i][input];
          if (rowElement === 1) {
            count++;
          }
          input--;
        } 
      }
      if (count > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      /*
      iterate range of 
      */
      var range = (Object.keys(this.attributes).length - 1) * 2;

      for (var i = 0; i < range; i++) {
          if (this.hasMinorDiagonalConflictAt(i) === true) {
            return true;
          }
        }
        return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
