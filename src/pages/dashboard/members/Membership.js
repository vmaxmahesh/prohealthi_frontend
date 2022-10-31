import React from 'react';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from '../../../shared/Footer';

export default function Membership() {
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




            <div>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {/* <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#byid" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Search by ID</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#byname" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Search by Name</button> */}
                    <Link className={'nav-link' + (currentpath == 'search-by-id' ? ' active' : '') } to='search-by-id'>Search by ID</Link>
                    <Link className={'nav-link' + (currentpath == 'search-by-name' ? ' active' : '') } to='search-by-name'>Search by Name</Link>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    {/* <div className="tab-pane fade show active" id="byid" role="tabpanel" aria-labelledby="nav-home-tab">
                        
                    </div>
                    <div className="tab-pane fade" id="byname" role="tabpanel" aria-labelledby="nav-profile-tab">
                        
                    </div> */}
                    <Outlet />
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th width="20%">Customer</th>
                            <th width="20%">Client</th>
                            <th width="20%">Group</th>
                            <th width="20%">Member ID</th>
                            <th width="20%">Person Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5" className="p-0">
                                <table className="table table-borderless table-striped ">
                                    <tr>
                                        <td width="20%">NHF</td>
                                        <td width="20%">NHF</td>
                                        <td width="20%">All_Mild</td>
                                        <td width="20%">123456</td>
                                        <td width="20%">0001</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" width="60%">
                                            <div className="row">
                                                <div className="col-md-4 mb-2">
                                                    <small>First Name</small>
                                                    <p>AARONS</p>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <small>Last Name</small>
                                                    <p>Derrick</p>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <small>Date of Birth</small>
                                                    <p>11-05-1996 </p>
                                                </div>
                                                <div className="col-md-4">
                                                    <small>Effective Date</small>
                                                    <p>12-05-1994</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <small>Termination Date</small>
                                                    <p>14-09-2055</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <small>Plan ID</small>
                                                    <p>--</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td width="20%">
                                            <div className="col-md-12 mb-2">
                                                <small>Eligibility</small>
                                                <p>Member Only (Individual)</p>
                                            </div>
                                            <div className="col-md-12">
                                                <small>Eligibility</small>
                                                <p>Member Only (Individual)</p>
                                            </div>
                                        </td>
                                        <td width="20%">NHF</td>
                                        <td width="20%">All_Mild</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" width="60%">
                                            <div className="row">
                                                <div className="col-md-4 mb-2">
                                                    <small>First Name</small>
                                                    <p>AARONS</p>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <small>Last Name</small>
                                                    <p>Derrick</p>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <small>Date of Birth</small>
                                                    <p>11-05-1996 </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td width="20%">
                                            <div className="col-md-12 mb-2">
                                                <small>Eligibility</small>
                                                <p>Member Only (Individual)</p>
                                            </div>
                                        </td>
                                        <td width="20%">NHF</td>
                                        <td width="20%">All_Mild</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="row">
                    <div className="col-md-6 rows_count">Showing 2 to 10 Entries</div>
                    <div className="col-md-6 rows_count text-end">
                        <ul id="pagination">
                            <li><a href="#">«</a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#" className="active">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li><a href="#">6</a></li>
                            <li><a href="#">7</a></li>
                            <li><a href="#">»</a></li>
                        </ul>
                    </div>
                </div>
            </div>



            <Footer/>
        </>
    );
}

export function SearchById(params) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <form method="" action="member.html">
                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-group">
                                    <small>Member ID</small>
                                    <input type="text" className="form-control" placeholder="Customer ID" name="" id="" required="" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <small>Customer ID</small>
                                    <input type="text" className="form-control" placeholder="Customer Name" name="" id="" required="" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <small>Client ID</small>
                                    <input type="text" className="form-control" placeholder="Client ID" name="" id="" required="" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <small>Group ID</small>
                                    <input type="text" className="form-control" placeholder="Client Name" name="" id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <small>&nbsp;</small><br />
                                    <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: '100%', fontSize: '12px' }}>Search</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}


export function SearchByName(params) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <form method="" action="">
                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-group">
                                    <small>Last Name</small>
                                    <input type="text" className="form-control" placeholder="Customer ID" name="" id="" required="" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <small>First Name</small>
                                    <input type="text" className="form-control" placeholder="Customer Name" name="" id="" required="" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <small>Date of Birth</small>
                                    <input type="text" className="form-control" placeholder="Client ID" name="" id="" required="" />
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="form-group">
                                    <small>&nbsp;</small><br />
                                    <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: '100%', fontSize: '12px' }}>Search</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}