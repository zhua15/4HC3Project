import React from 'react';

export interface popupProps {
   name: string;
   price: number;
   image: string;
   rating: number;
   ingrediants?: string[];
   calories: number,
   customizationOptions?: custimizationOptionProps[];
}

export interface custimizationOptionProps {
   componentType: customizationType;
   label: string;
   options: custimizationOptionsList[],
}

export enum customizationType {
   "single",
   "multi"
}

export interface custimizationOptionsList {
   optionName: string,
   price?: number
}

const page = () => {
    return (
       <div>
          <h1>Popup</h1>
          <p>Popup page body content</p>
       </div>
    );
}
 
export default page;