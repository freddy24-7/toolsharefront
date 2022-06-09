import {PARTICIPANT_URL} from '../backend-urls/constants'
import axios from 'axios';


class ParticipantService {

    createParticipant(participant) {

        return axios.post(PARTICIPANT_URL, participant);

    }
}
export default new ParticipantService();