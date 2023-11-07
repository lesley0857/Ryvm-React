import React from "react";
import ReactDOM from "react-dom";

function Portal() {
    return ReactDOM.createPortal(
        <h3>
            This is a text outside the root element
        </h3>,
        document.getElementById('new-portal')
    )

}
export default Portal