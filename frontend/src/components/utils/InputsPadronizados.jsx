import styles from "../utils/utilsCSS/InputsPadronizados.module.css";

function InputsPadronizados({ name, type, text, placeholder, handleChange, value, autoComplete, hasError }) {
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
                className={hasError ? styles.inputError : ""}
            />
        </div>
    );
}

export default InputsPadronizados;
