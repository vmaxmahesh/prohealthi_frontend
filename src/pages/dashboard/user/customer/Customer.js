import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';


function Customer() {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();

    const [customer, setCustomer] = useState([]);


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
                            <li><a href="">Customer</a></li>
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
                <h4 style={{ fontWeight: '600' }}>Add New Customer</h4>
            </div>

            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <Link to="identification" className={'nav-link' + (currentpath == 'identification' ? ' active' : '')}>Identification</Link>
                <Link to="strategy" className={'nav-link' + (currentpath == 'strategy' ? ' active' : '')}>Strategy</Link>
                <Link to="eligibility" className={'nav-link' + (currentpath == 'eligibility' ? ' active' : '')}>Eligibility</Link>
                <Link to="indicators" className={'nav-link' + (currentpath == 'indicators' ? ' active' : '')}>Indicators</Link>

            </div>
            <div className="tab-content" id="nav-tabContent">
                <Outlet context={[customer, setCustomer]} />



                <div className="tab-pane fade show active" id="Identification" role="tabpanel" aria-labelledby="nav-home-tab">

                </div>
                <div className="tab-pane fade" id="Strategy" role="tabpanel" aria-labelledby="nav-profile-tab"></div>
                <div className="tab-pane fade" id="Eligibility" role="tabpanel" aria-labelledby="nav-contact-tab"></div>
                <div className="tab-pane fade" id="Indicators" role="tabpanel" aria-labelledby="nav-contact-tab"></div>

                <div className="tab-pane fade" id="Exception" role="tabpanel" aria-labelledby="nav-contact-tab"></div>
            </div>


            <Footer />
        </>
    );
}

