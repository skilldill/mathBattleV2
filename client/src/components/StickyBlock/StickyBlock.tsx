import React from 'react';
import './StickyBlock.css';

interface StickyBlockProps {
  stickySide: 'top' | 'bottom';
  children: React.ReactNode;
}

export const StickyBlock: React.FC<StickyBlockProps> = ({ stickySide, children }) => {
  return (
    <div className={`sticky-block sticky-${stickySide}`}>
      {children}
    </div>
  );
};
