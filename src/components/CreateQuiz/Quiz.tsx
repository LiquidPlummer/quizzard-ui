import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  createQuizState,
  nextCard,
  prevCard,
} from "../../StateSlices/CreateQuiz/createQuizSlice";
import {
  setTotal,
  addAnswered,
  addCorrect,
  addIncorrect,
  resultState,
  showResults,
} from "../../StateSlices/CreateQuiz/resultSlice";
import Results from "./Results";



const Quiz = () => {
  const dispatch = useDispatch();
  const quizState = useSelector(createQuizState);
  const results = useSelector(resultState);

  const handlePrev = () => {
    if (quizState.count > 0) {
      resetColors();
      dispatch(prevCard());
    }
  };
  const handleNext = () => {
    if (quizState.count < quizState.quiz.length - 1) {
      dispatch(setTotal(quizState.quiz.length));
      resetColors();
      console.log(quizState.count);
      dispatch(nextCard());
    } else if (quizState.count === quizState.quiz.length - 1){
      dispatch(showResults());
    }
  };

  const resetColors = () => {
    let answer = document.getElementById("answer");
    let wrong1 = document.getElementById("wrong1");
    let wrong2 = document.getElementById("wrong2");
    let wrong3 = document.getElementById("wrong3");
    //TODO: Create custom null pointer handler?
    //currently implemented janky null checks to make typescript happy
    if(answer){
      answer.style.color = "black";
      answer.style.fontSize = "20px";
    }
    if (wrong1){
      wrong1.style.color = "black";
    }
    if(wrong2){
      wrong2.style.color = "black";
    }
    if (wrong3){
      wrong3.style.color = "black";
    }
  };

  const checkAnswer = (e: any) => {
    if (e.currentTarget.id === "answer"){
      if(document.getElementById(`${e.currentTarget.id}`)!= null)
      {
        let answerDiv = document.getElementById(
          `${e.currentTarget.id}`);
          if(answerDiv != null){
          answerDiv.style.color = "green";
          answerDiv.style.fontSize = "30px";}
      
      }
      if (
        !results.answered.includes(quizState.count) &&
        !results.correct.includes(quizState.count)
      ) {
        dispatch(addAnswered(quizState.count));
        dispatch(addCorrect(quizState.count));
      }
    } else {
      if (e.currentTarget.id === "answer"){
        if(document.getElementById(`${e.currentTarget.id}`)!= null)
        {
          let wrongChoice = document.getElementById(`${e.currentTarget.id}`);
          if(wrongChoice !=null){
            wrongChoice.style.color = "red";
        }
        }
      }
      
      if (
        !results.answered.includes(quizState.count) &&
        !results.incorrect.includes(quizState.count)
      ) {
        dispatch(addAnswered(quizState.count));
        dispatch(addIncorrect(quizState.count));
      }
    }
  };
  return (
    <>
      {results.showResults ? (
        <Results />
      ) : (
        <Row className="d-flex justify-content-center align-items-center p-4">
          <Col className="">
            <Row>
              <Col className="d-flex justify-content-center question">
                {quizState.quiz[quizState.count].question}
              </Col>
            </Row>
            {quizState.quiz[quizState.count].answers.map((key, value) => {
              let id = Object.keys(key).toString();
              return (
                <Row
                  id={id}
                  className="answer"
                  onClick={checkAnswer}
                  key={value}
                >
                  <Col>{Object.values(key).toString()}</Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      )}

      {!results.showResults && (
        <div className="bottomRow">
          <div onClick={handlePrev} className="btn-prev">
            &lt;
          </div>
          <div onClick={handleNext} className="btn-next">
            &gt;
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
