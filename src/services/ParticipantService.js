import {PARTICIPANT_URL} from '../backend-urls/constants'
import axios from 'axios';

//Obtaining token from local storage to access resource
//Key is specified in LoginForm.js and needs to be consistent
const initialToken = localStorage.getItem('jwt');
console.log(initialToken)

//specifying back-end URL
const apiURL = PARTICIPANT_URL

//Creating a variable that grants access, taking the initial token as parameter
//At this stage, back-end was also upated to allow foe the "Authorization-header" (in addition to "Content-Type")
const authAxios = axios.create(
    {
        baseURL: apiURL,
        headers: {
            Authorization: `Bearer ${initialToken}`
        }
    }
)

//Using the authAxios variable here, taking the URL and the relevant class as parameters
class ParticipantService {

    saveParticipant(participant) {
        return authAxios.post(PARTICIPANT_URL, participant);
    }

    getAllParticipants() {
        return authAxios.get(PARTICIPANT_URL);
    }
    // getParticipantById(id){
    //     return authAxios.get(`${PARTICIPANT_URL}/${id}`);
    // }
    getParticipantById(id){
        return authAxios.get(PARTICIPANT_URL + '/', id);
    }

    updateParticipant(id, participant){
        return authAxios.put(PARTICIPANT_URL + '/' + id, participant)
    }
    deleteParticipant(participantId){
        return authAxios.delete(PARTICIPANT_URL + '/' + participantId)
    }

}
export default new ParticipantService();