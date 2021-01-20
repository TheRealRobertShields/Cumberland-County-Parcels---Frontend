import * as api from '../API/api';

export const getKeyLists = () => async (dispatch) => {
    try {
        const { data } = await api.fetchKeyLists();
        dispatch({ type: 'FETCH_ALL_KEYLISTS', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createKeyList = (keyList) => async (dispatch) => {
    try {
        const { data } = await api.createKeyList(keyList)
        dispatch({ type: 'CREATE_KEYLIST', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}