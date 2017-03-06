import React, {Component, } from 'react';

class CardItem extends Component{

    constructor(props) {
        super(props);
        this.handlerSetQuestion = this.handlerSetQuestion.bind(this);
        this.handlerSetAnswer = this.handlerSetAnswer.bind(this);

        this.props.itemsArr.push({question: "", answer: ""});
        console.log(this.props.itemsArr);

        this.state = {
            count: 1,
            card: {
                question: "",
                answer: ""
            }
        }
    }

    componentDidMount(){
        console.log('cards: ', this.props.cards);

        if(this.props.cards){
            this.setState({
                count: this.props.cards.length + 1
            });
        }
    }


    handlerSetQuestion(e){
        this.setState({
            card: {
                question: e.target.value
            }
        }, () => {
            this.props.itemsArr[this.state.count - 1] = Object.assign({}, this.props.itemsArr[this.state.count - 1], {question: this.state.card.question});
            console.log('new itemsArr: ', this.props.itemsArr);
        });

    }

    handlerSetAnswer(e){
        this.setState({
            card: { answer: e.target.answer }
        });
    }

    render(){
        return (
            <li className="editingPackage__item">
                <span className="editingPackage__info">{this.state.count}</span>
                <span className="editingPackage__info">
                    <svg width="20" height="20" viewBox="0 0 64 64">
                        <path fill="#fff"
                            d="M24.72 8.777h14.56v3.747H24.72zM7.917 11.56h48.164v4.818H7.918z"/>
                        <path fill="none"
                            stroke="#fff"
                            d="M40.212 57.362V27.005M32 57.398V27.04m-8.212 30.394V27.077m-11.06-7.594h38.543v40.254H12.73z"/>
                    </svg>
                </span>
                <input value={this.state.card.question} onChange={this.handlerSetQuestion} className="question__field" placeholder="Front"/>
                {this.state.setEditing}
                <input value={this.state.card.answer} onChange={this.handlerSetAnswer} className="response__field" placeholder="Back"/>
            </li>
        )
    }
}


export default CardItem;

CardItem.propTypes = {
    itemsArr: React.PropTypes.array
}
