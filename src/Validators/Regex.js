

const EmailTest = (value) => {
   const emailPattern = /^[a-z0-9._-]+@[a-z]+\.[a-z]{2,3}$/g 
   return emailPattern.test(value)
}

const MeliCodeTest = (value) => {
  
}

const PhoneNumberTest = (value) => {
  const phonePattern = /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/g
  return phonePattern.test(value)
}

export default {EmailTest , MeliCodeTest , PhoneNumberTest}