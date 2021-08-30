import { Form, Button } from "react-bootstrap";
import PageHeader from './PageHeader';
import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import ErrorService from "../services/error.service";
import { Link} from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const emailChanged = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const passwordChanged = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);


        AuthService.login(email, password).then(
            () => {
                props.history.push("/dashboard", { state: { loggedIn: true } });
            },
            (error) => {
                const errorMessages = ErrorService.getErrorMessages(error);
                setErrors(errorMessages);
                setLoading(false);
            }
        );

    };

    let message = '';

    if (props.location.state !== undefined) {
        if (props.location.state.registered === true) {
            message = <div className="alert alert-success" role="alert">You have successfully registered. Please log in</div>
        }
        if (props.location.state.loggedIn === false) {
            message = <div className="alert alert-warning" role="alert">You are not logged in please provide your login credentials</div>
        }
    }

    let currentUser = AuthService.getCurrentUser();

    if (currentUser) {
        message = <Redirect
            to={{ pathname: "/dashboard", state: { loggedIn: true } }}
        />
    }

    console.log(props);


    return (
        <div className=" bg-light full-height">
            <PageHeader />
            <div className="container d-flex justify-content-center">
                <div className="col-md-4 card m-3 p-5">
                    {message}
                    <h1>Login</h1>
                    {errors.length > 0 ? <div className="alert alert-danger">{errors}</div> : <div></div>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={emailChanged} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={passwordChanged} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Keep me signed in" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <div>
                        <span>Don't have an Account? </span>
                        <Link to={"/register"} className="link">
                             Register
                        </Link>
                        </div>
                    </Form>

                </div>

            </div>

        </div>
    );
}

export default Login;
