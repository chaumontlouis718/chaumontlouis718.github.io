import "react-pro-sidebar/dist/css/styles.css";
import Sidebar from "../Components/Sidebar";

function About() {
    return (
        <div className="page">
            <Sidebar></Sidebar>
            <div className="page-content">
                <h1 className="page-title">About</h1>
                <div className="page-body">Hello</div>
            </div>
        </div>
    );
}

export default About;
