import {Button, Card, CardDeck, Col, Container, Form, Row} from "react-bootstrap"
import {addFlashcard, flashcardsState, setFlashcards} from "../../state-slices/flashcard/flashcard-slice"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react"
import {createCard, getCards} from "../../remote/card-service";
import {getSubs} from "../../remote/subject-service";

import {setSubjects, subjectsState} from "../../state-slices/subject/subject-slice"
import {Flashcard, FlashcardDTO} from "../../models/flashcard";

/**
   * Renders the card creation and card viewing components
   * @returns Flashcard component
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
const FlashCard = () => {
  const dispatch = useDispatch();
  const flashcards = useSelector(flashcardsState);
  const subjects = useSelector(subjectsState);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [reviewable, setReviewable] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  /**
   * Acquires the current cards and subejcts that already exist in the database.
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  useEffect(()=> {
    console.log("populate flashcards")
   
    const getFlashcards = async () => {
      let cards = await getCards();
      dispatch(setFlashcards(cards))
    };
    getFlashcards();

    // const getSubjects = async () => {
    //   let subjects = await getSubs();
    //   dispatch(setSubjects(subjects));
    // }
    // getSubjects();

  }, [])

  /**
   * When the Create New Flashcard button is clicked it will call handleAddCard function which calls createCard
   * and dispatches the new flashcard to the state.
   * This function also resets the values on Question and Answer
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  const handleAddCard = async () =>{
    let cardObj: FlashcardDTO = {
      id: 0,
      accountId: 0,
      question,
      answer,
      reviewable, 
      isPublic,
      subjectId: parseInt(subjectId)
    };

    console.log("Subject: " + cardObj.subjectId)
    //let test = await createCard(cardObj.question, cardObj.answer, cardObj.reviewable, cardObj.isPublic, cardObj.subjectId);
    dispatch(addFlashcard(cardObj));

    setQuestion("");
    setAnswer("");
  }

  /**
   * Handles acquisition of a card's associated subject
   * @param card Typed as Flashcard
   * @returns Name of subject
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  const handleSubject = (card: FlashcardDTO) => {

    return subjects.subjects[card.subjectId - 1].name;
  }


  return (
    <Container id="flashcard-container">
      <Row>
        <Col>
          <h1>FlashCard Component</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label id="lbl-question">Question: </Form.Label>
              <Form.Control
                data-testid="question"
                type="text"
                id="card-question"
                name="card-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></Form.Control>
              <Form.Label id="lbl-answer">Answer: </Form.Label>
              <Form.Control
                data-testid="answer"
                type="text"
                id="card-answer"
                name="card-answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Label id="lbl-subject">Subject: </Form.Label>
              <Form.Control data-testid="subject" as="select" onChange={(e) => setSubjectId(e.target.value)}>
              <option value="">Select a subject...</option>
              {subjects.subjects.map((subject) => {
              return (
                <option value={subject.id}>{subject.name}</option>
              )
            })}
              </Form.Control>
            <Form.Check
              data-testid="check-public"
              type="checkbox"
              label="Would you like to make this card public?"
              checked={isPublic}
              onChange={e => setIsPublic(e.target.checked)}
            ></Form.Check>
            <Button onClick={handleAddCard}>Create New Flashcard</Button>
          </Form>
        </Col>
      </Row>
      <Row>
          <CardDeck>
            {flashcards.flashCards.map((card) => {
              return (
                <Col xs={8} md={6} lg={4} style={{ padding: '1rem' }}>
                  <Card>
                      <Card.Header>{card.question}</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          <Card.Subtitle>Answer:</Card.Subtitle>
                        </Card.Title>
                        <Card.Body>
                          <Card.Text>{card.answer}</Card.Text>
                        </Card.Body>
                      </Card.Body>
                      <Card.Footer>
                        {/* This is under the assumption that ID's match with the index */}
                        <Card.Text>{handleSubject(card)}</Card.Text>
                      </Card.Footer>
                  </Card>
                </Col>
              )
            })}
          </CardDeck>
      </Row>
    </Container>
  );
};

export default FlashCard;
