import React from "react";
import { Button } from "./button";

export const Card = ({children}) => {
  return (
    <div className="flex flex-col flex-1 items-center p-2 h-[600px] text-wrap gap-y-6 w-80 break-all rounded-lg shadow-md">
      {children}
    </div>
  );
};
