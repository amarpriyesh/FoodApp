import './foodUploadWrapper.scss';
import ImageUploadContainer from './ImageUploadContainer.js';
import React, { useState } from 'react';
import image1 from './pavbhaji.jpg';
import { MdFileUpload } from "react-icons/md";
import { MdCloudDone } from "react-icons/md";
import { IconContext } from "react-icons";

function FoodUploadWrapper() {
  const [cardData, setCardData] = useState([
    { title: 'Title 1', description: 'Description 1', url: MdFileUpload},
    { title: 'Title 2', description: 'Description 2', url: MdCloudDone },
  ]);

  return (
    <>
      <section className="foodUploadWrapper">
        <div className="wrapperSection">
          <ImageUploadContainer></ImageUploadContainer>
        </div>
        <div className="wrapperSection">
          <img src={require('./landingImg.jpg')} className="object-cover px-1.5 rounded-3xl" alt="img" />
        </div>
      </section>
      <section>
        <p className="text-gray-600 text-center	py-2.5 text-4xl font-medium">How it Works?</p>
        <div className="flex max-w-3xl m-auto">
          {
            cardData.map((data, index) => (
                <div key={index} className="card">
                  <div>
                    <IconContext.Provider value={{ color: '#4b5563', size: '50px', textAlign: 'center' }}>
                      <data.url />
                    </IconContext.Provider>
                  </div>
                  <p>{data.title}</p>
                  <p>{data.description}</p>
                </div>
            ))
          }
        </div>
      </section>
    </>
  );
}
  
export default FoodUploadWrapper;