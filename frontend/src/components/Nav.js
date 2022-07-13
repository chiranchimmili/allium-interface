import NavItem from "./NavItem"
import items from "../data/navbar.json"
import { useState } from "react"
import "./Nav.css"


const Nav = () => {

  const [page, setPage] = useState(0);

  const changePage = (event, val) => {
    setPage(val)
  }

    return (
        <div className="navbar-container">
          { items.map((item, index) => <NavItem key={index} item={item} changePage = {changePage}/>) }
        </div>
    )
}

export default Nav;