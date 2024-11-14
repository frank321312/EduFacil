import { Container, Button, Form } from "react-bootstrap";
import LayoutHome from "../LayoutHome";
import Table from "react-bootstrap/Table";
import { useEffect, useRef, useState } from "react";
import { createRequestPost, tokenError } from "../../../functions/configToken";
import { useSelector } from "react-redux";
import axios from "axios";
import { isEqual } from "../../../functions/validations.js";
import Cookies from "universal-cookie";
import { url } from "../../../functions/url.js";
import CardInfo from "../../../components/CardInfo.jsx";

export default function Horario() {
    const user = useSelector((state) => state.login)
    const [cursos, setCursos] = useState([])
    const [data, setData] = useState([[""]]) // Estado para la tabla, comenzando con una celda vacía
    const cursoRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const darkMode = useSelector((state) => state.darkMode)
    const cookies = new Cookies()
    const [card, setCard] = useState(false)

    const handleCellChange = (rowIndex, colIndex, value) => {
        const newData = [...data]
        newData[rowIndex][colIndex] = value
        setData(newData)
    };

    // Agrega una nueva fila vacía
    const addRow = () => {
        setData([...data, new Array(data[0].length).fill("")])
    };

    // Agrega una nueva columna vacía a cada fila
    const addColumn = () => {
        setData(data.map(row => [...row, ""]));
    }

    // Elimina la última fila
    const removeRow = () => {
        if (data.length > 1) {
            setData(data.slice(0, -1))
        }
    };

    // Elimina la última columna de cada fila
    const removeColumn = () => {
        if (data[0].length > 1) {
            setData(data.map(row => row.slice(0, -1)))
        }
    }

    useEffect(() => {
        if (card) {
            setTimeout(() => {
                setCard(false)
            }, 3000)
        }
    }, [card])

    useEffect(() => {
        if (user.idEscuela) {
            axios.get(`${url}/api/obtenercursos/${user.idEscuela}`).then(res => {
                setCursos(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [user.idUsuario])

    const requestCreateHorario = async (e) => {
        e.preventDefault()
        try {
            await createRequestPost(`${url}/api/crear-horario`, { tabla: data, idCurso: cursoRef.current.value })
            setErrorNumber(0)
            setErrorMessage("")
            if (card) {
                setTimeout(() => {
                    setCard(true)
                }, 3000)
            } else {
                setCard(true)
            }
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
            tokenError(error)
        }
    }

    return (
        <>
            {
                card && <CardInfo text={"Horario creado"}/>
            }
            <LayoutHome>
                <Container fluid className="p-20">
                    <div className="flex gap-2 flex-wrap">
                        <Button onClick={addRow}>Agregar fila</Button>
                        <Button className="" onClick={addColumn}>Agregar columna</Button>
                        <Button className="" onClick={removeRow}>Eliminar última fila</Button>
                        <Button className="" onClick={removeColumn}>Eliminar última columna</Button>
                        <select ref={cursoRef} className={`rounded-lg transition-input`} style={{ padding: "8px 16px", outline: "none" }}>
                            {
                                cursos.map(value => (
                                    <option key={value.idCurso} value={value.idCurso}>{value.anio}-{value.division}</option>
                                ))
                            }
                        </select>
                    </div>
                    <Table responsive bordered hover variant={darkMode.active || cookies.get("modo") ? "dark" : ""} className="mt-3 w-full">
                        <thead>
                            <tr>
                                {data[0].map((_, colIndex) => (
                                    <th key={colIndex}>Columna {colIndex + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex} className="p-0">
                                            <input
                                                type="text"
                                                className="input-horario"
                                                value={cell}
                                                style={{ width: "100%", outline: "none", padding: "5px" }}
                                                onChange={(e) =>
                                                    handleCellChange(rowIndex, colIndex, e.target.value)
                                                }
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="span-text-error">
                        {isEqual(errorNumber, 69) || isEqual(errorNumber, 47) || isEqual(errorNumber, 48) || isEqual(errorNumber, 30) ? <span className="text-error">{errorMessage}</span> : ""}
                    </div>
                    <Form>
                        <Button variant="dark">Cancelar</Button>
                        <Button className="ml-3" onClick={requestCreateHorario}>Crear horario</Button>
                    </Form>
                </Container>
            </LayoutHome>
        </>
    );
}
