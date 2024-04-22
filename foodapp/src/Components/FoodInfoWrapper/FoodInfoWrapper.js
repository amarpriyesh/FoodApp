import FoodInfomatics from './FoodInfomatics.js';
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
    </>
  );
}
  
export default FoodUploadWrapper;