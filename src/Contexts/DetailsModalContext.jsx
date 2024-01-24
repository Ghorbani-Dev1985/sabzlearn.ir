import { createContext, useContext, useState } from "react";

const DetailsModalContext = createContext()

export const DetailsModalProvider = ({ children }) => {

  const [showDetailsModal, setShowDetailsModal] = useState(false);


    return (
        <DetailsModalContext.Provider value={{showDetailsModal , setShowDetailsModal}}>
            {children}
        </DetailsModalContext.Provider>
    )
}

export const useDetailsModal = () => useContext(DetailsModalContext)

