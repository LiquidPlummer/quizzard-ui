import Enzyme, {mount, ReactWrapper, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import Sets from "../components/Sets/Sets";


Enzyme.configure({adapter:new Adapter()});

const configureMock = configureStore()
const initialState = {
    flashcards:{
        flashCards: [],
        flashCardsForStudy: [],
        isLoading: false,
        isLoaded: false,
        count: 0
    }
};
const initialState1 = {
    auth:{
        isAuthenticated: false,
        isLoading: false,
        username: "",
        token: "",
        showLogin: false,
    },
    error:{
        errorMsg:"",
        showError:false
    }
};


// jest.mock("../remote/login-register-service",()=>{
//     return{
//         register:jest.fn()
//     }
// });
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));
describe("Sets Component",()=> {

    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(<Provider store={configureMock(initialState)}><Sets/></Provider>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("Render test",()=>{
        expect(wrapper.exists()).toBe(true);
    });

    test("Displays properly",()=>{
        expect(wrapper.find("FormLabel#lbl-set-name").text()).toEqual("Set Name: ");
        expect(wrapper.find("FormControl#setName").text()).toEqual("");
        expect(wrapper.find("Button").text()).toEqual("Create Study Set");
    });

    test("Button Simulation",()=>{
        const button = wrapper.find("Button");
        button.simulate("click");
    });


});