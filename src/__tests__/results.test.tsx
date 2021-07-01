import Enzyme,{mount,ReactWrapper,shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Results from "../components/CreateQuiz/Results";
import { Provider } from "react-redux";
import  configureStore  from "redux-mock-store";
import {render,fireEvent,act} from "@testing-library/react";
import { createMemoryHistory } from 'history'

Enzyme.configure({adapter:new Adapter()});

const initialState ={
    //neeeded to make it match like the result slice:
    //name: result and get the initial state and set it to that
    result:{
        total: 0,
        answered: [],
        correct: [],
        incorrect: [],
        showResults: false,
        isAnswered: false
    }
}
const configureMock = configureStore();

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
describe("Results Component Test",()=>{


    let wrapper:ReactWrapper;

    beforeEach(()=>{
        wrapper = mount(<Provider store={configureMock(initialState)}><Results/></Provider>);
    })
    afterAll(()=>{
        wrapper.unmount();
    })
    test("testing results component render",()=>{
        expect(wrapper.exists()).toBe(true);
    });

    test("whether elements display properly",()=>{
        expect(wrapper.find("h1").text()).toEqual("Congratulations! You have completed this quiz!");
        expect(wrapper.find("h3").text()).toEqual(" You answered 0 questions.");
        expect(wrapper.find("h4").at(0).text()).toEqual("You got 0 right! NaN%");
        expect(wrapper.find("h4").at(1).text()).toEqual("You have been awarded 0 points!");
        expect(wrapper.find("Button").text()).toEqual("Take a Different Quiz!");

    });

    test("Simulate button click",async ()=>{

        const button = wrapper.find("Button");
        await act(async ()=>{
        button.simulate("click");

        })
    })

});
