import React, { useState } from 'react';
import proteinImg from './proteins.png';

function FoodInfomatics() {
  const [cardData, setCardData] = useState({
    recipeName: 'Pav Bhaji',
    stats: [
      { title: 'Calories', value: '10 cal'},
      { title: 'Cook Time', value: '20 min'},
    ],
    description: 'Pav Bhaji is a fast food dish from Mumbai (Bombay), India, consisting of a vegetable curry (bhaji) cooked in tomato gravy and served with a soft bread roll (pav). While Bhaji is a traditional Indian name for a vegetable dish, the Pav or Pao was the Portuguese word for bread, which was introduced by them during their brief presence in Mumbai around the mid-1500s.',
  });

  let selectIcon = (category) => {
    switch (category) {
      case 'Calories':
        return proteinImg;
      case 'Cook Time':
        return proteinImg;
      case 'Recipe Name':
        return proteinImg;
      default:
        return 'Hello';
    }
  }
  return (
    <div className="wrapperSection flex-col !justify-center">
      <h1 className="text-5xl font-medium text-gray-600 text-center pb-3">{cardData['recipeName']}</h1>
      <p className="text-center">{cardData['description']}</p>
      <div className="flex items-center	my-0 mx-auto py-8">
        {
          cardData['stats'].map((data, index) => (
            <div key={index} className="miniCards">
              <span><img src={selectIcon(data.title)} className="object-contain	w-16 h-11 px-1.5 m-1.5" alt="img" /></span>
              <p className="my-1.5 text-gray-600 font-medium">{data.title}</p>
              <p className="font-medium">{data.value}</p>
            </div>
          ))
        }
      </div>
      <div className="text-center">Ingredients</div>
    </div>
  );
}
  
export default FoodInfomatics;