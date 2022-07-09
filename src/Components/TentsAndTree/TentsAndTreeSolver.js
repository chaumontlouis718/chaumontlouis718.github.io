const TentsAndTreeSolver = (gridToSolve) => {
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

    // Regarder les valeurs dans sommeColonnes et sommeLignes, et mettre des tentes dans toutes les cases noires d'une ligne/colonnes si le nbr est égal au nbr de cases noirs
    //  :: Il y a 3 cases noirs et 0 tente sur une lignes, et le chiffres de la ligne est 3.
    //  :: Il y a 2 cases noirs et 2 tente sur une colonne, et le chiffre de la colonnes est 4.
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
                applyChangeToGrid(2, indexLigne, indexColonne);
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

    // Analyser le nombre de cases noires disponibles et leurs positions, afin de déterminer les cases ou il y a forcément une tente.
    // On analyse chaque combinaisation possibles afin de trouver les cases qui reviennent dans chaque configuration
    function applyStrategieDeux() {
        gridToSolve.grid.forEach(function (ligne, indexLigne) {
            var caseDisponible = countCaseDisponibles(ligne);
            var positions = getFreeSquarePosition(ligne);
            positions = positions.map(function (position) {
                return { ligne: indexLigne, colonne: position };
            });
            var indicateurNbrTenteLigne = gridToSolve.sommeLignes[indexLigne];

            var combinaisons = generateCombinations(
                positions,
                indicateurNbrTenteLigne - caseDisponible.nbrTenteDejaPlaces
            );

            var combinaisonsFiltered = combinaisons.filter(function (positions) {
                var flag = false;
                positions.forEach(function (position) {
                    if (
                        findInArray(positions, { ligne: position.ligne, colonne: position.colonne + 1 }) ||
                        findInArray(positions, { ligne: position.ligne, colonne: position.colonne - 1 })
                    ) {
                        flag = true;
                    }
                });
                return !flag;
            });

            var temps = combinaisonsFiltered[0];
            combinaisonsFiltered.forEach(function (combinaisons) {
                temps = temps.filter(function (element) {
                    return findInArray(combinaisons, element);
                });
            });

            if (typeof temps !== "undefined" && temps > 0) {
                temps.forEach(function (element) {
                    applyChangeToGrid(2, element.ligne, element.colonne);
                });
            } else {
                var allFreeSquarePossibilitiesTakenByAllCombinations = [];
                combinaisonsFiltered.forEach(function (combinaisons) {
                    var allFreeSquarePossibilitiesTakenByOneCombinations = [];
                    combinaisons.forEach(function (caze) {
                        allFreeSquarePossibilitiesTakenByOneCombinations =
                            allFreeSquarePossibilitiesTakenByOneCombinations.concat(
                                getAllFreeSquareAroundAnOtherOne(caze.ligne, caze.colonne)
                            );
                    });
                    allFreeSquarePossibilitiesTakenByAllCombinations.push(
                        multiDimensionalUnique(allFreeSquarePossibilitiesTakenByOneCombinations)
                    );
                });

                var tempsFreeSquarePossibilities = allFreeSquarePossibilitiesTakenByAllCombinations[0];
                allFreeSquarePossibilitiesTakenByAllCombinations.forEach(function (freeSquarePossibilities) {
                    tempsFreeSquarePossibilities = tempsFreeSquarePossibilities.filter(function (element) {
                        return findArrayInArray(freeSquarePossibilities, element);
                    });
                });

                if (typeof tempsFreeSquarePossibilities !== "undefined" && tempsFreeSquarePossibilities.length > 0) {
                    tempsFreeSquarePossibilities.forEach(function (element) {
                        applyChangeToGrid(1, element[0], element[1]);
                    });
                }
            }
        });

        gridToSolve.gridInversed.forEach(function (colonne, indexColonne) {
            var caseDisponible = countCaseDisponibles(colonne);
            var positions = getFreeSquarePosition(colonne);
            positions = positions.map(function (position) {
                return { ligne: position, colonne: indexColonne };
            });
            var indicateurNbrTenteColonne = gridToSolve.sommeColonnes[indexColonne];

            var combinaisons = generateCombinations(
                positions,
                indicateurNbrTenteColonne - caseDisponible.nbrTenteDejaPlaces
            );

            var combinaisonsFiltered = combinaisons.filter(function (positions) {
                var flag = false;
                positions.forEach(function (position) {
                    if (
                        findInArray(positions, { ligne: position.ligne + 1, colonne: position.colonne }) ||
                        findInArray(positions, { ligne: position.ligne - 1, colonne: position.colonne })
                    ) {
                        flag = true;
                    }
                });
                return !flag;
            });

            var temps = combinaisonsFiltered[0];
            combinaisonsFiltered.forEach(function (combinaisons) {
                temps = temps.filter(function (element) {
                    return findInArray(combinaisons, element);
                });
            });

            if (typeof temps !== "undefined" && temps > 0) {
                temps.forEach(function (element) {
                    applyChangeToGrid(2, element.ligne, element.colonne);
                });
            } else {
                var allFreeSquarePossibilitiesTakenByAllCombinations = [];
                combinaisonsFiltered.forEach(function (combinaisons) {
                    var allFreeSquarePossibilitiesTakenByOneCombinations = [];
                    combinaisons.forEach(function (caze) {
                        allFreeSquarePossibilitiesTakenByOneCombinations =
                            allFreeSquarePossibilitiesTakenByOneCombinations.concat(
                                getAllFreeSquareAroundAnOtherOne(caze.ligne, caze.colonne)
                            );
                    });
                    allFreeSquarePossibilitiesTakenByAllCombinations.push(
                        multiDimensionalUnique(allFreeSquarePossibilitiesTakenByOneCombinations)
                    );
                });

                var tempsFreeSquarePossibilities = allFreeSquarePossibilitiesTakenByAllCombinations[0];
                allFreeSquarePossibilitiesTakenByAllCombinations.forEach(function (freeSquarePossibilities) {
                    tempsFreeSquarePossibilities = tempsFreeSquarePossibilities.filter(function (element) {
                        return findArrayInArray(freeSquarePossibilities, element);
                    });
                });

                if (typeof tempsFreeSquarePossibilities !== "undefined" && tempsFreeSquarePossibilities.length > 0) {
                    tempsFreeSquarePossibilities.forEach(function (element) {
                        applyChangeToGrid(1, element[0], element[1]);
                    });
                }
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
            const oneAwayFromComboLength = remainingCount === 1;

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

    // Vérifier si un arbre qui n'as pas encore de tente n'a pas plus qu'une seul case disponible à côté de lui : c'est une tente
    // Il faut chaîner si il a déjà une tente pour vérifier si c'est bien sa tente ou pas.
    function applyStrategieTrois() {}

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
        applyChangeToInversedGrid(value, indexLigne, indexColonne);
        if (value === 2) {
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

    function getAllFreeSquareAroundAnOtherOne(indexLigne, indexColonne) {
        var returnArray = [];

        if (
            gridToSolve.grid[indexLigne - 1] !== undefined &&
            gridToSolve.grid[indexLigne - 1][indexColonne - 1] !== undefined &&
            gridToSolve.grid[indexLigne - 1][indexColonne - 1] === 0
        ) {
            returnArray.push([indexLigne - 1, indexColonne - 1]);
        }

        if (
            gridToSolve.grid[indexLigne - 1] !== undefined &&
            gridToSolve.grid[indexLigne - 1][indexColonne] !== undefined &&
            gridToSolve.grid[indexLigne - 1][indexColonne] === 0
        ) {
            returnArray.push([indexLigne - 1, indexColonne]);
        }

        if (
            gridToSolve.grid[indexLigne - 1] !== undefined &&
            gridToSolve.grid[indexLigne - 1][indexColonne + 1] !== undefined &&
            gridToSolve.grid[indexLigne - 1][indexColonne + 1] === 0
        ) {
            returnArray.push([indexLigne - 1, indexColonne + 1]);
        }

        if (
            gridToSolve.grid[indexLigne] !== undefined &&
            gridToSolve.grid[indexLigne][indexColonne - 1] !== undefined &&
            gridToSolve.grid[indexLigne][indexColonne - 1] === 0
        ) {
            returnArray.push([indexLigne, indexColonne - 1]);
        }

        if (
            gridToSolve.grid[indexLigne] !== undefined &&
            gridToSolve.grid[indexLigne][indexColonne + 1] !== undefined &&
            gridToSolve.grid[indexLigne][indexColonne + 1] === 0
        ) {
            returnArray.push([indexLigne, indexColonne + 1]);
        }

        if (
            gridToSolve.grid[indexLigne + 1] !== undefined &&
            gridToSolve.grid[indexLigne + 1][indexColonne - 1] !== undefined &&
            gridToSolve.grid[indexLigne + 1][indexColonne - 1] === 0
        ) {
            returnArray.push([indexLigne + 1, indexColonne - 1]);
        }

        if (
            gridToSolve.grid[indexLigne + 1] !== undefined &&
            gridToSolve.grid[indexLigne + 1][indexColonne] !== undefined &&
            gridToSolve.grid[indexLigne + 1][indexColonne] === 0
        ) {
            returnArray.push([indexLigne + 1, indexColonne]);
        }

        if (
            gridToSolve.grid[indexLigne + 1] !== undefined &&
            gridToSolve.grid[indexLigne + 1][indexColonne + 1] !== undefined &&
            gridToSolve.grid[indexLigne + 1][indexColonne + 1] === 0
        ) {
            returnArray.push([indexLigne + 1, indexColonne + 1]);
        }

        return returnArray;
    }

    // Remove duplicate entry from array
    function multiDimensionalUnique(arr) {
        var uniques = [];
        var itemsFound = {};
        for (var i = 0, l = arr.length; i < l; i++) {
            var stringified = JSON.stringify(arr[i]);
            if (itemsFound[stringified]) {
                continue;
            }
            uniques.push(arr[i]);
            itemsFound[stringified] = true;
        }
        return uniques;
    }

    // Find if an object is present in array
    function findInArray(array, object) {
        return array.some((el) => el.ligne === object.ligne && el.colonne === object.colonne);
    }

    // Find if an object is present in array
    function findArrayInArray(array, arrayToFind) {
        return array.some(
            (el) => el.length === arrayToFind.length && el.every((value, index) => value === arrayToFind[index])
        );
    }

    gridToSolve.gridInversed = transpose(gridToSolve.grid);
    applyStrategieZero();
    var tempBoucle = 0;

    do {
        tempBoucle++;
        applyStrategieUn();
        applyStrategieDeux();
    } while (tempBoucle < 1);

    return gridToSolve.grid;
};

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

export default TentsAndTreeSolver;
