import React from 'react';
import Personsdisplay from './personstoberendered';

function Listofpersons() {
    const Persons = [{ id: 1, name: 'Nweke', age: 10 }, { id: 2, name: "Ify", age: 20 }]
    const personlist = Persons.map(person => <Personsdisplay key={person.id} personprop={person} />)
    //const personlist = Persons.map((person, index) => <Personsdisplay key={index} personprop={person} />)
    return (
        <div>
            {personlist}
        </div>
    )
}

export default Listofpersons