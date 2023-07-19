import Axios from 'axios';
import { BASE_URL } from '../constants/Constants';
import { PORT } from '../constants/Constants';
export default Axios.create({

    baseURL: 'http://'+BASE_URL+':'+PORT

});