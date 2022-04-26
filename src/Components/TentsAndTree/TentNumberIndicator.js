const TentNumberIndicator = (props) => {
    return (
        <div className={"cellSize-" + props.boardSize + " tentNumberIndicator"}>
            <div className="tentNumberIndicator-number">{props.value}</div>
        </div>
    );
};

export default TentNumberIndicator;
