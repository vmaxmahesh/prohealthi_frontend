
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

export default function Clientgroup() {
    const location = useLocation();
    const scollToRef = useRef();
    const currentpath = location.pathname.split('/').pop();
    const [clientgroup, setClientgroup] = useState([]);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [clientGrouplist, setClientGrouplist] = useState([]);

    const searchClientGroup = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/clientgroup/get?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setClientGrouplist([]);
                    return Promise.reject(error);

                } else {
                    setClientGrouplist(data.data);
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getClientGroup = (clientgroupid) => {
        // console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/clientgroup/get/${clientgroupid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setClientgroup(data.data);
                    scollToRef.current.scrollIntoView()
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        reset(clientgroup)
    }, [clientgroup]);


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
                            {/* <h5 className="mb-2">Search Client Group</h5> */}
                        </div>
                        <div className="row mb-4">
                            <div className="col mb-2">
                                <div className="form-group">
                                    <small>Customer ID/ Client ID/ Group ID/ Group Name</small>
                                    {/* <input type="text" className="form-control" placeholder="Customer ID" name="" id="" /> */}
                                    {/* <a href=""><span className="fa fa-search form-icon"></span></a> */}
                                    <input type="text" onKeyUp={(e) => searchClientGroup(e)} className="form-control" placeholder='Start typing Customer ID/Client Id or Group Id ' {...register("customerid")} />
                                </div>
                            </div>
                            {/* <div className="col mb-2">
                                <div className="form-group">
                                    <small>Client ID</small>
                                    <input type="text" className="form-control" placeholder="Client ID" name="" id="" />
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
                            </div> */}

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
                            {/* <table className="table table-striped table-bordered">
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
                            </table> */}

                            <TableBody customers={clientGrouplist} getCustomer={getClientGroup} />

                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="nav nav-tabs" id="nav-tab" role="tablist" ref={scollToRef}>

                    <Link className={'nav-link' + (currentpath == 'identification' ? ' active' : '')} to="identification">Identification</Link>
                    <Link className={'nav-link' + (currentpath == 'strategy' ? ' active' : '')} to="strategy">Strategy</Link>
                    <Link className={'nav-link' + (currentpath == 'eligibility' ? ' active' : '')} to="eligibility">Eligibility</Link>
                    <Link className={'nav-link' + (currentpath == 'indicators' ? ' active' : '')} to="indicators">Indicators</Link>
                    <Link className={'nav-link' + (currentpath == 'charges' ? ' active' : '')} to="charges">Charges/Misc</Link>

                    {/* <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#Identification" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Identification</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Strategy" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Strategy</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Eligibility" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Eligibility</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Indicators" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Indicators</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Charges" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Charges/Misc</button> */}
                </div>
                <div className="tab-content" id="nav-tabContent">

                    <Outlet context={[clientgroup, setClientgroup]} />




                </div>
            </div>
            <Footer />

        </>
    );
}


