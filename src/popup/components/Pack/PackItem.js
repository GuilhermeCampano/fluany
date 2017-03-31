export default React => {

    const {
        string, shape, func
    } = React.PropTypes;

    const packItem = ({store, actions: { createpackage } }) => {
        return (
            <li className="pack-item color-1">
                <h3>Package title</h3>
                <p className="pack-description">Peellentesque dapibus suscipit ligulalllentesque dapibus.</p>
            </li>
        );
    };

    packItem.proptypes = {
        actions: shape({
            createpackage: func.isrequired
        })
    };

    return packItem;
};
