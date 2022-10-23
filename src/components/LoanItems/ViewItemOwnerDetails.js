import React from 'react';
import {useParams} from "react-router-dom";

const ViewItemOwnerDetails = () => {

    const {ownerId} = useParams()

    return (
        <div>
            <p>Hello New World, {ownerId}</p>
        </div>
    );
};

export default ViewItemOwnerDetails;