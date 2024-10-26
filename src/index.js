/*
import React from "react";
import { createRoot } from "react-dom/client"; // Updated import
import NavSideBar from "./NavSideBar";
import { BrowserRouter as Router } from "react-router-dom";
import logoText from "./components/logo-text.png";
import personImg from "./components/cocc-profile.png";

// Make sure the "root" element is in your HTML
const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create a root

const url = "./menuItems.json";

root.render(
  // Use root.render instead of ReactDOM.render
  <div className="flex">
    <Router>
      <NavSideBar Datas={{ logoText, personImg, url }} />
      <main className="flex-1 p-4">
        <div>
          <h1>Dashboard</h1>
        </div>
      </main>
    </Router>
  </div>
);

*/
//reportWebVitals();

import NavSideBar from "./components/NavSideBar"; // Adjust path if necessary
export { NavSideBar };
