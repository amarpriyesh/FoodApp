import React, { useState } from 'react';
import proteinImg from './proteins.png';
import Modal from 'react-modal';
import { IoMdCloseCircle } from "react-icons/io";
import { IconContext } from "react-icons";

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

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      maxHeight: '70%',
      overflow: 'auto',
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#fff';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="wrapperSection flex-col !justify-center">
      <h1 className="text-5xl font-medium text-gray-600 pb-3">{cardData['recipeName']}</h1>
      <p>{cardData['description']}</p>
      <div className="mt-2">
        <button className="_btn mt-4" onClick={openModal}>View Recipe</button>
      </div>
      <div className="flex my-0 py-8">
        {
          cardData['stats'].map((data, index) => (
            <div key={index} className={index === 0 ? "!ml-0 miniCards" : "miniCards"}>
              <span><img src={selectIcon(data.title)} className="object-contain	w-16 h-11 px-1.5 m-1.5" alt="img" /></span>
              <p className="my-1.5 text-gray-600 font-medium">{data.title}</p>
              <p className="font-medium">{data.value}</p>
            </div>
          ))
        }
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 className="text-3xl text-gray-600 text-center modal_title" ref={(_subtitle) => (subtitle = _subtitle)}>{cardData['recipeName']} Recipe</h1>
        <button onClick={closeModal} className="absolute top-2.5 right-3.5">
          <IconContext.Provider value={{ color: '#4b5563', size: '30px', textAlign: 'center' }}>
            <IoMdCloseCircle />
          </IconContext.Provider>
        </button>
        <div className='mt-16 mb-3'>
          <p className="text-xl font-medium text-gray-600">Ingredients</p>
          <span className='font-normal text-gray-600 mb-2'>½ cup vegetable oil, 2 teaspoons chopped garlic, 1 teaspoon finely chopped green chile peppers, 1 cup chopped onions, 2 teaspoons grated fresh ginger, 1 cup chopped roma (plum) tomatoes, 2 cups cauliflower, finely chopped, 1 cup chopped cabbage, 1 cup green peas, 1 cup grated carrots, 4 potatoes, boiled and mashed, 3 tablespoons pav bhaji masala, salt to taste, 1 tablespoon lemon juice, 8 (2 inch square) dinner rolls, ½ tablespoon butter, ¼ cup finely chopped onion, 1 tablespoon finely chopped green chile peppers, ¼ cup chopped fresh cilantro
          </span>
        </div>
        <div className='mt-2'>
          <p className="text-xl font-medium text-gray-600 mt-2">Recipe</p>
          <p>Step 1: Heat the oil in a wok over medium heat. Saute garlic and green chile for 30 seconds, then stir in onions and ginger. Cook until onions are brown. Add tomatoes, and cook until pasty. Stir in cauliflower, cabbage, peas, carrots and potatoes. Season with pav bhaji masala. Cover, and cook for 15 minutes, stirring occasionally. Season with salt, and stir in lemon juice.</p>
          <p className='mt-2'>Step 2: Toast the dinner rolls, and spread lightly with butter. Serve garnished with chopped onion, green chile and cilantro.</p>
        </div>
      </Modal>
    </div>
  );
}
  
export default FoodInfomatics;