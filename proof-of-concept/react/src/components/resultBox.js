import React, {useEffect, useState} from 'react';
import Stack from 'react-bootstrap/Stack';
import SingleEntry from "./singleEntry";
import Card from "react-bootstrap/Card";

function ResultBox(props) {

    const [data, loadData] = useState([{},{}]);

    useEffect(() => {
        fetch(props.url).then(res => res.json()).then(data => {
            loadData(data);
        })
    }, [props.url])

    const calculateCorrectColour = (date) => {
        let currDate = new Date();
        let foodDate = new Date(date);
        let bgColour = ""
        if (foodDate < currDate) {
            bgColour = "bg-danger"
        } else if (foodDate - currDate < 259200000){ // 259200000 is the number of milliseconds of three days.
            bgColour = "bg-warning"
        } else {
            bgColour = "bg-success"
        }
        return "mt-2 pt-2 pb-2 text-center " + bgColour
    }

    const parseDate = (date) => {
        let foodDate = new Date(date)
        return foodDate.toDateString()
    }

    return (
        <Stack gap={4}>
            {
                data.map((datapoint, index) => {
                    if (index === 0) {
                        return <Card className={calculateCorrectColour(datapoint["ai_model"])} key={0}>
                           Expiry data guessed by the ai: {parseDate(datapoint["ai_model"])}
                        </Card>;
                    } else if (index === 1) {
                        return <div key={index}>
                            <h1 className={"text-center"}>INFORMATION ABOUT THE FOOD</h1>
                            <SingleEntry data={datapoint} index={index}/>
                            <h1 className={"text-center"}>SUPPLY CHAIN DATA</h1>
                        </div>;
                    } else {
                        return <Card className={"p-2"} key={index}>
                            <SingleEntry data={datapoint} index={index}/>
                        </Card>;
                    }

                })
            }
        </Stack>
    );
}

export default ResultBox;