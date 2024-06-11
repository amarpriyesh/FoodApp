import './foodUploadWrapper.scss';
// import { useState } from "react";
import image1 from './pavbhaji.jpg';
import React, { useRef } from 'react';
import { useStore } from '../../store/StoreContext';

function ImageUploadContainer() {

  const { changeUploadPage } = useStore();

  const imageUrls = [
    image1,
    image1,
    image1,
    image1,
    image1
  ];

  const imageItems = imageUrls.map(url =>
    <div><img src={url} className="object-cover	w-32 h-24 px-1.5" alt="img" /></div>
  );

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile);
    changeUploadPage(false);
    // do the file processing here
  };

  // <span>#d64b7d</span>

  return (
    <div className="imageContainer">
        <div className="mb-4">
          <h1 className="text-5xl font-medium text-gray-600 text-center pb-3">Discover Flavour Power</h1>
          <p className="text-center">Explore Indian Cullinary Delights with just an image</p>
          </div>
        <div className="w-full h-full border-[#d64b7d] border-x border-y rounded-md border-dashed">
          <div className="m-auto w-11/12 flex flex-col items-center">
            <h5 className="text-center py-5 w-full infoText">PICK IMAGE</h5>
            <div className="flex flex-row w-full justify-evenly	items-center">
              {imageItems}
            </div>
            <p className="text-center py-5 w-full infoText">OR</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />
            <div>
              <button className="uploadBtn" onClick={handleClick}>UPLOAD</button>
            </div>
          </div>
        </div>
    </div>
  );
}
  
export default ImageUploadContainer;