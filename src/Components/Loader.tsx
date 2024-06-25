import react from "react";
import React from "react";
import "../styles/Loader.css";

const Loader: React.FC = () => {
    return (
        <div>
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    );
}

export default Loader;