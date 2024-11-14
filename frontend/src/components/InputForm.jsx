import "./styles/input.css"

export default function InputForm({ type, placeholder, value, onSetUsuario, isEqual }) {
    return (
        <input value={value} type={type} placeholder={placeholder} onChange={(e) => onSetUsuario(e)} className={`rounded-lg transition-input ${isEqual}`} style={{ padding: "12px 16px", outline: "none" }}/>
    );
}