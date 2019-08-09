import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import AdminInventory from "./components/Pages/admin-inventory/AdminInventory";
import Home from "./components/Pages/Home";
import AdminAction from "./components/Pages/admin-action/AdminAction";

function App() {
  return (
    <Router>
      <div>
        {/* THIS IS FOR TESTING, CHANGE ROUTING / EXPRESS LATER */}
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin/action" component={AdminAction} />
          <Route exact path="/admin/inventory" component={AdminInventory} />
        </Wrapper>
      </div>
    </Router>
  );
}

export default App;
