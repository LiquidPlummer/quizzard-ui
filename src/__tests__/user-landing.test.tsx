import Enzyme,{mount,ReactWrapper,shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Results from "../components/CreateQuiz/Results";
import { Provider } from "react-redux";
import  configureStore  from "redux-mock-store";
import UserLanding from "../components/Main/UserLanding";

Enzyme.configure({adapter:new Adapter()});

describe("Render test",()=>{

    test("first one",()=>{
        const wrapper = mount(<UserLanding/>);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find("h1").text()).toEqual("Test");
    })
})