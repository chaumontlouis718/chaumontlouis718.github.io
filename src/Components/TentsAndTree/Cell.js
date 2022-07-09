import { useState } from "react";

const Cell = (props) => {
    function handleClick() {
        if (props.value !== 3) {
            props.cellClicked();
        }
    }

    return (
        <div className={"cell cellSize-" + props.boardSize + " cellValue-" + props.value} onClick={handleClick}></div>
    );
};

export default Cell;
