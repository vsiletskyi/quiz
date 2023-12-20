import React, { useEffect, useState } from "react";
import classes from './Quize.module.css'
import ActiveQuize from "../../components/ActiveQuize/ActiveQuize";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";
import { useParams } from "react-router-dom";

const Quiz = () => {

    const [state, setState] = useState({
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quize: [],
        loading: true
    })

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/quizes/${id}.json`)
                const quiz = response.data

                setState((prevState) => ({
                    ...prevState,
                    quize: quiz,
                    loading: false
                }))

            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [id])

    const onAnswerClickHandler = (answerId) => {
        console.log('click', answerId)
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quize[state.activeQuestion]
        const results = state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            setState((prevState) => ({
                ...prevState,
                answerState: { [answerId]: 'success' },
                results
            }))
            const timeout = window.setTimeout(() => {
                if (state.activeQuestion + 1 === state.quize.length) {
                    console.log('Finished')
                    setState((prevState) => ({
                        ...prevState,
                        isFinished: true
                    }))
                }
                else {
                    setState((prevState) => ({
                        ...prevState,
                        activeQuestion: state.activeQuestion + 1,
                        answerState: null
                    }))
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            setState((prevState) => ({
                ...prevState,
                answerState: { [answerId]: 'error' },
                results
            }))
        }
    }

    const restartHandler = () => {
        setState((prevState) => ({
            ...prevState,
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
        }))
    }

    return (
        <div className={classes.Quize}>
            <div className={classes.QuizeWrapp}>
                <h1>Please, give an anwer</h1>

                {
                    state.loading
                        ? <Loader />
                        : state.isFinished ?
                            <FinishedQuiz
                                results={state.results}
                                quize={state.quize}
                                restartHandler={restartHandler}
                            /> :
                            <ActiveQuize
                                activeQuestion={state.activeQuestion + 1}
                                answers={state.quize[state.activeQuestion].answers}
                                question={state.quize[state.activeQuestion].question}
                                onAnswerClick={onAnswerClickHandler}
                                quizeLength={state.quize.length}
                                state={state.answerState}
                            />
                }

            </div>
        </div>
    )
}

export default Quiz