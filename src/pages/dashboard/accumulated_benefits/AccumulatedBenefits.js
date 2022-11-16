import React from 'react';
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';

export default function AccumulatedBenefits() {
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Accumulated Benefits</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Accumulated Benefit</a></li>
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
            <SearchAccumulatedBenefit />
        </>
    )
}

function SearchAccumulatedBenefit() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Accumulated Benefits</small>
                                <input type="text" className="form-control" placeholder='Start typing accumulated benefits validation plan/deductible name/ NDC exclusion name/ GPI exclisuion name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AccumulatedBenefitList />
        </>
    )
}

function AccumulatedBenefitList() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Accumulated Benefits List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <div className="col-md-12">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Accum Benefits Plan</th>
                                                    <th>Plan Accum Deductible Name</th>
                                                    <th>NDC Exclusion List Name</th>
                                                    <th>GPI Exclusion List Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AccumulatedBenefitForm />
        </>
    )
}

function AccumulatedBenefitForm() {
    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];
    return (
        <>
            <div className="data">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <Link to="exclusion-limitation" className={'nav-link' + (currentpath == 'exclusion-limitation' ? ' active' : '')}>Exclusion Limitation</Link>
                    <Link to="deductible" className={'nav-link' + (currentpath == 'deductible' ? ' active' : '')}>Deductible</Link>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export function ExclusionLimitation() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mt-3 mb-3">
                        <h5 className="mb-2">Exclusion Limitation</h5>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Plan ID:</small>
                                <input type="text" className="form-control" name="" id="" placeholder="Source " />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Name</small>
                                <input type="text" className="form-control" name="" id="" placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Grouping Type:</small>
                                <select className="form-select">
                                    <option>Customer</option>
                                    <option>Client</option>
                                    <option>Group</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Benefit Grouping Type:</small>
                                <select className="form-select">
                                    <option>Benefit List ID</option>
                                    <option>Client</option>
                                    <option>Group</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <small>Price Schedule: </small>
                            <div className="form-group mb-2">
                                <input type="text" className="form-control" name="" id="" placeholder="Percentage" />
                            </div>
                        </div>

                        <div className="col-md-2 mt-4">
                            <div className="">
                                <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function Deductible() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-md-12">
                            <h5 className="mb-2">Deductible</h5>



                            <div className="row mt-4 mb-3 comparis-ionn">
                                <div className=""><span>Deduction Information</span></div>

                                <div className="col-md-4"></div>
                                <div className="col-md-4 text-center mb-2">Individual</div>
                                <div className="col-md-4 text-center mb-2">Family</div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Max Rxs Per: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Max Rx Action: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select">
                                        <option>1</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select">
                                        <option>1</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Max Rx Copay Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Deductible: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Out of Amount: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>


                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Out of Pocket Action: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select">
                                        <option>1</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select">
                                        <option>1</option>
                                    </select>
                                </div>


                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Out of Pocket Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>


                                <hr />



                                <div className="col-md-4">
                                    <p><b>Tier 1</b></p>
                                    <div className="form-group mb-2">
                                        <p>Benefit: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" name="" id="" placeholder="$10000" />
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" name="" id="" placeholder="" />
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Action: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select">
                                        <option>Add Maximum Over Benefit Amount To be Copay</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select">
                                        <option>1</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Price Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Copay Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>


                                <hr />



                                <div className="col-md-4">
                                    <p><b>Tier 2</b></p>
                                    <div className="form-group mb-2">
                                        <p>Benefit: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" name="" id="" placeholder="$10000" />
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" name="" id="" placeholder="" />
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Action: </p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <select className="form-select">
                                        <option>Add Maximum Over Benefit Amount To be Copay</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <select className="form-select">
                                        <option>1</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Price Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Copay Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="" id="" placeholder="" />
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