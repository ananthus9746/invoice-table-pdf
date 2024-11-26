import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InvoicePage from "./InvoicePage/InvoicePage";
import ServiceForm from "./ServiceForm";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the ServiceForm page */}
          <Route path="/" element={<ServiceForm />} />

          {/* Route for the InvoicePage */}
          <Route path="/invoice" element={<InvoicePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
