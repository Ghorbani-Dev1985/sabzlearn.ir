import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";

function ViewTicket() {
  const { id } = useParams();
  const { datas: ticketDetails } = useFetch(`tickets/answer/${id}`);
  return (
    <div className="bg-white dark:bg-gray-800 p-3.5 md:p-4.5 rounded-2xl">
      <div className="flex-between pb-3.5 md:pb-4.5 mb-6 md:mb-7 border-b border-b-gray-200 dark:border-b-gray-700">
        <span className="font-danaMedium md:text-xl text-zinc-700 dark:text-white">
          {" "}
          پیام های تیکت{" "}
        </span>
      </div>
      <div className="space-y-4">
        {/* Ticket */}
        <div className="w-11/12 sm:w-2/3 bg-gray-100 dark:bg-gray-700 text-zinc-700 dark:text-white p-4 rounded-2xl rounded-tr-sm">
          <p className="font-danaLight mt-4.5">{ticketDetails.ticket} </p>
        </div>
        {/* Answer */}
        {ticketDetails.answer && (
          <div className="w-11/12 sm:w-2/3 mr-auto bg-sky-500/30 dark:bg-secondary/20 text-zinc-700 dark:text-white p-4 rounded-2xl rounded-tr-sm">
            <p className="font-danaLight mt-4.5">{ticketDetails.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewTicket;
