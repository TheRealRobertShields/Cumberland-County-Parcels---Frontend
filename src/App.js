
import { useDispatch, useSelector } from 'react-redux';
import { getParcelInfo } from './ACTIONS/parcelActions';
import Tilt from 'react-vanilla-tilt';
import './App.css';
import { createKeyList } from './ACTIONS/keyListActions';
import { useState } from 'react';
import {Parser} from 'json2csv';
// import FileUpload from './COMPONENTS/FileUpload';

function App() {
  const [keyList, setKeyList] = useState({ parcelKey: [] });
  const [downloadUrl, setDownloadUrl] = useState(null);
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
    setIsLoading(true)
    document.querySelector('.keys-input').setAttribute('disabled', true)
    dispatch(createKeyList(keyList)).then(() => console.log('saving to DB')).catch(() => console.log('could not save to db! :('));
    dispatch(getParcelInfo()).then(() => {
      setIsLoading(false)
      createCSV()
    }).catch(() => console.log('oh no!'))
  }

  const createCSV = () => {
    const parser = new Parser(['Pin','Location','Owner','OwnerLocation','DeedDate','PackageSaleDate','ParcelKey','LandValue','BuildingValue','MiscValue','TotalBuildings','TotalUnits','TotalLivingArea','TotalGLA','Location2','BuildingDescription','PhysicalDesription'])
    const csv = parser.parse((parcelInfo))
    const blob = new Blob([csv], { type: 'text/csv' })
    setDownloadUrl(window.URL.createObjectURL(blob))
  }


  const searchFilter = (e) => {
    var results = document.querySelectorAll('.parcelInfo');
    var resultsCount = 0;
    results.forEach(result => {
      if (!result.textContent.toUpperCase().includes(e.target.value.toUpperCase())) {
        result.style.display = 'none';
      }
      else if (result.textContent.toUpperCase().includes(e.target.value.toUpperCase())) {
        result.style.display = 'block';
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
          <h3>Paste keys here</h3>
          <p className='key-count-display'></p>
          <input className='keys-input' type='text' onChange={countItems}/>
          <Tilt className='btn' onClick={fetchData}><p>Fetch Data</p></Tilt>
        </div>
        <div className='downloadcsv-container'>
            <a id='downloadcsv' href={downloadUrl} download='parcelInfo.csv'>download</a>
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
        <div className='parcel-cards-container'>
          {parcelInfo.map(info => (
              <div className='parcelInfo' key={info.ParcelKey}>
                  <p><b>Key...</b> {info.ParcelKey}</p>
                  <p><b>Pin...</b> {info.Pin}</p>
                  <p><b>Loc...</b> {info.Address}</p>
                  <p><b>Owner...</b> {info.Owner}</p>
                  <p><b>Owner Loc...</b> {info.AddressOwner}</p>
                  <p><b>Deed Date...</b> {info.DeedDate}</p>
                  <p><b>Pkg Sale Date...</b> {info.PackageSaleDate}</p>
                  <p><b>Land Value...</b> {info.LandValue}</p>
                  <p><b>Bldg Value...</b> {info.BuildingValue}</p>
                  <p><b>Misc Value...</b> {info.MiscValue}</p>
                  <p><b>Tot Bldgs...</b> {info.TotalBuildings}</p>
                  <p><b>Tot Units...</b> {info.TotalUnits}</p>
                  <p><b>Tot Liv Area...</b> {info.TotalLivingArea}</p>
                  <p><b>Tot GLA...</b> {info.TotalGLA}</p>

                  <p><b>Loc AGAIN...</b> {info.Address2}</p>
                  <p><b>Bldg Desc...</b> {info.BuildingDescription}</p>
                  <p><b>Phys Depreciation...</b> {info.PhysicalDepreciation}</p>
              </div>
            ))}   
        </div>
         



        {/* <div className='table-container'>
          <div className='table-headers'>
            <h2>Key</h2>
            <h2>Pin</h2>
            <h2>Address</h2>
            <h2>Owner(s)</h2>
            <h2>OwnerAddress</h2>
            <h2>DeedDate</h2>
          </div>
          {parcelInfo.map(info => (
            <Tilt className='parcelInfo-listview' key={info.ParcelKey}>
                <p>{info.ParcelKey}</p>
                <p>{info.Pin}</p>
                <p>{info.Address}</p>
                <p>{info.Owner}</p>
                <p>{info.AddressOwner}</p>
                <p>{info.DeedDate}</p>
            </Tilt>))}
        </div> */}
        </>
        }
        <div className='blur'></div>
      </div>
      {/* <FileUpload /> */}
      <div id='scroll-path'></div>
      <div id='scroll-progress'></div>
    </div>
  );
}

export default App;
