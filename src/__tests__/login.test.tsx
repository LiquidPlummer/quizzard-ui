import { LoginModel } from "../models/login-model";

import Enzyme, {mount, ReactWrapper, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {render, fireEvent, act} from "@testing-library/react";
import  Login  from "../components/Login/Login"
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom'
// import React from "react";

import {login} from "../remote/login-register-service";



Enzyme.configure({adapter:new Adapter()});

const configureMock = configureStore()
const initialState = {
    isAuthenticated: false,
    isLoading: false,
    username: "",
    token: "",
};

jest.mock("../remote/login-register-service",()=>{
    return{
        login:jest.fn()
    }
});

let DtoFromApi={
    data:{
        username:"shadow",
        token:"Secrets",
    },
    headers:{
        authorization:"token secret"
    },
    status:200
};

const mockLoginCred:LoginModel = {
    username:"shadow",
    password:"Rise123!",
};
describe("Login Component Test",()=>{

    let wrapper:ReactWrapper;

    beforeEach(()=>{
        wrapper = mount(<Provider store={configureMock(initialState)}><Login/></Provider>);
    });
    afterEach(()=>{
        wrapper.unmount();
    })

    test("Render Test of Log In",()=>{
        const  swrapper = shallow(<Provider store={configureMock(initialState)}><Login/></Provider>);
        expect(swrapper.exists()).toBe(true);
    });

    test("Login Component Display Properly Elements",()=>{
        const buttonMock = wrapper.find("button");
        expect(wrapper.find("FormControl[name='username']").text()).toEqual("");
        expect(wrapper.find("FormControl[name='password']").text()).toEqual("");

        expect(wrapper.find("FormLabel#lbl-username").text()).toEqual("Username: ");
        expect(wrapper.find("FormLabel#lbl-password").text()).toEqual("Password: ");

        expect(wrapper.find("Button").text()).toEqual("Login");

        buttonMock.simulate("click");
    });



    test("Test form On Change",()=>{
        const{queryByPlaceholderText} = render(<Provider store={configureMock(initialState)}><Login/></Provider>);
        const usernameField = queryByPlaceholderText("username");
        const passwordField = queryByPlaceholderText("*******");

        fireEvent.change(usernameField,{target:{value:"test-username"}})
        fireEvent.change(passwordField,{target:{value:"test-username"}})


        expect(usernameField.value).toEqual("test-username")
        expect(passwordField.value).toEqual("test-username")
    })


    // test("button click with mocked Axios",async ()=>{
    //     // jest.mock("",()=>{return{push:jest.fn()}});
    //
    //     (login as jest.Mock ).mockImplementation(async (newCreds:LoginModel)=>{
    //         return new Promise((resolve) => (resolve(DtoFromApi)))
    //     });
    //
    //     const { queryByTestId } = render(<Provider store={configureMock(initialState)}><Login /></Provider>);
    //
    //
    //
    //     const buttonMock = queryByTestId("login-btn");
    //     await act( async () => {
    //          fireEvent.click(buttonMock);
    //     })
    //
    //
    //
    //     const recieve = await login(mockLoginCred);
    //     expect(login).toHaveBeenCalled();
    //     //expect(recieve).toEqual(DtoFromApi);
    //
    // });

    test("testworking 2",()=>{
        (login as jest.Mock ).mockImplementation(async (newCreds:LoginModel)=>{
            return await new Promise((resolve) => (resolve(DtoFromApi)))
        });

        const button = wrapper.find("button");

        button.simulate("click");

    })

});