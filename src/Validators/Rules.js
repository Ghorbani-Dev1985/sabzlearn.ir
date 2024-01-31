const requiredValue = 'REQUIRED_VALUE'
const minValue = 'MIN_VALUE'
const maxValue = 'MAX_VALUE'
const emailValue = 'EMAIL_VALUE'

export const RequiredValidator = () => ({
    value : requiredValue
})

export const MinValidator = (min) => ({
    value : minValue,
    min
})

export const MaxValidator = (max) => ({
    value : maxValue,
    max
})

export const EmailValidator = () => ({
    value : emailValue
})

export default {requiredValue , minValue , maxValue , emailValue}