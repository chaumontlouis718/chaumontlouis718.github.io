const TentsAndTreeCell = (props) => {
    function handleClick() {
        if (props.value !== 3) {
            props.cellClicked();
        }
    }

    return <div className={"tents_and_tree_cell tents_and_tree_cell_value-" + props.value} onClick={handleClick}></div>;
};

export default TentsAndTreeCell;
