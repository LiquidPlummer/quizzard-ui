import Enzyme, {mount, ReactWrapper, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {render, fireEvent,act} from "@testing-library/react";
import React from "react";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import StudyHub from "../components/StudySets/StudyHub";
import {Account} from "../models/account";
import {SetFlashcardDTO} from "../models/flashcard";
import {Subject} from "../models/subject";


Enzyme.configure({adapter:new Adapter()});

const configureMS = configureStore();
const initialState = {
    isAuthenticated: true,
    isLoading: false,
    username: "shadowmonarch",
    token: "aaa",
};
const initialState2 = {
    selectedStudySet: {id: -1, creator: {} as Account,cards: [] as SetFlashcardDTO[], name: '', isPublic: true},
    isStudySetSelected: false,
    flashcard: {id: -1, creator: {} as Account, public: true, answer: '', question: '', reviewable: true, subject: {} as Subject},
    isFlashCardSelected: false,
    showModal: false,
    question: '',
    answer: '',
    reviewable: true,
    public: true,
    availableStudySets: [],
    isLoading: false,
    finishedLoading: false,
    account: {} as Account
}

describe("Study Hub Component",()=>{

    let wrapper:ReactWrapper;

    beforeEach(()=>{
        wrapper = mount(<Provider store={configureMS(initialState)}><StudyHub/></Provider>);
    })

    test("Shallow Test",()=>{
        const wrapper = shallow(<Provider store={configureMS(initialState2)}><StudyHub/></Provider>);
        expect(wrapper.exists()).toBe(true);
    })
})