import React from 'react';

function Personsdisplay({ personprop }) {

    return (
        <div>
            I am {personprop.name}.I am {personprop.age} years old.
        </div>
    )
}


export default Personsdisplay