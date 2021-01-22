import React from 'react'

const FileUpload = () => {
    return (
        <div className='file-upload-container'>
            <h1 className='title'>Cumberland County Parcels</h1>
            <div className='input-for-keys'>
            <h3>Choose comma delimited file</h3>
            <label htmlFor='file-input' className='file-input-label'>Choose file</label>
            <input id='file-input' className='file-input' type='file' onChange={'countItems'}/>
            {/* <div className='btn' onClick={'fetchData'}><p>Fetch Data</p></div> */}
            </div>
        </div>
    )
}

export default FileUpload
