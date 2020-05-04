import { createStore, applyMiddleware } from "redux";

import { logger } from "./middlewares";
import { rootReducer } from "./reducer";

export const store = createStore(rootReducer, {}, applyMiddleware(logger));
