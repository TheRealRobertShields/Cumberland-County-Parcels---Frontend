
import { useDispatch, useSelector } from 'react-redux';
import { getParcelInfo } from './ACTIONS/parcelActions';
import Tilt from 'react-vanilla-tilt';
import './App.css';
import { createKeyList } from './ACTIONS/keyListActions';
import { useState } from 'react';

function App() {
  const [keyList, setKeyList] = useState({ parcelKey: [] });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const parcelInfo = useSelector((state) => state.parcelInfo)
  console.log(parcelInfo)
  
  const countItems = (e) => {
    setKeyList({ ...keyList, parcelKey: e.target.value.trim().split(/\s+/) })
    // Number of Parcel Keys entered.
    if (e.target.value.trim() === '')
      document.querySelector('.key-count-display').innerHTML = 'No keys detected';
    else
      document.querySelector('.key-count-display').innerHTML = e.target.value.trim().split(/\s+/).length + ' keys detected';
  }

  const fetchData = (e) => {
    document.querySelector('.keys-input').value = '';
    setIsLoading(true)
    dispatch(createKeyList(keyList));
    dispatch(getParcelInfo()).then(() => setIsLoading(false)).catch(() => console.log('oh no!'))
  }

  const searchFilter = (e) => {
    console.log(e.target.value.toUpperCase())
    var results = document.querySelectorAll('.parcelInfo-listview');
    var resultsCount = 0;
    results.forEach(result => {
      if (!result.textContent.toUpperCase().includes(e.target.value.toUpperCase())) {
        result.style.display = 'none';
      }
      else if (result.textContent.toUpperCase().includes(e.target.value.toUpperCase())) {
        result.style.display = 'flex';
        resultsCount += 1;
      }
      document.querySelector('.results-count').textContent = resultsCount + ' result(s) of ' + parcelInfo.length;
    })
    if (resultsCount === 0 && e.target.value.length === 0) {
      document.querySelector('.results-count').textContent = 'search result(s)';
    }
  }

  return (
    <div className="App">
      
      <div className='parcelInfo-container'>
        <h1 className='title'>Cumberland County Parcels</h1>
        <div className='input-for-keys'>
          <h3>Paste keys here</h3><p className='key-count-display'></p>
          <input className='keys-input' type='text' onChange={countItems}/>
          <Tilt className='btn' onClick={fetchData}><p>Fetch Data</p></Tilt>
        </div>
        {isLoading ? <div className='loading'><p className='loading-text'></p></div> :
        
        !parcelInfo.length ? <></> :<>
        <div className='results-filter-container'>
          <div className='filter-header'>
            <h3>Search</h3>
            <span className='results-count'>search result(s)</span>
          </div>
          <input className='search-input' type='text' onChange={searchFilter}/>
        </div>
        <div className='table-container'>
          <div className='table-headers'>
            <h2>Key</h2>
            <h2>Address</h2>
            <h2>Owner(s)</h2>
            <h2>Property Type</h2>
          </div>
          {parcelInfo.map(info => (
            <Tilt className='parcelInfo-listview' key={info.ParcelKey}>
                <p>{info.ParcelKey}</p>
                <p>{info.Address}</p>
                <p>{info.Owner}</p>
                <p>{info.PropertyType}</p>
            </Tilt>))}
        </div>

        </>
        }
        <div className='blur'></div>
      </div>
      <div className='background-shape'></div>
    </div>
  );
}

export default App;
