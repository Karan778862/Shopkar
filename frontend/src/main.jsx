import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}> */}

        <App />
      {/* </PersistGate> */}
      
    </Provider>
    
  </StrictMode>
);
