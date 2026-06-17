import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router";
import AppRouter from "./AppRouter.jsx";
import AppToastContainer from "@/components/ui/AppToastContainer.jsx";
import { persistor, store } from "@/redux/store";
import "./tailwind.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppRouter />
          <AppToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
