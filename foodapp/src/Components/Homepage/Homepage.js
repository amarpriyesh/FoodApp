import React, { useState } from 'react';
import FoodUploadWrapper from '../FoodUploadWrapper/FoodUploadWrapper.js';
import FoodInfoWrapper from '../FoodInfoWrapper/FoodInfoWrapper.js';
import { useStore } from '../../store/StoreContext';

function Homepage() {
  const { state } = useStore();
  return (
    <div>
      {state.showUploadContent ? <FoodUploadWrapper></FoodUploadWrapper> : <FoodInfoWrapper></FoodInfoWrapper>}
    </div>
  );
}

export default Homepage;