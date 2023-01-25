import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from 'react';

function Searchbar(props) {
    const [search, setSearch] = useState('');

    const handleChange = event => {
        setSearch(event.target.value);
    };

    const handleKeyDown = (event) => {
        setSearch(event.target.value)
        if (event.key === 'Enter') {
            event.preventDefault();
            updateTheApi();
        }
    };

    function updateTheApi() {
        window.history.replaceState(null, "Test", "/site/v1/food/" + search);
        props.update(search);
    }

    return (
        <Form>
            <h1 className={"text-center"}>SEARCH</h1>
            <InputGroup>
                <Form.Control type="search" onChange={handleChange} onKeyDown={handleKeyDown} value={search}/>
                <Button variant="outline-secondary" id="button-addon" onClick={updateTheApi}>
                    Search
                </Button>
            </InputGroup>
        </Form>
    );
}

export default Searchbar;