// eslint-disable-next-line
export default (parcelInfo = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_PARCELINFO':
            console.log(action.type)    
            return action.payload;
        default:
            return parcelInfo;
    }
}