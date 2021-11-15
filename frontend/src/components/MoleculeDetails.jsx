import React from 'react'

function MoleculeDetails(props) {
    return (
        <div>
            <div>Molecule Name: { props.molecule.name }</div>
            <div>Inchi Key: { props.molecule.inchi_key }</div>
            <div>Max Phase: { props.molecule.max_phase }</div>
            <div>Structure: { props.molecule.name }</div>
        </div>
    )
}

export default MoleculeDetails
