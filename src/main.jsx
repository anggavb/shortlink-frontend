import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import AppRouter from "./AppRouter.jsx";
import AppToastContainer from "@/components/ui/AppToastContainer.jsx";
import { store } from "@/redux/store";
import "./tailwind.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
        <AppToastContainer />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
