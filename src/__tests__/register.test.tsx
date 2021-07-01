import Enzyme, {mount, ReactWrapper, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {render, fireEvent, act} from "@testing-library/react";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import Register from "../components/Register/Register";
import {register} from "../remote/login-register-service";
import {RegisterModel} from "../models/register-model";


Enzyme.configure({adapter:new Adapter()});

const configureMock = configureStore()
const initialState = {
    isAuthenticated: false,
    isLoading: false,
    username: "",
    token: "",
    error:{
        errorMsg:"",
        showError:false
    }
};

jest.mock("../remote/login-register-service",()=>{
    return{
        register:jest.fn()
    }
});


describe("Register Component Test",()=>{

    let wrapper:ReactWrapper;

    beforeEach(()=>{
        wrapper=mount(<Provider store={configureMock(initialState)}><Register/></Provider>)
    });

    afterEach(()=>{
        wrapper.unmount();
    });

    test("Register Component exist",()=>{
        expect(wrapper.exists()).toBe(true);
    });

    test("Register Components Display Properly",()=>{
        expect(wrapper.find("h2").text()).toEqual("Registration");
        expect(wrapper.find("FormControl[name='username']").text()).toEqual("");
        expect(wrapper.find("FormControl[name='password']").text()).toEqual("");
        expect(wrapper.find("FormControl[name='email']").text()).toEqual("");
        expect(wrapper.find("FormControl[name='firstName']").text()).toEqual("");
        expect(wrapper.find("FormControl[name='lastName']").text()).toEqual("");

        expect(wrapper.find("FormLabel#lbl-username").text()).toEqual("Username: ");
        expect(wrapper.find("FormLabel#lbl-password").text()).toEqual("Password: ");
        expect(wrapper.find("FormLabel#lbl-email").text()).toEqual("Email: ");
        expect(wrapper.find("FormLabel#lbl-first-name").text()).toEqual("First Name: ");
        expect(wrapper.find("FormLabel#lbl-last-name").text()).toEqual("Last Name: ");

        expect(wrapper.find("Button").text()).toEqual("Register");
    });

    test("Test On Change",()=>{

        const{ queryByPlaceholderText} = render(<Provider store={configureMock(initialState)}><Register/></Provider>);

        const usernameField = queryByPlaceholderText("username");
        const passwordField = queryByPlaceholderText("*******");
        const emailField = queryByPlaceholderText("email@email.com");
        const firstNameField = queryByPlaceholderText("John");
        const lastNameField = queryByPlaceholderText("Bond");

        fireEvent.change(usernameField,{target:{value:"test-username"}});
        fireEvent.change(passwordField,{target:{value:"test-password"}});
        fireEvent.change(emailField,{target:{value:"test-email"}});
        fireEvent.change(firstNameField,{target:{value:"test-first-Name"}});
        fireEvent.change(lastNameField,{target:{value:"test-last-Name"}});

        expect(usernameField.value).toEqual("test-username")
        expect(passwordField.value).toEqual("test-password")
        expect(emailField.value).toEqual("test-email")
        expect(firstNameField.value).toEqual("test-first-Name")
        expect(lastNameField.value).toEqual("test-last-Name")
    });

    let DtoFromApi={
        data:{
            username:"shadow",
            token:"Secrets",
        },
        headers:{
            authorization:"token secret"
        }
    };
    const mockLoginCred:RegisterModel= {
        username:"shadow",
        password:"Rise123!",
        email:"ShadowMonarch@gmail.com",
        firstName:"Jin",
        lastName:"Sung-Woo",

    };

    // const history = createMemoryHistory();
    // history.push('/');
    // test("mock axios test along with button click",async ()=>{
    //
    //
    //     const{ queryByTestId } = render(<Provider store={configureMock(initialState)}><Register /></Provider>);
    //
    //     (register as jest.Mock).mockImplementation((newRegisterInfo:RegisterModel)=>{
    //         return new Promise(resolve => resolve(DtoFromApi));
    //     });
    //
    //     const buttonMock = queryByTestId("register-btn");
    //     await act(async()=>{
    //         fireEvent.click(buttonMock);
    //     });
    //
    // })

    test("Button Click simulation with Mock Axios",()=>{
        (register as jest.Mock).mockImplementation((newRegisterInfo:RegisterModel)=>{
                     return new Promise(resolve => resolve(DtoFromApi));
                 });
        const button = wrapper.find("button");

        button.simulate("click");
        expect(register).toHaveBeenCalled();

    })
});
