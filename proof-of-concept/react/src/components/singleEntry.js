import React from 'react';
import Card from 'react-bootstrap/Card';

function SingleEntry(props) {
    let listOfKeys = Object.keys(props.data);
    let className = "p-2"
    return listOfKeys.map((key) => {
            if(Array.isArray(props.data[key])) {
                return <Card className={className} key={key}>
                    <Card.Title className="d-flex justify-content-center">{key}</Card.Title>
                    <SingleEntry data={props.data[key]}/>
                </Card>
            } else if(typeof props.data[key] === 'object' && !Array.isArray(props.data[key]) && props.data[key] !== null) {
                return <Card className={className} key={key}>
                    <Card.Title className="d-flex justify-content-center">{key}</Card.Title>
                    <SingleEntry data={props.data[key]}/>
                </Card>
            } else {
                return <Card className={className} key={key}>
                    {key} : {props.data[key]}
                </Card>
            }
        });
}

export default SingleEntry;