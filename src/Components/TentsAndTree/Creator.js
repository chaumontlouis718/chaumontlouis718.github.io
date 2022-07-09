const Creator = (size) => {
    console.log(size);

    var grid = initMatrix();

    console.log(grid);

    const numberOfTentTarget = (size * size) / 6;
    var numberOfTentActual = 0;
    var safetyTemp = 0;

    console.log(numberOfTentTarget);

    while (numberOfTentActual < numberOfTentTarget && safetyTemp < 100) {
        const couplePosition = pickRandomPosInGrid();
        console.log(couplePosition);

        safetyTemp++;
    }

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
};

// Définir le nombre de tentes à poser de base sur une grille en fonction de la taille de cell-ci : size²/6? ou fixe si la flemme
// Jusque ce que toutes les tentes soit posées, ou qu'on arrive plus à en poser, on essaye de trouver des emplacements pour un couple tente/arbre dans la grille.

export default Creator;
