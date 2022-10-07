import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';

export default function Client() {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();

    const [count, setCount] = useState(null);

    const [client, setClient] = useState([]);



    const getSearch = () => {

        setCount(1);


    };

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
                <h4 style={{ fontWeight: '600' }}>Search Client</h4>
            </div>

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <form method="" action="">
                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-group">
                                    <small>Customer ID</small>
                                    <input type="text" className="form-control" placeholder="Customer ID" name="" id="" required />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <small>Customer Name</small>
                                    <input type="text" className="form-control" placeholder="Customer Name" name="" id="" required />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <small>Client ID</small>
                                    <input type="text" className="form-control" placeholder="Client ID" name="" id="" required />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <small>Client Name</small>
                                    <input type="text" className="form-control" placeholder="Client Name" name="" id="" required />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <small>&nbsp;</small><br />
                                    <button type="submit" onClick={getSearch} className="btn m-0 p-2 btn-theme" style={{ width: '100%', fontSize: '12px' }}>Search</button>


                                    {/* <button  type="submit"  >show table</button> */}



                                </div>
                            </div>
                        </div>
                    </form>


                    {count && <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>Customer Name</th>
                                        <th>Client ID</th>
                                        <th>Client Name</th>
                                        <th>Eff. Date</th>
                                        <th>Term Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Jamrech</td>
                                        <td>Jamica Mechaidise</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>06-10-2022</td>
                                        <td>06-12-2040</td>
                                        <td><a href="" className="btn btn-sm btn-danger Show"><i className="fa fa-eye"></i> View</a></td>
                                    </tr>
                                    <tr>
                                        <td>Jamrech</td>
                                        <td>Jamica Mechaidise</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>06-10-2022</td>
                                        <td>06-12-2040</td>
                                        <td><a href="" className="Show"><i className="fa fa-eye"></i></a></td>
                                    </tr>
                                    <tr>
                                        <td>Jamrech</td>
                                        <td>Jamica Mechaidise</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>06-10-2022</td>
                                        <td>06-12-2040</td>
                                        <td><a href="" className="btn btn-sm btn-warning Show"><i className="fa fa-eye"></i> View</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>}



                </div>
            </div>


            <div >
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <Link className={'nav-link' + (currentpath == 'identification' ? ' active' : '')} to='identification'>Identification</Link>
                    <Link className={'nav-link' + (currentpath == 'strategy' ? ' active' : '')} to='strategy'>Strategy</Link>
                    <Link className={'nav-link' + (currentpath == 'eligibility' ? ' active' : '')} to='eligibility'>Eligibility</Link>
                    <Link className={'nav-link' + (currentpath == 'indicators' ? ' active' : '')} to='indicators'>Indicators</Link>


                </div>

                <div className="tab-content" id="nav-tabContent">
                    <Outlet context={[client, setClient]} />




                    {/* <div className="tab-pane fade show active" id="Identification" role="tabpanel" aria-labelledby="nav-home-tab">

                    </div>
                    <div className="tab-pane fade" id="Strategy" role="tabpanel" aria-labelledby="nav-profile-tab">

                    </div>
                    <div className="tab-pane fade" id="Eligibility" role="tabpanel" aria-labelledby="nav-contact-tab">

                    </div>
                    <div className="tab-pane fade" id="Indicators" role="tabpanel" aria-labelledby="nav-contact-tab">
                        {/* // indicators */}
                    {/* </div> */}

                </div>
            </div>

            <Footer />

        </>
    );

}

