import axios from 'axios'

const parcelURL = 'https://ccparcels-rs.herokuapp.com/parcel';
// const parcelURL = 'http://localhost:9000/parcel';

export const fetchParcelInfo = async () => await axios.get(parcelURL);


const keyListURL = 'https://ccparcels-rs.herokuapp.com/keylists';
// const keyListURL = 'http://localhost:9000/keylists';

export const fetchKeyLists = async () => await axios.get(keyListURL);
export const createKeyList = (newKeyList) => axios.post(keyListURL, newKeyList);

/*
105491
105492
105493
105494
105495
*/