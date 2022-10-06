import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from '../../../shared/Footer';

export default function Member() {
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
                            <li><a href="">Membership</a></li>
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

            <div className="tab-scroll">
                <div className="tabbable">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <Link className={'nav-link' + (currentpath == 'member' ? ' active' : '') } to='member' >Member</Link>
                        <Link className={'nav-link' + (currentpath == 'overrides' ? ' active' : '') } to='overrides' >Overrides</Link>
                        <Link className={'nav-link' + (currentpath == 'coverage' ? ' active' : '') } to='coverage' >Coverage</Link>
                        <Link className={'nav-link' + (currentpath == 'coverage-history' ? ' active' : '') } to='coverage-history' >Coverage History</Link>
                        <Link className={'nav-link' + (currentpath == 'health-conditions' ? ' active' : '') } to='health-conditions' >Health Conditions</Link>
                        <Link className={'nav-link' + (currentpath == 'notes' ? ' active' : '') } to='notes' >Notes</Link>
                        <Link className={'nav-link' + (currentpath == 'claim-History' ? ' active' : '') } to='claim-History' >Claim History</Link>
                        <Link className={'nav-link' + (currentpath == 'authorizations' ? ' active' : '') } to='authorizations' >Authorizations</Link>
                        <Link className={'nav-link' + (currentpath == 'provider' ? ' active' : '') } to='provider' >Provider</Link>
                        <Link className={'nav-link' + (currentpath == 'change' ? ' active' : '') } to='change' >Change</Link>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '55px' }}>
                <div className="clearfix mt-5"></div>
                <div className="tab-content" id="nav-tabContent">
                    

                    <Outlet />
                </div>
            </div>



            <Footer/>
        </>
    )
}

