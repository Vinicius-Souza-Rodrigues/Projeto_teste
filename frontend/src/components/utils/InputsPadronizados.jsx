import styles from "../utils/utilsCSS/InputsPadronizados.module.css" 

function InputsPadronizados( {name, type, text, placeholder, handleChange, value, autoComplete} ) {
    return (
        <div className={styles.inputs}>
            <label htmlFor={name}>{text}</label>
            <input 
            name={name}
            type={type} 
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            autoComplete={autoComplete}
            />
        </div>
    )
}

export default InputsPadronizados