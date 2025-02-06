import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store.ts";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Provider>
        <Router>
          <App />
        </Router>
      </Provider>
    </ReduxProvider>
  </StrictMode>
);
