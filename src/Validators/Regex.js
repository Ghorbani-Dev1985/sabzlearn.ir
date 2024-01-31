

const EmailTest = (value) => {
   const emailPattern = /^[a-z0-9._-]+@[a-z]+\.[a-z]{2,3}$/g 
   return emailPattern.test(value)
}

const MeliCodeTest = (value) => {
  
}

const PhoneNumberTest = (value) => {

}

export default {EmailTest , MeliCodeTest , PhoneNumberTest}