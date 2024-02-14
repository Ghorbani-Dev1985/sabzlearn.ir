import React from "react"


const InfosBox = ({ title, count, icon, transparent , color }) => {
    return (
      <div
        className={`${color} w-full flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:max-w-60 p-2 rounded-2xl`}
      >
        <div className={`${transparent ? 'bg-transparent' : 'bg-white/20'} flex-center w-14 h-14 md:w-[68px] md:h-[68px] rounded-2xl`}>
          {icon}
        </div>
        <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
          <span className="font-MorabbaBold text-sm">{title} </span>
          <span className="font-DanaBold text-xl">{count}</span>
        </div>
      </div>
    );
  };
  
  export default InfosBox