import react from "react";
import React from "react";

const cssLoader = `
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}`
const cssCircle = `
.circle {
    width: 20px;
    height: 20px;
    background-color: #333;
    border-radius: 50%;
    margin: 0 5px;
    animation: circle 0.9s infinite alternate;
}
@keyframes circle {
    to {
        transform: translateY(-20px);
        background-color: #fff;
    }
}`

const Loader: React.FC = () => {
    return (
        <div>
            //make a loader with circle
            <style>{cssLoader}</style>
            <style>{cssCircle}</style>
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    );
}

export default Loader;