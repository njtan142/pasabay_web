import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Destination from "../Destination";
import Users from "./Admin/Home";
import Home from "./Home";
import Destinations from "./Destinations";



const App = (props) => {
    return (
        <React.Fragment>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/destination" element={<Destination />} />
                        <Route exact path="/users" element={<Users />} />
                        <Route exact path="/destinations" element={<Destinations />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </React.Fragment>
    )
}



export default App;