import React, { useState } from 'react';
import proteinImg from './proteins.png';

function FoodInfomatics() {
  const [cardData, setCardData] = useState([
    { title: 'Protein', count: '10g'},
    { title: 'Calories', count: '20cal'},
  ]);

  let iconName;
  let selectIcon = (category) => {
    switch (category) {
      case 'Protein':
        return proteinImg;
      case 'Calories':
        return proteinImg;
      default:
        return 'Hello';
    }
  }
  return (
    <div className="wrapperSection flex-col !justify-center">
      <h1 className="text-5xl font-medium text-gray-600 text-center pb-3">Pav Bhaji</h1>
      <p className="text-center">Pav Bhaji is a fast food dish from Mumbai (Bombay), India, consisting of a vegetable curry (bhaji) cooked in tomato gravy and served with a soft bread roll (pav). While Bhaji is a traditional Indian name for a vegetable dish, the Pav or Pao was the Portuguese word for bread, which was introduced by them during their brief presence in Mumbai around the mid-1500s.</p>
      {
        cardData.map((data, index) => (
          <div key={index} className="miniCards">
          <span><img src={selectIcon(data.title)} className="object-cover	w-32 h-24 px-1.5" alt="img" /></span>
          <span>{data.title}</span>
          <span>{data.count}</span>
          </div>
        ))
      }
    </div>
  );
}
  
export default FoodInfomatics;