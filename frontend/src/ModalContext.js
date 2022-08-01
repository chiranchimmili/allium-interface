import { createContext, useState} from "react";

const ModalContext = createContext();

export function ModalProvider({children}) {

    const [modalOpen, setModalOpen] = useState("modalClosed");
    const [modal2Open, setModal2Open] = useState("modal2Closed");
    const [rowsData, setRowsData] = useState([]);
    const [rowsData2, setRowsData2] = useState([]);
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedRow2, setSelectedRow2] = useState(0);


    return (
        <ModalContext.Provider value={{modalOpen, setModalOpen, modal2Open, setModal2Open, rowsData, setRowsData, rowsData2, setRowsData2
        , selectedRow, setSelectedRow, selectedRow2, setSelectedRow2}}>{children}</ModalContext.Provider>
    );
}

export default ModalContext;