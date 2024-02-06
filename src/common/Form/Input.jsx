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

function Input({children, element , textareaPlaceholder , type = 'text' , placeholder  ,  icon , validations , id , onInputHandler}) {
   
    const [mainInput , dispatch] = useReducer(inputReducer , {
        value: '',
        inValid: true
    })

    const {value , isValid} = mainInput;
    useEffect(() => {
        onInputHandler(id , value , isValid)
    }, [value])

    const OnChangeHandler = (event) => {
        dispatch({
            type: 'CHANGE',
            value : event.target.value,
            validations,
            isValid: true
        })
    }

    const elementType = element === 'textarea' ? <textarea rows="6" placeholder={textareaPlaceholder} value={mainInput.value} onChange={OnChangeHandler} className={`${mainInput.isValid ? "border border-primary" : "border border-rose-500"} mb-3 block w-full outline-none p-3 md:p-5 text-sm md:text-base text-slate-500 dark:text-gray-500 focus:text-zinc-700 dark:focus:text-white bg-gray-100 dark:bg-gray-700 rounded-2xl placeholder:font-danaLight transition-colors`}></textarea> :
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
