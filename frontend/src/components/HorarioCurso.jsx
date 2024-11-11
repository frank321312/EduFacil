import { Table } from "react-bootstrap";
import "./styles/table.css";
// style={{ position: "fixed", top: "0", bottom: "0", left: "0", right: "0", margin: "auto" }}
export default function HorarioCurso({ horarios, references }) {
    const restoHorario = horarios.slice(1)
    console.log(horarios)
    return (
        <Table responsive bordered ref={references}>
            <thead>
                <tr>
                    {
                        horarios[0].map((value, index) => (
                            <th key={index}>{value}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    restoHorario.length == 0 ?
                        <tr></tr>
                        :
                        restoHorario.map(lista => (
                            <tr key={lista}>
                                {
                                    lista.map((value, index) => (
                                        <td key={index}>{value}</td>
                                    ))
                                }
                            </tr>
                        ))
                }
            </tbody>
        </Table>
    );
}