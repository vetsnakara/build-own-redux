import { createStore } from "redux";

import { middleware } from "./middleware";
import { rootReducer } from "./reducer";

export const store = createStore(rootReducer, middleware);
