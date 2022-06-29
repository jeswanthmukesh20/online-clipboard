import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import {Home, About, Contact} from '../Pages/index'
import Sidebar from '../components/Sidebar'

function Routs() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Sidebar children={<Home/>}/>}/>
                </Routes>
                <Routes>
                    <Route path="/about" element={<Sidebar children={<About/>}/>}/>
                </Routes>
                <Routes>
                    <Route path="/contact" element={<Sidebar children={<Contact/>}/>}/>
                </Routes>
                <Routes>
                    <Route path="*" element={<Sidebar children={<Home/>}/>}/>
                </Routes>
            </Router>
        </div>

    )
}

export default Routs;
