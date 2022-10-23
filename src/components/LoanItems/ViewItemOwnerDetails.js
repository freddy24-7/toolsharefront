import React from 'react';
import {useParams} from "react-router-dom";

const ViewItemOwnerDetails = () => {

    const {id} = useParams()

    return (
        <div>
            <p>Hello New World, {id}</p>
        </div>
    );
};

export default ViewItemOwnerDetails;