import Enzyme, {mount, ReactWrapper, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import Main from "../components/Main/Main";


Enzyme.configure({adapter:new Adapter()});

const configureMock = configureStore()
const initialState = {
    auth:{
        isAuthenticated: false,
        isLoading: false,
        username: "",
        token: "",
        showLogin: true,
    }
};
const initialState1 = {
    auth:{
        isAuthenticated: false,
        isLoading: false,
        username: "",
        token: "",
        showLogin: false,
    }
};


jest.mock("../remote/login-register-service",()=>{
    return{
        register:jest.fn()
    }
});


describe("Main Component",()=> {

    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(<Provider store={configureMock(initialState)}><Main/></Provider>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("Main Component dislays", () => {
        const wrapper = shallow(<Provider store={configureMock(initialState)}><Main/></Provider>);
        expect(wrapper.exists()).toBe(true);
    });

    test("Test Welcome is in render tree", () => {
        expect(wrapper.find("Welcome").exists()).toBe(true);
    });

    test("Test Login Shows When auth.showLogin=true", () => {
        expect(wrapper.find("Login").exists()).toBe(true);
    });

    test("Test Register Does Not Exist When auth.showLogin=true", ()=>{
        expect(wrapper.find("Register").exists()).toBe(false);
    });

});

describe("Test for showLogin=false",()=>{
    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(<Provider store={configureMock(initialState1)}><Main/></Provider>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("Test Login Shows When auth.showLogin=false", () => {
        expect(wrapper.find("Login").exists()).toBe(false);
    });

    test("Test Register Does Not Exist When auth.showLogin=false", ()=>{
        expect(wrapper.find("Register").exists()).toBe(true);
    });
});