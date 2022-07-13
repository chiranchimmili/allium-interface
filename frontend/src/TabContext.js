import { createContext, useState} from "react";

const TabContext = createContext();


export function TabProvider({children}) {

    const [page, setPage] = useState("empty-container");

    return (
        <TabContext.Provider value={{page, setPage}}>{children}</TabContext.Provider>
    );
}


export default TabContext;