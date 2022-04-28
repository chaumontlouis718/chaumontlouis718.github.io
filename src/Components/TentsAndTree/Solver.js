const Solver = (gridToSolve) => {
    var casesModifie = 0;

    // Une tente est forcément à côté d'un arbre
    // Donc il n'y a pas de tente sur les cases isolées, c'est à dire sans aucun arbre à côté, donc c'est forcément du gazon.
    function applyStrategieZero() {
        gridToSolve.grid = gridToSolve.grid.map(function (ligne, indexLigne) {
            return ligne.map(function (valeurCase, indexColonne) {
                if (valeurCase === 0) {
                    if (
                        gridToSolve.grid[indexLigne - 1] !== undefined &&
                        gridToSolve.grid[indexLigne - 1][indexColonne] === 3
                    )
                        return 0;
                    if (
                        gridToSolve.grid[indexLigne][indexColonne - 1] !== undefined &&
                        gridToSolve.grid[indexLigne][indexColonne - 1] === 3
                    )
                        return 0;
                    if (
                        gridToSolve.grid[indexLigne + 1] !== undefined &&
                        gridToSolve.grid[indexLigne + 1][indexColonne] === 3
                    )
                        return 0;
                    if (
                        gridToSolve.grid[indexLigne][indexColonne + 1] !== undefined &&
                        gridToSolve.grid[indexLigne][indexColonne + 1] === 3
                    )
                        return 0;
                    applyChangeToInversedGrid(1, indexLigne, indexColonne);
                    return 1;
                } else return valeurCase;
            });
        });
    }

    function applyStrategieUn() {
        gridToSolve.sommeColonnes.forEach(function (indicateurColonne, indexSommeColonne) {
            if (indicateurColonne === 0) {
                replaceAllBlackSquareByGazonColonne(indexSommeColonne);
            } else {
                var caseDisponible = countCaseDisponibles(gridToSolve.gridInversed[indexSommeColonne]);
                if (caseDisponible.nbrTenteDejaPlaces === indicateurColonne && caseDisponible.nbrBlackSquare !== 0) {
                    replaceAllBlackSquareByGazonColonne(indexSommeColonne);
                } else if (caseDisponible.nbrBlackSquare === indicateurColonne - caseDisponible.nbrTenteDejaPlaces) {
                    replaceAllBlackSquareByTenteColonne(indexSommeColonne);
                }
            }
        });

        gridToSolve.sommeLignes.forEach(function (indicateurLigne, indexSommeLigne) {
            if (indicateurLigne === 0) {
                replaceAllBlackSquareByGazonLigne(indexSommeLigne);
            } else {
                var caseDisponible = countCaseDisponibles(gridToSolve.grid[indexSommeLigne]);
                if (caseDisponible.nbrTenteDejaPlaces === indicateurLigne && caseDisponible.nbrBlackSquare !== 0) {
                    replaceAllBlackSquareByGazonLigne(indexSommeLigne);
                } else if (caseDisponible.nbrBlackSquare === indicateurLigne - caseDisponible.nbrTenteDejaPlaces) {
                    replaceAllBlackSquareByTenteLigne(indexSommeLigne);
                }
            }
        });
    }

    function replaceAllBlackSquareByGazonLigne(indexLigne) {
        gridToSolve.grid[indexLigne] = gridToSolve.grid[indexLigne].map(function (valeurCase, indexColonne) {
            if (valeurCase === 0) {
                applyChangeToInversedGrid(1, indexLigne, indexColonne);
                return 1;
            } else return valeurCase;
        });
    }

    function replaceAllBlackSquareByGazonColonne(indexColonne) {
        gridToSolve.gridInversed[indexColonne] = gridToSolve.gridInversed[indexColonne].map(function (
            valeurCase,
            indexLigne
        ) {
            if (valeurCase === 0) {
                applyChangeToGrid(1, indexLigne, indexColonne);
                return 1;
            } else return valeurCase;
        });
    }

    function replaceAllBlackSquareByTenteLigne(indexLigne) {
        gridToSolve.grid[indexLigne] = gridToSolve.grid[indexLigne].map(function (valeurCase, indexColonne) {
            if (valeurCase === 0) {
                applyChangeToInversedGrid(2, indexLigne, indexColonne);
                return 2;
            } else return valeurCase;
        });
    }

    function replaceAllBlackSquareByTenteColonne(indexColonne) {
        gridToSolve.gridInversed[indexColonne] = gridToSolve.gridInversed[indexColonne].map(function (
            valeurCase,
            indexLigne
        ) {
            if (valeurCase === 0) {
                applyChangeToGrid(2, indexLigne, indexColonne);
                return 2;
            } else return valeurCase;
        });
    }

    function applyStrategieDeux() {
        gridToSolve.grid.forEach(function (ligne, indexLigne) {
            var caseDisponible = countCaseDisponibles(ligne);
            var positions = getFreeSquarePosition(ligne);
            var indicateurNbrTenteLigne = gridToSolve.sommeLignes[indexLigne];

            var results = generateCombinations(positions, indicateurNbrTenteLigne - caseDisponible.nbrTenteDejaPlaces);
            results = results.filter(function (combinaisons) {
                var flag = false;
                combinaisons.forEach(function (position) {
                    if (!(combinaisons.indexOf(position + 1) < 0 && combinaisons.indexOf(position - 1) < 0)) {
                        flag = true;
                    }
                });
                return !flag;
            });

            var temps = results[0];
            results.forEach(function (combinaisons) {
                temps = temps.filter(function (element) {
                    return combinaisons.includes(element);
                });
            });

            if (typeof temps !== "undefined" && temps > 0) {
                temps.forEach(function (element) {
                    applyChangeToGrid(2, indexLigne, element);
                });
            }
        });

        gridToSolve.gridInversed.forEach(function (colonne, indexColonne) {
            var caseDisponible = countCaseDisponibles(colonne);
            var positions = getFreeSquarePosition(colonne);
            var indicateurNbrTenteColonne = gridToSolve.sommeColonnes[indexColonne];

            var results = generateCombinations(
                positions,
                indicateurNbrTenteColonne - caseDisponible.nbrTenteDejaPlaces
            );
            results = results.filter(function (combinaisons) {
                var flag = false;
                combinaisons.forEach(function (position) {
                    if (!(combinaisons.indexOf(position + 1) < 0 && combinaisons.indexOf(position - 1) < 0)) {
                        flag = true;
                    }
                });
                return !flag;
            });

            var temps = results[0];
            results.forEach(function (combinaisons) {
                temps = temps.filter(function (element) {
                    return combinaisons.includes(element);
                });
            });

            if (typeof temps !== "undefined" && temps > 0) {
                temps.forEach(function (element) {
                    applyChangeToGrid(2, element, indexColonne);
                });
            }
        });
    }

    function generateCombinations(sourceArray, comboLength) {
        const sourceLength = sourceArray.length;
        if (comboLength > sourceLength) return [];

        const combos = []; // Stores valid combinations as they are generated.

        // Accepts a partial combination, an index into sourceArray,
        // and the number of elements required to be added to create a full-length combination.
        // Called recursively to build combinations, adding subsequent elements at each call depth.
        const makeNextCombos = (workingCombo, currentIndex, remainingCount) => {
            const oneAwayFromComboLength = remainingCount == 1;

            // For each element that remaines to be added to the working combination.
            for (let sourceIndex = currentIndex; sourceIndex < sourceLength; sourceIndex++) {
                // Get next (possibly partial) combination.
                const next = [...workingCombo, sourceArray[sourceIndex]];

                if (oneAwayFromComboLength) {
                    // Combo of right length found, save it.
                    combos.push(next);
                } else {
                    // Otherwise go deeper to add more elements to the current partial combination.
                    makeNextCombos(next, sourceIndex + 1, remainingCount - 1);
                }
            }
        };
        makeNextCombos([], 0, comboLength);
        return combos;
    }

    function countCaseDisponibles(arr) {
        return arr.reduce(reducerCountCaseDisponibles, {
            nbrBlackSquare: 0,
            nbrTenteDejaPlaces: 0,
        });
    }

    function reducerCountCaseDisponibles(accumulator, currentValue) {
        if (currentValue === 0) {
            accumulator.nbrBlackSquare++;
        } else if (currentValue === 2) {
            accumulator.nbrTenteDejaPlaces++;
        }
        return accumulator;
    }

    function applyChangeToGrid(value, indexLigne, indexColonne) {
        gridToSolve.grid[indexLigne][indexColonne] = value;
        casesModifie++;
        applyChangeToInversedGrid(value, indexLigne, indexColonne);
        if (value == 2) {
            gazonAutourTente(indexLigne, indexColonne);
        }
    }

    function applyChangeToInversedGrid(value, indexLigne, indexColonne) {
        gridToSolve.gridInversed[indexColonne][indexLigne] = value;
    }

    function gazonAutourTente(indexLigne, indexColonne) {
        if (
            gridToSolve.grid[indexLigne - 1] != null &&
            gridToSolve.grid[indexLigne - 1][indexColonne - 1] != null &&
            gridToSolve.grid[indexLigne - 1][indexColonne - 1] === 0
        ) {
            applyChangeToGrid(1, indexLigne - 1, indexColonne - 1);
        }
        if (
            gridToSolve.grid[indexLigne - 1] != null &&
            gridToSolve.grid[indexLigne - 1][indexColonne] != null &&
            gridToSolve.grid[indexLigne - 1][indexColonne] === 0
        ) {
            applyChangeToGrid(1, indexLigne - 1, indexColonne);
        }
        if (
            gridToSolve.grid[indexLigne - 1] != null &&
            gridToSolve.grid[indexLigne - 1][indexColonne] != null &&
            gridToSolve.grid[indexLigne - 1][indexColonne + 1] === 0
        ) {
            applyChangeToGrid(1, indexLigne - 1, indexColonne + 1);
        }
        if (
            gridToSolve.grid[indexLigne][indexColonne - 1] != null &&
            gridToSolve.grid[indexLigne][indexColonne - 1] === 0
        ) {
            applyChangeToGrid(1, indexLigne, indexColonne - 1);
        }
        if (
            gridToSolve.grid[indexLigne][indexColonne + 1] != null &&
            gridToSolve.grid[indexLigne][indexColonne + 1] === 0
        ) {
            applyChangeToGrid(1, indexLigne, indexColonne + 1);
        }
        if (
            gridToSolve.grid[indexLigne + 1] != null &&
            gridToSolve.grid[indexLigne + 1][indexColonne - 1] != null &&
            gridToSolve.grid[indexLigne + 1][indexColonne - 1] === 0
        ) {
            applyChangeToGrid(1, indexLigne + 1, indexColonne - 1);
        }
        if (
            gridToSolve.grid[indexLigne + 1] != null &&
            gridToSolve.grid[indexLigne + 1][indexColonne] != null &&
            gridToSolve.grid[indexLigne + 1][indexColonne] === 0
        ) {
            applyChangeToGrid(1, indexLigne + 1, indexColonne);
        }
        if (
            gridToSolve.grid[indexLigne + 1] != null &&
            gridToSolve.grid[indexLigne + 1][indexColonne + 1] != null &&
            gridToSolve.grid[indexLigne + 1][indexColonne + 1] === 0
        ) {
            applyChangeToGrid(1, indexLigne + 1, indexColonne + 1);
        }
    }

    function getFreeSquarePosition(arr) {
        var returnArray = [];
        arr.forEach(function (element, index) {
            if (element === 0) {
                returnArray.push(index);
            }
        });
        return returnArray;
    }

    gridToSolve.gridInversed = transpose(gridToSolve.grid);
    applyStrategieZero();
    var tempBoucle = 0;
    do {
        tempBoucle++;
        applyStrategieUn();
        applyStrategieDeux();
    } while (tempBoucle < 30);
    console.log(gridToSolve.grid);
    return gridToSolve.grid;
};

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

export default Solver;
