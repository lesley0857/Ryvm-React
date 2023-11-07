import React from "react";

const Propsfunc = props => {
    return (
        <div>
            <h1 className="dummy">Hello {props.name}</h1>
            {props.children}
        </div>
    )
}

export default Propsfunc