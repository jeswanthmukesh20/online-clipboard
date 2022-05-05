import {
    Box,
    Drawer,
    useColorMode,
    Switch,
    Flex,
    Button,
    IconButton
} from "@chakra-ui/react";
import React, { Component } from "react";
import {HamburgerIcon, CloseIcon} from "@chakra-ui/icons";


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar  navbar-expand-lg navbar-dark" style={{
                backgroundColor: "#14202A",
            }}>
                <div className="container-fluid">
                    <div className="navbar-brand" style={{
                        fontWeight: "bold"
                    }}>CopyTxT</div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><HamburgerIcon/></button>
                    <div class="collapse navbar-collapse " id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item ">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
