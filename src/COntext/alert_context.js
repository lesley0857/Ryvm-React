import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";

export const alertbox_context = createContext(null)

const Alertbox_provider = ({ children }) => {
    const [alert, Setalert] = useState({ type: null, text: null });
    return (
        <alertbox_context.Provider value={{ 'alert': alert, 'Setalert': Setalert }}>
            {children}
        </alertbox_context.Provider>
    )
}
export default Alertbox_provider