export function MemberForm() {
    return (

        <>
            <div className="card mt-5 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-11 mb-1">
                            <h5 className="mb-2">General</h5>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col align-items-center">
                            <p className="mt-2">Customer ID</p>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>Customer ID</small>
                                <input type="text" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>ID Detials</small>
                                <input type="text" className="form-control" name="" placeholder="ID Full Name" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>Effective Date</small>
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>Termination Date</small>
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col align-items-center">
                            <p>Client ID</p>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" placeholder="ID Full Name" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col align-items-center">
                            <p>Group ID</p>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" placeholder="ID Full Name" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col align-items-center">
                            <p>Card Holder</p>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" placeholder="" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" placeholder="" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" id="" required="" />
                            </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col align-items-center">
                            <p>Member ID</p>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" placeholder="" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" placeholder="" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                    </div>

                    <div className="clearfix mb-3"></div>

                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Eligibility</h5>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Elgiibility</small>
                                <select className="form-select">
                                    <option value="">Member Only</option>
                                    <option value="">Member - Spouse</option>
                                    <option value="">Member Childred Only</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Validation ID</small>
                                <input type="text" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Status</small>
                                <select className="form-select">
                                    <option value="">Active</option>
                                    <option value="">Pending</option>
                                    <option value="">Tereminated</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="clearfix mb-3"></div>

                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Dates / Misc</h5>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Elgiibility Lock Date</small>
                                <input type="date" className="form-control" name="" placeholder="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Member Flag ID</small>
                                <input type="text" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Load Process Date</small>
                                <input type="date" className="form-control" name="" placeholder="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Prim. Cvg. Ins. Carrier</small>
                                <input type="text" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                            </div>
                        </div>
                    </div>

                    <div className="clearfix mb-3"></div>

                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Member Identification</h5>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>First Name</small>
                                <input type="text" className="form-control" name="" placeholder="First Name" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Last Name</small>
                                <input type="text" className="form-control" name="" placeholder="Last Name" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Address 1</small>
                                <input type="text" className="form-control" name="" placeholder="Address" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Address 2</small>
                                <input type="text" className="form-control" name="" placeholder="Address" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>City</small>
                                <select className="form-select">
                                    <option value="">Select City / State</option>
                                    <option value="">City 1</option>
                                    <option value="">City 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Country</small>
                                <select className="form-select">
                                    <option value="">Select Country</option>
                                    <option value="">Jamaica</option>
                                    <option value="">Jamaica</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Date of Birth</small>
                                <input type="date" className="form-control" name="" placeholder="Address" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Relationship</small>
                                <select className="form-select">
                                    <option value="">Select Relationship</option>
                                    <option value="">1 Cardholder</option>
                                    <option value="">2 Souse</option>
                                    <option value="">3 Child</option>
                                    <option value="">4 Other</option>
                                    <option value="">5 Student</option>
                                    <option value="">6 Disable</option>
                                    <option value="">7 Adult Dependent</option>
                                    <option value="">8 Sigificant Other</option>
                                </select>
                                {/* <!--                                                <p className="input-hint">Cardholder</p>--> */}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Anniversary</small>
                                <input type="date" className="form-control" name="" placeholder="Address" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Patient ID Number</small>
                                <input type="text" className="form-control" name="" placeholder="Address" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Alternate Member ID</small>
                                <input type="date" className="form-control" name="" placeholder="Address" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Gender</small>
                                <div className="form-group mt-2">
                                    <input type="checkbox" id="male" className="d-none" />
                                    <label for="male">Male</label> &nbsp; &nbsp;
                                    <input type="checkbox" id="female" className="d-none" />
                                    <label for="female">Female</label>
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

export function Overrides() {
    return (

        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Copay Schedule Overrides</h5>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <small>Option</small>
                                <select className="form-select">
                                    <option value="">Policy Ann. Month</option>
                                    <option value="">Select City</option>
                                    <option value="">Select City</option>
                                    <option value="">Select City</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <small>Schedule Override</small>
                                <input type="text" className="form-control" name="" id="" />
                                <span className="fa fa-search form-icon"></span>
                            </div>
                        </div>

                        <div className="clearfix mb-3"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Accumulated Benifits Override / Adjustment</h5>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Option</small>
                                <select className="form-select">
                                    <option value="">Policy Ann. Month</option>
                                    <option value="">Select City</option>
                                    <option value="">Select City</option>
                                    <option value="">Select City</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Plan Override</small>
                                <input type="text" className="form-control" name="" id="" />
                                <span className="fa fa-search form-icon"></span>
                            </div>
                        </div>

                        <div className="clearfix mb-3"></div>


                        <div className="col-md-2">
                            <p className="mt-4">Tire 1</p>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <small>Effective Date</small>
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <small>Termination Date</small>
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <small>Adjestment Member Paid</small>
                                <input type="text" className="form-control" placeholder="$0.000" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <small>Adjestment Plan Paid</small>
                                <input type="text" className="form-control" placeholder="$0.000" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <small>Adjestment Out of Pocket</small>
                                <input type="text" className="form-control" placeholder="$0.000" name="" id="" required="" />
                            </div>
                        </div>

                        <div className="col-md-2">
                            <p className="mt-1">Tire 2</p>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="$0.000" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="$0.000" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="$0.000" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-2 ms-auto mb-1">
                            <a href="" className="btn btn-theme btn-sm p-1" style={{ width: '100%' }}>Add Tire <i className="fa fa-plus"></i></a>
                        </div>
                        <div className="clearfix mb-3"></div>

                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12 mb-1">
                                    <h5 className="mb-2">Primary Provider / Network</h5>
                                </div>

                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Provider Network ID</small>
                                        <input type="text" className="form-control" name="" id="" />
                                        <span className="fa fa-search form-icon"></span>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Provider ID</small>
                                        <input type="text" className="form-control" name="" id="" />
                                        <span className="fa fa-search form-icon"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12 mb-1">
                                    <h5 className="mb-2">Primary Prescriber</h5>
                                </div>

                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Prescriber ID</small>
                                        <input type="text" className="form-control" name="" id="" />
                                        <span className="fa fa-search form-icon"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="clearfix mb-3"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Other</h5>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Misc Group 1</small>
                                <input type="text" className="form-control" name="" id="" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Misc Group 2</small>
                                <input type="text" className="form-control" name="" id="" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Misc ID</small>
                                <input type="text" className="form-control" name="" id="" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>User Code 1</small>
                                <input type="text" className="form-control" name="" id="" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>User Code 2</small>
                                <input type="text" className="form-control" name="" id="" />
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

export function Coverage() {
    return (

        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <h5>Coverage Information</h5>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Effective Date</small>
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Termination Date</small>
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>


                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Plan ID</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Copay Strategy ID</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Accum Bene Start ID</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Pricing Strategy</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>

                        <div className="col-md-12 mb-4 d-flex justify-content-end">
                            <a href="" className="btn btn-sm btn-secondary">Clear</a> &nbsp;&nbsp;
                            <a href="" className="btn btn-sm btn-warning">Remove Coverage</a> &nbsp;&nbsp;
                            <a href="" className="btn btn-sm btn-info">Add Coverage</a>
                        </div>

                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Effective Date</th>
                                        <th>Termination Date</th>
                                        <th>Plan ID</th>
                                        <th>Pricing Start ID</th>
                                        <th>Copay Start ID</th>
                                        <th>Accum Benifit Start ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>06-10-2022</td>
                                        <td>06-12-2040</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                    </tr>
                                </tbody>
                            </table>
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
export function CoverageHistory() {
    return (

        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Date/Time Modified</th>
                                        <th>User ID</th>
                                        <th>Chagne Type Indicator</th>
                                        <th>Org Eff. Date</th>
                                        <th>Org Term Date</th>
                                        <th>New Eff Date</th>
                                        <th>New Term Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2010-01-24 14:57:23</td>
                                        <td>Shekar</td>
                                        <td>Coverage Line was Added</td>
                                        <td>0000-00-00</td>
                                        <td>0000-00-00</td>
                                        <td>2010-01-01</td>
                                        <td>9999-12-31</td>
                                    </tr>
                                </tbody>
                            </table>
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
export function Health() {
    return (

        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <h5>Diagnosis</h5>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Diagnosis</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Effective Date</small>
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Termination Date</small>
                                <input type="date" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-12 mb-4 d-flex justify-content-end">
                            <a href="" className="btn btn-sm btn-secondary">Clear</a> &nbsp;&nbsp;
                            <a href="" className="btn btn-sm btn-warning">Remove Item</a> &nbsp;&nbsp;
                            <a href="" className="btn btn-sm btn-info">Update Item</a>
                        </div>

                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Effective Date</th>
                                            <th>Termination Date</th>
                                            <th>Diagnosis</th>
                                            <th>Discrition</th>
                                            <th>--</th>
                                            <th>sample</th>
                                            <th>sample</th>
                                            <th>sample</th>
                                            <th>sample</th>
                                            <th>sample</th>
                                            <th>sample</th>
                                            <th>sample</th>
                                            <th>sample</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2010-01-24 </td>
                                            <td>9999-12-15</td>
                                            <td>956.5</td>
                                            <td>NHF - National Health Found</td>
                                            <td>0000-00-00</td>
                                            <td>2010-01-01</td>
                                            <td>9999-12-31</td>
                                            <td>0000-00-00</td>
                                            <td>2010-01-01</td>
                                            <td>9999-12-31</td>
                                            <td>0000-00-00</td>
                                            <td>2010-01-01</td>
                                            <td>9999-12-31</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-md-12 mb-2">
                            <h5>Diagnosis History</h5>
                        </div>

                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Date/Time Modified</th>
                                        <th>User ID</th>
                                        <th>Diagnosis</th>
                                        <th>Change Type Indicator</th>
                                        <th>Org Eff Date</th>
                                        <th>Org Term Date</th>
                                        <th>New Eff Date</th>
                                        <th>New Term Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2010-01-24 14:57:23</td>
                                        <td>Shekar</td>
                                        <td>963.2</td>
                                        <td>Diagnosis ID Line Added</td>
                                        <td>0000-00-00</td>
                                        <td>2010-01-01</td>
                                        <td>9999-12-31</td>
                                        <td>0000-00-00</td>
                                    </tr>
                                </tbody>
                            </table>
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
export function Notes() {
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
export function ClaimHistory() {
    return (

        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <h5>View Hostory</h5>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <ul className="radios">
                                    <li><input type="radio" name="tab" value="igotnone" checked onclick="show1();" /> Claim History</li>
                                    <li><input type="radio" name="tab" value="igottwo" onclick="show2();" /> Accumulated Benifits</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <div className="row">
                                <div className="col-md-12 mb3">
                                    <h6>Date Creteria</h6>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <small>Date</small>
                                        <input type="date" name="" className="form-control" id="" />
                                    </div><br />
                                    <ul className="radios">
                                        <li><input type="radio" name="tab" id="date" /> Date</li>
                                        <li><input type="radio" name="tab" id="month" /> Month</li>
                                        <li className="m-0"><input type="radio" name="tab" id="year" /> Year</li>
                                    </ul>

                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group mt-4">
                                        <input type="checkbox" id="html" className="d-none" />
                                        <label for="html">View All Dates</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <small>View Limitations</small>
                                        <select className="form-select">
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-1 ms-auto mb-3">
                            <a href="" className="btn btn-info btn-sm p-1" style={{ width: '100%' }}>Load</a>
                        </div>


                        <div className="col-md-12" id="div1">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Date of SVC</th>
                                        <th>Provider ID</th>
                                        <th>Claim Ref. #</th>
                                        <th>Rx. #</th>
                                        <th>New/Refil</th>
                                        <th>Procedure Code</th>
                                        <th>Label Name / Procedure Discription</th>
                                        <th>Cardholder ID</th>
                                        <th>Person Code</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Bin#</th>
                                        <th>Plan ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2010-01-24</td>
                                        <td>NPP001</td>
                                        <td>3000000456</td>
                                        <td>000006</td>
                                        <td>0</td>
                                        <td>200</td>
                                        <td>Flomax Cap 0.4 MG</td>
                                        <td>1548796</td>
                                        <td>001</td>
                                        <td>.00</td>
                                        <td>Rejected</td>
                                        <td>200010</td>
                                        <td>NIB_PLAN</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12 Hide" id="div2">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Date of SVC</th>
                                        <th>Provider ID</th>
                                        <th>App to Periodic Ded.</th>
                                        <th>App to MOP</th>
                                        <th>Patient Paid Diff.</th>
                                        <th>App to Max Benifit</th>
                                        <th>Acc. Excl</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2010-01-24</td>
                                        <td>NPP001</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>Yes</td>
                                        <td>R</td>
                                    </tr>
                                    <tr>
                                        <td>2010-01-24</td>
                                        <td>NPP001</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>Yes</td>
                                        <td>P</td>
                                    </tr>
                                </tbody>
                            </table>
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
export function PriorAuthorisation() {
    return (

        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <h5>Prior Authorizations</h5>
                        </div>


                        <div className="col-md-12" id="div1">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Auth. Number</th>
                                        <th>Auth Type</th>
                                        <th>NDC</th>
                                        <th>GPI</th>
                                        <th>Eff. Date</th>
                                        <th>Term Date</th>
                                        <th>Customer ID</th>
                                        <th>Client ID</th>
                                        <th>Group ID</th>
                                        <th>Member ID</th>
                                        <th>0_Person Code</th>
                                        <th>0 Prior Auth</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
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
export function ProviderSearch() {
    return (

        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <h5>Criteria</h5>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Plan ID</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>City</small>
                                <select className="form-select">
                                    <option value="">Select City</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>State</small>
                                <select className="form-select">
                                    <option value="">Select State</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>County</small>
                                <select className="form-select">
                                    <option value="">Select County</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>ZIP</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Area Code</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Exchange</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4 d-flex justify-content-end">
                            <a href="" className="btn btn-sm btn-secondary">Clear</a> &nbsp;&nbsp;
                            <a href="" className="btn btn-sm btn-info">Search</a>
                        </div>


                        <div className="col-md-12" id="div1">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Provider ID</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Country</th>
                                        <th>ZIP</th>
                                        <th>Area Code</th>
                                        <th>Exchange</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
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

export function ChnageLog() {
    return (

        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12" id="div1">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>User ID Changed</th>
                                        <th>Date Changed</th>
                                        <th>Time Changed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}