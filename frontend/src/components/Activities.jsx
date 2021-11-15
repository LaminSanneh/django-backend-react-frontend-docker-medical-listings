import React from 'react';
import { ListGroup } from 'react-bootstrap';

function Articles({activities}) {
    return (
        <>
            {
                activities.length > 0 ?
                <ListGroup as="ul">
                    {
                        activities.map((activity) => {
                            return (
                                <ListGroup.Item
                                    key={activity.id}
                                    as="li"
                                >
                                    <div>Type: { activity.type }</div>
                                    <div>Relation: { activity.relation }</div>
                                    <div>Units: { activity.units }</div>
                                    <div>Value: { activity.value }</div>
                                    <div>
                                        <div>Target Name: { activity.target.name }</div>
                                        <div>Organism Name: { activity.target.name }</div>
                                    </div>
                                    <br/>
                                </ListGroup.Item>
                            );
                        })
                    }
                </ListGroup> : <></>
            }
        </>
    )
}

export default Articles;
