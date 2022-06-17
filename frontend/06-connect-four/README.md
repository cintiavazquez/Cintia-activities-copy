# Connect 4

This was made with jQuery and some manipulation was much easier, but the logic stays the same.

## Setup

To use `display: grid` would be tempting, but having 7 column divs with 6 `.slot`s each makes all the considerations much easier.

Styling:

- fixed width / height on the wrapper;
- wrapper is a flex;
- each col has flex 1 and is a flex on its own, with flex direction faithful to its name;
- each col has 6 `.slot` divs;
- each slot has a disc in its `:after`;
- based on the class of the slot (`player-1` or `player-2`), the background color changes.

Demo the color changes by manipulating the DOM directly. Comment how the DOM classes are the single source of truth for the whole app.

## Game basics

- The state of the game resides mainly in the `currentPlayer` binary variable;
- by clicking on a column, the current player places a tile in it;
- if there is any victory condition at the given state, display a victory message of any kind;
- else, switch players.

How to place a tile:

- after clicking on a column, let's find a way to get the first available slot index;
- if it is bigger than -1, add the class corresponding to the current player to the right slot;
- else ignore the click (AND DON'T SWITCH PLAYERS!);

Meaningful observations:

- if it is player 1's turn, can player 2 win? Ok, great!
- how do we check if player 1 has won? First, let's check if they have won on a column;
- let students come up with an algorithmic way of checking - pseudo code goes a long way;

The crucial observation here, is that the `checkVictory` function has no notion of direction - it just checks inside the passed array.

If we manage to build arrays for the affected row, we solve both problems!

Drive questions:

- how many rows do I have to check? Exactly, just one!
- which row do I have to check? I need the index of the right filled slot;
- once I have such info, you can fill an array with the slots at the same height:

```js
// Array.from is needed because NodeList has no .map
var $slotsToCheck = Array.from($columns).map(
    ($col) => $col.querySelectorAll(".slot")[rowIndex]
);
```

## Diagonal victory

Inverse proportionally to the solver's social life, they may come up with clever observations and algorithms, but since they will be also tired the safest bet is to cache and hardcode the diagonals indexes like:

```js
var diags = [
        [2, 9, 16, 23],
        [1, 8, 15, 22, 29],
        [0, 7, 14, 21, 28, 35],
        [6, 13, 20, 27, 34, 41],
        [12, 19, 26, 33, 40],
        [18, 25, 32, 39],
        [23, 28, 33, 38],
        [17, 22, 27, 32, 37],
        [11, 16, 21, 26, 31, 36],
        [5, 10, 15, 20, 25, 30],
        [4, 9, 14, 19, 24],
        [3, 8, 13, 28],
    ];
```

Observe how `document.querySelectorAll('.slot')` returns them in the convenient order. One could have cached rows and cols as well by the way, and make all the code one click handler and one loop. The solution would be approved.