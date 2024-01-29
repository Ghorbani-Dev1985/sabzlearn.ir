import React from 'react'
import UsersIcon from "../../assets/Images/CommentFormUser/none.png";
import { Reply } from '@mui/icons-material';


function CommentItem() {
  return (
    <div className="space-y-3.5 sm:space-y-5 ">
    <div className="p-3.5 md:p-5 bg-gray-100 dark:bg-gray-700 rounded-2xl">
      <div className="flex gap-x-5 items-start">
        {/* User Icon */}
        <div className="space-y-3.5 sm:space-y-5 ">
          <img
            src={UsersIcon}
            className="block size-10 md:size-12 object-cover rounded-full"
            alt="ghorbani-dev.ir"
          />
          <div className="flex-center w-14 h-5 rounded-sm text-xs leading-4 bg-primary text-white dark:bg-primary/10 dark:text-primary">
            دانشجو
          </div>
        </div>
        <div className="w-full">
          <div className="flex-between">
            <div className="flex items-center gap-x-2">
              <img
                src={UsersIcon}
                className="block md:hidden size-10 object-cover rounded-full shrink-0"
                alt="ghorbani-dev.ir"
              />
              <div className="shrink-0">
                <span className="text-zinc-700 dark:text-white font-DanaMd text-base md:text-xl">
                  Username
                </span>
                <div className="flex items-center gap-x-1.5 mt-1">
                  <div className="flex-center md:hidden w-14 h-5 rounded-sm text-xs leading-4 bg-primary text-white dark:bg-primary/10 dark:text-primary">
                    دانشجو
                  </div>
                  <span className="font-Dana text-slate-500 dark:text-white text-xs">
                    1402/11/07
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="w-16 h-10 text-slate-500 dark:text-gray-500"
            >
              <Reply className="w-16 h-10" />
            </button>
          </div>
          <div className="text-zinc-700 dark:text-white font-Dana leading-7 mt-3.5">
            سلام خسته نباشید استاد ، <br />
            میخواستم بدونم اصول سالید S.O.L.I.D هم داخل این دوره میاد
            ؟
          </div>
          <div className="mt-7 space-y-3.5 md:space-y-5">
            <div className="mt-7 p-3.5 md:p-5 bg-gray-200 dark:bg-mainSlate rounded-2xl">
              <div className="flex gap-x-5 items-start">
                <div className="hidden md:flex flex-col gap-y-2">
                  <img
                    src={UsersIcon}
                    className="block w-10 h-10 md:size-12 object-cover rounded-full"
                    alt="ghorbani-dev.ir"
                  />
                  <div className="flex-center w-14 h-5 rounded-sm text-xs leading-4 bg-sky-500 text-white dark:bg-secondary/10 dark:text-secondary">
                    مدرس
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex-between">
                    <div className="flex items-center gap-x-2">
                      <img
                        src={UsersIcon}
                        className="block md:hidden size-10 object-cover rounded-full shrink-0"
                        alt="ghorbani-dev.ir"
                      />
                      <div className="shrink-0">
                        <span className="text-zinc-700 dark:text-white font-DanaMd text-base md:text-xl">
                          محمد امین سعیدی راد
                        </span>
                        <div className="flex items-center gap-x-1.5 mt-1">
                          <div className="flex-center md:hidden w-14 h-5 rounded-sm text-xs leading-4 bg-sky-500 text-white dark:bg-secondary/10 dark:text-secondary">
                            مدرس
                          </div>
                          <span className="font-Dana text-slate-500 dark:text-white text-xs">
                            1402/11/08
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-zinc-700 dark:text-white font-Dana leading-7 mt-3.5">
                    سلام عزیز.
                    <br />
                    سعی می‌کنم داشته باشیم 👌❤️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CommentItem
