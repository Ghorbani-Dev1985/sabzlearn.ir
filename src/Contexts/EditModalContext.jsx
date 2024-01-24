import { createContext, useContext, useState } from "react";

const EditModalContext = createContext();

export const EditModalProvider = ({ children }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <EditModalContext.Provider
      value={{ showEditModal, setShowEditModal }}
    >
      {children}
    </EditModalContext.Provider>
  );
};

export const useEditModal = () => useContext(EditModalContext);
