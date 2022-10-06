import React from 'react';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from '../../../../shared/Footer';

export default function Clientgroup() {
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
                            <li><a href="">Users Data</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Client</a></li>
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

            <div className="col-md-12 mb-3">
                <h4 style={{ fontWeight: '600' }}>Search Client/Group</h4>
            </div>

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <form method="" action="">
                        <div className="col-md-12">
                            <h5 className="mb-2">Select Customer and Select ID</h5>
                        </div>
                        <div className="row mb-4">
                            <div className="col mb-2">
                                <div className="form-group">
                                    <small>Customer ID</small>
                                    <input type="text" className="form-control" placeholder="Customer ID" name="" id="" required />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="form-group">
                                    <small>Client ID</small>
                                    <input type="text" className="form-control" placeholder="Client ID" name="" id="" required />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col mb-2">
                                <div className="form-group">
                                    <small>Group ID</small>
                                    <input type="text" className="form-control" placeholder="Client Name" name="" id="" required />
                                </div>
                            </div>
                            <div className="col-md-2 mb-2">
                                <div className="form-group">
                                    <small>&nbsp;</small><br />
                                    <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: '100%', fontSize: '12px' }}>Search</button>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="checkbox" id="Return" className="d-none" />
                                    <label htmlFor="Return">Return all groups to my list</label>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>Client ID</th>
                                        <th>Group ID</th>
                                        <th>Group Name</th>
                                        <th>Eff. Date</th>
                                        <th>Term Date</th>
                                        <th>Customer Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Jamrech</td>
                                        <td>Jamica Mechaidise</td>
                                        <td>G1</td>
                                        <td>Glass Ware Group</td>
                                        <td>06-10-2022</td>
                                        <td>06-12-2040</td>
                                        <td>Jamaica Merchand</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">

                    <Link className={'nav-link' + (currentpath == 'identification' ? ' active' : '') } to="identification">Identification</Link>
                    <Link className={'nav-link' + (currentpath == 'strategy' ? ' active' : '') } to="strategy">Strategy</Link>
                    <Link className={'nav-link' + (currentpath == 'eligibility' ? ' active' : '') } to="eligibility">Eligibility</Link>
                    <Link className={'nav-link' + (currentpath == 'indicators' ? ' active' : '') } to="indicators">Indicators</Link>
                    <Link className={'nav-link' + (currentpath == 'charges' ? ' active' : '') } to="charges">Charges/Misc</Link>

                    {/* <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#Identification" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Identification</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Strategy" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Strategy</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Eligibility" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Eligibility</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Indicators" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Indicators</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Charges" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Charges/Misc</button> */}
                </div>
                <div className="tab-content" id="nav-tabContent">
                    {/* <div className="tab-pane fade show active" id="Identification" role="tabpanel" aria-labelledby="nav-home-tab">

                    </div>
                    <div className="tab-pane fade" id="Strategy" role="tabpanel" aria-labelledby="nav-profile-tab">

                    </div>
                    <div className="tab-pane fade" id="Eligibility" role="tabpanel" aria-labelledby="nav-contact-tab">

                    </div>
                    <div className="tab-pane fade" id="Indicators" role="tabpanel" aria-labelledby="nav-contact-tab">

                    </div>
                    <div className="tab-pane fade" id="Charges" role="tabpanel" aria-labelledby="nav-contact-tab">

                    </div> */}
                    <Outlet/>
                </div>
            </div>
            <Footer/>

        </>
    );
}

export function Charges(params) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Other Charges</h5>
                        </div>

                        <div className="col-md-4 mb-2">
                            <div className="form-group mb-2">
                                <small>Admin Fee</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group mb-2">
                                <small>Admin %</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group mb-2">
                                <small>DMR Free</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group mb-2">
                                <small>UCF Claim Fee</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group mb-2">
                                <small>Elig Update Fee</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group mb-2">
                                <small>Prior Auth Fee</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>

                        <div className="clearfix mb-3"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Exception List Processing</h5>
                        </div>
                        <div className="col-md-6 mb-1">
                            <div className="form-group">
                                <input type="checkbox" id="Plan" className="d-none" />
                                <label for="Plan">Bypass Plan NDC/GPI Exception List Processing</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-1">
                            <div className="form-group">
                                <input type="checkbox" id="System" className="d-none" />
                                <label for="System">Bypass System NDC/GPI Exception List Processing</label>
                            </div>
                        </div>

                        <div className="clearfix mb-3"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Miscellaneous</h5>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Number of Days from Date Written to First Fill</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Number of Days from Date Filled to Date Submitted</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Number of Days from Date Filled to Submitted (Manual)</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Number of Days from DateFilled to Future Fill Date</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Number of Days for Reversal</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="clearfix mb-2"></div>
                        <div className="col-md-4 mb-1">
                            <div className="form-group">
                                <input type="checkbox" id="Tax" className="d-none" />
                                <label for="Tax">Tax Exempty Entity</label>
                            </div>
                        </div>
                        <div className="col-md-4 mb-1">
                            <div className="form-group">
                                <input type="checkbox" id="u&amp;c" className="d-none" />
                                <label for="u&amp;c">Mandatory U and C</label>
                            </div>
                        </div>



                        <div className="clearfix mb-3"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Major Medical</h5>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-2">
                                <small>SMBPP</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>RVA List ID</small>
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-md-1 float-end">
                <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Save</a>
            </div>
        </>
    )
}

