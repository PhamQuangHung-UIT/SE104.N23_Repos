import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesApp from "./navigation/RoutesApp";
const App = () => {
  return (
    <div>
      <Router>
        <RoutesApp />
      </Router>
    </div>
  );
};

export default App;
