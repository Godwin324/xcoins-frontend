import PageHeader from "./PageHeader";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
    return (
        <div class=" bg-light full-height">
            <PageHeader />
            <div class="container d-flex justify-content-center">
                <div class="col-md-12 card m-3 p-5">
                    <div class="row">
                        <div className="col-md-9 ">
                            <h3>Dashboard</h3>

                            <h5> Welcome Username,</h5>
                        </div>
                        <div className="col-md-3 ms-auto">
                            <div className="row text-end">
                                <div className="text-center pb-3">
                                    Exchange rates
                                </div>
                                <div className="col-md-4">
                                    <h6> {1} BTC</h6>{/*exchangeRate.amount} BTC</h1>*/}
                                </div>
                                <div className="col-md-1">
                                    <FontAwesomeIcon icon={faExchangeAlt} />
                                </div>
                                <div className="col-md-6">
                                    <h6> 50030 USD</h6>{/*exchangeRate.price} USD </h1>*/}
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
