import React, { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
    const [myColor, setColor] = useState("red")

    const toggleColor = () => {
        setColor(myColor == "red" ? "gray" : "red")
    }

    return (
        <MyContext.Provider value={{ myColor, setColor,toggleColor }}>
            {children}
        </MyContext.Provider>
    )
};

export default MyProvider;