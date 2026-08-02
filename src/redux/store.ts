import { createStore } from "redux";

import rootReducer from "./root-reducer";

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;

export default store;
