"use client";

import React from 'react';
import Container from './Container';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <Container>
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Feedback System. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
