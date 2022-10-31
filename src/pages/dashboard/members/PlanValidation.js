import React from "react";
import Footer from "../../../shared/Footer";

export default function PlanValidation(params) {
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Membership Data</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Plan Validation</a></li>
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
            </div>


            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>Cusomer Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>NTH</td>
                                        <td>NTH Test Customer</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

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




            <Footer/>
        </>
    )
}