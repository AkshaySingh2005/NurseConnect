import { createContext, useContext, useState } from "react";

const NurseResponseContext = createContext(null);

export const useNurseResponse = () => useContext(NurseResponseContext);

export const NurseResponseProvider = ({ children }) => {

    const [whatsappLink, setwhatsappLink] = useState(null);
    const [qrCodeImage, setQrCodeImage] = useState(null);

    const value = {
        whatsappLink,
        setwhatsappLink,
        qrCodeImage,
        setQrCodeImage
    }

    return(
        <NurseResponseContext.Provider value={value}>
            {children}
        </NurseResponseContext.Provider>
    )
}

export default NurseResponseContext;