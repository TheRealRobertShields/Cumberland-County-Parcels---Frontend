import React, { useEffect, useState } from 'react'

const FileUpload = () => {

    const [list, setList] = useState([])

    useEffect(() => {

    }, [])

    var file = null;
    const detectFile = () => {
        // Display the filename in a div with classname 'selected-file'
        file = document.getElementById('file-input').files[0];
        document.querySelector('.selected-file').textContent = file.name;
    }

    const processFile = () => {
        // If selected file is not null
        if (file) {
            console.log(`Processing: ${file.name}`)
            // Create FileReader obj to turn file data into a string
            var fileReader = new FileReader();
            fileReader.readAsBinaryString(file);
            // When FileReader done reading, call processData function
            fileReader.onload = (e) => {
                processData(e.target.result);
            }
        }
    }

    // Declare array that will eventually contain extracted data from file
    var processedData = [];
    const processData = (data) => {
        // Split data into an array of strings to work with
        var lines = data.split(/[\r\n]+/g);
        // Iterate thru each string to extract data points
        for (let i = 1; i < lines.length -1; i++) {
            // Split current string into array of strings to work with
            var datapoints = lines[i].split(',')

            // Declare array variable that will store current parcel's data
            var parcelData = []
            // Declare offset variable to handle unexpected commas
            var offset = 0;

            // Parcel_PK
            var key = datapoints[0 + offset]
            parcelData.key = key

            // Column that sometimes contains a comma, so offset needs to be incremented
            if (datapoints[2 + offset].includes('"') && datapoints[2 + offset].indexOf('"') === 0)
                offset += 1
            // Column that sometimes contains a comma, so offset needs to be incremented
            if (datapoints[6 + offset].includes('"') && datapoints[6 + offset].indexOf('"') === 0)
                offset += 1

            // Address
            var address = datapoints[4 + offset]
            parcelData.address = address
            // City
            var city = datapoints[5 + offset]
            parcelData.city = city
            
            // Owner Name(s) -- this one is tricky due to the varying # of owners
            var owner = datapoints[17 + offset]
            if (datapoints[17 + offset].includes('"')) {
                while (owner.charAt(owner.length - 1) !== '"') {
                    offset += 1
                    owner += datapoints[17 + offset]
                }
            }
            owner = owner.replaceAll('&amp;', '&');
            owner = owner.replaceAll('"', '');
            parcelData.owner = owner

            // Column that wouldn't surprise me if it contained a comma, so offset would need to be incremented
            if (datapoints[18 + offset].includes('"') && datapoints[18 + offset].indexOf('"') === 0)
                offset += 1
            // Owner Address
            var ownerAddress = datapoints[18 + offset]
            parcelData.ownerAddress = ownerAddress
            // Owner State
            var ownerState = datapoints[19 + offset]
            parcelData.ownerState = ownerState
            // Owner Zip
            var ownerZip = datapoints[20 + offset]
            parcelData.ownerZip = ownerZip
            // console.log(i+1 + "  >  " + ownerState + "  >  " + ownerZip)
            processedData.push(parcelData)
            
        }
        console.log(processedData);
        setList(processedData)
    }
    const searchFilter = (e) => {
        console.log(e.target.value.toUpperCase())
        var results = document.querySelectorAll('.data-row');
        var resultsCount = 0;
        results.forEach(result => {
        if (!result.textContent.toUpperCase().includes(e.target.value.toUpperCase())) {
            result.style.display = 'none';
        }
        else if (result.textContent.toUpperCase().includes(e.target.value.toUpperCase())) {
            result.style.display = 'table-row';
            resultsCount += 1;
        }
        document.querySelector('.results-count').textContent = resultsCount + ' result(s) of ' + list.length;
        })
        if (resultsCount === 0 && e.target.value.length === 0) {
        document.querySelector('.results-count').textContent = 'search result(s)';
        }
    }

    
    
    return (
        <div className='file-upload-container'>
            <h1 className='title'>Cumberland County Parcels</h1>
            <div className='input-for-keys'>
                <h3>Choose comma delimited file</h3>
                <label htmlFor='file-input' className='file-input-label'>Choose file</label>
                <input id='file-input' className='file-input' type='file' onChange={detectFile}/>
                <div className='selected-file'></div>
                <div className='button' onClick={processFile}>Begin</div>
            </div>

            {!list.length ? <></> :
            <div className='data-table'>
                <div className='results-filter-container'>
                    <div className='filter-header'>
                        <h3>Search</h3>
                        <span className='results-count'>search result(s)</span>
                    </div>
                    <input className='search-input' type='text' onChange={searchFilter}/>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className='col7'>Key</th>
                            <th className='col2'>Address</th>
                            <th className='col3'>City</th>
                            <th className='col4'>Owner</th>
                            <th className='col5'>Own Address</th>
                            <th className='col6 '>Own State</th>
                            <th className='col7'>Own Zip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(parcel => (
                            <tr className='data-row' key={parcel.key}>
                                <td className='col1'>{parcel.key}</td>
                                <td className='col2'>{parcel.address}</td>
                                <td className='col3'>{parcel.city}</td>
                                <td className='col4'>{parcel.owner}</td>
                                <td className='col5'>{parcel.ownerAddress}</td>
                                <td className='col6'>{parcel.ownerState}</td>
                                <td className='col7'>{parcel.ownerZip}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            }

        </div>
    )
}

export default FileUpload
