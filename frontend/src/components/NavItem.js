import { useState } from "react"
import { useContext } from "react"
import TabContext from "../TabContext"

const NavItem = ({item}) => {
    const [open, setOpen] = useState(false)

    const {setPage} = useContext(TabContext);

    const handleClick = (id) => {
        let config = document.querySelector("#Configuration");
        let results = document.querySelector("#Results");
        console.log(id)
        if (id == "Results") {
            if (!(results.classList.contains("Active"))) {
                results.classList.add("Active")
                setPage("results-container")
                config.classList.remove("Active")
            }
        } else {
            if (!(config.classList.contains("Active"))) {
                config.classList.add("Active")
                setPage("configuration-container")
                results.classList.remove("Active")
            }
        }
    }

    if (item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        { item.icon && <i className={item.icon}></i> }
                        {item.title}    
                    </span> 
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="sidebar-content">
                    { item.childrens.map((child, index) => <NavItem key={index} item={child} />) }
                </div>
            </div>
        )
    } else{
        return (
            <button className={"sidebar-item plain"} id={item.id} onClick = {() => handleClick(item.id)}>
                { item.icon && <i className={item.icon}></i> }
                {item.title}
            </button>
        )
    }
}
export default NavItem;