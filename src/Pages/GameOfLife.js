import GameOfLifeGameBoard from "../Components/GameOfLife/GameOfLifeGameBoard";
import Page from "../Components/Page";

function GameOfLife() {
    return (
        <Page>
            <h1>Game of life</h1>
            <GameOfLifeGameBoard tableSize={50} />
        </Page>
    );
}

export default GameOfLife;
