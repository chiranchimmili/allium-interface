import { createContext, useState} from "react";

const ModalContext = createContext();

export function ModalProvider({children}) {

    const [modalOpen, setModalOpen] = useState("modalClosed");
    const [modal2Open, setModal2Open] = useState("modal2Closed");

    return (
        <ModalContext.Provider value={{modalOpen, setModalOpen, modal2Open, setModal2Open}}>{children}</ModalContext.Provider>
    );
}

export default ModalContext;