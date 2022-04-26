import { Button } from "@mui/material";
import { useState } from "react";
import Row from "./Row";
import Solver from "./Solver";
import TentNumberIndicator from "./TentNumberIndicator";

const GameBoard = (props) => {
    const [gameState, setGameState] = useState({
        sumColumn: [1, 2, 3, 4, 5],
        sumLine: [1, 2, 3, 10, 5],
        grid: [
            [0, 1, 0, 0, 1],
            [0, 1, 2, 0, 1],
            [0, 1, 0, 3, 1],
            [0, 1, 2, 0, 1],
            [0, 1, 0, 3, 1],
        ],
    });

    function fetchSolved() {
        console.log(Solver(gameState));
    }

    const cellClicked = (line, column) => {
        const gameStateGridCopy = gameState.grid;
        gameStateGridCopy[line][column] = (gameStateGridCopy[line][column] + 1) % 3;

        /*setGameState((previousState) => ({
            ...previousState,
            grid: gameStateGridCopy,
        }));*/
    };

    const firstLineIndicators = [];
    firstLineIndicators.push(<div className={"cellSize-" + props.boardSize}></div>);
    for (var i = 0; i < props.boardSize; i++) {
        firstLineIndicators.push(
            <TentNumberIndicator boardSize={props.boardSize} value={gameState.sumColumn[i]}></TentNumberIndicator>
        );
    }

    const rows = [];
    rows.push(<div className="row">{firstLineIndicators}</div>);
    for (var j = 0; j < props.boardSize; j++) {
        const rowIndex = j;
        rows.push(
            <Row
                boardSize={props.boardSize}
                indicator={gameState.sumLine[j]}
                rowState={gameState.grid[j]}
                cellClicked={(column) => cellClicked(rowIndex, column)}
            ></Row>
        );
    }

    return (
        <div>
            <div className="gameBoard">{rows}</div>
            <Button
                color="primary"
                variant="contained"
                sx={{
                    mt: "20px",
                    width: "200px",
                }}
                onClick={fetchSolved}
            >
                Solve !
            </Button>
        </div>
    );
};

export default GameBoard;
