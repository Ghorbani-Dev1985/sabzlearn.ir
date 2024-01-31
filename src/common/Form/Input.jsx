import React, { useEffect, useReducer } from 'react'
import Validator from '../../Validators/Validators'

const inputReducer = (state , action) => {
    switch(action.type){
        case 'CHANGE' : {
            return {
                ...state,
                value: action.value,
                isValid: Validator(action.value , action.validations)
            }
        }
        default: {
            return state
        }
    }
}

function Input({children, element , textareaRow , textareaPlaceholder , type = 'text' , placeholder  ,  icon , validations , id , onInputHandler}) {
   
    const [mainInput , dispatch] = useReducer(inputReducer , {
        value: '',
        inValid: true
    })

    const {value , isValid} = mainInput;
    useEffect(() => {
        onInputHandler(id , value , isValid)
    }, [value])

    const OnChangeHandler = (event) => {
        console.log(event.target.value)
        dispatch({
            type: 'CHANGE',
            value : event.target.value,
            validations,
            isValid: true
        })
    }

    const elementType = element === 'textarea' ? <textarea rows={textareaRow} placeholder={textareaPlaceholder} value={mainInput.value} onChange={OnChangeHandler} className={`${mainInput.isValid ? "border border-primary" : "border border-rose-500"} block w-full p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-gray-200 dark:focus:border-slate rounded-2xl placeholder:font-danaLight transition-colors`}></textarea> :
    <div className="relative">
          <input
              type={type}
              className={`${mainInput.isValid ? "border border-primary" : "border border-rose-500"} outline-none pl-9 sm:pl-12`}
              placeholder={placeholder}
              value={mainInput.value}
              onChange={OnChangeHandler}
              />
            {icon}
            {children}
          </div>
  return (
    <>
    {elementType}
    </>
  )
}

export default Input
