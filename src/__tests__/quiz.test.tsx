import Enzyme, {mount, ReactWrapper} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import  configureStore  from "redux-mock-store";
import Quiz from "../components/CreateQuiz/Quiz";


Enzyme.configure({adapter:new Adapter()});

const configureMock = configureStore()
const initialState = {
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

    },
    result:{
        total: 0,
        answered: [],
        correct: [],
        incorrect: [],
        showResults: false,
        isAnswered: false
    }

};
const initialState1 = {

};


// jest.mock("../remote/login-register-service",()=>{
//     return{
//         register:jest.fn()
//     }
// });


describe("Main Component",()=> {

    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(<Provider store={configureMock(initialState)}><Quiz/></Provider>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("Render test",()=>{
        expect(wrapper.exists()).toBe(true);
    });



});