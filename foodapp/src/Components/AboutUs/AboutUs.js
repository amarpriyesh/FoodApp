import React, { useState } from 'react';
import './about.scss';
import aboutImg from './about.jpg';
import missionImg from './mission.jpg';

function AboutUs() {
  return (
    <div>
      <div className="about-us">
        <section className="w-full bg-[#f6f9fc]">
          <div className="about-us-header flex items-center py-20">
            <div className="text-justify w-11/12 pr-24">
              <h1 className="text-5xl font-medium text-gray-600 pb-3">About Us</h1>
              <p>We are a dedicated team committed to providing the foodie experience for you. Our AI provides you accurate information about any Indian food item.</p>
            </div>
            <div className="w-11/12 h-11/12">
              <img src={aboutImg} alt="restaurant-img" className="w-full h-full object-cover p-2" />
            </div>
          </div>
        </section>
        <section className="w-full">
          <div className="about-us-header flex items-center py-20">
            <div className='w-11/12 h-11/12'>
              <img src={missionImg} alt="restaurant-img" className="w-full h-full object-cover p-2" />
            </div>
            <div className="text-justify w-11/12 pl-8">
              <h1 className="text-5xl font-medium text-gray-600 pb-3">Our Mission</h1>
              <p>Our mission is to highlight your experience with Indian food and expand your cullinary delights.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
  
export default AboutUs;