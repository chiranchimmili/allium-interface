import React, { useState } from "react";
import "./VerificationResults.css"

const VerificationResults = () => {

    return (
        <div className = "voutputs">
            <div className = "vbox1">
                <header>Packets Received: </header>
                <output> </output>
                <header>Packets Lost: </header>
                <output> </output>
                <header>Packets Lost %: </header>
                <output> </output>
                <header>BERT Lock Status: </header>
                <output> </output>
                <header>Lock Loss: </header>
                <output> </output>
                <header>BERT Bit Count: </header>
                <output> </output>
                <header>BERT Error Bit Count: </header>
                <output> </output>
            </div>
        </div>
    );
}


export default VerificationResults;