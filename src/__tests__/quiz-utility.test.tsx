import {
  createQuiz,
  generateRandom,
  createQuizQuestion,
  answerChoiceRandomizer,
  createWrongAnswerArray,
  filterCurrentCard
} from '../utilities/quiz-utility';

import { SetFlashcardDTO } from "../models/flashcard";

import {Role} from "../models/role";

let flashCard1: SetFlashcardDTO;
let flashCard2: SetFlashcardDTO;
let flashCard3:  SetFlashcardDTO;
let flashCard4:  SetFlashcardDTO;
let studySet: SetFlashcardDTO[];
let account1: {
  id: 1,
  points: 1,
  username:"string",
  password: "string",
  roles: Role[],
}
let subject1:{
  id: 1,
  name: "string",
}
let account2: {
  id: 2,
  points: 2,
  username:"string",
  password: "string",
  roles: Role[],
}
let subject2:{
  id: 2,
  name: "string",
}
let account3: {
  id: 3,
  points: 3,
  username:"string",
  password: "string",
  roles: Role[],
}
let subject3:{
  id: 3,
  name: "string",
}
let account4: {
  id: 4,
  points: 4,
  username:"string",
  password: "string",
  roles: Role[],
}
let subject4:{
  id: 4,
  name: "string",
}



beforeEach(() => {

  flashCard1={
    id: 0,
    subject: subject1,
    creator: account1,
    question: "string1",
    answer: "string1",
    reviewable: true,
    public: true,
    studySetId: 0
  };
  flashCard2 ={
    id: 1,
    subject: subject2,
    creator: account2,
    question: "string2",
    answer: "string2",
    reviewable: true,
    public: true,
    studySetId: 0
  };
  flashCard3 = {
    id: 2,
    subject: subject3,
    creator: account3,
    question: "string3",
    answer: "string3",
    reviewable: true,
    public: true,
    studySetId: 0
  };
  flashCard4 = {
    id: 3,
    subject: subject4,
    creator: account4,
    question: "string4",
    answer: "string4",
    reviewable: true,
    public: true,
    studySetId: 0
  };


  studySet = [flashCard1,flashCard2,flashCard3,flashCard4];

})

afterEach(() => {
  flashCard1 = null;
  flashCard2 = null;
  flashCard3 = null;
  flashCard4 = null;
  //studySet = null;
})

test("Generates random number between 0 and number passed in as argument", () => {

  const num = 4;
  const argArray = [0, 1, 2, 3];

  let ranNum: number = generateRandom(num);

  expect(argArray.includes(ranNum)).toBeTruthy();

});

test('creates 3 questions from studySet',()=>{
  expect(createQuiz(studySet)).toBeTruthy();
});

test('create quiz question',()=>{

  expect(createQuizQuestion(flashCard1, "wrong1", "wrong2", "wrong3")).toBeTruthy();
});
test('answerChoiceRandomizer',()=>{
  expect(answerChoiceRandomizer(flashCard1.question)).toBeTruthy();
});

//filters currCard for Quiz Component
test('Filter Current Card',()=>{
  expect(filterCurrentCard(flashCard1,studySet)).toBeTruthy();
});
test('Filter Current Card, Check Length',()=>{
  let filteredArray = filterCurrentCard(flashCard1,studySet);
  expect(filteredArray.length).toBe(9);
});
//wrong answer array test
test('createWrongAnswerArray',()=>{
  expect(createWrongAnswerArray(studySet)).toBeTruthy();
});

test('Check length of wrong Answer Array',()=>{
  let answerArray = createWrongAnswerArray(studySet);
  expect(answerArray.length).toBe(3);
});