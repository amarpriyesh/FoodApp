import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

import { gql, useQuery } from '@apollo/client';

const GET_DETECTIONS = gql`
  mutation DetectObjects($file: Upload!) {
    detectObjects(file: $file) {
      image
      detections {
        class
        confidence
      }
    }
  }
`;

// Create a context
const StoreContext = createContext();

// Create a provider component
export const StoreProvider = ({ children }) => {
  const [state, setState] = useState({
    showUploadContent: true,
    cardData: {
      recipeName: 'Unknown',
    }
  });

  const [detect, { loading, error, data }] = useQuery(GET_DETECTIONS, {
    variables: { file: null }, // Initially set file to null
  });

  // Function to change the page when image is uploaded
  const changeUploadPage = (value) => {
    setState((prevState) => ({
      ...prevState,
      showUploadContent: value,
    }));
  };

  const getImageDetails = async (file) => {

    // detect({ variables: { file } });

    // console.log(data.detectObjects);

    // const formData = new FormData();
    // formData.append('file', file);
    // try {
    //   const response = await axios.post('http://localhost:8000/detect', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log(response.data.detections[0].class);
    //   setState((prevState) => ({
    //     ...prevState,
    //     showUploadContent: false,
    //     cardData: {
    //       recipeName: response.data.detections[0].class,
    //     }
    //   }));
    // } catch (error) {
    //   console.error(error);
    // }
  }

  return (
    <StoreContext.Provider value={{ state, changeUploadPage, getImageDetails}}>
      {children}
    </StoreContext.Provider>
  );
};

// use store
export const useStore = () => useContext(StoreContext);