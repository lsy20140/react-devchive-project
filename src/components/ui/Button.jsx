import React from 'react'
import styles from '../../styles/button.module.css'

export default function Button({text, onClick, value}) {
  return (
    
    <button onClick={onClick} value={value}>{text}</button>
  )
}
