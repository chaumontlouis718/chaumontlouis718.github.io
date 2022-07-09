import { Button } from "@mui/material";
import { useReducer } from "react";
import { useEffect } from "react";
import TentsAndTreeCreator from "./TentsAndTreeCreator";
import TentsAndTreeRow from "./TentsAndTreeRow";
import TentsAndTreeSolver from "./TentsAndTreeSolver";
import TentNumberIndicator from "./TentNumberIndicator";

const TentsAndTreeGameBoard = (props) => {
    useEffect(() => {
        createNewGrid(props.boardSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.boardSize]);

    const [gridState, dispatch] = useReducer(reducer, TentsAndTreeCreator(props.boardSize));

    function reducer(state, action) {
        switch (action.type) {
            case "update-all":
                return {
                    sumColumn: action.sumColumn,
                    sumLine: action.sumLine,
                    grid: action.grid,
                };
            case "update-grid":
                return {
                    ...state,
                    grid: action.grid,
                };
            default:
                throw new Error();
        }
    }

    function fetchSolved() {
        dispatch({
            type: "update-grid",
            grid: TentsAndTreeSolver({
                sommeColonnes: gridState.sumColumn,
                sommeLignes: gridState.sumLine,
                grid: gridState.grid,
            }),
        });
    }

    function createNewGrid() {
        const grid = TentsAndTreeCreator(props.boardSize);
        dispatch({
            type: "update-all",
            sumColumn: grid.sumColumn,
            sumLine: grid.sumLine,
            grid: grid.grid,
        });
    }

    const cellClicked = (line, column) => {
        const gridGridCopy = gridState.grid.slice();
        gridGridCopy[line][column] = (gridGridCopy[line][column] + 1) % 3;

        dispatch({
            type: "update-grid",
            grid: [...gridGridCopy],
        });
    };

    function getRows() {
        const firstLineIndicators = [];
        firstLineIndicators.push(
            <div key="tentNumberIndicator-first" className={"tents_and_tree_tent_number_indicator"}></div>
        );
        for (var i = 0; i < props.boardSize; i++) {
            firstLineIndicators.push(
                <TentNumberIndicator
                    key={"tentNumberIndicator-" + i}
                    boardSize={props.boardSize}
                    value={gridState.sumColumn[i]}
                ></TentNumberIndicator>
            );
        }

        const rows = [];
        rows.push(
            <div key="row-first" className="tents_and_tree_row">
                {firstLineIndicators}
            </div>
        );
        for (var j = 0; j < props.boardSize; j++) {
            const rowIndex = j;
            rows.push(
                <TentsAndTreeRow
                    boardSize={props.boardSize}
                    indicator={gridState.sumLine[j]}
                    rowState={gridState.grid[j]}
                    cellClicked={(column) => cellClicked(rowIndex, column)}
                    key={"row-" + j}
                ></TentsAndTreeRow>
            );
        }
        return rows;
    }

    return (
        <div className="game_wrapper">
            <div className="game_board">{getRows()}</div>
            <Button
                color="primary"
                variant="contained"
                sx={{
                    mt: "20px",
                    width: "200px",
                }}
                onClick={fetchSolved}
            >
                Solve
            </Button>
            <Button
                color="secondary"
                variant="contained"
                sx={{
                    mt: "20px",
                    width: "200px",
                    ml: "10px",
                }}
                onClick={createNewGrid}
            >
                Create new grid
            </Button>
        </div>
    );
};

export default TentsAndTreeGameBoard;
