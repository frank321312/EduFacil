import "./styles/sideBar.css";

export default function SideBar({ children }) {
    return (
        <div className="h-screen side-bar bg-white fixed" style={{ width: "60%", padding: "10px 24px", top: "0"}}>
            {/* <Nav.Link className="mb-3" as={Link}>Algo</Nav.Link>
            <Nav.Link className="mb-3" as={Link}>Algo</Nav.Link>
            <Nav.Link className="mb-3" as={Link}>Algo</Nav.Link>
            <Nav.Link className="mb-3" as={Link}>Algo</Nav.Link>
            <Nav.Link className="mb-3" as={Link}>Algo</Nav.Link> */}
            { children }
        </div>
    );
}