export function Indicators(params) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Indicators:</h5>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>Accumelated Benifits Ind:</small>
                            <select className="form-select">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>Secondory Coverage Ind</small>
                            <select className="form-select">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <p className="input-hint">Family Accumulation By Member ID</p>
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Interim Member Maximums</h5>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>Maximum Number Of Transactions Allowed For An Interim..</small>
                            <select className="form-select">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>Maximum Number Of Days That An Interim Member Will Be..</small>
                            <select className="form-select">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Data Entry</h5>
                        </div>
                        <div className="col-md-7 mb-1">
                            <div className="form-group">
                                <input type="checkbox" id="html" className="d-none" />
                                <label for="html">Bypass Member Eligibility DAte Edits Against Customer Effective Dates</label>
                            </div>
                        </div>
                        <div className="col-md-5 mb-1">
                            <div className="form-group">
                                <input type="checkbox" id="html" className="d-none" />
                                <label for="html">Require Person code on member data entry</label>
                            </div>
                        </div>

                        <div className="clearfix mb-3"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Copy Schedule Override</h5>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-2">
                                <small>Option</small>
                                <select className="form-select">
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-2">
                                <small>Shedule</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required="" />

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

export function Eligibility(params) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Eligibility Load Parameters</h5>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>Auto Termination Level</small>
                            <select className="form-select">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <p className="input-hint">Overlap Allowed Within Database</p>
                        </div>

                        <div className="col-md-6 mb-2">
                            <small>Eligibility Type</small>
                            <select className="form-select">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Eligibility Processing Parameters:</h5>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>Membership Processing Flag</small>
                            <select className="form-select">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Eligibility Verification Options:</h5>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>Eligibility Options</small>
                            <select className="form-select">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                            <p className="input-hint">Check Eligibility By Member:</p>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>Eligibility Validation List ID</small>
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Eligibility Change Logging</h5>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>Eligibility Change Log Indicator</small>
                            <select className="form-select">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
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

export function Strategy(params) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-md-11 mb-1">
                            <h5 className="mb-2">Coverage Strategy</h5>
                        </div>
                        <div className="col-md-1 mb-1">
                            <a href="" className="btn btn-theme btn-sm p-1" style={{ width: '100%' }}>Add <i className="fa fa-plus"></i></a>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-3 align-items-center">
                            <p className="mt-2">Cov Eff Date:</p>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Tier 1</small>
                                <input type="date" className="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Tier 2</small>
                                <input type="date" className="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Tier 3</small>
                                <input type="date" className="form-control" name="" id="" required />
                            </div>
                        </div>

                        <div className="col-md-3 align-items-center">
                            <p>Plan ID</p>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" id="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" name="" id="" required />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" name="" id="" required />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 align-items-center">
                            <p>Miscellaneous Data</p>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="" id="" required />
                            </div>
                        </div>

                        <div className="clearfix mb-3"></div>

                        <div className="col-md-12">
                            <h5 className="mb-2">Provider Verification Options :</h5>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Provider Options</small>
                                <select className="form-select">
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Super Provider Networks</small>
                                <input type="text" className="form-control" name="" id="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12">
                            <h5 className="mb-2">Prescriber Verification Options</h5>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Prescriber Options</small>
                                <select className="form-select">
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Prescriber Options 2</small>
                                <select className="form-select">
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Prescriber Grouping ID</small>
                                <input type="text" className="form-control" name="" id="" required />
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

export function Identification(params) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-md-7 mb-3">
                            <h5 className="mb-2">Customer ID</h5>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Customer ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Customer ID" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>&nbsp;</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Customer ID" readOnly />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-1">Address</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Name</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Name" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Address 1</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Address 1" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Address 2</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Address 2" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>City / State</small>
                                        <select className="form-select">
                                            <option value="">Select City</option>
                                            <option value="">Select City</option>
                                            <option value="">Select City</option>
                                            <option value="">Select City</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Country</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Country" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>ZIP Code</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="ZIP Code" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Phone</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Phone" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Fax</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Fax" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>EDI Address</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="EDI Address" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Contact</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Contact" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Test</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Test" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Type</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Type" readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 mb-3">
                            <h5 className="mb-1">Data Ranges</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Effective Date</small>
                                        <input type="date" className="form-control" name="" id="" placeholder="Address 1" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Termination Date</small>
                                        <input type="date" className="form-control" name="" id="" placeholder="Address 2" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Policy Ann. Month</small>
                                        <select className="form-select">
                                            <option value="">Policy Ann. Month</option>
                                            <option value="">Select City</option>
                                            <option value="">Select City</option>
                                            <option value="">Select City</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Policy Ann. Day</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Enter" readOnly />
                                    </div>
                                </div>
                            </div>
                            <h5 className="mb-1">Census</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group mb-2">
                                        <small>Census Date</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Census Date" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Active Contracts</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Active Contracts" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Active Memebers</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Active Memebers" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Termed Contracts</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Termed Contracts" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Termed Memebers</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Termed Memebers" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Pending Contracts</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Pending Contracts" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Pending Memebers</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Pending Members" readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Marketing Group</small>
                                <input type="text" className="form-control" name="" id="" placeholder="Pending Members" required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Anniversary Date</small>
                                <input type="date" className="form-control" name="" id="" placeholder="Pending Members" required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Plan Classification</small>
                                <select className="form-select">
                                    <option value="">Choose plan</option>
                                    <option value="">Select City</option>
                                    <option value="">Select City</option>
                                    <option value="">Select City</option>
                                </select>
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