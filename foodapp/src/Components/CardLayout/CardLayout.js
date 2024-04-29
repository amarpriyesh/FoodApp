import React, { useState } from 'react';
import restaurantImg from './godavari.jpg';
import './CardLayout.scss';

function CardLayout() {
  return (
    <div className="card-layout h-auto w-1/5 mx-3 my-3">
      <img src={restaurantImg} alt="restaurant-img" className="w-full h-32 object-cover p-2" />
      <div className="flex items-center flex-col">
        <h2 className="text-gray-600 font-medium mt-2.5 text-lg">Godavari</h2>
        <p className="text-gray-600 cardDescription">Godavari offers authentic Indian cuisine, catering, and franchise services in various locations across USA and Canada. Explore their food menu, catering menu, locations, and social media platforms.</p>
      </div>
    </div>
  );
}
  
export default CardLayout;