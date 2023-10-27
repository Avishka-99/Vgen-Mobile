import Axios from 'axios';
import { BASE_URL } from '../constants/Constants';
import { PORT } from '../constants/Constants';
import { NGROK_URL } from '../constants/Constants';
export default Axios.create({

    baseURL: BASE_URL+':'+PORT

});