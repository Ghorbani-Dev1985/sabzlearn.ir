import React from 'react'
import { Link } from 'react-router-dom'

function Button({children, to , href , className , btnType , onClick , disabled}) {
  if(to){
    return (
      <Link to={to} className={className}>{children}</Link>
    )
  }else if(href){
    return (
      <a href={href} className={className}>{children}</a>
    )
  }else {
    return (
      <button className={className} type={btnType} onClick={onClick} disabled={disabled}>{children}</button>
    )
  }
}

export default Button
