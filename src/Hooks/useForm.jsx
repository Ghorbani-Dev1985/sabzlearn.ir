import React, { useCallback, useReducer } from 'react'

const formReducer = (state , action) => {
  switch(action.type){
    case 'INPUT_CHANGE' : {
        let isFormValid = true
        for(const inputID in state.inputs){
            if(inputID === action.inputID){
                isFormValid = isFormValid && action.isValid
            }else{
                isFormValid = isFormValid && state.inputs[inputID].isValid
            }
        }
        return{
            ...state,
            inputs: {
                ...state.inputs,
                [action.inputID] : {
                  value: action.value,
                  isValid: action.isValid
                }
            },
    isFormValid : isFormValid
        }
    }
     default: {
        return state;
     }
  }
}


const useForm = (initInputs , initFormsIsValid) => {
    const [formState , dispatch] = useReducer(formReducer , {
        inputs: initInputs,
        isFormValid: initFormsIsValid
    })
    const onInputHandler = useCallback((id, value , isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value,
            isValid,
            inputID: id
        })
    } ,[])
    return [formState , onInputHandler]
}

export default useForm
