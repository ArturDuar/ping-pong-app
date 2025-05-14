import Footer from "../components/Footer";
import Header from "../components/Header";



const Dashboard = ({children}) => {

    return (
        <div className="min-vh-100 d-flex flex-column gap-3">
            <Header/>
                {children}
            <Footer/>
        </div >
    )
}

export default Dashboard;