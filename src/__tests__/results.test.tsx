import Enzyme,{mount,ReactWrapper,shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Results from "../components/CreateQuiz/Results";
import { Provider } from "react-redux";
import  configureStore  from "redux-mock-store";
import {render,fireEvent,act} from "@testing-library/react";

Enzyme.configure({adapter:new Adapter()});

const initialState ={
    resultState:{
        total: 0,
        answered: [],
        correct: [],
        incorrect: [],
        showResults: false,
        isAnswered: false
    }
}
const configureMock = configureStore()
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
    })

});
