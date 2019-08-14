import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Dashboard from "./components/Pages/dashboard/Dashboard";
import AdminDashboard from "./components/Pages/admin-dashboard/AdminDashboard";
import AdminInventory from "./components/Pages/admin-inventory/AdminInventory";
import AdminAction from "./components/Pages/admin-action/AdminAction";
import AdminUsers from "./components/Pages/admin-userlist/AdminUserList";
import UserCheckout from "./components/Pages/user-checkout/UserCheckout";
import Home from "./components/Pages/Home";

function App() {

    return (
        <Router>
            <div>
                {/* THIS IS FOR TESTING, CHANGE ROUTING / EXPRESS LATER */}
                <Wrapper>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/admin/dashboard" component={AdminDashboard} />
                    <Route exact path="/user/dashboard"
                        render={(props) => <Dashboard {...props} type={"user"}/>} />
                    <Route exact path="/admin/action" component={AdminAction} />
                    <Route exact path="/admin/inventory" component={AdminInventory} />
                    <Route exact path="/admin/users" component={AdminUsers} />
                    <Route exact path="/user-checkout" component={UserCheckout} />
                </Wrapper>
            </div>
        </Router>
    );

}

export default App;
