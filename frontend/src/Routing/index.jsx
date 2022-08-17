import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import {Home, About, Contact} from '../Pages'
import Sidebar from '../components/Sidebar'

function Routs() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/about" element={<Sidebar children={<About/>}/>}/>
                    <Route path="/contact" element={<Sidebar children={<Contact/>}/>}/>
                    <Route path="*" element={<Sidebar children={<Home/>}/>}/>
                </Routes>
            </Router>
        </div>

    )
}

export default Routs;