function TableBody(props) {

    const getCustomer = (customerid) => {
        // console.log(customerid);
        props.getCustomer(customerid);
    }

    const CustomerList = [];
    // for (let i = 0; i < props.customers.length; i++) {
    //     CustomerList.push(<Cutomer customer={props.customers[i]} getCustomer={getCustomer} />);
    // }

    if (props.customers.length > 0) {
        for (let i = 0; i < props.customers.length; i++) {
            CustomerList.push(<TableRow customer={props.customers[i]} getCustomer={getCustomer} />);
        }
    } else {
        CustomerList.push(<NoReacords />);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Client Groups</h5>
                        </div>
                        <div style={{ height: '400px', overflowY: 'scroll' }}>
                            <table className="table  table-bordered" style={{ position: 'relative' }}>
                                <thead className='stickt-thead'>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>Client ID</th>
                                        <th>Group ID</th>
                                        <th>Group Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {CustomerList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

function NoReacords(params) {
    return (
        <>
            <tr style={{ padding: '10px', color: 'red' }}><td colSpan="7">No Records Matches..!</td></tr>
        </>
    )
}

function TableRow(props) {
    return (
        <>
            <tr>
                <td>{props.customer.customer_id}</td>
                <td>{props.customer.client_id}</td>
                <td>{props.customer.client_group_id}</td>
                <td>{props.customer.group_name}</td>
                <td><Button variant="primary" onClick={() => props.getCustomer(props.customer.client_group_id)}>View</Button></td>
            </tr>
        </>
    )
}


export function Charges(params) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [clientgroup, setClientgroup] = useOutletContext();
    const [startDate, setStartDate] = useState(new Date());
    const [afterDate, setAfterDate] = useState(new Date());


    const onSubmit = data => {


        // console.log(Identificationdata);

        const id = clientgroup;
        id['identification'] = data;
        console.log(clientgroup);




    }
    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Other Charges</h5>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Admin Fee</small>
                                    <input type="text" className="form-control" {...register('admin_fee', {
                                        required: true,
                                    })} name="admin_fee" id="" placeholder="" />
                                    {errors.admin_fee?.type === 'required' && <p role="alert" className="notvalid">Admin Fee is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Admin %</small>
                                    <input type="text" className="form-control" {...register('admin_percentage', {
                                        required: true,
                                    })} name="admin_percentage" id="" placeholder="" />
                                    {errors.admin_percentage?.type === 'required' && <p role="alert" className="notvalid">Admin percentage is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>DMR Free</small>
                                    <input type="text" className="form-control" {...register('dmr_fee', {
                                        required: true,
                                    })} name="dmr_fee" id="" placeholder="" />
                                    {errors.admin_percentage?.type === 'required' && <p role="alert" className="notvalid">DMR fee is   required</p>}


                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>UCF Claim Fee</small>
                                    <input type="text" className="form-control" {...register('ucf_fee', {
                                        required: true,
                                    })} name="ucf_fee" id="" placeholder="" />
                                    {errors.ucf_fee?.type === 'required' && <p role="alert" className="notvalid">UCF fee is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Elig Update Fee</small>
                                    <input type="text" className="form-control" name="elig_update" {...register('elig_update', {
                                        required: true,
                                    })} id="" placeholder="" />
                                    {errors.elig_update?.type === 'required' && <p role="alert" className="notvalid">Elig Update Fee is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Prior Auth Fee</small>
                                    <input type="text" className="form-control" name="prior_auth" {...register('prior_auth', {
                                        required: true,
                                    })} id="" placeholder="" />
                                    {errors.elig_update?.type === 'required' && <p role="alert" className="notvalid">Prior Auth  Fee is   required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Exception List Processing</h5>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="Plan" className="d-none" {...register('bypass_plan_ndc', {
                                        required: true,
                                    })} name="bypass_plan_ndc" />
                                    <label for="Plan">Bypass Plan NDC/GPI Exception List Processing</label>
                                    {errors.bypass_plan_ndc?.type === 'required' && <p role="alert" className="notvalid">Bypass Plan NDC/GPI Exception List Processing is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="System" name="bypass_system_ndc" {...register('bypass_system_ndc', {
                                        required: true,
                                    })} className="d-none" />
                                    <label for="System">Bypass System NDC/GPI Exception List Processing</label>
                                    {errors.bypass_system_ndc?.type === 'required' && <p role="alert" className="notvalid">Bypass System NDC/GPI Exception List Processing is   required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Miscellaneous</h5>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Written to First Fill</small>
                                    <input type="text" className="form-control" {...register('number_of_days_from_date', {
                                        required: true,
                                    })} name="number_of_days_from_date" id="" placeholder="" />
                                    {errors.number_of_days_from_date?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Written to First Fill is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Filled to Date Submitted</small>
                                    <input type="text" className="form-control" name="number_of_days_from_date_submitted" {...register('number_of_days_from_date_submitted', {
                                        required: true,
                                    })} id="" placeholder="" />
                                    {errors.number_of_days_from_date_submitted?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Filled to Date Submitted is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Filled to Submitted (Manual)</small>
                                    <input type="text" className="form-control" name="number_of_days_from_date_submitted_manual" {...register('number_of_days_from_date_submitted_manual', {
                                        required: true,
                                    })} id="" placeholder="" />
                                    {errors.number_of_days_from_date_submitted_manual?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Filled to Submitted (Manual) is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from DateFilled to Future Fill Date</small>
                                    <input type="text" className="form-control" name="number_of_days_from_date_tofuture_fill" {...register('number_of_days_from_date_tofuture_fill', {
                                        required: true,
                                    })} id="" placeholder="" />
                                    {errors.number_of_days_from_date_tofuture_fill?.type === 'required' && <p role="alert" className="notvalid">Number of Days from DateFilled to Future Fill Date is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days for Reversal</small>
                                    <input type="text" className="form-control" name="number_of_days_reversal" {...register('number_of_days_reversal', {
                                        required: true,
                                    })} id="" placeholder="" />
                                    {errors.number_of_days_reversal?.type === 'required' && <p role="alert" className="notvalid">Number of Days for Reversal is   required</p>}

                                </div>
                            </div>
                            <div className="clearfix mb-2"></div>
                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="Tax" name="tax_exempty" {...register('tax_exempty', {
                                        required: true,
                                    })} className="d-none" />
                                    <label for="Tax">Tax Exempty Entity</label>
                                    {errors.tax_exempty?.type === 'required' && <p role="alert" className="notvalid">Tax Exempty Entity is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" name='mandatory_u_c' {...register('mandatory_u_c', {
                                        required: true,
                                    })} id="u&amp;c" className="d-none" />
                                    <label for="u&amp;c">Mandatory U and C</label>
                                    {errors.mandatory_u_c?.type === 'required' && <p role="alert" className="notvalid">Mandatory U and C is   required</p>}

                                </div>
                            </div>



                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Major Medical</h5>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <small>SMBPP</small>
                                    <input type="text" className="form-control" {...register('smbpp', {
                                        required: true,
                                    })} name="smbpp" id="" placeholder="" />
                                    {errors.smbpp?.type === 'required' && <p role="alert" className="notvalid">SMBPP is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>RVA List ID</small>
                                <div className="form-group mb-3">
                                    <input type="text" {...register('rva_list_id', {
                                        required: true,
                                    })} className="form-control" name="rva_list_id" id="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                                {errors.rva_list_id?.type === 'required' && <p role="alert" className="notvalid">RVA List ID is   required</p>}

                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Save</button>
                </div>
            </form>
        </>
    )
}

export function Indicators(params) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [clientgroup, setClientgroup] = useOutletContext();
    const [startDate, setStartDate] = useState(new Date());
    const [afterDate, setAfterDate] = useState(new Date());


    const onSubmit = data => {


        // console.log(Identificationdata);

        const id = clientgroup;
        id['identification'] = data;
        console.log(clientgroup);




    }


    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Indicators:</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Accumelated Benifits Ind:</small>
                                <select className="form-select" name="accumulated_benifits" {...register('accumulated_benifits', {
                                    required: true,
                                })}  >
                                    <option value="">--select--</option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                </select>
                                {errors.accumulated_benifits?.type === 'required' && <p role="alert" className="notvalid">Accumelated Benifits Ind field is  required</p>}

                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Secondory Coverage Ind</small>
                                <select className="form-select" name="secondary_coverage" {...register('secondary_coverage', {
                                    required: true,
                                })}>
                                    <option value="">--select--</option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                </select>
                                {errors.secondary_coverage?.type === 'required' && <p role="alert" className="notvalid">Accumelated Benifits Ind field is  required</p>}

                                <p className="input-hint">Family Accumulation By Member ID</p>
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Interim Member Maximums</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Maximum Number Of Transactions Allowed For An Interim..</small>
                                <select className="form-select" {...register("max_no_of_transaction_allowed", {
                                    required: true,
                                })} name='max_no_of_transaction_allowed'>
                                    <option value="">--select-- </option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                    <option value="3">option 3</option>
                                </select>
                                {errors.max_no_of_transaction_allowed?.type === 'required' && <p role="alert" className="notvalid">Maximum Number Of Transactions Allowed For An Interim field  is  required</p>}

                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Maximum Number Of Days That An Interim Member Will Be..</small>
                                <select className="form-select" {...register("max_no_of_days", {
                                    required: true,
                                })} name="max_no_of_days">
                                    <option value="">--select--</option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                    <option value="3">option 3</option>
                                </select>
                                {errors.max_no_of_days?.type === 'required' && <p role="alert" className="notvalid">Maximum Number Of Days That An Interim Member Will Be field is  required</p>}
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Data Entry</h5>
                            </div>
                            <div className="col-md-7 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" name="bypass" id="html1" {...register('bypass', {
                                        required: true,
                                    })} className="d-none" />
                                    <label for="html1">Bypass Member Eligibility DAte Edits Against Customer Effective Dates</label>
                                    {errors.bypass?.type === 'required' && <p role="alert" className="notvalid">Bypass Member Eligibility DAte Edits Against Customer Effective Dates field is  required</p>}

                                </div>
                            </div>

                            <div className="col-md-5 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" {...register('require_person', {
                                        required: true,
                                    })} id="html" name="require_person" className="d-none" />
                                    <label for="html">Require Person code on member data entry</label>
                                    {errors.bypass?.type === 'required' && <p role="alert" className="notvalid">Bypass Member Eligibility DAte Edits Against Customer Effective Dates field is  required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Copy Schedule Override</h5>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <small>Option</small>
                                    <select className="form-select" name="copy_schedule" {...register('copy_schedule', {
                                        required: true,
                                    })}>
                                        <option value="">--select--</option>
                                        <option value="1">option 1</option>
                                        <option value="2">option 2</option>
                                    </select>
                                </div>
                                {errors.copy_schedule?.type === 'required' && <p role="alert" className="notvalid">Copy Schedule Override field is  required</p>}

                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <small>Shedule</small>
                                    <input type="text" className="form-control" name="Shedule" {...register('Shedule', {
                                        required: true,
                                    })} id="" placeholder="" />

                                    {errors.Shedule?.type === 'required' && <p role="alert" className="notvalid">Schedule  field is  required</p>}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button type="submit" className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</button>
                </div>

            </form>
        </>
    )
}

export function Eligibility(params) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [clientgroup, setClientgroup] = useOutletContext();
    const [startDate, setStartDate] = useState(new Date());
    const [afterDate, setAfterDate] = useState(new Date());


    const onSubmit = data => {


        // console.log(Identificationdata);

        const id = clientgroup;
        id['identification'] = data;
        console.log(clientgroup);




    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Load Parameters</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Auto Termination Level</small>
                                <select className="form-select" {...register("auto_termination_level", {
                                    required: true,
                                })} name="auto_termination_level" >
                                    <option value="">--select--</option>
                                    <option value="0">Overlap Allowed Within Database</option>
                                    <option value="1">Automated Termination within client</option>
                                    <option value="2">Automated Termination within Customer</option>
                                    <option value="3">Automated Termination within database</option>
                                    <option value="4">No Automated Termination-Reject-within database</option>

                                </select>
                                {errors.auto_termination_level?.type === 'required' && <p role="alert" className="notvalid">Auto Termination Level field is  required</p>}

                                <p className="input-hint">Overlap Allowed Within Database</p>
                            </div>

                            <div className="col-md-6 mb-2">
                                <small>Eligibility Type</small>
                                <select className="form-select" {...register("eligibility_type", {
                                    required: true,

                                })} name="eligibility_type">
                                    <option value="">--select--</option>
                                    <option value="1">Not Specified </option>
                                    <option value="2"> Individual Member Records Exist</option>
                                    <option value="3">Family Member Records Exist</option>
                                </select>
                                {errors.eligibility_type?.type === 'required' && <p role="alert" className="notvalid">Eligibility Type field is  required</p>}
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Processing Parameters:</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Membership Processing Flag</small>
                                <select className="form-select" {...register("membership_processing_flag", {
                                    required: true,
                                })} name="membership_processing_flag">
                                    <option value="">--select--</option>
                                    <option value="1">Membership Processing Will Be Done</option>
                                </select>
                                {errors.membership_processing_flag?.type === 'required' && <p role="alert" className="notvalid">Membership Processing Flag field is  required</p>}
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Verification Options:</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Eligibility Options</small>
                                <select className="form-select" {...register("eligibility_options", {
                                    required: true,
                                })} name="eligibility_options">
                                    <option value="">--Select--</option>
                                    <option value="0">Not Specified</option>
                                    <option value="1">No Eligibility Check</option>
                                    <option value="2">Validate Patent by PIN</option>
                                    <option value="3">Check Eligibility By Member</option>
                                    <option value="4">Check Eligibility By Birth Year</option>
                                    <option value="5">Check Eligibility By Birth Month and Year</option>
                                    <option value="6">Check Eligibility By Member Date of Birth</option>
                                    <option value="7">Check Eligibility By Member Gender</option>
                                    <option value="8">Check Eligibility By Member Date of Birth & Gender</option>


                                </select>
                                {errors.eligibility_options?.type === 'required' && <p role="alert" className="notvalid">Eligibility Options is  required</p>}
                                <p className="input-hint">Check Eligibility By Member:</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Eligibility Validation List ID</small>
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control"  {...register("eligibility_validation_list", {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,

                                    })} name="eligibility_validation_list" id="" required="" />

                                    <a href="" data-bs-toggle="modal" data-bs-target="#eligibilityidModal"><span className="fa fa-search form-icon"></span></a>

                                </div>
                                {errors.eligibility_validation_list?.type === 'required' && <p role="alert" className="notvalid">Eligibility Validation List ID is  required</p>}
                                {errors.eligibility_validation_list?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Change Logging</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Eligibility Change Log Indicator</small>
                                <select className="form-select" {...register("eligibility_change_log_indicator", {
                                    required: true,
                                })} name="eligibility_change_log_indicator">
                                    <option value="">--select--</option>
                                    <option value="1">Not Specified</option>
                                    <option value="2">Member Record changes will NOT be logged </option>
                                    <option value="3">Member Record changes will be logged</option>
                                </select>
                            </div>
                            {errors.eligibility_change_log_indicator?.type === 'required' && <p role="alert" className="notvalid">Eligibility Change Log Indicator</p>}

                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</button>
                </div>
            </form>
        </>
    )
}

export function Strategy(params) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [clientgroup, setClientgroup] = useOutletContext();
    const [startDate, setStartDate] = useState(new Date());
    const [afterDate, setAfterDate] = useState(new Date());


    const onSubmit = data => {


        // console.log(Identificationdata);

        const id = clientgroup;
        id['identification'] = data;
        console.log(clientgroup);




    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-md-11 mb-1">
                                <h5 className="mb-2">Coverage Strategy</h5>
                            </div>
                            <div className="col-md-1 mb-1">
                                <button className="btn btn-theme btn-sm p-1" style={{ width: '100%' }}>Add <i className="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-md-3 align-items-center">
                                <p className="mt-2">Cov Eff Date:</p>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <small>Tier 1</small>
                                    <input type="date" className="form-control" name="tier_1" {...register('tier_1', {
                                        required: true,
                                    })} id="" />
                                    {errors.tier_1?.type === 'required' && <p role="alert" className="notvalid">Tier 1 Date is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <small>Tier 2</small>
                                    <input type="date" className="form-control" name="tier_2" {...register('tier_2', {
                                        required: true
                                    })} id="" />
                                    {errors.tier_2?.type === 'required' && <p role="alert" className="notvalid">Tier 2 Date is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <small>Tier 3</small>
                                    <input type="date" className="form-control" name="tier_2" {...register('tier_3', {
                                        required: true
                                    })} id="" />
                                    {errors.tier_3?.type === 'required' && <p role="alert" className="notvalid">Tier 3 Date is  required</p>}
                                </div>
                            </div>

                            <div className="col-md-3 align-items-center">
                                <p>Plan ID</p>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" {...register('plan_id_1', {
                                        required: true,
                                    })} name="plan_id_1" id="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                                {errors.plan_id_1?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" {...register('plan_id_2', {
                                            required: true,
                                        })} name="plan_id_2" id="" />                                        <a href=""><span className="fa fa-search form-icon"></span></a>

                                    </div>
                                    {errors.plan_id_2?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" {...register('plan_id_3', {
                                            required: true,
                                        })} name="plan_id_3" id="" />                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                    {errors.plan_id_2?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                                </div>
                            </div>

                            <div className="col-md-3 align-items-center">
                                <p>Miscellaneous Data</p>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" {...register('miscellaneous_data_1', {
                                        required: true,
                                    })} className="form-control" name="miscellaneous_data_1" id="" />
                                    {errors.miscellaneous_data_1?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous data  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" {...register('miscellaneous_data_2', {
                                        required: true,
                                    })} className="form-control" name="miscellaneous_data_2" id="" />
                                    {errors.miscellaneous_data_2?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous data  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" name="" id="" />
                                    {errors.miscellaneous_data_2?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous data  is  required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12">
                                <h5 className="mb-2">Provider Verification Options :</h5>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <small>Provider Options</small>
                                    <select className="form-select" {...register("provider_vefification_option", {
                                        required: true
                                    })} name="provider_vefification_option">
                                        <option value="">--select--</option>
                                        <option value="1">No Provider Check</option>
                                        <option value="2">Validate Provider Format</option>
                                        <option value="3">Provider must exist within Provider Master</option>
                                        <option value="4">Must exist in Provider Network</option>
                                        <option value="5">Validate Provider In/Out of Network</option>
                                    </select>
                                    {errors.provider_vefification_option?.type === 'required' && <p role="alert" className="notvalid">Provider Options is  required</p>}
                                </div>
                                {errors.provider_options?.type === 'required' && <p role="alert" className="notvalid">Provider Verification Options  is  required</p>}

                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <small>Super Provider Networks</small>
                                    <input type="text" className="form-control" name="super_provider_network" id="" {...register('super_provider_network', {
                                        required: true,
                                    })} />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                    {errors.super_provider_network?.type === 'required' && <p role="alert" className="notvalid">Super Provider Networks  is  required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12">
                                <h5 className="mb-2">Prescriber Verification Options</h5>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <small>Prescriber Options</small>
                                    <select className="form-select" {...register("Prescriber_Verification_Options_1", {
                                        required: true,
                                    })} name="Prescriber_Verification_Options_1" >
                                        <option value="">--select--</option>
                                        <option value="1">None</option>
                                        <option value="2">Validate DEA Code</option>
                                        <option value="3">primary Prescriber Validation</option>
                                        <option value="4">Must Exist in Prescriber Master</option>

                                    </select>
                                    {errors.Prescriber_Verification_Options_1?.type === 'required' && <p role="alert" className="notvalid">Prescriber Options is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <small>Prescriber Options 2</small>
                                    <select className="form-select" {...register("Prescriber_Verification_Options_2", {
                                        required: true,
                                    })} name="Prescriber_Verification_Options_2">
                                        <option value="">--select--</option>
                                        <option value="1">None</option>
                                        <option value="2">Validate DEA Code</option>
                                        <option value="3">primary Prescriber Validation</option>
                                        <option value="4">Must Exist in Prescriber Master</option>
                                    </select>
                                    {errors.Prescriber_Verification_Options_2?.type === 'required' && <p role="alert" className="notvalid">Prescriber Options is   required</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <small>Prescriber Grouping ID</small>
                                    <input type="text"  {...register('presciber_grouping_id', {
                                        required: true,
                                    })} className="form-control" name="presciber_grouping_id" id="" />
                                    {errors.presciber_grouping_id?.type === 'required' && <p role="alert" className="notvalid">Prescriber Grouping id   is  required</p>}

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</button>
                </div>
            </form>
        </>
    )
}

export function Identification(params) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [clientgroup, setClientgroup] = useOutletContext();
    const [startDate, setStartDate] = useState(new Date());
    const [afterDate, setAfterDate] = useState(new Date());


    const onSubmit = data => {


        // console.log(Identificationdata);

        const id = clientgroup;
        id['identification'] = data;
        console.log(clientgroup);




    }

    useEffect(() => { reset(clientgroup) }, [clientgroup]);



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-md-7 mb-3">
                                <h5 className="mb-2">Customer ID</h5>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group mb-2">
                                            <small>Customer ID</small>
                                            <input {...register('customer_id', {
                                                required: true,
                                            })} type="text" className="form-control" name="customer_id" id="" placeholder="Customer ID" />

                                            {errors.customer_id?.type === 'required' && <p role="alert" className="notvalid">customer id   required</p>}

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
                                            <input type="text" className="form-control" {...register('group_name', {
                                                required: true,
                                            })} name="group_name" id="" placeholder="Name" />
                                            {errors.group_name?.type === 'required' && <p role="alert" className="notvalid">customer name is   required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Address 1</small>
                                            <input type="text" className="form-control" {...register('address_1', {
                                                required: true,
                                            })} name="address_1" id="" placeholder="Address 1" />
                                            {errors.address_1?.type === 'required' && <p role="alert" className="notvalid">address is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Address 2</small>
                                            <input type="text" className="form-control" {...register('address_2', {
                                                required: true,
                                            })} name="address_2" id="" placeholder="Address 2" />
                                            {errors.address_2?.type === 'required' && <p role="alert" className="notvalid">address is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>City / State</small>
                                            <select className="form-select" {...register('city', {
                                                required: true,
                                            })} name="city">
                                                <option value="">Select City</option>
                                                <option value="1">Select City</option>
                                                <option value="2">Select City</option>
                                                <option value="3">Select City</option>
                                            </select>
                                        </div>
                                        {errors.city?.type === 'required' && <p role="alert" className="notvalid">city is  required</p>}

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Country</small>
                                            <input type="text" {...register('country', {
                                                required: true,
                                            })} className="form-control" name="country" id="" placeholder="Country" />
                                            {errors.country?.type === 'required' && <p role="alert" className="notvalid">Country is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>ZIP Code</small>
                                            <input type="text" {...register('zipcode', {
                                                required: true,
                                            })} className="form-control" name="zipcode" id="" placeholder="ZIP Code" />
                                            {errors.zipcode?.type === 'required' && <p role="alert" className="notvalid">Zip code  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Phone</small>
                                            <input {...register('phone', {
                                                required: true,
                                            })} type="text" className="form-control" name="phone" id="" placeholder="Phone" />
                                            {errors.phone?.type === 'required' && <p role="alert" className="notvalid">phone  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Fax</small>
                                            <input type="text" {...register('fax', {
                                                required: true,
                                            })} className="form-control" name="fax" id="" placeholder="Fax" />
                                            {errors.phone?.type === 'required' && <p role="alert" className="notvalid">fax  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>EDI Address</small>
                                            <input type="text" {...register('edi_address', {
                                                required: true,
                                            })} className="form-control" name="edi_address" id="" placeholder="EDI Address" />
                                            {errors.edi_address?.type === 'required' && <p role="alert" className="notvalid">EDI Address is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Contact</small>
                                            <input  {...register('contact', {
                                                required: true,
                                            })} type="text" className="form-control" name="contact" id="" placeholder="Contact" />
                                            {errors.contact?.type === 'required' && <p role="alert" className="notvalid">Contact is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Test</small>
                                            <input {...register('test', {
                                                required: true,
                                            })} type="text" className="form-control" name="test" id="" placeholder="Test" />
                                            {errors.contact?.type === 'required' && <p role="alert" className="notvalid">Test is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Type</small>
                                            <input type="text"  {...register('type', {
                                                required: true,
                                            })} className="form-control" name="type" id="" placeholder="Type" />
                                            {errors.type?.type === 'required' && <p role="alert" className="notvalid">Type is  required</p>}

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
                                            <input type="date" className="form-control"  {...register('effective_date', {
                                                required: true,
                                            })} name="effective_date" id="" placeholder="Address 1" />
                                            {errors.effective_date?.type === 'required' && <p role="alert" className="notvalid">Effective Date is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termination Date</small>
                                            <input {...register('termination_date', {
                                                required: true,
                                            })} type="date" className="form-control" name="termination_date" id="" placeholder="Address 2" />
                                            {errors.termination_date?.type === 'required' && <p role="alert" className="notvalid">Termination date is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Policy Ann. Month</small>
                                            <select className="form-select"  {...register('policy_name_month', {
                                                required: true,
                                            })} name="policy_name_month" >
                                                <option value="">Policy Ann. Month</option>
                                                <option value="">Select City</option>
                                                <option value="">Select City</option>
                                                <option value="">Select City</option>
                                            </select>
                                            {errors.policy_name_month?.type === 'required' && <p role="alert" className="notvalid">Policy Ann. Month is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Policy Ann. Day</small>
                                            <input type="text" className="form-control" name="policy_ann_day" {...register('policy_ann_day', {
                                                required: true,
                                            })} id="" placeholder="Enter" />
                                            {errors.policy_ann_day?.type === 'required' && <p role="alert" className="notvalid">Policy Ann. Day is  required</p>}

                                        </div>
                                    </div>
                                </div>
                                <h5 className="mb-1">Census</h5>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group mb-2">
                                            <small>Census Date</small>
                                            <input type="text" {...register('census', {
                                                required: true,
                                            })} className="form-control" name="census" id="" placeholder="Census Date" />

                                            {errors.census?.type === 'required' && <p role="alert" className="notvalid">Census Date is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Active Contracts</small>
                                            <input type="text" className="form-control"  {...register('active_contracts', {
                                                required: true,
                                            })} name="active_contracts" id="" placeholder="Active Contracts" />
                                            {errors.active_contracts?.type === 'required' && <p role="alert" className="notvalid">Active Contracts is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Active Memebers</small>
                                            <input type="text" className="form-control" name="active_members" {...register('active_members', {
                                                required: true,
                                            })} id="" placeholder="Active Memebers" />
                                            {errors.active_members?.type === 'required' && <p role="alert" className="notvalid">Active Memebers is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termed Contracts</small>
                                            <input type="text" className="form-control" {...register('termed_contracts', {
                                                required: true,
                                            })} name="termed_contracts" id="" placeholder="Termed Contracts" />
                                            {errors.termed_contracts?.type === 'required' && <p role="alert" className="notvalid">Termed  Contracts is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termed Memebers</small>
                                            <input type="text" className="form-control" {...register('termed_members', {
                                                required: true,
                                            })} name="termed_members" id="" placeholder="Termed Memebers" />

                                            {errors.termed_members?.type === 'required' && <p role="alert" className="notvalid">Termed  Memebers is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Pending Contracts</small>
                                            <input type="text" className="form-control" {...register('pending_contracts', {
                                                required: true,
                                            })} name="pending_contracts" id="" placeholder="Pending Contracts" />
                                            {errors.pending_contracts?.type === 'required' && <p role="alert" className="notvalid">Pending Contracts is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Pending Memebers</small>
                                            <input type="text" {...register('pending_members', {
                                                required: true,
                                            })} className="form-control" name="pending_members" id="" placeholder="Pending Members" />
                                            {errors.pending_members?.type === 'required' && <p role="alert" className="notvalid">pending members   is  required</p>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Marketing Group</small>
                                    <input  {...register('marketing_group', {
                                        required: true,
                                    })} type="text" className="form-control" name="marketing_group" id="" placeholder="Pending Members" />
                                    {errors.marketing_group?.type === 'required' && <p role="alert" className="notvalid">Marketing Group is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Anniversary Date</small>
                                    <input type="date" className="form-control" {...register('anniversary_date', {
                                        required: true,
                                    })} name="anniversary_date" id="" placeholder="Pending Members" />
                                    {errors.marketing_group?.type === 'required' && <p role="alert" className="notvalid">Anniversary Date is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Plan Classification</small>
                                    <select className="form-select" name="plan_classification" {...register('plan_classification', {
                                        required: true,
                                    })}>
                                        <option value="">Choose plan</option>
                                        <option value="">Select City</option>
                                        <option value="">Select City</option>
                                        <option value="">Select City</option>
                                    </select>
                                    {errors.plan_classification?.type === 'required' && <p role="alert" className="notvalid">plan classification  is  required</p>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</button>
                </div>
            </form>

        </>
    )
}