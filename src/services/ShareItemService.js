import {PARTICIPANT_URL, SHARE_ITEM_URL} from '../backend-urls/constants'
import axios from 'axios';

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

//specifying back-end URL
const apiURL = SHARE_ITEM_URL;

//Creating a variable that grants access, taking the initial token as parameter
//At this stage, back-end was also updated to allow foe the "Authorization-header" (in addition to "Content-Type")
// const shareAxios = axios(
//     {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         'credentials': 'include'
//     }
// )
// const axios = require('axios');



//Using the authAxios variable here, taking the URL and the relevant class as parameters
class ShareItemService {

    saveItem(loanItem) {
        return axios.post(SHARE_ITEM_URL, loanItem);
    }

}
export default new ShareItemService();