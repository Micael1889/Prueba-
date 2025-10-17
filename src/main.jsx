import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthUserContextProvider from "./Services/AuthUserContext/AuthUserContextProvider.jsx";
import CartContextProvider from "./Services/Cart/CartContextProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthUserContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </AuthUserContextProvider>
  </StrictMode>
);
