import * as React from "react";
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './state';
import { createRoot } from "react-dom/client";

import App from './containers/App';

const store = configureStore({});


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
      <Provider store={store}>
        <App />
      </Provider>,
);
