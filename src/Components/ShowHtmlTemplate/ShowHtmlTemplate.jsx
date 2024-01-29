import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import React from 'react'

function ShowHtmlTemplate({children, showMoreDesc , setShowMoreDesc}) {
  return (
    <>
             <div className="relative overflow-hidden">
              <div
                className={`${
                  showMoreDesc ? "max-h-full" : "max-h-[800px]"
                } wp-content  text-zinc-700 dark:text-white font-danaLight text-lg lg:text-xl leading-7 lg:leading-9`}
              >
              {children}
              </div>
              <div
                className={`${
                  showMoreDesc && "hidden"
                } absolute bottom-0 right-0 left-0 h-[190px] bg-gradient-to-t from-white dark:from-gray-800`}
              ></div>
            </div>
            <button
              onClick={() => setShowMoreDesc((prev) => !prev)}
              type="button"
              className="flex-center button-lg button-primary mx-auto mt-2 rounded-full"
            >
              {showMoreDesc ? (
                <>
                  <span>
                    مشاهده کمتر <KeyboardArrowUp />
                  </span>
                </>
              ) : (
                <>
                  <span>
                    مشاهده بیشتر <KeyboardArrowDown />
                  </span>
                </>
              )}
            </button>
    </>
  )
}

export default ShowHtmlTemplate
