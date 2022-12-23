import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

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
                            <li><a href="">Membership Data</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Zip Codes</a></li>
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
                    {/* <General />
                    <Optional /> */}
                    {/* <GeneralTable /> */}
                </div>
            </div>

        </>
    );
}

export function General(props) {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const searchSubmit = (searchFormData) => {
        console.log(searchFormData);

        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(searchFormData)
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/claim-history/search`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    return (
        <>

            <div className="col-md-12 mb-2">
                <h5>Criteria</h5>
            </div>
            <form onSubmit={handleSubmit(searchSubmit)}>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Cardholder ID</small>
                            <input type="text" className="form-control" {...register("cardholder_id")} />
                        </div>
                    </div>
                    <div className="col-md-2 mb-3">
                        <div className="form-group">
                            <small>Person Code</small>
                            <input type="text" className="form-control" {...register("person_code")} />
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Provider ID</small>
                            <input type="text" className="form-control" {...register("provider_id")} />
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Pin</small>
                            <input type="text" className="form-control" {...register("patient_pin_number")} />
                        </div>
                    </div>
                </div>


                <div className="row mb-3">
                    <div className="col-md-12 mb-2">
                        <h5>Date Range</h5>
                    </div>
                    <div className="col-md-6 mb-2">
                        <input type="radio" value="date_filled" {...register("date_type")}/> Date of Service from
                         <input type="date" name="" className="form-control" {...register("from_date")}/>
                    </div>
                    <div className="col-md-6 mb-2">
                        <input type="radio" value="date_submitted" {...register("date_type")}/> Date of Submitted to
                         <input type="date" name="" className="form-control" {...register("to_date")}/>
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
                    <button type='submit' className="btn btn-info">Search</button>
                </div>
            </form>

            <GeneralTable />
        </>
    );
}

function GeneralTable() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2"></h5>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ height: "700px", overflowY: "scroll" }}>
                                <table className="table  table-bordered">
                                    <thead className='stickt-thead'>
                                        <tr>
                                            <th>Date of SVC</th>
                                            <th>Provider ID</th>
                                            <th>Claim Ref#</th>
                                            <th>RX#</th>
                                            <th>New Refil</th>
                                            <th>Procedure Code</th>
                                            <th>Label Name/ Procedure Description</th>
                                            <th>Cardholder ID</th>
                                            <th>Person Code</th>
                                            <th>Total $</th>
                                            <th>Status</th>
                                            <th>Bin #</th>
                                            <th>Plan ID</th>
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
        </>
    )
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