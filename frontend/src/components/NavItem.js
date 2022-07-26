import { useState } from "react";
import { useContext } from "react";
import TabContext from "../TabContext";

const NavItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { setPage } = useContext(TabContext);

  const handleClick = (id) => {
    let config = document.querySelector("#Configuration0");
    let results = document.querySelector("#Results0");
    let config1 = document.querySelector("#Configuration1");
    let results1 = document.querySelector("#Results1");
    if (id == "Results0") {
      if (!results.classList.contains("Active")) {
        results.classList.add("Active");
        setPage("results-container");
        config.classList.remove("Active");
        config1.classList.remove("Active");
        results1.classList.remove("Active");
      }
    } else if (id == "Configuration0") {
      if (!config.classList.contains("Active")) {
        config.classList.add("Active");
        setPage("configuration-container");
        results.classList.remove("Active");
        config1.classList.remove("Active");
        results1.classList.remove("Active");
      }
    } else if (id == "Configuration1") {
      if (!config1.classList.contains("Active")) {
        config1.classList.add("Active");
        setPage("configuration1-container");
        results1.classList.remove("Active");
        config.classList.remove("Active");
        results.classList.remove("Active");
      }
    } else {
      if (!results1.classList.contains("Active")) {
        results1.classList.add("Active");
        setPage("results1-container");
        config1.classList.remove("Active");
        config.classList.remove("Active");
        results.classList.remove("Active");
      }
    }
  };

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i
            className="bi-chevron-down toggle-btn"
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <NavItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <button
        className={"sidebar-item plain"}
        id={item.id}
        onClick={() => handleClick(item.id)}
      >
        {item.icon && <i className={item.icon}></i>}
        {item.title}
      </button>
    );
  }
};
export default NavItem;