export function Indicators(params) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [client, setClient] = useOutletContext();


    const onSubmit = data => {

        var Indicatorsid = client;
        Indicatorsid['Indicators'] = data;
        setClient(Indicatorsid);
        console.log(client);

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
                                <small>Secondary Coverage indicator</small>
                                <select className="form-select" {...register("Secondary_Coverage_indicator", {
                                    required: true,
                                })} name="Secondary_Coverage_indicator">
                                    <option value="">--select--</option>
                                    <option value="1">Not applicable</option>
                                    <option value="2">Reject transactions</option>
                                    <option value="3">pay and report transactions</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Accumulated Benefits Indicator</small>
                                <select className="form-select" {...register("Accumulated_Benefits_Indicator", {
                                    required: true,
                                })} name="Accumulated_Benefits_Indicator">
                                    <option value="">--select--</option>
                                    <option value="1">Not Specified</option>
                                    <option value="2">Family Accumulation By Patient PIN Number </option>
                                    <option value="3">Family Accumulation By Member ID</option>
                                </select>
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
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Data Entry</h5>
                            </div>
                            <div className="col-md-12 mb-1">
                                <div className="form-group">
                                <input type="checkbox" name="Bypass_Member_Eligibility" {...register("Bypass_Member_Eligibility", {
                                        required: true,
                                    })} id="html" className="d-none" />
                                    {errors.Bypass_Member_Eligibility?.type === 'required' && <p role="alert" className="notvalid">Bypass Member Eligibility Date Edits Against Customer Effective Dates is   required</p>}                                    <label for="html">Bypass Member Eligibility DAte Edits Against Customer Effective Dates</label>
                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Miscellaneous</h5>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Written to First Fill</small>
                                    <input type="text" className="form-control" name="no_of_days_to_first_fill" {...register("no_of_days_to_first_fill")} id="" placeholder="" required="" />

                                    {errors.Bypass_Member_Eligibility?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Written to First Fill is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Filled to Date Submitted</small>
                                    <input type="text" className="form-control" {...register("no_of_days_to_first_fill_submit", {
                                        required: true,
                                    })} name="no_of_days_to_first_fill_submit" id="" placeholder="" required="" />
                                    {errors.no_of_days_to_first_fill_submit?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Filled to Date Submitted field  is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Filled to Submitted (Manual)</small>
                                    <input type="text" className="form-control"  {...register("no_of_days_to_first_fill_submit_manual", {
                                        required: true,
                                    })} name="no_of_days_to_first_fill_submit_manual" id="" placeholder="" required="" />
                                    {errors.no_of_days_to_first_fill_submit_manual?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Filled to Submitted (Manual) field  is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from DateFilled to Future Fill Date</small>
                                    <input type="text" className="form-control"  {...register("no_of_days_from_date_filled_to_future", {
                                        required: true,
                                    })} name="no_of_days_from_date_filled_to_future" id="" placeholder="" required="" />
                                    {errors.no_of_days_from_date_filled_to_future?.type === 'required' && <p role="alert" className="notvalid">Number of Days from DateFilled to Future Fill Date field  is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days for Reversal</small>
                                    <input type="text" className="form-control" name="no_of_days_reversal" {...register("no_of_days_reversal", {
                                        required: true,
                                    })} id="" placeholder="" required="" />
                                    {errors.no_of_days_reversal?.type === 'required' && <p role="alert" className="notvalid">Number of Days for Reversal field  is   required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                <input type="checkbox" id="Tax" {...register("tax_exempty_entity", {
                                        required: true,
                                    })} name="tax_exempty_entity" className="d-none" />
                                    <label for="Tax">Tax Exempty Entity</label>
                                    {errors.tax_exempty_entity?.type === 'required' && <p role="alert" className="notvalid">Tax Exempty Entity field  is   required</p>}
                                </div>
                            </div>

                            <div className="col-md-4 mb-1">
                            <div className="form-group">
                                    <input type="checkbox" id="u&c" {...register("mandatory_u_c", {
                                        required: true,
                                    })} name="mandatory_u_c" className="d-none" />
                                    <label for="u&c">Mandatory U and C</label>

                                </div>
                                {errors.mandatory_u_c?.type === 'required' && <p role="alert" className="notvalid">Mandatory U and C  is   required</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button type="submit" className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Submit</button>
                </div>
            </form>
        </>
    )
}

export function Eligibility(params) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [client, setClient] = useOutletContext();



    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm({
        mode: "onBlur",
    });


    const successbtnstyle = {
        float: 'right'
    };

    const searchSubmit = data => {


        alert('mahesh');

    }



    const onSubmit = data => {

        // console.log(data);
        var Eligibilitystatid = client;
        Eligibilitystatid['Eligibility'] = data;
        setClient(Eligibilitystatid);
        console.log(client);

    }

    return (
        <>
         <form key={1} onSubmit={handleSubmit2(searchSubmit)}>



<div class="modal fade" id="eligibilityidModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Search Eligibility Validation Lists</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div className='row align-items-center'>
                    <h6>Criteria</h6>
                    <br></br>

                    <div className="col-md-5  align-items-center">
                        <div className="form-group mb-3">
                            <small>List ID</small>
                            <input type="text"  {...register2("list_id", {
                                required: true,
                            })} className="form-control" name="list_id" id="" />
                            {errors2.list_id?.type === 'required' && <p role="alert" className="notvalid">List Id is required </p>}

                        </div>
                    </div>


                    <div className="col-md-5 align-items-center">


                        <div className="form-group mb-3">

                            <button  style={successbtnstyle} className='btn btn-success float-right'>Search</button>

                        </div>

                    </div>



                    <div className="col-md-5  align-items-center">
                        <div className="form-group mb-3">
                            <small>List Name</small>
                            <input type="text"  {...register2("list_name", {
                                required: true,
                            })} className="form-control" name="list_name" id="" />
                            {/* {errors2.plan_id?.type === 'required' && <p role="alert" className="notvalid">Plan Id is required </p>} */}

                        </div>
                    </div>





                </div>

                <div>


                    <br></br>
                    <div class="row">
                        <div class="col-md-12 table-responsive">
                            <table class="table table-bordered  table-responsive">
                                <thead>
                                    <tr className='table-danger'>
                                        <th>List Id</th>
                                        <th>List Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* { cottagesList } */}
                                </tbody>
                            </table>
                        </div>
                    </div>






                </div>





            </div>

           
        </div>
    </div>
</div>
</form>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Load Parameters</h5>
                            </div>
                            <div className="col-md-4 mb-2">
                                <small>Auto Termination Level</small>
                                <select className="form-select" {...register("auto_termination_level", {
                                    // required: true,
                                })} name="auto_termination_level" >
                                    <option value="">--select--</option>
                                    <option value="0">Overlap Allowed Within Database</option>
                                    <option value="1">Automated Termination within client</option>
                                    <option value="2">Automated Termination within Customer</option>
                                    <option value="3">Automated Termination within database</option>
                                    <option value="4">No Automated Termination-Reject-within database</option>

                                </select>
                                <p className="input-hint">Overlap Allowed Within Database</p>
                            </div>
                            <div className="col-md-4 mb-2">
                                <small>Auto Family Member Terminate</small>
                                <select className="form-select"  {...register("auto_family_member_terminate", {
                                    // required: true,
                                })} name="auto_family_member_terminate">
                                    <option value="">--select--</option>

                                    <option value="0">No Automated Termination</option>
                                    <option value="1">Terminate family member if Termination received for cardholder</option>

                                </select>
                                <p className="input-hint">No Automated Family Member Terminations</p>
                            </div>
                            <div className="col-md-4 mb-2">
                                <small>Eligibility Type</small>
                                <select className="form-select" {...register("eligibility_type", {
                                    // required: true,

                                })} name="eligibility_type">
                                    <option value="">--select--</option>
                                    <option value="1">Not Specified </option>
                                    <option value="2"> Individual Member Records Exist</option>
                                    <option value="3">Family Member Records Exist</option>
                                </select>
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Processing Parameters:</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Membership Processing Flag</small>
                                <select className="form-select" {...register("membership_processing_flag", {
                                    // required: true,
                                })} name="membership_processing_flag">
                                    <option value="">--select--</option>
                                    <option value="1">Membership Processing Will Be Done</option>
                                </select>
                                <p className="input-hint">Membership Processing Will Be Done</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Overlap Coverage Tie Breaker</small>
                                <select className="form-select" {...register("Overlap Coverage Tie Breaker", {
                                    // required: true,

                                })} name="Overlap Coverage Tie Breaker">
                                    <option value="">--select--</option>
                                    <option value="1">use group submitted by provider .if Nomatch -use last added</option>
                                    <option value="2">use member record last added</option>
                                    <option value="3">use member record last updated</option>
                                </select>
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Verification Options:</h5>
                            </div>
                            <div className="col-md-4 mb-2">
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
                            <div className="col-md-4 mb-2">
                                <small>Eligibility Validation List ID</small>
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" {...register('eligibility_validationlist_id')}  name="eligibility_validationlist_id" />
                                    <a href="" data-bs-toggle="modal" data-bs-target="#eligibilityidModal"><span className="fa fa-search form-icon"></span></a>

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <small>Authorization Transfer</small>
                                <select className="form-select"  {...register("authorization_transfer", {
                                    required: true,
                                })} name="authorization_transfer">
                                    <option value="">--select--</option>
                                    <option value="0">Not Specified</option>
                                    <option value="1">Customer</option>
                                    <option value="2">Customer/Client</option>
                                    <option value="3">Customer/Client/Group</option>
                                </select>
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Change Logging</h5>
                            </div>
                            <div className="col-md-4 mb-2">
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

export function Coverage(params) {



    const { register, handleSubmit, formState: { errors } } = useForm();
    const [client, setClient] = useOutletContext();



    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm({
        mode: "onBlur",
    });


    const successbtnstyle = {
        float: 'right'
    };

    const searchSubmit = data => {


        alert('mahesh');

    }



    const onSubmit = data => {



        const id = client;
        id['strategy'] = data;
        setClient(id);
        console.log(client);




    }



    return (
        <>


            <form key={1} onSubmit={handleSubmit2(searchSubmit)}>



                <div class="modal fade" id="planidmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Plan Search</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <div className='row align-items-center'>

                                    <div className="col-md-5  align-items-center">
                                        <div className="form-group mb-3">
                                            <small>Plan ID</small>
                                            <input type="text"  {...register2("plan_id", {
                                                required: true,
                                            })} className="form-control" name="plan_id" id="" />

                                        </div>
                                        {errors2.plan_id?.type === 'required' && <p role="alert" className="notvalid">Plan Id is required </p>}

                                    </div>



                                    <div className="col-md-5 align-items-center">


                                        <div className="form-group mb-3">

                                            <button style={successbtnstyle} className='btn btn-success float-right'>Search</button>

                                        </div>

                                    </div>

                                </div>

                                <div>
                                    <div className="col-md-5  align-items-center">
                                        <div className="form-group mb-3">
                                            <small><b>Date Range</b></small>


                                        </div>
                                    </div>


                                    <div className='row'>

                                        <div className="col-md-5  align-items-center">
                                            <div className="form-group mb-4">
                                                <small>Effective From :</small>
                                                <input class="align-items-right" type="date"  {...register2("effective_from", {
                                                })} className="form-control" name="effective_from" id="" />
                                                {errors2.effective_from?.type === 'required' && <p role="alert" className="notvalid">Effective From date  is Required</p>}

                                            </div>
                                        </div>


                                        <div className="col-md-5  align-items-center">
                                            <div className="form-group mb-4">
                                                <small>Effective To :</small>
                                                <input class="align-items-right" type="date"  {...register2("effective_to", {
                                                })} className="form-control" name="effective_to" id="" />
                                                {errors2.effective_to?.type === 'required' && <p role="alert" className="notvalid">Effective To date required</p>}

                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>

                                        <h6 className='text-align-center'>Date Range will Displays all plans that have  effective date during that time period</h6>

                                    </div>
                                    <br></br>
                                    <div class="row">
                                        <div class="col-md-12 table-responsive">
                                            <table class="table table-bordered  table-responsive">
                                                <thead>
                                                    <tr className='table-danger'>
                                                        <th>Plan Id</th>
                                                        <th>Effective Date</th>
                                                        <th>Termination Date</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* { cottagesList } */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>






                                </div>





                            </div>

                            {/* <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-info">Add Benefit Code</button>
            </div> */}
                        </div>
                    </div>
                </div>
            </form>

            <form onSubmit={handleSubmit(onSubmit)}>

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
                                    <input type="date" className="form-control" name="tier_1" {...register('tier_1',{
                                        required:true,
                                    })} id="" />
                                    {errors.tier_1?.type === 'required' && <p role="alert" className="notvalid">Cov Eff Date is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <small>Tier 2</small>
                                    <input type="date" className="form-control" name="tier_2"  {...register('tier_2',{
                                        required:true,
                                    })} id="" />
                                    {errors.tier_2?.type === 'required' && <p role="alert" className="notvalid">Cov Eff Date is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <small>Tier 3</small>
                                    <input type="date" className="form-control" name="tier_3" {...register('tier_3',{
                                        required:true,
                                    })} id="" />
                                    {errors.tier_3?.type === 'required' && <p role="alert" className="notvalid">Cov Eff Date is  required</p>}

                                </div>
                            </div>

                            <div className="col-md-3 align-items-center">
                                <p>Plan ID</p>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" name="plan_id_1" {...register('plan_id_1',{
                                        required:true,
                                    })} id="" />
                                    <a href="" data-bs-toggle="modal" data-bs-target="#planidmodal"><span className="fa fa-search form-icon"></span></a>

                                </div>
                                {errors.plan_id_1?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" name="plan_id_2"  {...register('plan_id_2',{
                                            required:true,
                                        })} id="" />
                                        <a href="" data-bs-toggle="modal" data-bs-target="#planidmodal"><span className="fa fa-search form-icon"></span></a>

                                    </div>
                                    {errors.plan_id_2?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" name="plan_id_3"  {...register('plan_id_3',{
                                            required:true,
                                        })} id="" />
                                        <a href="" data-bs-toggle="modal" data-bs-target="#planidmodal"><span className="fa fa-search form-icon"></span></a>

                                    </div>
                                    {errors.plan_id_3?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                                </div>
                            </div>

                            <div className="col-md-3 align-items-center">
                                <p>Miscellaneous Data</p>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" {...register('miscellaneous_data_1')} name="miscellaneous_data_1"  {...register('miscellaneous_data_1',{
                                        required:true,
                                    })} id="" />
                                    {errors.miscellaneous_data_1?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous Data  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" {...register('miscellaneous_data_2',{
                                        required:true,
                                    })} name="miscellaneous_data_2"  {...register('miscellaneous_data_2')} id="" />
                                    {errors.miscellaneous_data_2?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous Data  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" {...register('miscellaneous_data_3',{
                                        required:true,
                                    })} name="miscellaneous_data_3"  {...register('miscellaneous_data_3')} id="" />
                                    {errors.miscellaneous_data_3?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous Data  is  required</p>}

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
                                    {errors.provider_vefification_option?.type === 'required' && <p role="alert" className="notvalid">Provider Options  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <small>Super Provider Networks</small>
                                    <input type="text" className="form-control" {...register('super_provider_networks',{
                                        required:true,
                                    })} name="super_provider_networks" id="" />
                                    <a href="" data-bs-toggle="modal" data-bs-target="#superprovidermodal"><span className="fa fa-search form-icon"></span></a>


                                </div>
                                {errors.super_provider_networks?.type === 'required' && <p role="alert" className="notvalid">Super Provider Networks  is  required</p>}

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
                                    {errors.Prescriber_Verification_Options_1?.type === 'required' && <p role="alert" className="notvalid">Prescriber Options  is  required</p>}

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
                                    {errors.Prescriber_Verification_Options_2?.type === 'required' && <p role="alert" className="notvalid">Prescriber Options  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <small>Prescriber Grouping ID</small>
                                    <select className="form-select" {...register("Prescriber_Grouping_id", {
                                        required: true,
                                    })} name="Prescriber_Grouping_id">
                                        <option value="">--select--</option>
                                        <option value="1">None</option>
                                        <option value="2">Validate DEA Code</option>
                                        <option value="3">primary Prescriber Validation</option>
                                        <option value="4">Must Exist in Prescriber Master</option>
                                    </select>        
                                    {errors.Prescriber_Grouping_id?.type === 'required' && <p role="alert" className="notvalid">Prescriber Group Id  is  required</p>}

                                 </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button type="submit" className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</button>
                </div>
            </form>

            <form key={3} onSubmit={handleSubmit2(searchSubmit)}>



                <div class="modal fade" id="superprovidermodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Search Super Provider Networks</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <div className='row align-items-center'>
                                    <h6>Criteria</h6>
                                    <br></br>

                                    <div className="col-md-5  align-items-center">
                                        <div className="form-group mb-3">
                                            <small>Network ID</small>
                                            <input type="text"  {...register2("rva_list_id", {
                                                required: true,
                                            })} className="form-control" name="rva_list_id" id="" />
                                            {errors2.rva_list_id?.type === 'required' && <p role="alert" className="notvalid">List Id is required </p>}

                                        </div>
                                    </div>


                                    <div className="col-md-5 align-items-center">


                                        <div className="form-group mb-3">

                                            <button style={successbtnstyle} className='btn btn-success float-right'>Search</button>

                                        </div>

                                    </div>



                                    <div className="col-md-5  align-items-center">
                                        <div className="form-group mb-3">
                                            <small>Network Name</small>
                                            <input type="text"  {...register2("list_name", {
                                            })} className="form-control" name="list_name" id="" />
                                            {/* {errors2.plan_id?.type === 'required' && <p role="alert" className="notvalid">Plan Id is required </p>} */}

                                        </div>
                                    </div>





                                </div>

                                <div>


                                    <br></br>
                                    <div class="row">
                                        <div class="col-md-12 table-responsive">
                                            <table class="table table-bordered  table-responsive">
                                                <thead>
                                                    <tr className='table-danger'>
                                                        <th>Network Id</th>
                                                        <th>Network Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* { cottagesList } */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>






                                </div>





                            </div>

                            {/* <div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="button" class="btn btn-info">Add Benefit Code</button>
</div> */}
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export function Identification(params) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [client, setClient] = useOutletContext();



    const onSubmit = data => {



        const id = client;
        id['identification'] = data;
        setClient(id);
        console.log(client);

    }


  

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-md-7">
                                <h5 className="mb-2">Customer ID</h5>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group mb-2">
                                            <small>Customer ID</small>
                                            <input type="text" {...register('customer_id', {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,

                                            })} className="form-control" name="customer_id" id="" placeholder="Customer ID" />

                                            {errors.customer_id?.type === 'required' && <p role="alert" className="notvalid"> Customer Id is  required</p>}
                                            {errors.customer_id?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}


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
                                            <input type="text" className="form-control" name="customer_name" {...register('customer_name', {
                                                required: true,
                                            })} id="" placeholder="Name" />
                                            {errors.customer_name?.type === 'required' && <p role="alert" className="notvalid"> Customer Name is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Address 1</small>
                                            <input type="text" className="form-control" {...register('address1', {
                                                required: true,
                                            })} name="address1" id="" placeholder="Address 1" />
                                            {errors.address1?.type === 'required' && <p role="alert" className="notvalid"> Address  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Address 2</small>
                                            <input type="text" className="form-control" name="address2" {...register('address2', {
                                                required: true,
                                            })} id="" placeholder="Address 2" />
                                            {errors.address2?.type === 'required' && <p role="alert" className="notvalid"> Address  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>City / State</small>
                                            <select className="form-select" name="city" {...register('city', {
                                                required:true,
                                            })}>
                                                <option value="">Select City</option>
                                                <option value="1">Hyderabad</option>
                                                <option value="2">Banglore</option>
                                                <option value="3">Vijayawada</option>
                                            </select>
                                            {errors.city?.type === 'required' && <p role="alert" className="notvalid"> City  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Country</small>

                                            <select className="form-select" name="country" {...register('country', {
                                                required: true,
                                            })}>
                                                <option value="">Select Country</option>
                                                <option value="1">india</option>
                                                <option value="2">united states</option>
                                            </select>
                                            {errors.country?.type === 'required' && <p role="alert" className="notvalid"> Country  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>ZIP Code</small>
                                            <input type="text" className="form-control" name="zip_code"  {...register('zip_code', {
                                                required:true,
                                                pattern:/^[a-z0-9]+$/i
                                            })} id="" placeholder="ZIP Code" />
                                            {errors.zip_code?.type === 'required' && <p role="alert" className="notvalid"> ZIP Code  is  required</p>}
                                            {errors.zip_code?.type === 'pattern' && <p role="alert" className="notvalid">This field Must Alpha Numeric </p>}


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Phone</small>
                                            <input type="text" className="form-control" {...register('phone',{
                                                required:true,
                                                pattern:/^\d{10}$/,
                                            })} name="phone" id=""   placeholder="Phone" />
                                            {errors.phone?.type === 'required' && <p role="alert" className="notvalid"> Phone Number   is  required</p>}
                                            {errors.phone?.type === 'pattern' && <p role="alert" className="notvalid"> Invalid phone  Number format</p>}


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Fax</small>
                                            <input type="text" className="form-control" name="fax" {...register('fax',{
                                                required:true,
                                            })} id="" placeholder="Fax" />
                                            {errors.fax?.type === 'required' && <p role="alert" className="notvalid"> Fax   is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>EDI Address</small>
                                            <input type="text" className="form-control" name="edi_address" {...register('edi_address',{
                                                required:true,
                                            })} id="" placeholder="EDI Address" />
                                            {errors.edi_address?.type === 'required' && <p role="alert" className="notvalid"> EDI Address  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Contact</small>
                                            <input type="text" className="form-control" name="contact" {...register('contact',{
                                                required:true,
                                            })} id="" placeholder="Contact" />
                                            {errors.contact?.type === 'required' && <p role="alert" className="notvalid">  Contact  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Test</small>
                                            <input type="text" className="form-control" name="test" {...register('test',{
                                                required:true,
                                            })} id="" placeholder="Test" />
                                            {errors.test?.type === 'required' && <p role="alert" className="notvalid">  Test field  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Type</small>
                                            <input type="text" className="form-control" name="type" {...register('type',{
                                                required:true,
                                            })} id="" placeholder="Type" />
                                            {errors.type?.type === 'required' && <p role="alert" className="notvalid">  Type field  is  required</p>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <h5 className="mb-1">Identification</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Effective Date</small>
                                            <input type="date" className="form-control" name="effective_date" {...register('effective_date',{
                                                required:true,
                                            })} id="" placeholder="Address 1" />
                                            {errors.effective_date?.type === 'required' && <p role="alert" className="notvalid">Effective Date  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termination Date</small>
                                            <input type="date" className="form-control" name="termination_date"  {...register('termination_date',{
                                                required:true,
                                            })} id="" placeholder="Address 2" />
                                            {errors.termination_date?.type === 'required' && <p role="alert" className="notvalid">Termination Date  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Policy Ann. Month</small>
                                            <select {...register("policyannmonth", {
                                                required: true,
                                            })} name="policyannmonth" className="form-select">

                                                <option value="">--Select--</option>
                                                <option value="1">January</option>
                                                <option value="2">February</option>
                                                <option value="3">March</option>
                                                <option value="4">April</option>
                                                <option value="5">May</option>
                                                <option value="6">June</option>
                                                <option value="7">July</option>
                                                <option value="8">August</option>
                                                <option value="9">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </select>
                                            {errors.policyannmonth?.type === 'required' && <p role="alert" className="notvalid">Policy Annual Month  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Policy Ann. Day</small>
                                            <input type="text" className="form-control" name="policy_ann_day" {...register('policy_ann_day',{
                                                required:true,
                                                pattern: /^(0|[1-9][0-9]*)$/,

                                            })} id="" placeholder="Enter" />
                                            {errors.policy_ann_day?.type === 'required' && <p role="alert" className="notvalid">Policy Annual Day  is  required</p>}
                                            {errors.policy_ann_day?.type === 'pattern' && <p role="alert" className="notvalid">Enter Number Only..</p>}


                                        </div>
                                    </div>
                                </div>
                                <h5 className="mb-1">Census</h5>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group mb-2">
                                            <small>Census Date</small>
                                            <input type="text" className="form-control" name="census" {...register('census',{
                                                required:true,
                                            })} id="" placeholder="Census Date" />
                                            {errors.census?.type === 'required' && <p role="alert" className="notvalid">  Census Date   is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Active Contracts</small>
                                            <input type="text" className="form-control" name="active_contracts" {...register('active_contracts',{
                                                required:true,
                                            })} id="" placeholder="Active Contracts" />
                                            {errors.active_contracts?.type === 'required' && <p role="alert" className="notvalid">  Active Contracts   is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Active Memebers</small>
                                            <input type="text" className="form-control" name="active_members" {...register('active_members',{
                                                required:true,
                                            })} id="" placeholder="Active Memebers" />
                                            {errors.active_members?.type === 'required' && <p role="alert" className="notvalid">  Active Memebers   is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termed Contracts</small>
                                            <input type="text" className="form-control" name="terminated_contracts" {...register('terminated_contracts',{
                                                required:true,
                                            })} id="" placeholder="Termed Contracts" />
                                            {errors.terminated_contracts?.type === 'required' && <p role="alert" className="notvalid">  Termed Contracts  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termed Memebers</small>
                                            <input type="text" className="form-control" name="terminated_members" {...register('terminated_members',{
                                                required:true,
                                            })} id="" placeholder="Termed Memebers" />
                                            {errors.terminated_members?.type === 'required' && <p role="alert" className="notvalid">  Termed Memebers is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Pending Contracts</small>
                                            <input type="text" className="form-control" name="pending_contracts" {...register('pending_contracts',{
                                                required:true,
                                            })} id="" placeholder="Pending Contracts" />
                                            {errors.pending_contracts?.type === 'required' && <p role="alert" className="notvalid">  Pending Contracts is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Pending Memebers</small>
                                            <input type="text" className="form-control" name="pending_members" {...register('pending_members',{
                                                required:true,
                                            })} id="" placeholder="Pending Members" />
                                            {errors.pending_members?.type === 'required' && <p role="alert" className="notvalid">  Pending Memebers is  required</p>}

                                        </div>
                                    </div>
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