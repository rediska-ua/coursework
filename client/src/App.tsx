import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/header/header";
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from "./pages/login/login";
import SignUp from "./pages/signUp/signup";
import HomePage from "./pages/homePage/homePage";
import Footer from "./components/footer/Footer";
import RestorePassword from "./pages/restorePassord/restorePassword";
import Profile from "./pages/profile/profile";
import StorageService from "./services/storage/StorageService";
import { getUserData } from "./services/auth/AuthService";
import Result from "./pages/resultPage/resultPage";
import Analysis from "./pages/analysisPage/analysisPage";
import {useDispatch, useSelector} from "react-redux";
import {getUserAsync} from "./store/auth-slice";
import {State} from "./store";
import {Spinner} from "reactstrap";
import ProfileEditPage from "./pages/profile-edit/profile-edit";



const App = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: State) => state.auth.isAuthenticated);
    const [result, setResult] = useState({
        email: '',
        firstname: '',
        lastname: ''
    });

    const [dispatched, setDispatched] = useState(false);
    useEffect(() => {
        dispatch(getUserAsync());
        setDispatched(true);
    }, [])

    if (!dispatched) {
        return (
            <div className='div-spinner'>
                <Spinner animation="border" style={{ width: '10rem', height: '10rem' }}/>
            </div>);
    }

    return (
    <Router>
        <div className="app">
            <Header/>
            <div className="main-app-container">
                <Routes>
                    <Route path="/" element={ isAuthenticated ? <Navigate to='/home'/> : <Navigate to='/login'/>} />
                    <Route path="/home" element={ isAuthenticated ? <HomePage /> : <Navigate to='/login'/>} />
                    <Route path="/login" element={ isAuthenticated ? <Navigate to='/home'/> : <Login /> } />
                    <Route path='/signup' element={isAuthenticated ? <Navigate to='/home'/> :<SignUp />} />
                    <Route path='/analysis' element={ isAuthenticated ? <Analysis /> : <Navigate to='/login'/>} />
                    <Route path='/result/:id' element={ isAuthenticated ? <Result /> : <Navigate to='/login'/>} />
                    <Route path='/profile' element={ isAuthenticated ? <Profile/> : <Navigate to='/login'/>} />
                    <Route path='/profile-edit' element={ isAuthenticated ? <ProfileEditPage/> : <Navigate to='/login'/>} />
                </Routes>
            </div>
            <Footer/>
        </div>
    </Router>
  );
}

export default App;
