import * as api from '../API/api';

export const getParcelInfo = () => async (dispatch) => {
    const { data } = await api.fetchParcelInfo();
    dispatch({ type: 'FETCH_ALL_PARCELINFO', payload: data});
}
