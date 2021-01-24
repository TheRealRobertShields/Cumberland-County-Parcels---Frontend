// eslint-disable-next-line
export default (keylist = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_KEYLISTS':
            console.log(action.type)            
            return action.payload;
        case 'CREATE_KEYLIST':
            console.log(action.type) 
            return [ ...keylist, action.payload];
        default:
            return keylist;
    }
}