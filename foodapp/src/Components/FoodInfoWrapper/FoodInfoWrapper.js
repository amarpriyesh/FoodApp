import FoodInfomatics from './FoodInfomatics.js';
import CardLayout from '../CardLayout/CardLayout.js'
import React, { useState } from 'react';
import './foodInfoWrapper.scss';

function FoodUploadWrapper() {
  return (
    <>
      <section className="p-8">
        <div className="
        flex w-full h-full 
        border-amber-400 border-x border-y 
        rounded-md border-dashed 
        p-8">
          <FoodInfomatics></FoodInfomatics>
          <div className="wrapperSection">
            <img src={require('./landingImg.jpeg')} className="object-cover px-1.5 rounded-3xl" alt="img" />
          </div>
        </div>
      </section>
      <section>
        <p className="text-gray-600 text-center	py-2.5 text-3xl font-medium">Recommendations</p>
        <div className="flex py-7 flex-wrap justify-center">
          <CardLayout></CardLayout>
          <CardLayout></CardLayout>
          <CardLayout></CardLayout>
          <CardLayout></CardLayout>
          <CardLayout></CardLayout>
          <CardLayout></CardLayout>
          <CardLayout></CardLayout>
          <CardLayout></CardLayout>
          
        </div>
      </section>
    </>
  );
}
  
export default FoodUploadWrapper;