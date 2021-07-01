import Enzyme, {mount, ReactWrapper, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {render, fireEvent, act} from "@testing-library/react";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import Welcome from "../components/Main/Welcome";


Enzyme.configure({adapter:new Adapter()});

describe("Welcome Component",()=>{

    let wrapper:ReactWrapper;

    beforeEach(()=>{
        wrapper = mount(<Welcome/>);
    });
    afterEach(()=>{
        wrapper.unmount();
    })

    test("check for existance",()=>{
        const wrapper = shallow(<Welcome/>);
        expect(wrapper.exists()).toBe(true);
    });

    test("test components elements display properly",()=>{
        expect(wrapper.find("div.welcomeBanner").text()).toEqual("Welcome to Qwizzard, your resource for everything QC!");
        expect(wrapper.find("div.instructionsWelcome").text()).toBeTruthy();
        expect(wrapper.find("div.featuresHeader").text()).toBeTruthy();
        expect(wrapper.find("li").length).toEqual(4);

    });
});