import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import ErrorService from "../services/error.service";
import UserService from "../services/user.service";
import RateService from "../services/exchange-rate.service";
import AuthService from "../services/auth.service";
import Pusher from "pusher-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: "eu",
});



const Dashboard = () => {

    const [profile, setProfile] = useState({});
    const [rate, setRate] = useState({});
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const channel = pusher.subscribe("exchange-rate-channel");
        channel.bind("rate", function (exchange) {
            setRate(exchange.rate);
        });

        UserService.getUserProfile().then(
            (response) => {
                setProfile(response.data);
            },
            (error) => {
                const errorMessages = ErrorService.getErrorMessages(error);
                setErrors(errorMessages);
            }
        );

        RateService.getExchangeRate().then(
            (response) => {
                setRate(response.data);
            },
            (error) => {
                const errorMessages = ErrorService.getErrorMessages(error);
                setErrors(errorMessages);
            }
        );
    }, []);

    const currentUser = AuthService.getCurrentUser().user ?? profile;
    const exchangeRate = rate;
    return (
        <div className=" bg-light full-height">
            <PageHeader />
            <div className="container d-flex justify-content-center">
                <div className="col-md-12 card m-3 p-5">
                    <div className="row">
                        <div className="col-md-7 ">
                            <h3>Dashboard</h3>

                            <h5> Welcome {currentUser.name}</h5>
                        </div>
                        <div className="col-md-5 ms-auto">
                            <div className="row text-end">
                                <div className="text-center pb-3">
                                    Exchange rates
                                </div>
                                {errors.length > 0 ? <div className="alert alert-danger">{errors}</div> : <div></div>}

                                <div className="col-md-4">
                                    <h6>1 BTC</h6>
                                </div>
                                <div className="col-md-1">
                                    <FontAwesomeIcon icon={faExchangeAlt} />
                                </div>
                                <div className="col-md-6">
                                    <h6> {exchangeRate.value} USD</h6>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
}

export default Dashboard;
