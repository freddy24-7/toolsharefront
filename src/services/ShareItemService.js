import { POST_SHARE_ITEM_URL} from '../backend-urls/constants'
import axios from 'axios';

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

//specifying back-end URL
const apiURL = POST_SHARE_ITEM_URL;

//Using the authAxios variable here, taking the URL and the relevant class as parameters
class ShareItemService {

    saveItem(loanItem) {
        return axios.post(apiURL, loanItem);
    }

}
export default new ShareItemService();