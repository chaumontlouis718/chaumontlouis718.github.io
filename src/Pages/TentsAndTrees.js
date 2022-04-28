import { Button, Slider } from "@mui/material";
import { useState } from "react";
import Page from "../Components/Page";
import GameBoard from "../Components/TentsAndTree/GameBoard";

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

            <GameBoard boardSize={boardSize}></GameBoard>
        </Page>
    );
}

export default TentsAndTrees;
