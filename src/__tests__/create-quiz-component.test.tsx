// import Enzyme, {mount, ReactWrapper} from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// import {FlashcardDTO, SetFlashcardDTO} from "../models/flashcard";
// import CreateQuiz from "../components/CreateQuiz/CreateQuiz";
// import { Provider } from "react-redux";
// import  configureStore  from "redux-mock-store";
//
//
// Enzyme.configure({adapter:new Adapter()});
//
// const initialState = {
//     createQuizState: {
//
//     }
//
// };
//
// const initialState1 = {
//    createQuizState: {
//
//    }
// };
//
// const mockStore = configureStore();
//
// describe("Create Quiz Test",()=> {
//
//     let wrapper:ReactWrapper;
//
//     beforeEach(()=>{
//         wrapper = mount(<Provider store={ mockStore(initialState) }><CreateQuiz/></Provider>);
//     })
//     afterAll(()=>{
//         wrapper.unmount();
//     })
//     //checks to see if the component exits
//     test("Ensure Quiz Component Renders",()=>{
//         expect(wrapper.exists()).toBe(true);
//     })
//
//     test("Quiz Component Exists", ()=> {
//         const component = wrapper.find("Quiz");
//         expect(component).toBe(true);
//     });
//
//     });
//
// describe("Show quiz is true",()=>{
//
//     let wrapper:ReactWrapper;
//
//     beforeEach(()=>{
//         wrapper = mount(<Provider store={ mockStore(initialState1)}><CreateQuiz/></Provider>);
//     });
//
//     afterAll(()=>{
//         wrapper.unmount();
//     });
//
//     test("Button Click", ()=> {
//         const button = wrapper.find("start-btn");
//         button.simulate("click");
//     });
// })