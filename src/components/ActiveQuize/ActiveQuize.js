import React from "react";
import classes from './ActiveQuize.module.css'
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuize = props => {
    return (
        <div className={classes.ActiveQuize}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.activeQuestion}.</strong>&nbsp;
                    {props.question}
                </span>
                <small>{props.activeQuestion} of {props.quizeLength}</small>
            </p>
            <AnswersList answers={props.answers} onAnswerClick={props.onAnswerClick} state={props.state} />
        </div>
    )
}

export default ActiveQuize