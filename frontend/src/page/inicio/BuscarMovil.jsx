import { IoSearch } from "react-icons/io5";
import { AiOutlineEnter } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../functions/url";

export default function SearchInput() {
    const [buscar, setBuscar] = useState("");
    const [resultados, setResultados] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const navigate = useNavigate()

    const handleSearchEscuela = async (e) => {
        try {
            const response = await axios.get(`${url}/api/escuela?nombre=${e.target.value}`)
            setResultados(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (windowWidth > 668) {
            navigate("/escuelas")
        }
    }, [windowWidth])

    const handleValueSearch = (valor) => {
        setBuscar(valor.nombre)
        setSearchResult([valor])
        setResultados([])
        navigate(`/escuelas?busqueda=${valor.nombre}`, { state: searchResult.length == 0 ? null : [valor] })
    }

    const handleSendSearchSchool = (e) => {
        e.preventDefault()
        navigate(`/escuelas?busqueda=${buscar}`, { state: searchResult.length == 0 ? null : searchResult })
    }

    return (
        <>
            <div className="relative w-screen">
                <form onSubmit={handleSendSearchSchool}>
                    <input
                        type="text"
                        value={buscar}
                        onChange={(e) => {
                            setBuscar(e.target.value);
                            handleSearchEscuela(e)
                        }
                        }
                        className="w-full px-10 py-2 buscar-movil pr-10"
                        style={{ outline: "none" }}
                        placeholder="Buscar..."
                    />
                    <IoSearch
                        size={24}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                    <AiOutlineEnter
                        size={24}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    />
                </form>
            </div>
            {
                resultados.map(value => (
                    <div key={value.idEscuela} className="style-mode" onClick={() => handleValueSearch(value)}>{value.nombre}</div>
                ))
            }
        </>
    );
}
