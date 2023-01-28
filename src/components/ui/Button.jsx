import React from 'react'
import styles from '../../styles/button.module.css'

export default function Button({text, onClick}) {
  return (
    
    <button onClick={onClick}>{text}</button>
  )
}
