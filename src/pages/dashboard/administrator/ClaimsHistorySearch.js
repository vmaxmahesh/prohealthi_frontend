import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function ClaimsHistorySearch() {
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
                            <li><a href="">Administrator</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Claim History Search</a></li>
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
                    {/* <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#Rules" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Member</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Pricing" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Group</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Override" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Plan</button>
                     */}

                    <Link to="general-history" className={'nav-link' + (currentpath == 'general-history' ? ' active' : '')}>General</Link>
                    <Link to="optional-history" className={'nav-link' + (currentpath == 'optional-history' ? ' active' : '')}>Optional Criteria</Link>

                </div>
                <div className="tab-content" id="nav-tabContent">
                    <div className='card'>
                        <div className='card-body'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>


            <div className="card mt-3 mb-3">
                <div className="card-body">

                    {/* <General /> */}
                    {/* <Optional /> */}
                </div>
            </div>

        </>
    );
}

export function General(props) {
    return (
        <>
            <div className="col-md-12 mb-2">
                <h5>Criteria</h5>
            </div>
            <form>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Cardholder ID</small>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-2 mb-3">
                        <div className="form-group">
                            <small>Person Code</small>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Provider ID</small>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Pin</small>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                </div>
            </form>


            <div className="row mb-3">
                <div className="col-md-12 mb-2">
                    <h5>Date Range</h5>
                </div>
                <div className="col-md-6 mb-2">
                    <input type="radio" value="" /> Date of Service from <input type="date" name="" className="form-control" />
                </div>
                <div className="col-md-6 mb-2">
                    <input type="radio" value="" /> Date of Submitted to <input type="date" name="" className="form-control" />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-8 mb-2">
                    <h5>View Laminators</h5>

                    <div className="col-md-12 mb-3">
                        <div className="row mb-2">
                            <div className="col-md-3 mb-2 mt-2">
                                <input type="radio" value="" /> Paid Claims
                            </div>
                            <div className="col-md-3 mb-2 mt-2">
                                <input type="radio" value="" /> Reversed Claims
                            </div>
                            <div className="col-md-3 mb-2 mt-2">
                                <input type="radio" value="" /> Rejected Claims
                            </div>
                            <div className="col-md-3 mb-2 mt-2">
                                <input type="radio" value="" /> All Claims
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <p>Sort by</p>
                        <select className="form-select">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                <button href="provider-search.html" className="btn btn-info">Search</button>
            </div>
        </>
    );
}


export function Optional(props) {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h5>Optional Creteria</h5>
                </div>

                <from>
                    <div className="row mb-3">
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Rx Number</small>
                                <input type="text" name="" id="" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Claim Ref No.</small>
                                <input type="text" name="" id="" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>NDC</small>
                                <input type="text" name="" id="" className="form-control" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <small>GPI</small>
                                <input type="text" name="" id="" className="form-control" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <small>Procedure Code</small>
                                <input type="text" name="" id="" className="form-control" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>

                        <div className="col-md-12 mb-3">
                            <h5>Customer / Client / Group</h5>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Customer ID</small>
                                <input type="text" name="" id="" className="form-control" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Client ID</small>
                                <input type="text" name="" id="" className="form-control" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Group ID</small>
                                <input type="text" name="" id="" className="form-control" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>


                        <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                            <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                            <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                            <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                            <button href="provider-search.html" className="btn btn-info">Search</button>
                        </div>
                    </div>
                </from>


            </div>
        </>
    );
}

export default ClaimsHistorySearch;