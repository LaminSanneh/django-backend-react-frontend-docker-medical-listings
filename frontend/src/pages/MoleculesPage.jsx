import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PaginationComponent from '../components/PaginationComponent';
import Activities from '../components/Activities';
import MoleculeDetails from '../components/MoleculeDetails';
import { Col, Row, ListGroup, Button } from 'react-bootstrap';

function MoleculesPage() {
    const [fetching, setFetching] = useState(false);
    const [molecules, setMolecules] = useState([]);
    const [currentLink, setCurrentLink] = useState(null);
    const [previousLink, setPreviousLink] = useState(null);
    const [nextLink, setNextLink] = useState(null);
    const [totalMoleculesCount, setTotalMoleculesCount] = useState(0);

    const [moleculeActivities, setMoleculeActivities] = useState([]);
    const [activitiesCurrentLink, setActivitiesCurrentLink] = useState(null);
    const [activitiesPreviousLink, setActivitiesPreviousLink] = useState(null);
    const [activitiesNextLink, setActivitiesNextLink] = useState(null);
    const [fetchingActivities, setFetchingActivities] = useState(false);
    const [selectedMolecule, setSelectedMolecule] = useState(null);
    const [totalActivitiesCount, setTotalActivitiesCount] = useState(0);

    const fetchMolecules = (fetchUrl) => {
        setFetching(true);
        axios.get(fetchUrl).then((results) => {
            setMolecules([...results.data.results]);
            setCurrentLink(fetchUrl);
            setPreviousLink(results.data.previous);
            setNextLink(results.data.next);
            setTotalMoleculesCount(results.data.count);
            setFetching(false);
        });
    }

    const fetchMoleculeActivities = (fetchUrl) => {
        setFetchingActivities(true);
        axios.get(fetchUrl).then((results) => {
            setMoleculeActivities([...results.data.results]);
            setActivitiesCurrentLink(fetchUrl);
            setActivitiesPreviousLink(results.data.previous);
            setActivitiesNextLink(results.data.next);
            setTotalActivitiesCount(results.data.count);
            setFetchingActivities(false);
        });
    }

    const onClickMolecule = (molecule) => {
        setSelectedMolecule(molecule);
        fetchMoleculeActivities(`http://localhost:8000/molecules/${molecule.id}/activities`);
    }

    useEffect(() => {
        fetchMolecules('http://localhost:8000/molecules/');
    }, []);

    return (
        <Fragment>
            <Row>
                <h3>Molecules</h3>
                <PaginationComponent
                    {...{currentLink,
                        previousLink,
                        nextLink,
                        linkClickHandler: fetchMolecules,
                        total: totalMoleculesCount}}
                />
            </Row>
            <Row>
                <Col md={7}>
                    {
                        fetching ?
                        <div>Loading...</div> : <></>
                    }
                    <ListGroup as="ul">
                        {
                            molecules.map((molecule) => {
                                return (
                                    <ListGroup.Item
                                        key={molecule.id}
                                        as="li"
                                        active={selectedMolecule && selectedMolecule.id === molecule.id}
                                    >
                                        <Button onClick={() => { onClickMolecule(molecule) }} >{ molecule.name }</Button> <Button variant="light">
                                            <Link to={`/molecules/${molecule.id}`}>Go To Molecule Page</Link>
                                        </Button>
                                    </ListGroup.Item>
                                );
                            })
                        }
                    </ListGroup>
                </Col>
                <Col md={5}>
                    {
                        selectedMolecule !== null ? 
                        <div>
                            <h3>Selected Molecule Details</h3>
                            <MoleculeDetails molecule={selectedMolecule} />
                        </div> : <></>
                    }     
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col>
                    <h3>Molecule Activities</h3>
                    {
                        moleculeActivities.length > 0 ?
                        <div>
                            <PaginationComponent
                            {...{currentLink: activitiesCurrentLink,
                                previousLink: activitiesPreviousLink,
                                nextLink: activitiesNextLink,
                                linkClickHandler: fetchMoleculeActivities,
                                total: totalActivitiesCount}}
                            />
                        </div> : <></>
                    }
                    {
                        fetchingActivities ?
                            <div>Loading...</div> : <></>
                    }
                    <Activities activities={moleculeActivities}/>
                </Col>
            </Row>       
        </Fragment>
    )
}

export default MoleculesPage;
