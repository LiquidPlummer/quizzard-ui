import Enzyme, {mount, ReactWrapper, shallow} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import  configureStore  from "redux-mock-store";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';
import SetList from "../components/Sets/SetList";


Enzyme.configure({adapter:new Adapter()});

const configureMock = configureStore();
const initialState = {
    setList:{
        cardSetList: []
    }
};
describe("Main Component",()=> {

    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(<Provider store={configureMock(initialState)}><SetList/></Provider>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    test("Render",()=>{
        expect(wrapper.exists()).toBe(true);
    })
});