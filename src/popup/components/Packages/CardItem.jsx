import React, {Component} from 'react';

class CardItem extends Component{

    constructor(props) {
        super(props);
        this.handlerSetQuestion = this.handlerSetQuestion.bind(this);
        this.handlerSetAnswer = this.handlerSetAnswer.bind(this);

        this.state = {
            question: "",
            answer: "",
            count: 1
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
            question: e.target.question
        });
    }

    handlerSetAnswer(e){
        this.setState({
            answer: e.target.answer
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
                <input value={this.state.question} onChange={this.handlerSetQuestion} className="question__field" placeholder="Question"/>
                {this.state.setEditing}
                <input value={this.state.answer} onChange={this.handlerSetAnswer} className="response__field" placeholder="Answer"/>
            </li>
        )
    }
}


export default CardItem;
