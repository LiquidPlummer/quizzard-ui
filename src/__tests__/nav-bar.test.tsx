import Enzyme, {mount, ReactWrapper, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import Navigation from "../components/NavBar/Navigation";

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
        isAuthenticated: true,
        isLoading: false,
        username: "",
        token: "",
        showLogin: true,
    }
};
// Shane O - Diss Anyy Bodyyy/Gage

describe("Nav Bar Component",()=>{

    let wrapper:ReactWrapper;

    beforeEach(()=>{
        wrapper=mount(<Provider store={configureMock(initialState)}><Navigation/></Provider>)
    });

    afterEach(()=>{
        wrapper.unmount();
    });

    test("Nav Bar Render",()=>{
        const wrapper = shallow(<Provider store={configureMock(initialState)}><Navigation/></Provider>);
        expect(wrapper.exists()).toBe(true);
    });

    test("Proper display Element",()=> {
        expect(wrapper.find("NavbarBrand").text()).toBeTruthy();
    });
    
    test("Test Login and Register links exist when not logged in", ()=> {
        expect(wrapper.find("a.authLink").length).toEqual(2);
    });

    test("Simulate Click Logout",()=>{
        const button = wrapper.find("Link#logout");
        button.simulate("click");
    });
});

describe("Test Navbar Component After Login", ()=> {

    let wrapper:ReactWrapper;

    beforeEach(()=>{
        wrapper=mount(<Provider store={configureMock(initialState1)}><Navigation/></Provider>)
    });

    afterEach(()=>{
        wrapper.unmount();
    });

    test("Test that the other things exist.", ()=> {
        expect(wrapper.find("NavLink#study").text()).toEqual("Study");
        expect(wrapper.find("NavLink#update").text()).toEqual("Update");
        expect(wrapper.find("NavLink#create").text()).toEqual("Create");
        expect(wrapper.find("NavLink#logout").text()).toEqual("Logout");
    });

    test("Simulate Click Logout",()=>{

        const button = wrapper.find("NavLink#logout");
        button.simulate("click");
    });

});

describe("Simulate Button clicks",()=>{

    let wrapper:ReactWrapper;

    beforeEach(()=>{
        wrapper=mount(<Provider store={configureMock(initialState)}><Navigation/></Provider>)
    });

    afterEach(()=>{
        wrapper.unmount();
    });

    test("Simulate Click Login",()=>{
        const button = wrapper.find("#login-btn");
        button.simulate("click");
    });

    test("Simulate Click Register",()=>{
        const button = wrapper.find("#register-btn");
        button.simulate("click");
    });


})