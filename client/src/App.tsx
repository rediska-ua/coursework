import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/header/header";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/login/login";
import SignUp from "./pages/signUp/signup";
import HomePage from "./pages/homePage/homePage";
import Footer from "./components/footer/Footer";
import RestorePassword from "./pages/restorePassord/restorePassword";
import Profile from "./pages/profile/profile";
import StorageService from "./services/storage/StorageService";
import { getUserData } from "./services/auth/authService";
import Result from "./pages/resultPage/resultPage";
import Analysis from "./pages/analysisPage/analysisPage";

const App = () => {
    const [result, setResult] = useState({
        email: '',
        firstname: '',
        lastname: ''
    });
    useEffect(() => {
        const getData = async () => {
            const token = StorageService.getAccessToken();
            const result = await getUserData(token);
            console.log(result)
            return result;
        }
        getData().then(result => setResult(result));
    }, [])

    return (
    <Router>
        <div className="app">
            <Header/>
            <div className="main-app-container">
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/restore_password' element={<RestorePassword />} />
                    <Route path='/analysis' element={<Analysis />} />
                    <Route path='/result' element={<Result />} />
                    <Route path='/profile' element={<Profile  email={result.email} firstName={result.firstname}
                                                              lastName={result.lastname}/>} />
                </Routes>
            </div>
            <Footer/>
        </div>
    </Router>
  );
}

export default App;
