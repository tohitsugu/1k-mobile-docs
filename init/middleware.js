/* Core */
import { compose } from "redux";
import createSagaMiddleware from "redux-saga";

const developmentEnvironment = false;
const devtools = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers =
  developmentEnvironment && devtools ? devtools : compose;

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export { composeEnhancers, middleware, sagaMiddleware };
