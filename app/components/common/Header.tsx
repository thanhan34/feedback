"use client";

import React from 'react';
import Link from 'next/link';
import Container from './Container';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <Container>
        <div className="flex justify-center items-center py-4">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#fc5d01]">Feedback</span>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
