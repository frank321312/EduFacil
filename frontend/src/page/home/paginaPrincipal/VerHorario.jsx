import LayoutHome from "../LayoutHome";
import HorarioCurso from "../../../components/HorarioCurso";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

export default function VerHorario() {
    const horarioRef = useRef(null)
    const location = useLocation()
    const fila = location.state.fila
    const horario = location.state.horario
    // console.log(location)
    // console.log(horario)
    return (
        <LayoutHome>
            <div className="p-20 contenedor-table-responsive">
                <h2 className="mb-4">Curso: {fila.anio}-{fila.division}</h2>
                {
                    horario && horario.length > 0 ?
                        <HorarioCurso horarios={horario} references={horarioRef} /> : <></>
                }
            </div>
        </LayoutHome>
    );
}