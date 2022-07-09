import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const GameOfLifeGameBoard = (props) => {
    const [gameState, setGameState] = useState(
        Array(props.tableSize)
            .fill(null)
            .map(() => Array(props.tableSize).fill(0))
    );

    function handleClick(value, rowIndex, columnIndex) {
        var gameStateCopy = [...gameState];
        gameStateCopy[rowIndex][columnIndex] = value === 1 ? 0 : 1;
        setGameState(gameStateCopy);
    }

    function handleGenerateNewSample() {
        setGameState(
            Array(props.tableSize)
                .fill(null)
                .map(() =>
                    Array(props.tableSize)
                        .fill(null)
                        .map(() => Math.round(Math.random()))
                )
        );
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setGameState((actualGameState) => {
                var newGameState = Array(props.tableSize)
                    .fill(null)
                    .map(() => Array(props.tableSize).fill(0))
                    .map((row, rowIndex) => {
                        return row.map((actualCell, columnIndex) => {
                            var cell = actualGameState[rowIndex][columnIndex];
                            var neighboursCount = 0;

                            // Ligne du dessus
                            if (
                                actualGameState[rowIndex - 1] !== undefined &&
                                actualGameState[rowIndex - 1][columnIndex - 1] !== undefined &&
                                actualGameState[rowIndex - 1][columnIndex - 1] === 1
                            )
                                neighboursCount++;
                            if (
                                actualGameState[rowIndex - 1] !== undefined &&
                                actualGameState[rowIndex - 1][columnIndex] !== undefined &&
                                actualGameState[rowIndex - 1][columnIndex] === 1
                            )
                                neighboursCount++;
                            if (
                                actualGameState[rowIndex - 1] !== undefined &&
                                actualGameState[rowIndex - 1][columnIndex + 1] !== undefined &&
                                actualGameState[rowIndex - 1][columnIndex + 1] === 1
                            )
                                neighboursCount++;

                            // Même ligne
                            if (
                                actualGameState[rowIndex] !== undefined &&
                                actualGameState[rowIndex][columnIndex - 1] !== undefined &&
                                actualGameState[rowIndex][columnIndex - 1] === 1
                            )
                                neighboursCount++;
                            if (
                                actualGameState[rowIndex] !== undefined &&
                                actualGameState[rowIndex][columnIndex + 1] !== undefined &&
                                actualGameState[rowIndex][columnIndex + 1] === 1
                            )
                                neighboursCount++;

                            // Ligne du dessous
                            if (
                                actualGameState[rowIndex + 1] !== undefined &&
                                actualGameState[rowIndex + 1][columnIndex - 1] !== undefined &&
                                actualGameState[rowIndex + 1][columnIndex - 1] === 1
                            )
                                neighboursCount++;
                            if (
                                actualGameState[rowIndex + 1] !== undefined &&
                                actualGameState[rowIndex + 1][columnIndex] !== undefined &&
                                actualGameState[rowIndex + 1][columnIndex] === 1
                            )
                                neighboursCount++;
                            if (
                                actualGameState[rowIndex + 1] !== undefined &&
                                actualGameState[rowIndex + 1][columnIndex + 1] !== undefined &&
                                actualGameState[rowIndex + 1][columnIndex + 1] === 1
                            )
                                neighboursCount++;

                            if (cell === 0 && neighboursCount === 3) return 1;
                            else if (cell === 1 && neighboursCount !== 2 && neighboursCount !== 3) return 0;
                            else return cell;
                        });
                    });
                return newGameState;
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    function getRows() {
        return gameState.map((row, rowIndex) => {
            return (
                <tr className="game_of_life_row" key={"row-" + rowIndex}>
                    {row.map((cell, columnIndex) => {
                        return (
                            <td
                                onClick={() => handleClick(cell, rowIndex, columnIndex)}
                                className={"game_of_life_cell game_of_life_cell-" + cell}
                                key={"row-" + rowIndex + "-cell-" + columnIndex}
                            ></td>
                        );
                    })}
                </tr>
            );
        });
    }

    return (
        <div style={{ padding: "20px" }}>
            <table className="game_of_life_table">
                <tbody>{getRows()}</tbody>
            </table>

            <Button
                color="secondary"
                variant="contained"
                sx={{
                    mt: "20px",
                    width: "200px",
                    ml: "10px",
                }}
                onClick={handleGenerateNewSample}
            >
                Generate sample
            </Button>
        </div>
    );
};

export default GameOfLifeGameBoard;
