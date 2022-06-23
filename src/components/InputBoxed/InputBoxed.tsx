import { useEffect, useState } from "react"
import Styles from './styles.module.css'

type InputBoxedProps = {
    id?: string
    label?: string
    type?: 'text' | 'number' | 'tel',
    value?: string,
    handleChange?: Function
}

const InputBoxed = ({
    id = '',
    label = '',
    type = 'text',
    value = '',
    handleChange = () => {},
}: InputBoxedProps) => {
    return (<>
        <label htmlFor={id} className={Styles.label}>{label}</label>
        <input type={type} id={id} className={Styles.input} value={value} onChange={handleChange} />
    </>)
}

export { InputBoxed }