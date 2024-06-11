import React, { useState } from 'react';
import './footer.scss';
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IconContext } from "react-icons";
import ContactForm from "../ContactForm/ContactForm";

function Footer() {
  return (
    <footer className="footer">
      <div className="flex w-full justify-between px-5">
        <div className="w-1/2">
          <div className="mb-5">
            <p className="text-base mb-2">Our socials</p>
            <div className="flex">
            <IconContext.Provider value={{ color: 'white', size: '30px', textAlign: 'center' }}>
              <FaInstagram className="mr-2" />
              <FaFacebookF className="mr-2" />
            </IconContext.Provider>
            </div>
          </div>
          <div>Copyright © 2024 HubSpot, Inc.</div>
        </div>
        <div className='container w-1/2'>
          <h1 className='text-xl mb-4'>Contact Us</h1>
          <ContactForm />
        </div>
      </div>
    </footer>
  );
}
  
export default Footer;