import React, { useState } from 'react';
import {useSelector} from "react-redux";
import {State} from "../../store";
import {Button, Col, Form, FormGroup, Input} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {updateUserInfo} from "../../services/user/UserService";


const ProfileEditPage = () => {

    const currentUser = useSelector((state: State) => state.auth.currentUser);

    const [firstName, setFirstName] = useState(currentUser?.firstName);
    const [lastName, setLastName] = useState(currentUser?.lastName);
    const [email, setEmail] = useState(currentUser?.email);
    const [formValid, setFormValidation] = useState(true)
    const navigate = useNavigate()

    const formValidation = (): boolean => {
        if (email && firstName && lastName) {
            console.log(firstName)
            const nameValid = firstName.length > 1 && lastName.length > 5;
            const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            const isEmailValid = !!emailValid;
            setFormValidation(isEmailValid && nameValid);
            return isEmailValid && nameValid;
        } else {
            return false
        }
    }

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        const data = {
            email,
            firstName,
            lastName
        }
        console.log(data)
        if (currentUser) {
            const result = await updateUserInfo(data, currentUser.id);
            if (result.acknowledged === true) {
                window.location.replace('/home')
            }
            return
        }
        alert('Error')
    };

    return (
        <div className='edit-profile-wrapper'>
            <h1>Edit profile info</h1>
            <Form className="signup-form">
                <FormGroup className="form-col">
                    <h5>First name:</h5>
                    <Col>
                        <Input
                            placeholder="Enter your firstname"
                            className="firstname"
                            name="firstname"
                            type="text"
                            value={firstName}
                            onChange={e => {
                                setFirstName(e.target.value)
                                formValidation()
                            }}
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="form-col">
                    <h5>Last name:</h5>
                    <Col>
                        <Input
                            placeholder="Enter your lastname"
                            className="lastname"
                            name="lastname"
                            type="text"
                            value={lastName}
                            onChange={e => {
                                setLastName(e.target.value)
                                formValidation()
                            }}
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="form-col">
                    <h5>Email:</h5>
                    <Col>
                        <Input
                            placeholder="Enter your email"
                            className="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                                formValidation()
                            }}
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button
                        className="btn btn-success"
                        onClick={handleFormSubmit}
                        disabled={!formValid}
                    >
                        Finish Editing
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
};

export default ProfileEditPage;