import React, {Component, } from 'react';
import R from 'ramda';

class CardItem extends Component{

    constructor(props) {
        super(props);
        this.state = {
            front: this.props.value.front,
            back: this.props.value.back
        }
    }

    handleChangeFront = (e) => {
        let value = e.target.value;
        this.setState({front: value}, () =>
            this.props.onChange(this.props.id, this.state.front, 'front'));
    }

    handleChangeBack = (e) => {
        let value = e.target.value;
        this.setState({back: value}, () =>
            this.props.onChange(this.props.id, this.state.back, 'back'));
    }

    handleDeleteCard = (e) => {
        this.props.handleDeleteCard(this.props.id)
    }

    render(){
        return (
            <li className="editingPackage__item">
                <span className="editingPackage__info">{R.inc(this.props.id)}</span>
                <span className="editingPackage__info" onClick={this.handleDeleteCard}>
                    <svg width="20" height="20" viewBox="0 0 64 64">
                        <path fill="#fff" d="M24.72 8.777h14.56v3.747H24.72zM7.917 11.56h48.164v4.818H7.918z"/>
                        <path fill="none"
                            stroke="#fff" d="M40.212 57.362V27.005M32 57.398V27.04m-8.212 30.394V27.077m-11.06-7.594h38.543v40.254H12.73z"/>
                    </svg>
                </span>
                <input value={this.state.front}
                       onChange={this.handleChangeFront}
                       className="question__field"
                       placeholder="Front"/>
                <input value={this.state.back}
                       onChange={this.handleChangeBack}
                       className="response__field"
                       placeholder="Back"/>
            </li>
        )
    }
}

export default CardItem;
