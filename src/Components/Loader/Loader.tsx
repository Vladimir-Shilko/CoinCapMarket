import React from "react";
import "./Loader.scss";

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