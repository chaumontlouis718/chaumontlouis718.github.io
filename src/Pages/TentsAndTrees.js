import { Button, Slider } from "@mui/material";
import { useState } from "react";
import Page from "../Components/Page";
import TentsAndTreeGameBoard from "../Components/TentsAndTree/TentsAndTreeGameBoard";

function TentsAndTrees() {
    const [boardSize, setBoardSize] = useState(10);

    function onChangeCommitted(event, newValue) {
        setBoardSize(newValue);
    }

    return (
        <Page>
            <h1>Tents And Trees</h1>

            <Slider
                defaultValue={boardSize}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={4}
                max={10}
                color="secondary"
                onChangeCommitted={onChangeCommitted}
            />

            <TentsAndTreeGameBoard boardSize={boardSize}></TentsAndTreeGameBoard>
        </Page>
    );
}

export default TentsAndTrees;
