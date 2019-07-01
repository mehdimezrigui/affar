import { createStore } from "redux";
import reducerUser from "../reducers/reducerUser"

const store = createStore(reducerUser, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store