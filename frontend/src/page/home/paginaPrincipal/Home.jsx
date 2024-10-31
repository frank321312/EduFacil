import { useSelector } from "react-redux"

export default function Home() {
    const data = useSelector(state => state.login)
    
    return (
        <>
            <h1>Esta es la pagina principal</h1>
            <span>Sus datos { data.nombreUsuario }</span>
        </>
    )
}