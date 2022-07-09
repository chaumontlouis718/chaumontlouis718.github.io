import Cell from "./Cell";
import TentNumberIndicator from "./TentNumberIndicator";

const Row = (props) => {
    const cells = [];
    cells.push(
        <TentNumberIndicator key={-1} boardSize={props.boardSize} value={props.indicator}></TentNumberIndicator>
    );
    for (var i = 0; i < props.boardSize; i++) {
        const columnIndex = i;
        cells.push(
            <Cell
                boardSize={props.boardSize}
                value={props.rowState[i]}
                cellClicked={() => props.cellClicked(columnIndex)}
                key={columnIndex}
            ></Cell>
        );
    }

    return <div className="row">{cells}</div>;
};

export default Row;
