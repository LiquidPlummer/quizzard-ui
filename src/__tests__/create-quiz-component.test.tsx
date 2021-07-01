import Enzyme, {mount, ReactWrapper} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {FlashcardDTO, SetFlashcardDTO} from "../models/flashcard";
import CreateQuiz from "../components/CreateQuiz/CreateQuiz";
import { Provider } from "react-redux";
import  configureStore  from "redux-mock-store";
import {Account} from "../models/account";
import {Subject} from "../models/subject";


Enzyme.configure({adapter:new Adapter()});

const initialState = {
    createQuiz:{
        quizState:{
            studySet: [],
            isLoading: false,
            flashCard: {},
            isLoaded: false,
            studySetName: "",
            showQuiz: false,
            quiz: [],
            count: 0,
            isAnswered: false

        }
    },
    studySet:{
        studySet:{
            selectedStudySet: {id: 1, creator: {} as Account,cards: [] as SetFlashcardDTO[], name: 'asdfg', isPublic: true},
            isStudySetSelected: false,
            flashcard: {id: -1, creator: {} as Account, public: true, answer: '', question: '', reviewable: true, subject: {} as Subject},
            isFlashCardSelected: false,
            showModal: false,
            question: '',
            answer: '',
            reviewable: true,
            public: true,
            availableStudySets: [],
            isLoading: false,
            finishedLoading: false,
            account: {} as Account
        }
    }


};

const initialState1 = {
    createQuiz:{
        quizState:{
            studySet: [],
            isLoading: false,
            flashCard: {},
            isLoaded: false,
            studySetName: "",
            showQuiz: true,
            quiz: [],
            count: 0,
            isAnswered: false

        }
    },
    studySet:{
        studySet:{
            selectedStudySet: {id: -1, creator: {} as Account,cards: [] as SetFlashcardDTO[], name: '', isPublic: true},
            isStudySetSelected: false,
            flashcard: {id: -1, creator: {} as Account, public: true, answer: '', question: '', reviewable: true, subject: {} as Subject},
            isFlashCardSelected: false,
            showModal: false,
            question: '',
            answer: '',
            reviewable: true,
            public: true,
            availableStudySets: [],
            isLoading: false,
            finishedLoading: false,
            account: {} as Account
        }
    }


};

const mockStore = configureStore();

describe("Create Quiz Test",()=> {

    let wrapper:ReactWrapper;

    beforeEach(()=>{
        wrapper = mount(<Provider store={ mockStore(initialState) }><CreateQuiz/></Provider>);
    })
    afterAll(()=>{
        wrapper.unmount();
    })
    //checks to see if the component exits
    test("Ensure Quiz Component Renders",()=>{
        expect(wrapper.exists()).toBe(true);
    })

    test("Quiz Component Exists", ()=> {
        console.log(wrapper.debug());
        // const component = wrapper.find("Quiz");
        // expect(component).toBe(true);
    });


    test("Button Click", ()=> {
        const button = wrapper.find("button");
        button.simulate("click");
    });

});

describe("Show quiz is true",()=>{

    let wrapper:ReactWrapper;

    beforeEach(()=>{
        wrapper = mount(<Provider store={ mockStore(initialState1)}><CreateQuiz/></Provider>);
    });

    afterAll(()=>{
        wrapper.unmount();
    });

    test("Button Click", ()=> {
        const button = wrapper.find("Button");
        button.simulate("click");
    });

    test("Quiz Component Exists", ()=> {
        console.log(wrapper.debug());
        // const component = wrapper.find("Quiz");
        // expect(component).toBe(true);
    });


})