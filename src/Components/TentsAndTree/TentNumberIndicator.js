const TentNumberIndicator = (props) => {
    return (
        <div className={"tents_and_tree_tent_number_indicator"}>
            <div className="tents_and_tree_tent_number_indicator-number">{props.value}</div>
        </div>
    );
};

export default TentNumberIndicator;
