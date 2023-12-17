import React, { Component } from "react";
import classes from './Quize.module.css'
import ActiveQuize from "../../components/ActiveQuize/ActiveQuize";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quize extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quize: [
            {
                question: 'What color is sky?',
                id: 1,
                rightAnswer: 2,
                answers: [
                    { text: 'Black', id: 1 },
                    { text: 'Blue', id: 2 },
                    { text: 'Green', id: 3 },
                    { text: 'White', id: 4 }
                ]
            },
            {
                question: 'What color is sun?',
                id: 2,
                rightAnswer: 4,
                answers: [
                    { text: 'Black', id: 1 },
                    { text: 'Blue', id: 2 },
                    { text: 'Green', id: 3 },
                    { text: 'Yelow', id: 4 }
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quize[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswer === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })
            const timeout = window.setTimeout(() => {
                if (this.state.activeQuestion + 1 === this.state.quize.length) {
                    console.log('Finished')
                    this.setState({
                        isFinished: true
                    })
                }
                else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: { [answerId]: 'error' },
                results
            })
        }
    }

    restartHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
        })
    }

    render() {
        return (
            <div className={classes.Quize}>
                <div className={classes.QuizeWrapp}>
                    <h1>Please, give an anwer</h1>
                    {this.state.isFinished ?
                        <FinishedQuiz
                            results={this.state.results}
                            quize={this.state.quize}
                            restartHandler={this.restartHandler}
                        /> :
                        <ActiveQuize
                            activeQuestion={this.state.activeQuestion + 1}
                            answers={this.state.quize[this.state.activeQuestion].answers}
                            question={this.state.quize[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizeLength={this.state.quize.length}
                            state={this.state.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Quize