export function Identification(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [customer, setCustomer] = useOutletContext();
    const [startDate, setStartDate] = useState(new Date());
    const [afterDate, setAfterDate] = useState(new Date());



    const navigate = useNavigate();


    function StartDateChange(e) {

        setStartDate(e.target.value);
        const date = new Date(e.target.value);
        date.setDate(date.getDate() + 1);
        var today = date;
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        setAfterDate(today);


    }






    const onSubmit = data => {


        // console.log(Identificationdata);

        const id = customer;
        id['identification'] = data;
        setCustomer(id);
        console.log(customer);




    }




    console.log(process.env.REACT_APP_API_BASEURL)

    const postTOBackend = data => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(process.env.REACT_APP_API_BASEURL + '/api/customer/identification/add', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                // console.log(data);

                setCustomer(data);
                // props.onChange(data);
                navigate("/dashboard/user/customer/strategy");

                // this.setState({ postId: data.id })
            })
            .catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }


    return (
        <>


            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-md-7">
                                <h5 className="mb-2">Information</h5>

                                <div className="form-group mb-2">
                                    <small>Customer ID</small>
                                    <input type="text" {...register("cutomerid", {
                                        required: true,
                                        maxLength: 20,
                                        pattern: /^(0|[1-9][0-9]*)$/,
                                    })}
                                        className="form-control" name="cutomerid" id="" placeholder="Customer ID" />
                                    {errors.cutomerid?.type === 'required' && <p role="alert" className="notvalid">Customer Id required</p>}
                                    {errors.cutomerid?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}


                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="mb-1">Address</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Name</small>
                                            <input type="text" {...register("name", {
                                                required: true,
                                                maxLength: 20,
                                                pattern: /^[A-Za-z]+$/i
                                            })} name="name" className="form-control" placeholder="Name" />
                                            {errors.name?.type === 'required' && <p role="alert" className="notvalid">Name is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Address 1</small>
                                            <input type="text" {...register("address1", {
                                                required: true,
                                                maxLength: 20,
                                                pattern: /^[A-Za-z]+$/i

                                            })} name="address1" className="form-control" placeholder="Address 1" />
                                            {errors.address1?.type === 'required' && <p role="alert" className="notvalid">Address is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Address 2</small>
                                            <input type="text" {...register("address2", {
                                                required: true,
                                                maxLength: 20,
                                                pattern: /^[A-Za-z]+$/i
                                            })} className="form-control" name="address2" id="" placeholder="Address 2" />
                                            {errors.address2?.type === 'required' && <p role="alert" className="notvalid">Address is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>City / State</small>
                                            <select {...register("city", {
                                                required: true,

                                            })} name="city" className="form-select">
                                                <option value="">Select City</option>
                                                <option value="1">option 1</option>
                                                <option value="2">option 2</option>
                                                <option value="3">option 3</option>
                                            </select>

                                            {errors.city?.type === 'required' && <p role="alert" className="notvalid">City is  required</p>}


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Country</small>
                                            <select {...register("country", {
                                                required: true,

                                            })} name="country" className="form-select">
                                                <option value="">Select Country</option>
                                                <option value="1">option 1</option>
                                                <option value="2">option 2</option>
                                                <option value="3">option 3</option>
                                            </select>
                                            {errors.country?.type === 'required' && <p role="alert" className="notvalid">Country is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>ZIP Code</small>
                                            <input type="text" {...register("zip", {
                                                required: true,
                                            })} className="form-control" name="zip" id="" placeholder="ZIP Code" />
                                            {errors.zip?.type === 'required' && <p role="alert" className="notvalid">Zip code  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Phone</small>
                                            <input type="text" {...register("phone", {
                                                required: true,
                                            })} className="form-control" name="phone" id="" placeholder="Phone" />

                                            {errors.phone?.type === 'required' && <p role="alert" className="notvalid">Phone Number  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Fax</small>
                                            <input type="text" {...register("fax", {
                                                required: true,
                                            })} className="form-control" name="fax" id="" placeholder="Fax" />
                                            {errors.fax?.type === 'required' && <p role="alert" className="notvalid">Fax Number  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>EDI Address</small>
                                            <input type="text" {...register("ediaddress", {
                                                required: true,
                                            })} className="form-control" name="ediaddress" id="" placeholder="EDI Address" />

                                            {errors.ediaddress?.type === 'required' && <p role="alert" className="notvalid">EDI Address  is  required</p>}


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Contact</small>
                                            <input type="text" {...register("contact", {
                                                required: true,
                                            })} className="form-control" name="contact" id="" placeholder="Contact" />
                                            {errors.contact?.type === 'required' && <p role="alert" className="notvalid">Contact Number is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Test</small>
                                            <input type="text" {...register("test", {
                                                required: true,

                                            })} className="form-control" name="test" id="" placeholder="Test" />
                                            {errors.test?.type === 'required' && <p role="alert" className="notvalid">Test  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Type</small>
                                            <input type="text" {...register("type", {
                                                required: true,
                                            })} className="form-control" name="type" id="" placeholder="Type" />
                                            {errors.test?.type === 'required' && <p role="alert" className="notvalid">Type  is  required</p>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <h5 className="mb-1">Date Ranges</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Effective Date</small>
                                            <input type="date" {...register("effectivedate", {
                                                required: true,
                                            })} className="form-control" onChange={StartDateChange} name="effectivedate" id="" placeholder="Address 1" />
Effective Date
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termination Date</small>
                                            <input type="date" {...register("terminationdate", {
                                                required: true,
                                            })} className="form-control" name="terminationdate" id="" min={afterDate} placeholder="Address 2" />
                                            {errors.terminationdate?.type === 'required' && <p role="alert" className="notvalid">Termination Date  is  required</p>}

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
                                            {errors.policyannmonth?.type === 'required' && <p role="alert" className="notvalid">Policy Ann. Month  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Policy Ann. Day</small>
                                            <input type="text" {...register("policyanday", {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,

                                            })} name="policyanday" className="form-control" id="" placeholder="Enter" />
                                            {errors.policyanday?.type === 'required' && <p role="alert" className="notvalid">Policy Ann. Month  is  required</p>}
                                            {errors.policyanday?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}


                                        </div>
                                    </div>
                                </div>
                                <h5 className="mb-1">Census</h5>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group mb-2">
                                            <small>Census Date</small>
                                            <input type="date" {...register("censusdate", {
                                                required: true,
                                            })} className="form-control" name="censusdate" id="" placeholder="Census Date" />
                                            {errors.censusdate?.type === 'required' && <p role="alert" className="notvalid">Census Date  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Active Contracts</small>
                                            <input type="text" {...register("noofactivecontracts", {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,
                                            })} className="form-control" name="noofactivecontracts" id="" placeholder="Active Contracts" />
                                            {errors.noofactivecontracts?.type === 'required' && <p role="alert" className="notvalid">Number of Active Contracts field is required</p>}
                                            {errors.noofactivecontracts?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Active Memebers</small>
                                            <input type="text" {...register("noofactivemembers", {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,
                                            })} className="form-control" name="noofactivemembers" id="" placeholder="Active Memebers" />
                                            {errors.noofactivemembers?.type === 'required' && <p role="alert" className="notvalid">Number of Active Memebers field is required</p>}
                                            {errors.noofactivemembers?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Termed Contracts</small>
                                            <input type="text" {...register("nooftermedcontracts", {

                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,

                                            })} className="form-control" name="nooftermedcontracts" id="" placeholder="Termed Contracts" />
                                            {errors.nooftermedcontracts?.type === 'required' && <p role="alert" className="notvalid">Number of Termed Contracts field is required</p>}
                                            {errors.nooftermedcontracts?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Termed Memebers</small>
                                            <input type="text" {...register("nooftermedmembers", {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,
                                            })} className="form-control" name="nooftermedmembers" id="" placeholder="Termed Memebers" />
                                            {errors.nooftermedmembers?.type === 'required' && <p role="alert" className="notvalid">Number of Termed Memebers field is required</p>}
                                            {errors.nooftermedmembers?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Pending Contracts</small>
                                            <input type="text" {...register("noofpendingcontracts", {

                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,

                                            })} className="form-control" name="noofpendingcontracts" id="" placeholder="Pending Contracts" />

                                            {errors.noofpendingcontracts?.type === 'required' && <p role="alert" className="notvalid">Number of Active Contracts field is required</p>}
                                            {errors.noofpendingcontracts?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Pending Memebers</small>
                                            <input type="text" {...register("noofpendinngmembers", {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,
                                            })} className="form-control" name="noofpendinngmembers" id="" placeholder="Pending Members" />
                                            {errors.noofpendinngmembers?.type === 'required' && <p role="alert" className="notvalid">Number of Active Contracts field is required</p>}
                                            {errors.noofpendinngmembers?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button type='submit' className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</button>
                </div>
            </form>
        </>
    )
}

export function Strategy(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [customer, setCustomer] = useOutletContext();



    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm({
        mode: "onBlur",
    });




    const navigate = useNavigate();


    const successbtnstyle = {
        float: 'right'
    };










    const onSubmit = data => {
        var statid = customer;
        statid['strategy'] = data;
        setCustomer(statid);
        console.log(customer);
    }


    const searchSubmit = data => {


        alert('mahesh');

    }



    const postTOBackendStrategy = data => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(process.env.REACT_APP_API_BASEURL + '/api/customer/identification/add', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                // console.log(data);

                setStrategy(data);
                // props.onChange(data);
                navigate("/dashboard/user/customer/strategy");

                // this.setState({ postId: data.id })
            })
            .catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    return (
        <>



            <form key={1} onSubmit={handleSubmit2(searchSubmit)}>



                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                            {errors2.plan_id?.type === 'required' && <p role="alert" className="notvalid">Plan Id is required </p>}

                                        </div>
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



            <form key={2} onSubmit={handleSubmit(onSubmit)}>





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
                                    <input type="date"  {...register("tier1", {
                                        required: true,
                                    })} className="form-control" name="tier1" id="" />
                                    {errors.tier1?.type === 'required' && <p role="alert" className="notvalid">Tier 1 date  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <small>Tier 2</small>
                                    <input type="date" {...register("tier2", {
                                        required: true,
                                    })} className="form-control" name="tier2" id="" />
                                    {errors.tier2?.type === 'required' && <p role="alert" className="notvalid">Tier 2 date  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <small>Tier 3</small>
                                    <input type="date" {...register("tier3", {
                                        required: true,
                                    })} className="form-control" name="tier3" id="" />
                                    {errors.tier3?.type === 'required' && <p role="alert" className="notvalid">Tier 3 date  required</p>}


                                </div>
                            </div>

                            <div className="col-md-3 align-items-center">
                                <p>Plan ID</p>

                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" {...register("plan_id_1", {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,
                                    })} className="form-control" name="plan_id_1" id="" />
                                    <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal"><span className="fa fa-search form-icon"></span></a>

                                    {/* <a class="btn  btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add Benifit Code <i className="fa fa-search form-icon"></i></a> */}


                                    {errors.plan_id_1?.type === 'required' && <p role="alert" className="notvalid">Plan id is  required</p>}
                                    {errors.plan_id_1?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

                                </div>


                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <div className="form-group mb-3">
                                        <input type="text" {...register("plan_id_2", {
                                            required: true,
                                            pattern: /^(0|[1-9][0-9]*)$/,


                                        })} className="form-control" name="plan_id_2" id="" />
                                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal"><span className="fa fa-search form-icon"></span></a>
                                        {errors.plan_id_2?.type === 'required' && <p role="alert" className="notvalid">Plan id is  required</p>}
                                        {errors.plan_id_2?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <div className="form-group mb-3">
                                        <input type="text" {...register("plan_id_3", {
                                            required: true,
                                            pattern: /^(0|[1-9][0-9]*)$/,
                                        })} className="form-control" name="plan_id_3" id="" />
                                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal"><span className="fa fa-search form-icon"></span></a>
                                        {errors.plan_id_3?.type === 'required' && <p role="alert" className="notvalid">Plan id is  required</p>}
                                        {errors.plan_id_3?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 align-items-center">
                                <p>Miscellaneous Data</p>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" {...register("miscellaneous_1", {
                                        required: true,
                                    })} className="form-control" name="miscellaneous_1" id="" />
                                    {errors.miscellaneous_1?.type === 'required' && <p role="alert" className="notvalid">miscellaneous data is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" {...register("miscellaneous_2", {
                                        required: true,
                                    })} className="form-control" name="miscellaneous_2" id="" />
                                    {errors.miscellaneous_2?.type === 'required' && <p role="alert" className="notvalid">miscellaneous data is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" {...register("miscellaneous_3", {
                                        required: true,
                                    })} className="form-control" name="miscellaneous_3" id="" />
                                    {errors.miscellaneous_3?.type === 'required' && <p role="alert" className="notvalid">miscellaneous data is  required</p>}

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
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <small>Super Provider Networks</small>
                                    <input type="text" className="form-control" {...register("super_provider_network", {
                                        required: true,
                                    })} name="super_provider_network" id="" />
                                    <a href="" data-bs-toggle="modal" data-bs-target="#supernetwork"><span className="fa fa-search form-icon"></span></a>

                                    {errors.super_provider_network?.type === 'required' && <p role="alert" className="notvalid">Super Provider Networks field is   required</p>}

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


                                    <select className="form-select" {...register("Prescriber_Grouping_id", {
                                        required: true,
                                    })} name="Prescriber_Grouping_id">
                                        <option value="">--select--</option>
                                        <option value="1">None</option>
                                        <option value="2">Validate DEA Code</option>
                                        <option value="3">primary Prescriber Validation</option>
                                        <option value="4">Must Exist in Prescriber Master</option>
                                    </select>
                                    {errors.Prescriber_Grouping_id?.type === 'required' && <p role="alert" className="notvalid">Prescriber Grouping ID  required</p>}
                                    {errors.policyanday?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button type='submit' className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</button>
                </div>
            </form>


            <form key={3} onSubmit={handleSubmit2(searchSubmit)}>



<div class="modal fade" id="supernetwork" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

export function Eligibility(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [customer, setCustomer] = useOutletContext();


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


    const navigate = useNavigate();


    const searchSubmit = data => {


        alert('mahesh');

    }



    const onSubmit = data => {
        var Eligibilitystatid = customer;
        Eligibilitystatid['Eligibility'] = data;
        setCustomer(Eligibilitystatid);
        console.log(customer);

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

                                            <button style={successbtnstyle} className='btn btn-success float-right'>Search</button>

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
                                {errors.auto_termination_level?.type === 'required' && <p role="alert" className="notvalid">Auto Termination Level field is  required</p>}
                                <p className="input-hint">Overlap Allowed Within Database</p>
                            </div>
                            <div className="col-md-4 mb-2">
                                <small>Auto Family Member Terminate</small>
                                <select className="form-select"  {...register("auto_family_member_terminate", {
                                    required: true,
                                })} name="auto_family_member_terminate">
                                    <option value="">--select--</option>

                                    <option value="0">No Automated Termination</option>
                                    <option value="1">Terminate family member if Termination received for cardholder</option>

                                </select>
                                {errors.auto_family_member_terminate?.type === 'required' && <p role="alert" className="notvalid">Auto Family Member Terminate field is  required</p>}

                                <p className="input-hint">No Automated Family Member Terminations</p>
                            </div>
                            <div className="col-md-4 mb-2">
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
                            <div className="col-md-4 mb-2">
                                <small>Membership Processing Flag</small>
                                <select className="form-select" {...register("membership_processing_flag", {
                                    required: true,
                                })} name="membership_processing_flag">
                                    <option value="">--select--</option>
                                    <option value="1">Membership Processing Will Be Done</option>
                                </select>
                                {errors.membership_processing_flag?.type === 'required' && <p role="alert" className="notvalid">Membership Processing Flag field is  required</p>}

                                <p className="input-hint">Membership Processing Will Be Done</p>
                            </div>
                            <div className="col-md-4 mb-2">
                                <small>Overlap Coverage Tie Breaker</small>
                                <select className="form-select" {...register("Overlap Coverage Tie Breaker", {
                                    required: true,

                                })} name="Overlap Coverage Tie Breaker">
                                    <option value="">--select--</option>
                                    <option value="1">use group submitted by provider .if Nomatch -use last added</option>
                                    <option value="2">use member record last added</option>
                                    <option value="3">use member record last updated</option>
                                </select>
                                {errors.membership_processing_willbe_done?.type === 'required' && <p role="alert" className="notvalid">Overlap Coverage Tie Breaker field is  required</p>}

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
                                    <input type="text" className="form-control"  {...register("eligibility_validation_list", {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,

                                    })} name="eligibility_validation_list" id="" required="" />

                                    <a href="" data-bs-toggle="modal" data-bs-target="#eligibilityidModal"><span className="fa fa-search form-icon"></span></a>

                                </div>
                                {errors.eligibility_validation_list?.type === 'required' && <p role="alert" className="notvalid">Eligibility Validation List ID is  required</p>}
                                {errors.eligibility_validation_list?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

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
                                {errors.authorization_transfer?.type === 'required' && <p role="alert" className="notvalid">Authorization Transfer is  required</p>}

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
                            {errors.eligibility_change_log_indicator?.type === 'required' && <p role="alert" className="notvalid">Eligibility Change Log Indicator is  required</p>}

                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button type='submit' className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</button>
                </div>
            </form>
        </>
    )
}

export function Indicators(props) {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [customer, setCustomer] = useOutletContext();

    const navigate = useNavigate();


    const onSubmit = data => {
        var Indicatorsid = customer;
        Indicatorsid['Indicators'] = data;
        setCustomer(Indicatorsid);
        console.log(customer);
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
                                {errors.Secondary_Coverage_indicator?.type === 'required' && <p role="alert" className="notvalid">Secondary Coverage indicator is  required</p>}

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
                                {errors.Accumulated_Benefits_Indicator?.type === 'required' && <p role="alert" className="notvalid">Accumulated Benefits Indicator is  required</p>}

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
                            <div className="col-md-12 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" name="Bypass_Member_Eligibility" {...register("Bypass_Member_Eligibility", {
                                        required: true,
                                    })} id="html" className="d-none" />
                                    <label for="html">Bypass Member Eligibility Date Edits Against Customer Effective Dates</label>
                                    {errors.Bypass_Member_Eligibility?.type === 'required' && <p role="alert" className="notvalid">Bypass Member Eligibility Date Edits Against Customer Effective Dates is   required</p>}

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




                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Tax Status</small>
                                    {/* <input type="text" className="form-control" name="no_of_days_reversal" {...register("no_of_days_reversal", {
                                        required: true,
                                    })} id="" placeholder="" required="" /> */}

<select className="form-select" {...register("tax_status", {
                                    required: true,
                                })} name="tax_status">
                                    <option value="">--select--</option>
                                    <option value="1">Not Specified </option>
                                    <option value="2">Taxable</option>
                                    <option value="3">Tax Exempt</option>
                                </select>
                                    {errors.tax_status?.type === 'required' && <p role="alert" className="notvalid">Tax status field is    required</p>}

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
                    <button type='submit' className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Next</button>
                </div>
            </form>
        </>
    )
}

export function Exceptions(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [customer, setCustomer] = useOutletContext();


    const navigate = useNavigate();



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




    // Identification

    const searchSubmit = data => {


        alert('mahesh');

    }




    const onSubmit = data => {


        var Exceptionsid = customer;
        Exceptionsid['Exceptions'] = data;
        setCustomer(Exceptionsid);
        // console.log(customer);

        // console.log(process.env.REACT_APP_API_BASEURL);
        console.log('mahesh');
        postTOBackend(customer);

    }



    console.log(process.env.REACT_APP_API_BASEURL);

    const postTOBackend = customer => {
        console.log(customer);
        alert('mahesh');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        };
        fetch(process.env.REACT_APP_API_BASEURL + '/api/customer/add', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                alert(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                console.log(data);


                if(response==='200'){
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        
                        
                        });
                }

                // props.onChange(data);
                // navigate("/dashboard/user/customer/strategy");

                // this.setState({ postId: data.id })
            })
            .catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);

                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    
                    
                    });
            });
    }
    return (
        <>



<form key={1} onSubmit={handleSubmit2(searchSubmit)}>



<div class="modal fade" id="rvalistidModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Search RVA Lists</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div className='row align-items-center'>
                    <h6>Criteria</h6>
                    <br></br>

                    <div className="col-md-5  align-items-center">
                        <div className="form-group mb-3">
                            <small>List ID</small>
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
                            <small>List Name</small>
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
                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Exception List Processing</h5>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="Plan" className="d-none" {...register("bypass_plan_ndc_gpi", {
                                        required: true,
                                    })} name="bypass_plan_ndc_gpi" />
                                    <label for="Plan">Bypass Plan NDC/GPI Exception List Processing</label>
                                    {errors.bypass_plan_ndc_gpi?.type === 'required' && <p role="alert" className="notvalid">Bypass Plan NDC/GPI Exception List Processing field   is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="System" className="d-none" {...register('bypass_plan_ndc_gpi_exception_list_process', {
                                        required: true,
                                    })} name="bypass_plan_ndc_gpi_exception_list_process" />
                                    <label for="System">Bypass System NDC/GPI Exception List Processing</label>
                                    {errors.bypass_plan_ndc_gpi_exception_list_process?.type === 'required' && <p role="alert" className="notvalid">Bypass System NDC/GPI Exception List Processing  field   is   required</p>}

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
                                    })} name="smbpp" id="" placeholder="" required="" />
                                    {errors.smbpp?.type === 'required' && <p role="alert" className="notvalid">SMBPP  field   is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>RVA List ID</small>
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" name="rva_list_id" {...register('rva_list_id', {
                                        required: true,
                                    })} id="" required="" />

                                    <a href="" data-bs-toggle="modal" data-bs-target="#rvalistidModal"><span className="fa fa-search form-icon"></span></a>


                                </div>
                                {errors.rva_list_id?.type === 'required' && <p role="alert" className="notvalid">RVA List ID  field   is   required</p>}

                            </div>

                            <div className="clearfix"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Other Charges</h5>
                            </div>

                            <div className="col-md-3">
                                <div className="form-group mb-2">
                                    <small>Admin Fee</small>
                                    <input type="text" className="form-control" id="" name="admin_fee" {...register('admin_fee', {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,

                                    })} placeholder="" required="" />
                                    {errors.admin_fee?.type === 'required' && <p role="alert" className="notvalid">Admin Fee  field   is   required</p>}
                                    {errors.admin_fee?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}


                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-2">
                                    <small>Admin %</small>
                                    <input type="text" className="form-control" name="admin_percentage" {...register('admin_percentage', {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,

                                    })} id="" placeholder="" required="" />
                                    {errors.admin_percentage?.type === 'required' && <p role="alert" className="notvalid">Admin percentage  field   is   required</p>}
                                    {errors.admin_percentage?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-2">
                                    <small>DMR Fee</small>
                                    <input type="text" className="form-control" name="dmr_fee"   {...register("dmr_fee", {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,
                                    })} id="" placeholder="" required="" />
                                    {errors.dmr_fee?.type === 'required' && <p role="alert" className="notvalid">DMR Fee  field   is   required</p>}
                                    {errors.dmr_fee?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-2">
                                    <small>UCF Claim Fee</small>
                                    <input type="text" className="form-control" name="ucf_claim_fee"   {...register("ucf_claim_fee", {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,
                                    })} id="" placeholder="" required="" />
                                    {errors.ucf_claim_fee?.type === 'required' && <p role="alert" className="notvalid">UCF Claim Fee  field   is   required</p>}
                                    {errors.ucf_claim_fee?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-2">
                                    <small>Elig Update Fee</small>
                                    <input type="text" className="form-control" name="elig_update_fee"   {...register('elig_update_fee', {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,


                                    })} id="" placeholder="" required="" />
                                    {errors.elig_update_fee?.type === 'required' && <p role="alert" className="notvalid">Elig Update Fee  is   required</p>}
                                    {errors.elig_update_fee?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-2">
                                    <small>Prior Auth Fee</small>
                                    <input type="text" className="form-control" name="prior_auth_fee" {...register("prior_auth_fee", {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,

                                    })} id="" placeholder="" required="" />
                                    {errors.prior_auth_fee?.type === 'required' && <p role="alert" className="notvalid">Prior Auth Fee  is   required</p>}
                                    {errors.prior_auth_fee?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-2">
                                    <small>Mail Srv Ltr Prd Fee</small>
                                    <input type="text" className="form-control"  {...register('mail_srv_ltr', {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,

                                    })} name="mail_srv_ltr" id="" placeholder="" required="" />
                                    {errors.mail_srv_ltr?.type === 'required' && <p role="alert" className="notvalid">Mail Srv Ltr Prd Fee  is   required</p>}
                                    {errors.mail_srv_ltr?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-1 float-end">
                    <button type='submit' className="btn btn-theme pt-2 pb-2" style={{ width: '100%' }}>Submit</button>
                </div>
            </form>

            <ToastContainer />

        </>
    )
}

export default Customer;