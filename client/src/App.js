import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
// import AdminInventory from "./components/Pages/admin-inventory/AdminInventory";
// import TestPage from "./components/testPage/testPage";
import User from "./components/Pages/User";


function App() {
    return (
        <Router>
            <div>
                {/* THIS IS FOR TESTING, CHANGE ROUTING / EXPRESS LATER */}
                <Wrapper>
                    {/* <Route exact path="/" component={TestPage} />
                    <Route exact path="/admin/inventory" component={AdminInventory} /> */}
                    <User />
                </Wrapper>

            </div>

        </Router>

    );
}

export default App;
