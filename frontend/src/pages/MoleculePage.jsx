import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Activities from '../components/Activities';
import MoleculeDetails from '../components/MoleculeDetails';

function MoleculePage() {
    const [molecule, setMolecule] = useState(null); 
    const { moleculeId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/molecules/${moleculeId}`).then((results) => {
            setMolecule(results.data)
        });
    }, [moleculeId]);

    if (molecule === null) {
        return <div>Loading...</div>;
    }

    const activitiesList = 
        molecule.activities ?
            <Activities activities={molecule.activities} />
                : <div>No activities</div>;

    return (
        <div>
            <div>
                <h2>Molecule Details</h2>
                <MoleculeDetails molecule={molecule} />
            </div>
            <div>
                <h3>Activities</h3>
                <div>
                    {activitiesList}
                </div>
            </div>
        </div>
    );
}

export default MoleculePage;
