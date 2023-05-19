import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { NavBar, Providers } from "../src/components";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <NavBar />
      <App />
    </Providers>
  </React.StrictMode>
);
