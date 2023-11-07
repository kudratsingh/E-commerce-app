import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesWithNavbar from "./components/RoutesWithNavBar";
import "./App.css";

function App() {
    
  return (

    <Router>
      <RoutesWithNavbar className='app' />
    </Router>

  );
}

export default App;
