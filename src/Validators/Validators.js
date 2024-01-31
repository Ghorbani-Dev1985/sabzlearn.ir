
import Rules from "./Rules"
import Regex from "./Regex"

const Validator = (value , validations) => {
 let validationResults = []
  for(const validator of validations){
    if(validator.value === Rules.requiredValue){
        value.trim().length === 0 && validationResults.push(false)
    }
    if(validator.value === Rules.minValue){
        value.trim().length < validator.min && validationResults.push(false)
    }
    if(validator.value === Rules.maxValue) {
        value.trim().length > validator.max && validationResults.push(false)
    }
    if(validator.value === Rules.emailValue) {
        !Regex.EmailTest(value) && validationResults.push(false)
    }
  }
  if(validationResults.length){
    return false
  }else{
    return true
  }
}

export default Validator