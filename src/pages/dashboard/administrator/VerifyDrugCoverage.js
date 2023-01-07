import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function VerifyDrugCoverage() {


    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Exception List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">GPI Exception</a></li>
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




            <div>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">

                    <Link to="member" className="nav-link">Member</Link>
                    <Link to="group" className="nav-link">Group</Link>
                    <Link to="plan" className="nav-link">Plan</Link>

                </div>
                <div className="tab-content" id="nav-tabContent">


                    <Outlet />



                </div>
            </div>


            <div className="footer">
                <div className="">
                    <small>© 2022 All Rights Reserved by ProHealthi</small>
                </div>
            </div>

           
        </>
    );
}

export function Member(props) {

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Drug Coverage For</h5>
                            <div className="row">
                                <div className="col-md-3">
                                    <small>Plan ID</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Client ID</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Client Group ID</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Member ID</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Person Code</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Relationship</small>
                                    <select className="form-select">
                                        <option>1</option>
                                        <option></option>
                                    </select>
                                </div>
                            </div>

                            <h5 className="mb-2 mt-3">Drug Information</h5>
                            <div className="row">
                                <div className="col-md-3">
                                    <small>NDC</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Date of Service</small>
                                    <input type="date" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Pharmacy Type Var Ind</small>
                                    <select className="form-select">
                                        <option>Retail</option>
                                        <option></option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <small>Network Part Var Ind</small>
                                    <select className="form-select">
                                        <option>In Network</option>
                                        <option></option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <small>Claim Type Var Ind</small>
                                    <select className="form-select">
                                        <option>POS </option>
                                        <option></option>
                                    </select>
                                </div>
                            </div>

                            <h5 className="mb-2 mt-3">Coverage Information</h5>
                            <div className="row">
                                <div className="col-md-3">
                                    <small>NDC</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Covered ?</small>
                                    <input type="date" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Limitation Applies ?</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Authorization Applies ?</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Coverage Criteria</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                            </div>


                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}

export function Group(props) {

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Drug Coverage For</h5>
                            <div className="row">
                                <div className="col-md-3">
                                    <small>Plan ID</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Client ID</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Client Group ID</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>

                            </div>

                            <h5 className="mb-2 mt-3">Drug Information</h5>
                            <div className="row">
                                <div className="col-md-3">
                                    <small>NDC</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Date of Service</small>
                                    <input type="date" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Pharmacy Type Var Ind</small>
                                    <select className="form-select">
                                        <option>Retail</option>
                                        <option></option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <small>Network Part Var Ind</small>
                                    <select className="form-select">
                                        <option>In Network</option>
                                        <option></option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <small>Claim Type Var Ind</small>
                                    <select className="form-select">
                                        <option>POS </option>
                                        <option></option>
                                    </select>
                                </div>
                            </div>

                            <h5 className="mb-2 mt-3">Coverage Information</h5>
                            <div className="row">
                                <div className="col-md-3">
                                    <small>NDC</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Covered ?</small>
                                    <input type="date" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Limitation Applies ?</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Authorization Applies ?</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Coverage Criteria</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export function Plan(props) {

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Drug Coverage For</h5>
                            <div className="row">
                                <div className="col-md-3">
                                    <small>Plan ID</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>

                            </div>

                            <h5 className="mb-2 mt-3">Drug Information</h5>
                            <div className="row">
                                <div className="col-md-3">
                                    <small>NDC</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Date of Service</small>
                                    <input type="date" className="form-control" name="" id="" required="" />
                                </div>

                            </div>

                            <h5 className="mb-2 mt-3">Coverage Information</h5>
                            <div className="row">
                                <div className="col-md-3">
                                    <small>NDC</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Covered ?</small>
                                    <input type="date" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Limitation Applies ?</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Authorization Applies ?</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                                <div className="col-md-3">
                                    <small>Coverage Criteria</small>
                                    <input type="text" className="form-control" name="" id="" required="" />
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

//  VerifyDrugCoverage;