import React, { useState, useEffect } from 'react';
import TextCard from "./TextCard"
import SelectCard from "./SelectCard"
import CheckCard from "./CheckCard"
import RadioCard from "./RadioCard"
import ClickToResult from './ClickToResult'
import { Link } from 'react-router-dom';
import Timer from "./Timer"


const QuestionsContainer = ({ data }) => {
    const [answersModel, setAnswersModel] = useState(new Array(data.length));
    const [seconds, setSeconds] = useState(20);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        console.log(answersModel)
    }, [answersModel])

    const setAnswer = (index) => {
        return (pointerCount) => {
            const indexOfElement = index;
            let arr = [...answersModel];
            arr[indexOfElement] = pointerCount;
            setAnswersModel(arr)
        }
    }

    return (
        <div className="row">
            <div className="booksList col-lg-6">
                <h1>Странные вопросы</h1>
                <Link className="btn btn-primary" to='/'>На главную</Link>
                <Timer
                    isActive={isActive}
                    setIsActive={setIsActive}
                    seconds={seconds}
                    setSeconds={setSeconds}
                />
            </div>
            {
                seconds > 0 && isActive && data.map((item, index) => {
                    switch (item.type) {
                        case "TEXT":
                            return <TextCard
                                key={index - 68}
                                data={item}
                                numberOfQuestion={index}
                                setAnswer={setAnswer(index)}
                            />
                        case "CHECKBOX":
                            return !isActive && <CheckCard
                                key={index - 68}
                                data={item}
                                numberOfQuestion={index}
                                setAnswer={setAnswer(index)}
                            />
                        case "RADIO":
                            return <RadioCard
                                key={index - 68}
                                data={item}
                                numberOfQuestion={index}
                                setAnswer={setAnswer(index)}
                            />
                        case "SELECT":
                            return !isActive && <SelectCard
                                key={index - 68}
                                data={item}
                                numberOfQuestion={index}
                                setAnswer={setAnswer(index)}
                            />
                        default: return null;
                    }
                })
            }
            <ClickToResult
                answersModel={answersModel} />

        </div>


    )
}

export default QuestionsContainer;