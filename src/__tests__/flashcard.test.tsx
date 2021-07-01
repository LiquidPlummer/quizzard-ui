import Enzyme, {mount, ReactWrapper} from "enzyme";
import Adaptor from "@wojtekmaj/enzyme-adapter-react-17";
import Flashcard from "../components/Flashcards/Flashcard";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom'
import {createCard,getCards} from "../remote/card-service";


Enzyme.configure({adapter: new Adaptor()});

// @ts-ignore
let initialState = {
    flashcards: {
        flashCards: [],
        isLoading: false,
        isLoaded: false,
        count: 0
    },
    subjects: {
        subjects: [],
    },
    error:{
        errorMsg:"",
        showError:false
    }
}

const mockStore = configureStore();

jest.mock("../remote/card-service",()=>{
    return{
        createCard:jest.fn()
    }
});
describe("FlashCard component",()=>{

    let wrapper:ReactWrapper;
    beforeEach(()=>{
        wrapper = mount(<Provider store={mockStore(initialState)}><Flashcard/></Provider>);
    });

    test('Renders the Flashcard component with initial state', () =>{

        // console.log(wrapper.find('Container#flashcard-container').debug());
        expect(wrapper.find('Container#flashcard-container')).toBeTruthy();
        expect(wrapper.find('input#card-question').text()).toBe('');
        expect(wrapper.find('input#card-answer').text()).toBe('');
        expect(wrapper.find('FormLabel#lbl-question').text()).toBe('Question: ');
        expect(wrapper.find('FormLabel#lbl-answer').text()).toBe('Answer: ');
        expect(wrapper.find('FormLabel#lbl-subject').text()).toBe('Subject: ');

    });


    test("On Change question, subject, and answer",()=>{
        const question = wrapper.find("FormControl#card-question");
        const answer = wrapper.find("FormControl#card-answer");
        const subject = wrapper.find("FormControl[as='select']");

        question.simulate("change",{target:{value:"question test"}});
        answer.simulate("change",{target:{value:"answer test"}});
        subject.simulate("change",{target:{value:"answer test"}});

        expect(wrapper.find("FormControl#card-question").prop("value")).toEqual("question test");
        expect(wrapper.find("FormControl#card-answer").prop("value")).toEqual("answer test");
        // expect(wrapper.find("FormControl[as='select']").prop("value")).toEqual("answer test");
    });

    test("Simulate button click",()=>{


        const button = wrapper.find("Button");
        button.simulate("click");
    });
})


