import React from 'react';

export default function PlanValidations() {
    return (
        <>
            <div className="dashboard-content clearfix">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Membership</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Plan Validations</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum ">
                            <ul>
                                <li className="float-end m-0"><a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <SearchPlanValidation />
                    <PlanValidationList />
                    <PlanValidationForm />
                </div>
            </div>
        </>
    )
}

function SearchPlanValidation() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Plan Validation </small>
                                <input type="text" className="form-control" placeholder='Start typing ID/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PlanValidationList() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Provider Type Validation</h5>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>Customer Name</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Client ID</th>
                                        <th>Group ID</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PlanValidationForm() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Add Customer</h5>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Customer ID</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Client ID</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Client Group ID</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Plan ID</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>

                        <div className="col-md-2 ms-auto text-end">
                            <a href="" className="btn btn-theme p-2">Adding</a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}