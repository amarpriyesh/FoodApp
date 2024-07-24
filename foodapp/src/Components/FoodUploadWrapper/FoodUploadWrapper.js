import './foodUploadWrapper.scss';
import ImageUploadContainer from './ImageUploadContainer.js';
import React, { useState } from 'react';
import image1 from './pavbhaji.jpg';
import { MdFileUpload } from "react-icons/md";
import { MdCloudDone } from "react-icons/md";
import { IconContext } from "react-icons";

function FoodUploadWrapper() {
  const [cardData, setCardData] = useState([
    { title: 'Upload Food Image', description: 'Upload any Indian food image of your choice. Hit the upload button and see the magic happen', url: MdFileUpload},
    { title: 'Get Detailed Information', description: 'Our algorithm will provide detailed information about the food item with restaurant recommendations and recipe details', url: MdCloudDone },
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
      <section className="pb-28 pt-16">
        <p className="text-gray-600 text-center	py-2.5 text-4xl font-medium">How it Works?</p>
        <div className="flex max-w-3xl m-auto">
          {
            cardData.map((data, index) => (
                <div key={index} className="card p-4">
                  <div>
                    <IconContext.Provider value={{ color: '#d64b7d', size: '50px', textAlign: 'center' }}>
                      <data.url />
                    </IconContext.Provider>
                  </div>
                  <p className="text-center font-bold my-2.5">{data.title}</p>
                  <p className="text-center">{data.description}</p>
                </div>
            ))
          }
        </div>
      </section>
    </>
  );
}
  
export default FoodUploadWrapper;