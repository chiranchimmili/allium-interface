import NavItem from "./NavItem"
import items from "../data/navbar.json"
import { useState } from "react"
import "./Nav.css"


const Nav = () => {
    return (
        <div className="navbar-container">
          { items.map((item, index) => <NavItem key={index} item={item} />) }
        </div>
    )
}

export default Nav;