import { useState } from "react";

const Cell = (props) => {
    const [value, setValue] = useState(props.value);

    return (
        <div className={"cell cellSize-" + props.boardSize + " cellValue-" + value} onClick={props.cellClicked}></div>
    );
};

export default Cell;
