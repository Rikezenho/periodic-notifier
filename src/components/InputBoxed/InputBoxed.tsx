import { useEffect, useState } from "react"
import Styles from './styles.module.css'

type InputBoxedProps = {
    id?: string
    label?: string
    type?: 'text' | 'number' | 'tel',
    defaultValue?: string,
    handleChange?: Function
}

const InputBoxed = ({
    id = '',
    label = '',
    type = 'text',
    defaultValue = '',
    handleChange = () => {},
}: InputBoxedProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue)

    useEffect(() => {
        setInternalValue(defaultValue)
    }, [defaultValue])

    return (<>
        <label htmlFor={id} className={Styles.label}>{label}</label>
        <input type={type} id={id} className={Styles.input} value={internalValue} onChange={handleChange} />
    </>)
}

export { InputBoxed }