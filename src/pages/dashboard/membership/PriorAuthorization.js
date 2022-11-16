import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function PriorAuthorization() {
    return (
        <>
            <div className="dashboard-content clearfix">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Membership Data </a></li>
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
                    <SearchPriorAuthorization />
                    <PriorAuthorizationList />
                </div>
            </div>
        </>
    )
}

function SearchPriorAuthorization() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Prior Authorization</small>
                                <input type="text" className="form-control" placeholder='Start typing member ID/ person code/ customer ID/ client ID/ Group ID to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PriorAuthorizationList() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-md-4 mb-3">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="20%">Auth. Number</th>
                                        <th width="20%">Auth. Type</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6 mb-3">
                            <PriorAuthorisationTabs />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PriorAuthorisationTabs() {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
    return (
        <>
            {/* <div className="card mt-5 mb-3">
                <div className="card-body"> */}
                    <div className="data">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <Link to="authorization" className={'nav-link' + (currentpath == 'authorization' ? ' active' : '')}>Authorization</Link>
                            <Link to="pricing" className={'nav-link' + (currentpath == 'pricing' ? ' active' : '')}>Pricing/Misc</Link>
                            <Link to="notes" className={'nav-link' + (currentpath == 'notes' ? ' active' : '')}>Notes</Link>
                        </div>
                    </div>

                {/* </div>
            </div> */}
            <div>
                <Outlet />
            </div>
        </>
    )
}

export function Authorization() {
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
        </>
    )
}

export function PriorPricing() {
    return (
        <>
            <div class='row'>
                <div class="col-md-9">
                    <div class='row'>
                        <div class="col-md-12 mb-1">
                            <h5 class="mb-2">OLTP Information</h5>
                        </div>
                        <div class="col-md-6 mb-2">
                            <div class="form-group mb-3">
                                <small>Date Used</small>
                                <input type="date" class="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div class="col-md-6 mb-2">
                            <div class="form-group mb-3">
                                <small>Fils Used</small>
                                <input type="date" class="form-control" name="" id="" required />
                            </div>
                        </div>

                        <div class="clearfix mb-2"></div>

                        <div class="col-md-12">
                            <h5 class="mb-2">Mail Service Pricing Information</h5>
                        </div>

                        <div class="col-md-4 mb-2">
                            <div class="form-group mb-3">
                                <small>Copay Sched Ovrd</small>
                                <input type="text" class="form-control" name="" id="" required />
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <div class="form-group mb-3">
                                <small>Brand Copay Amt</small>
                                <input type="text" class="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div class="col-md-4 mb-2">
                            <div class="form-group mb-3">
                                <small>Generic Copay Amt</small>
                                <input type="text" class="form-control" name="" id="" required />
                            </div>
                        </div>


                        <div class="clearfix mb-2"></div>

                        <div class="col-md-12">
                            <h5 class="mb-2">Pricing Information</h5>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-3">
                                <small>Price Sched Ovrd</small>
                                <input type="text" class="form-control" name="" id="" required />
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-3">
                                <small>Copay Sched Ovrd</small>
                                <input type="text" class="form-control" name="" id="" required />
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-3">
                                <small>Accum Bene Excl</small>
                                <select class="form-select">
                                    <option value="">Select..</option>
                                    <option value="">1 </option>
                                    <option value="">2 </option>
                                    <option value="">3 </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-3">
                                <small>Pat. Pd. Diff Ovrd</small>
                                <select class="form-select">
                                    <option value="">Select..</option>
                                    <option value="">1 </option>
                                    <option value="">2 </option>
                                    <option value="">3 </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-3">
                                <small>Brand Copay Amt</small>
                                <input type="text" class="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-3">
                                <small>Generic Copay Amt</small>
                                <input type="text" class="form-control" name="" id="" required />
                            </div>
                        </div>

                        <div class="clearfix mb-2"></div>

                        <div class="col-md-12">
                            <h5 class="mb-2">Provider Information</h5>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <small>Provider</small>
                                <input type="text" class="form-control" name="" id="" required />
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <small>Status</small>
                                <select class="form-select">
                                    <option value="">Select..</option>
                                    <option value="">1 </option>
                                    <option value="">2 </option>
                                    <option value="">3 </option>
                                </select>
                            </div>
                        </div>

                        <div class="clearfix mb-2"></div>

                        <div class="col-md-12">
                            <h5 class="mb-2">Prescriber Information</h5>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <small>Prescriber</small>
                                <input type="text" class="form-control" name="" id="" required />
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <small>Status</small>
                                <select class="form-select">
                                    <option value="">Select..</option>
                                    <option value="">1 </option>
                                    <option value="">2 </option>
                                    <option value="">3 </option>
                                </select>
                            </div>
                        </div>


                    </div>
                </div>

                <div class="col-md-3">
                    <div class='row'>
                        <div class="col-md-12 mb-1">
                            <h5 class="mb-2">Maximums</h5>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group mb-3">
                                <small>Daily Dose</small>
                                <input type="text" class="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group mb-3">
                                <small>Quantity</small>
                                <input type="text" class="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group mb-3">
                                <small>Days</small>
                                <input type="text" class="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group mb-3">
                                <small>Doller Amount</small>
                                <input type="text" class="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group mb-3">
                                <small>Number of Pils</small>
                                <input type="text" class="form-control" name="" id="" required />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export function PriorNotes() {
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
        </>
    )
}