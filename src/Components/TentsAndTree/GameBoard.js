import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Row from "./Row";
import Solver from "./Solver";
import TentNumberIndicator from "./TentNumberIndicator";

const GameBoard = (props) => {
    const [sumColumn, setSumColumn] = useState([3, 1, 3, 2, 1, 3, 2, 2, 1, 3]);
    const [sumLine, setSumLine] = useState([4, 0, 4, 1, 1, 4, 0, 2, 2, 3]);
    const [grid, setGrid] = useState([
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
    ]);

    function fetchSolved() {
        setGrid(
            Solver({
                sommeColonnes: sumColumn,
                sommeLignes: sumLine,
                grid: grid,
            })
        );
    }

    const cellClicked = (line, column) => {
        const gridGridCopy = grid.slice();
        gridGridCopy[line][column] = (gridGridCopy[line][column] + 1) % 3;
        setGrid([...gridGridCopy]);
    };

    function getRows() {
        const firstLineIndicators = [];
        firstLineIndicators.push(<div className={"cellSize-" + props.boardSize}></div>);
        for (var i = 0; i < props.boardSize; i++) {
            firstLineIndicators.push(
                <TentNumberIndicator boardSize={props.boardSize} value={sumColumn[i]}></TentNumberIndicator>
            );
        }

        const rows = [];
        rows.push(<div className="row">{firstLineIndicators}</div>);
        for (var j = 0; j < props.boardSize; j++) {
            const rowIndex = j;
            rows.push(
                <Row
                    boardSize={props.boardSize}
                    indicator={sumLine[j]}
                    rowState={grid[j]}
                    cellClicked={(column) => cellClicked(rowIndex, column)}
                ></Row>
            );
        }
        return rows;
    }

    return (
        <div>
            <div className="gameBoard">{getRows()}</div>
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
