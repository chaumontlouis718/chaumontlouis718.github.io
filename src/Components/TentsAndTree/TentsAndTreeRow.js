import TentsAndTreeCell from "./TentsAndTreeCell";
import TentNumberIndicator from "./TentNumberIndicator";

const TentsAndTreeRow = (props) => {
    const cells = [];
    cells.push(
        <TentNumberIndicator key={-1} boardSize={props.boardSize} value={props.indicator}></TentNumberIndicator>
    );
    for (var i = 0; i < props.boardSize; i++) {
        const columnIndex = i;
        cells.push(
            <TentsAndTreeCell
                boardSize={props.boardSize}
                value={props.rowState !== undefined && props.rowState.length >= i ? props.rowState[i] : 0}
                cellClicked={() => props.cellClicked(columnIndex)}
                key={columnIndex}
            ></TentsAndTreeCell>
        );
    }

    return <div className="tents_and_tree_row">{cells}</div>;
};

export default TentsAndTreeRow;
