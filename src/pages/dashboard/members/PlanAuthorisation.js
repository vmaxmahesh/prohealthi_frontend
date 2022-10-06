import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../../../shared/Footer";

export default function PlanAuthorisation(params) {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
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
                            <li><a href="">Prior Authorizations</a></li>
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
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Auth. Number</th>
                                        <th>Auth. Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>5847569</td>
                                        <td>Authorized</td>
                                        <td><a href="" className="btn btn-sm btn-danger Show"><i className="fa fa-eye"></i> View Details</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">


                    <Link className={'nav-link' + (currentpath == 'authorization' ? ' active' : '')} to='authorization'>Authorization</Link>
                    <Link className={'nav-link' + (currentpath == 'pricing' ? ' active' : '')} to='pricing'>Pricing</Link>
                    <Link className={'nav-link' + (currentpath == 'notes' ? ' active' : '')} to='notes'>Notes</Link>


                </div>
                <div className="tab-content" id="nav-tabContent">
                    {/* <div className="tab-pane fade show active" id="Authorization" role="tabpanel" aria-labelledby="nav-home-tab">

                    </div>
                    <div className="tab-pane fade" id="Pricing" role="tabpanel" aria-labelledby="nav-profile-tab">

                    </div>
                    <div className="tab-pane fade" id="Notes" role="tabpanel" aria-labelledby="nav-contact-tab">
                       
                    </div> */}
                    <Outlet />

                </div>
            </div>

            <Footer/>
        </>
    )
}

export function Authorisation(params) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-md-12 mb-3">
                            <h5 className="mb-2">General</h5>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Customer ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Customer ID" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Client ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Client ID" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Group ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Group ID" readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-1">Prior Authorization</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Auth Number</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Name" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Auth type</small>
                                        <select className="form-select">
                                            <option value="">Select Type</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Member ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Person Code</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>PIN</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Country" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Eff Date</small>
                                        <input type="date" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Term Date</small>
                                        <input type="date" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>

                                <div className="clearfix mb-3"></div>

                                <div className="col-md-12 mb-2">
                                    <h5 className="mb-1">NDC / GPI Authorization</h5>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>NDC</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>GPI</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Generic Indicator</small>
                                        <select className="form-select">
                                            <option value="">Select Type</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-5">
                            <h5 className="mb-1">Eligibility Information</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Date of Birth</small>
                                        <input type="date" className="form-control" name="" id="" placeholder="Address 1" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Relationship</small>
                                        <select className="form-select">
                                            <option value="">Relationship Type</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Plan ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                            </div>
                            <h5 className="mb-1">Error Category Override Flags</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group mt-2">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Eligibility" className="d-none" />
                                                <label htmlFor="Eligibility">Eligibility</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Days" className="d-none" />
                                                <label htmlFor="Days">Days Supply</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Prescriber" className="d-none" />
                                                <label htmlFor="Prescriber">Prescriber</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Refil" className="d-none" />
                                                <label htmlFor="Refil">Refil Top Soon</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Provider" className="d-none" />
                                                <label htmlFor="Provider">Provider</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Accum" className="d-none" />
                                                <label htmlFor="Accum">Accum Benefit</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Drug" className="d-none" />
                                                <label htmlFor="Drug">Drug</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Other" className="d-none" />
                                                <label htmlFor="Other">All Other</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Quantity" className="d-none" />
                                                <label htmlFor="Quantity">Quantity</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-1 float-end">
                <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</a>
            </div>
        </>
    )
}

export function Pricing(params) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">

                    <div className='row'>
                        <div className="col-md-9">
                            <div className='row'>
                                <div className="col-md-12 mb-1">
                                    <h5 className="mb-2">OLTP Information</h5>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group mb-3">
                                        <small>Date Used</small>
                                        <input type="date" className="form-control" name="" id="" required />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group mb-3">
                                        <small>Fils Used</small>
                                        <input type="date" className="form-control" name="" id="" required />
                                    </div>
                                </div>

                                <div className="clearfix mb-2"></div>

                                <div className="col-md-12">
                                    <h5 className="mb-2">Mail Service Pricing Information</h5>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <div className="form-group mb-3">
                                        <small>Copay Sched Ovrd</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group mb-3">
                                        <small>Brand Copay Amt</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group mb-3">
                                        <small>Generic Copay Amt</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                    </div>
                                </div>


                                <div className="clearfix mb-2"></div>

                                <div className="col-md-12">
                                    <h5 className="mb-2">Pricing Information</h5>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <small>Price Sched Ovrd</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <small>Copay Sched Ovrd</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <small>Accum Bene Excl</small>
                                        <select className="form-select">
                                            <option value="">Select..</option>
                                            <option value="">1 </option>
                                            <option value="">2 </option>
                                            <option value="">3 </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <small>Pat. Pd. Diff Ovrd</small>
                                        <select className="form-select">
                                            <option value="">Select..</option>
                                            <option value="">1 </option>
                                            <option value="">2 </option>
                                            <option value="">3 </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <small>Brand Copay Amt</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <small>Generic Copay Amt</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                    </div>
                                </div>

                                <div className="clearfix mb-2"></div>

                                <div className="col-md-12">
                                    <h5 className="mb-2">Provider Information</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <small>Provider</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <small>Status</small>
                                        <select className="form-select">
                                            <option value="">Select..</option>
                                            <option value="">1 </option>
                                            <option value="">2 </option>
                                            <option value="">3 </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="clearfix mb-2"></div>

                                <div className="col-md-12">
                                    <h5 className="mb-2">Prescriber Information</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <small>Prescriber</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <small>Status</small>
                                        <select className="form-select">
                                            <option value="">Select..</option>
                                            <option value="">1 </option>
                                            <option value="">2 </option>
                                            <option value="">3 </option>
                                        </select>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className='row'>
                                <div className="col-md-12 mb-1">
                                    <h5 className="mb-2">Maximums</h5>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <small>Daily Dose</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <small>Quantity</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <small>Days</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <small>Doller Amount</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <small>Number of Pils</small>
                                        <input type="text" className="form-control" name="" id="" required />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-md-1 float-end">
                <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</a>
            </div>
        </>
    )
}


export function PANotes(params) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <h5>Notes</h5>
                        </div>
                        <div className="col-md-12 mb-2">
                            <textarea className="form-control" rows="15" style={{ border: 'solid 1px #ccc' }}></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-1 float-end">
                <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</a>
            </div>
        </>
    )
}