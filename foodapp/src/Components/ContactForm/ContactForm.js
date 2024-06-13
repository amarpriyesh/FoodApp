import React, { useState, useRef  } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';

function ContactForm() {
  const form = useRef();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });

  const sendEmail = (e) => {
    setDisabled(true);
  //   emailjs.sendForm('service_pw7i16r', 'template_82pgfa7', form.current, {
  //     publicKey: '37w5EpiiUVz1mkTDs'
  //   })
  //   .then(() => {
  //     console.log('SUCCESS!');
  //   },
  //   (error) => {
  //     console.log('FAILED...', error.text);
  //   }
  // )
  }


  return (
    <div className="container">
      <div>
        <form 
          id='contact-form'
          onSubmit={handleSubmit(sendEmail)}
          noValidate>
          <div className="flex flex-col">
            <div className="flex flex-row mb-2">
              <input 
                placeholder="Name" 
                name="name"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Please enter your name',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Please use 30 characters or less',
                  },
                })}
                  className="rounded w-1/2 mr-6 block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-slate-500 focus:ring-0 sm:text-sm sm:leading-6" 
                  type="text">
              </input>
              <input 
                name="email"
                {...register('email', {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                placeholder="Email" className="rounded w-1/2 block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-slate-500 focus:ring-0 sm:text-sm sm:leading-6" type="text"></input>
            </div>
            <div className="flex justify-between">
              {errors.name && (
                <span className='mb-2.5 block w-1/2 mr-6 text-red-500'>
                  {errors.name.message}
                </span>
              )}
              {errors.email && (
                <span className='mb-2.5 block w-1/2 text-red-500'>
                  Please enter a valid email address
                </span>
              )}
            </div>
            <div className="flex flex-col mb-2">
              <input placeholder="Subject" name="subject" className="mb-2 rounded block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-slate-500 focus:ring-0 sm:text-sm sm:leading-6" type="text"></input>
              <textarea placeholder="Message" id="about" name="message" rows="3" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
            <div className="flex flex-col">
              <button disabled={disabled} type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
  
export default ContactForm;