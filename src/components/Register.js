import { Form, Button } from "react-bootstrap";
import PageHeader from "./PageHeader";
import React, { useState } from "react";
import AuthService from "../services/auth.service";
import ErrorService from "../services/error.service";
import { isEmail } from "validator";
import { Redirect } from "react-router-dom";


const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const validName = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The Fullname must be between 3 and 20 characters.
            </div>
        );
    }
};

const validPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const validConfirmPassword = (password, confirm) => {
    if (password !== confirm) {
        return (
            <div className="alert alert-danger" role="alert">
                The passwords don't match.
            </div>
        );
    }
};
const validateAll = (name, email, password, confirmPassword) => {

    let err = validName(name);
    if (err === undefined) {
        err = validEmail(email);
    }
    if (err === undefined) {
        err = validPassword(password);
    }
    if (err == undefined) {
        err = validConfirmPassword(password, confirmPassword);
    }
    return err;

}

const Register = () => {

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);

    const nameChanged = (e) => {
        const fullname = e.target.value;
        setFullname(fullname);
        let err = validName(fullname);
        
        setValidationErrors({ name: err });
        console.log(validationErrors);
    };

    const emailChanged = (e) => {
        const email = e.target.value;
        setEmail(email);
        let err = validEmail(email);

        setValidationErrors({ email: err });
    };

    const passwordChanged = (e) => {
        const password = e.target.value;
        setPassword(password);
        let err = validPassword(password);

        setValidationErrors({ password: err });
    };
    const confirmPasswordChanged = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
        let err = validConfirmPassword(confirmPassword, password);

        setValidationErrors({ confirmPassword: err });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        const errorAll = validateAll(fullname, email, password, confirmPassword);
        setErrors([errorAll]);

        if (errorAll === undefined) {
            AuthService.register(fullname, email, password, confirmPassword).then(
                (response) => {
                    setSuccessMessage(response.data.message);

                },
                (error) => {
                    const errorMessages = ErrorService.getErrorMessages(error);
                    setErrors(errorMessages);
                    setLoading(false);
                }
            );
        }

    };

    return successMessage ?
        <Redirect
            to={{ pathname: "/login", state: { registered: true } }}
        />
        :
        <div className=" bg-light full-height">

            <PageHeader />

            <div className="container d-flex justify-content-center">
                <div className="col-md-4 card m-3 p-5">
                    <h1>Register</h1>
                    
                    <Form onSubmit={handleRegister} >

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="e.g. Godwin Kalu" value={fullname} required="true" onChange={nameChanged} />
                            {validationErrors.name}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} required="true" onChange={emailChanged} />
                            {validationErrors.email}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} required="true" onChange={passwordChanged} />
                            {validationErrors.password}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Retype Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={confirmPassword} required="true" onChange={confirmPasswordChanged} />
                            {validationErrors.confirmPassword}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Agree to terms and conditions" />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading ? true : false}>
                            Submit
                        </Button>
                    </Form>
                    {errors.length > 0 ? <div className="alert alert-danger">{errors}</div> : <div></div>}

                </div>

            </div>

        </div>

}

export default Register;
