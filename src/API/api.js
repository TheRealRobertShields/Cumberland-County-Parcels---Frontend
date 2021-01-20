import axios from 'axios'

const parcelURL = 'https://ccparcels-rs.herokuapp.com/parcel';

export const fetchParcelInfo = async () => await axios.get(parcelURL);


const keyListURL = 'https://ccparcels-rs.herokuapp.com/keylists';

export const fetchKeyLists = async () => await axios.get(keyListURL);
export const createKeyList = (newKeyList) => axios.post(keyListURL, newKeyList);