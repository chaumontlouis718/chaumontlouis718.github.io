const Creator = (size) => {
    var grid = initMatrix();

    const numberOfTentTarget = (size * size) / 6;
    var numberOfTentActual = 0;
    var safetyTemp = 0;
    var tentAndTrees = [];

    while (numberOfTentActual < numberOfTentTarget && safetyTemp < 500) {
        safetyTemp++;
        const couplePosition = pickRandomPosInGrid();

        if (
            couplePosition.tent.x < 0 ||
            couplePosition.tent.y < 0 ||
            couplePosition.tent.x >= size ||
            couplePosition.tent.y >= size ||
            couplePosition.tree.x < 0 ||
            couplePosition.tree.y < 0 ||
            couplePosition.tree.x >= size ||
            couplePosition.tree.y >= size
        ) {
            continue;
        }

        if (
            tentAndTrees.find((tentAndTree) => {
                return (
                    (Math.abs(tentAndTree.tent.x - couplePosition.tent.x) <= 1 &&
                        Math.abs(tentAndTree.tent.y - couplePosition.tent.y) <= 1) ||
                    (tentAndTree.tree.x === couplePosition.tree.x && tentAndTree.tree.y === couplePosition.tree.y)
                );
            })
        ) {
            continue;
        }

        tentAndTrees.push(couplePosition);
    }

    tentAndTrees.forEach((tentAndTree) => {
        grid[tentAndTree.tent.y][tentAndTree.tent.x] = 2;
        grid[tentAndTree.tree.y][tentAndTree.tree.x] = 3;
    });

    const sumLigne = grid.map((row) => {
        return row.reduce((accumulator, currentValue) => {
            return currentValue === 2 ? accumulator + 1 : accumulator;
        }, 0);
    });

    const sumColumn = transpose(grid).map((row) => {
        return row.reduce((accumulator, currentValue) => {
            return currentValue === 2 ? accumulator + 1 : accumulator;
        }, 0);
    });

    grid = grid.map((row) => {
        return row.map((value) => {
            return value === 2 ? 0 : value;
        }, 0);
    });

    return {
        sumColumn: sumColumn,
        sumLigne: sumLigne,
        grid: grid,
    };

    /*
    return {
        sumColumn: [3, 1, 3, 2, 1, 3, 2, 2, 1, 3],
        sumLigne: [4, 0, 4, 1, 1, 4, 0, 2, 2, 3],
        grid: [
            [0, 0, 0, 0, 3, 0, 3, 0, 3, 0],
            [3, 3, 0, 0, 0, 0, 0, 0, 3, 0],
            [0, 3, 0, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 3, 0, 0, 3, 0, 3],
            [0, 3, 0, 0, 3, 0, 0, 0, 0, 0],
            [0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
            [3, 0, 0, 0, 0, 3, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 3, 3, 0],
            [0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
        ],
    };
    */

    function pickRandomPosInGrid() {
        const tent = {
            x: getRandomInt(size),
            y: getRandomInt(size),
        };

        const axeDifferential = getRandomInt(2) === 1 ? "x" : "y";

        const tree = {
            x: axeDifferential === "x" ? tent.x + (getRandomInt(2) === 1 ? 1 : -1) : tent.x,
            y: axeDifferential === "y" ? tent.y + (getRandomInt(2) === 1 ? 1 : -1) : tent.y,
        };

        return {
            tent: tent,
            tree: tree,
        };
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function initMatrix() {
        return Array(size)
            .fill(null)
            .map(() => Array(size).fill(0));
    }

    function transpose(matrix) {
        return matrix[0].map((col, i) => matrix.map((row) => row[i]));
    }
};

// Définir le nombre de tentes à poser de base sur une grille en fonction de la taille de cell-ci : size²/6? ou fixe si la flemme
// Jusque ce que toutes les tentes soit posées, ou qu'on arrive plus à en poser, on essaye de trouver des emplacements pour un couple tente/arbre dans la grille.

export default Creator;
