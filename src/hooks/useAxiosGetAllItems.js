import React, {useEffect, useState} from 'react';
import ShareItemService from "../services/ShareItemService";

const UseAxiosGetAllItems = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        ShareItemService.getAllItems().then((response) => {
            console.log(response.data)
            setItems(response.data);
        }).catch(error => {
                console.log(error)
            }
        )
    }, [])
    return { items, setItems }
};

export default UseAxiosGetAllItems;