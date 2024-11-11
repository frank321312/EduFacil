import Footer from "../../components/Footer";
import NavInicio from "../../components/NavInicio";

export default function LayoutHome({ children }) {
    return (
        <>
            <div className="opcion-animation relative">
                <NavInicio isSearch={false} />
                {children}
                {/* <div style={{ width: "250px", height: "250px", backgroundColor: "#9283", position: "fixed", top: "0", bottom: "0", left: "0", right: "0", margin: "auto" }}></div> */}
                <Footer />
            </div>
        </>
    );
}