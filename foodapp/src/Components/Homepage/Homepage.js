import React, { useState } from 'react';
import Header from '../Header/Header.js';
import FoodUploadWrapper from '../FoodUploadWrapper/FoodUploadWrapper.js';
import FoodInfoWrapper from '../FoodInfoWrapper/FoodInfoWrapper.js';

function Homepage() {
  const [showUploadContent, setshowUploadContent] = useState(false);
  return (
    <div>
      <Header></Header>
      {showUploadContent ? <FoodUploadWrapper></FoodUploadWrapper> : <FoodInfoWrapper></FoodInfoWrapper>}
    </div>
  );
}

export default Homepage;