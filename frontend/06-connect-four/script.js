var ROWS = 6;

(function () {
    console.log("Connect Four!");

    // cache selectors
    var $title = document.querySelector("h1");
    var $board = document.querySelector(".connect-four");
    var $columns = $board.querySelectorAll(".column");

    // fill columns
    $columns.forEach(function ($col) {
        for (var row = 0; row < ROWS; row++) {
            $col.innerHTML += '<div class="slot"></div>';
        }
    });
    var $slots = $board.querySelectorAll(".slot");

    var currentPlayer = 1;

    $columns.forEach(function ($col, colIndex) {
        $col.addEventListener("click", function () {
            var $columnSlots = $col.querySelectorAll(".slot");
            var rowIndex = getFirstEmptySlot($columnSlots);
            // columns is full!
            if (rowIndex < 0) {
                return;
            }

            // place the tile in the right slot
            $columnSlots[rowIndex].classList.add("player-" + currentPlayer);

            if (
                checkVerticalVictory(colIndex) ||
                checkHorizontalVictory(rowIndex) ||
                checkDiagonalVictory()
            ) {
                $board.classList.add("win");
                $title.innerText = "Player " + currentPlayer + " won!";
                setTimeout(resetGame, 1000);
                return;
            }
            switchPlayers();
        });
    });

    function getFirstEmptySlot($slots) {
        // default to -1
        // SEE: Array.prototype.indexOf
        var firstEmptySlotIndex = -1;
        // start from the bottom!
        for (var i = $slots.length - 1; i >= 0; i--) {
            var isSlotEmpty =
                !$slots[i].classList.contains("player-1") &&
                !$slots[i].classList.contains("player-2");

            if (isSlotEmpty) {
                firstEmptySlotIndex = i;
                break;
            }
        }
        return firstEmptySlotIndex;
    }

    function checkVictory($slotsToCheck) {
        var count = 0;
        for (var i = 0; i < $slotsToCheck.length; i++) {
            if (
                !$slotsToCheck[i].classList.contains("player-" + currentPlayer)
            ) {
                count = 0;
                continue;
            }
            count++;
            if (count < 4) {
                continue;
            }
            return true;
        }
        return false;
    }

    function checkVerticalVictory(colIndex) {
        return checkVictory($columns[colIndex].querySelectorAll(".slot"));
    }

    function checkHorizontalVictory(rowIndex) {
        var $slotsToCheck = Array.from($columns).map(
            ($col) => $col.querySelectorAll(".slot")[rowIndex]
        );
        return checkVictory($slotsToCheck);
    }

    function checkDiagonalVictory() {
        for (var i = 0; i < diags.length; i++) {
            const $diag = diags[i].map((index) => $slots[index]);
            if (!checkVictory($diag)) {
                continue;
            }
            return true;
        }
    }

    function switchPlayers() {
        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }
        $title.className = "";
        $title.classList.add("player-" + currentPlayer);
        $title.innerText = "Player " + currentPlayer + " turn";
    }

    function resetGame() {
        $board.classList.remove("win");
        $slots.forEach((el) => {
            el.classList.remove("player-1");
            el.classList.remove("player-2");
        });

        $title.classList.remove("player-2");
        $title.classList.add("player-1");
        $title.innerText = "Player 1 turn";
        currentPlayer = 1;
    }

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
})();
