import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Col, Row } from 'react-bootstrap';
import { objToQueryString } from '../../../../hooks/healper';
import Select from 'react-select';
import SelectSearch from 'react-select-search';



function Customer() {
    const location = useLocation();
    const scollToRef = useRef();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const currentpath = location.pathname.split('/').pop();

    const [customer, setCustomer] = useState([]);

    const [customerlist, setCustomerlist] = useState([]);

    const searchCustomer = (fdata) => {
        var arr = [];
        console.log(fdata.target.value);

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/customer/get?customerid=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setCustomerlist([]);
                    return Promise.reject(error);

                } else {
                    setCustomerlist(data.data);
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getCustomer = (customerid) => {

        // console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/customer/get/${customerid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(data.data);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setCustomer(data.data);
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
        reset(customer)
    }, [customer]);

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

            <Row>
                <Col>
                    <form >
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <small>Search by Customer ID/Name</small>
                                            <input type="text" onKeyUp={(e) => searchCustomer(e)} className="form-control" placeholder='Start typing Customer ID or Name' {...register("customerid")} />
                                            {/* {errors.customerid && <span><p className='notvalid'>This field is required</p></span>} */}
                                        </div>
                                    </div>
                                    {/* <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <small>Customer Name</small>
                                            <input type="text" className="form-control" placeholder='Enter Customer Name to search' {...register("customername")} />
                                        </div>
                                    </div>
                                    <div className="col-md-2 mb-2">
                                        <div className="form-group">
                                            <small>&nbsp;</small><br />
                                            <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }} >Search</button>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </form>
                </Col>
            </Row>

            <Row>
                <Col>
                    {/* {customerlist.length > 0 ? */}
                    <CustomerTable customers={customerlist} getCustomer={getCustomer} />
                    {/* : ''} */}
                </Col>
            </Row>

            <div className="col-md-12 mb-3">
                <h4 style={{ fontWeight: '600' }}> Customer Details</h4>
            </div>

            <div className="nav nav-tabs" id="nav-tab" role="tablist" ref={scollToRef}>
                <Link to="identification" className={'nav-link' + (currentpath == 'identification' ? ' active' : '')}>Identification</Link>
                <Link to="strategy" className={'nav-link' + (currentpath == 'strategy' ? ' active' : '')}>Strategy</Link>
                <Link to="eligibility" className={'nav-link' + (currentpath == 'eligibility' ? ' active' : '')}>Eligibility</Link>
                <Link to="indicators" className={'nav-link' + (currentpath == 'indicators' ? ' active' : '')}>Indicators</Link>
                <Link to="exceptions" className={'nav-link' + (currentpath == 'exceptions' ? ' active' : '')}>Exceptions List/ Charges</Link>

            </div>
            <div className="tab-content" id="nav-tabContent" >
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

function CustomerTable(props) {

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
            CustomerList.push(<Cutomer customer={props.customers[i]} getCustomer={getCustomer} />);
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
                            <h5 className="mb-2">Customers</h5>
                        </div>
                        <div style={{ height: '400px', overflowY: 'scroll' }}>
                            <table className="table  table-bordered" style={{ position: 'relative' }}>
                                <thead className='stickt-thead'>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>Customer Name</th>
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
            <tr style={{ padding: '10px', color: 'red' }}><td colspan="7">No Records Matches..!</td></tr>
        </>
    )
}

function Cutomer(props) {
    return (
        <>
            <tr>
                <td>{props.customer.customer_id}</td>
                <td>{props.customer.customer_name}</td>
                <td><Button variant="primary" onClick={() => props.getCustomer(props.customer.customer_id)}>View</Button></td>
            </tr>
        </>
    )
}

export function Identification(props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [customer, setCustomer] = useOutletContext();
    const [startDate, setStartDate] = useState(new Date());
    const [afterDate, setAfterDate] = useState(new Date());

    const [country, setCountry] = useState();

    const Countries = [
        { label: "Albania", value: 355 },
        { label: "Argentina", value: 54 },
        { label: "Austria", value: 43 },
        { label: "Cocos Islands", value: 61 },
        { label: "Kuwait", value: 965 },
        { label: "Sweden", value: 46 },
        { label: "Venezuela", value: 58 }
    ];

    const Cstates = [
        { label: "AD", value: 1 },
        { label: "KG", value: 2 },
        
    ];


    const onCountryChange = (e) => {

        setCountry(e.target.value);
        getCountries();
    }






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
                // navigate("/dashboard/user/customer/strategy");

                // this.setState({ postId: data.id })
            })
            .catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    const getStates = data => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(process.env.REACT_APP_API_BASEURL + '/api/states/country', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                console.log(data.data);
                setStates(data.data);

                // props.onChange(data);

                // this.setState({ postId: data.id })
            })
            .catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    const getCountries = data => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(process.env.REACT_APP_API_BASEURL + '/api/countries', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                console.log(data.data);
                setCountries(data.data);

                // props.onChange(data);

                // this.setState({ postId: data.id })
            })
            .catch(error => {
                // this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    useEffect(() => { reset(customer) }, [customer]);
    const countries = [
        { value: 'Jamica', label: 'Jamaica' },
        
    ];


    const [states, setStates] = useState([]);

    // const [countries, setCountries] = useState();
    
    const [selectedOption, setSelectedOption] = useState(null);


    const onStateChange = (e) => {
        getStates();
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
                                    <input type="text" {...register("customer_id", {
                                        required: true,
                                        maxLength: 20,
                                        pattern: /^(0|[1-9][0-9]*)$/,
                                    })}
                                        className="form-control" name="customer_id" id="" placeholder="Customer ID"
                                    />
                                    {errors.customer_id?.type === 'required' && <p role="alert" className="notvalid">Customer Id required</p>}
                                    {errors.customer_id?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}


                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="mb-1">Address</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Name</small>
                                            <input type="text" {...register("customer_name", {
                                                required: true,
                                                maxLength: 20,
                                                pattern: /^[A-Za-z]+$/i
                                            })} name="customer_name" className="form-control" placeholder="Name" />
                                            {errors.customer_name?.type === 'required' && <p role="alert" className="notvalid">Name is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Address 1</small>
                                            <input type="text" {...register("address_1", {
                                                required: true,
                                                maxLength: 20,
                                                pattern: /^[A-Za-z]+$/i

                                            })} name="address_1" className="form-control" placeholder="Address 1" />
                                            {errors.address_1?.type === 'required' && <p role="alert" className="notvalid">Address is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Address 2</small>
                                            <input type="text" {...register("address_2", {
                                                required: true,
                                                maxLength: 20,
                                                pattern: /^[A-Za-z]+$/i
                                            })} className="form-control" name="address_2" id="" placeholder="Address 2" />
                                            {errors.address_2?.type === 'required' && <p role="alert" className="notvalid">Address is  required</p>}

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Country</small>
                                               

                                            <Select   {...register("country", {
                                                required: true,

                                            })} name="city" className="form-select"
                                            defaultValue={{ label: "Jamica", value: 1 }}
                                                onChange={setSelectedOption}
                                                options={countries}
                                            />

                                            {errors.country?.type === 'required' && <p role="alert" className="notvalid">Country is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>City / State</small>
                                            <Select {...register("city", {
                                                required: true,

                                            })} onClick={onStateChange}  name="city" className="form-select"  defaultValue={{ label: "AD", value: 1 }}          options={Cstates}
                                            />

                                                {/* {states.map(option => (
                                                    <option key={option.state_code} value={option.state_code}>
                                                        {option.state_code} --{option.description}
                                                    </option>
                                                ))} */}
                                            {/* </select> */}

                                            {errors.city?.type === 'required' && <p role="alert" className="notvalid">City is  required</p>}


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>ZIP Code</small>
                                            <input type="text" {...register("zip_code", {
                                                required: true,
                                            })} className="form-control" name="zip_code" id="" placeholder="ZIP Code" />
                                            {errors.zip_code?.type === 'required' && <p role="alert" className="notvalid">Zip code  is  required</p>}

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
                                            <input type="text" {...register("edi_address", {
                                                required: true,
                                            })} className="form-control" name="edi_address" id="" placeholder="EDI Address" />

                                            {errors.edi_address?.type === 'required' && <p role="alert" className="notvalid">EDI Address  is  required</p>}


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
                                    {/* <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Test</small>
                                            <input type="text" {...register("test", {
                                                required: true,

                                            })} className="form-control" name="test" id="" placeholder="Test" />
                                            {errors.test?.type === 'required' && <p role="alert" className="notvalid">Test  is  required</p>}

                                        </div>
                                    </div> */}
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Type</small>
                                            <input type="text" {...register("customer_type", {
                                                required: true,
                                            })} className="form-control" name="customer_type" id="" placeholder="Type" />
                                            {errors.customer_type?.type === 'required' && <p role="alert" className="notvalid">Type  is  required</p>}

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
                                            <input type="date" {...register("effective_date", {
                                                required: true,
                                            })} className="form-control" onChange={StartDateChange} name="effective_date" id="" placeholder="Address 1" />
                                            Effective Date
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termination Date</small>
                                            <input type="date" {...register("termination_date", {
                                                required: true,
                                            })} className="form-control" name="termination_date" id="" min={afterDate} placeholder="Address 2" />
                                            {errors.termination_date?.type === 'required' && <p role="alert" className="notvalid">Termination Date  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Policy Ann. Month</small>
                                            <select {...register("policy_anniv_month", {
                                                required: true,
                                            })} name="policy_anniv_month" className="form-select">

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
                                            {errors.policy_anniv_month?.type === 'required' && <p role="alert" className="notvalid">Policy Ann. Month  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Policy Ann. Day</small>
                                            <input type="text" {...register("policy_anniv_day", {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,

                                            })} name="policy_anniv_day" className="form-control" id="" placeholder="Enter" />
                                            {errors.policy_anniv_day?.type === 'required' && <p role="alert" className="notvalid">Policy Ann. Month  is  required</p>}
                                            {errors.policy_anniv_day?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}


                                        </div>
                                    </div>
                                </div>
                                <h5 className="mb-1">Census</h5>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group mb-2">
                                            <small>Census Date</small>
                                            <input type="date" {...register("census_date", {
                                                required: true,
                                            })} className="form-control" name="census_date" id="" placeholder="Census Date" />
                                            {errors.census_date?.type === 'required' && <p role="alert" className="notvalid">Census Date  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Active Contracts</small>
                                            <input type="text" {...register("num_of_active_contracts", {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,
                                            })} className="form-control" name="num_of_active_contracts" id="" placeholder="Active Contracts" />
                                            {errors.num_of_active_contracts?.type === 'required' && <p role="alert" className="notvalid">Number of Active Contracts field is required</p>}
                                            {errors.num_of_active_contracts?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Active Memebers</small>
                                            <input type="text" {...register("num_of_active_members", {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,
                                            })} className="form-control" name="num_of_active_members" id="" placeholder="Active Memebers" />
                                            {errors.num_of_active_members?.type === 'required' && <p role="alert" className="notvalid">Number of Active Memebers field is required</p>}
                                            {errors.num_of_active_members?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Termed Contracts</small>
                                            <input type="text" {...register("num_of_termed_contracts", {

                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,

                                            })} className="form-control" name="num_of_termed_contracts" id="" placeholder="Termed Contracts" />
                                            {errors.num_of_termed_contracts?.type === 'required' && <p role="alert" className="notvalid">Number of Termed Contracts field is required</p>}
                                            {errors.num_of_termed_contracts?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Termed Memebers</small>
                                            <input type="text" {...register("num_of_termed_members", {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,
                                            })} className="form-control" name="num_of_termed_members" id="" placeholder="Termed Memebers" />
                                            {errors.num_of_termed_members?.type === 'required' && <p role="alert" className="notvalid">Number of Termed Memebers field is required</p>}
                                            {errors.num_of_termed_members?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Pending Contracts</small>
                                            <input type="text" {...register("num_of_pending_contracts", {

                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,

                                            })} className="form-control" name="num_of_pending_contracts" id="" placeholder="Pending Contracts" />

                                            {errors.num_of_pending_contracts?.type === 'required' && <p role="alert" className="notvalid">Number of Active Contracts field is required</p>}
                                            {errors.num_of_pending_contracts?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Number of Pending Memebers</small>
                                            <input type="text" {...register("num_of_pending_members", {
                                                required: true,
                                                pattern: /^(0|[1-9][0-9]*)$/,
                                            })} className="form-control" name="num_of_pending_members" id="" placeholder="Pending Members" />
                                            {errors.num_of_pending_members?.type === 'required' && <p role="alert" className="notvalid">Number of Active Contracts field is required</p>}
                                            {errors.num_of_pending_members?.type === 'pattern' && <p role="alert" className="notvalid">Field should be number</p>}


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


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [customer, setCustomer] = useOutletContext();
    const[superoptions,setSuperOptions]=useState(false)


    useEffect(() => { reset(customer) }, [customer]);

useEffect(()=>{
     if( !superoptions){
        getAllSuperProviderNetworkIds();

    }
}, [superoptions])

    const [planidslist, setPlanidsList] = useState([]);


    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm({
        mode: "onBlur",
    });

    const {
        register: register3,
        formState: { errors: errors3 },
        handleSubmit: handleSubmit3,
    } = useForm({
        mode: "onBlur",
    });

    
    const tiersMove = () => {
        var val1 = new Date(document.getElementById("tier_1").value);
        var val2 = new Date(document.getElementById("tier_2").value);
        var val3 = new Date(document.getElementById("tier_3").value);



        const tier1_formated_date = val1.toLocaleDateString("en-US");
        const tier1_date = customdateFormat(tier1_formated_date, 'yyyy-MM-dd')
        tier1setValue(tier1_date);

        const tier2_formated_date = val2.toLocaleDateString("en-US");
        const tier2_date = customdateFormat(tier2_formated_date, 'yyyy-MM-dd')
        tier2setValue(tier2_date);

        var today = new Date(0);

        tiersetValue(today);



    }

    const handlechangetier1 = (e) => {
        tiersetValue(e.target.value);
    }


    const handlechangetier2 = (e) => {
        tier1setValue(e.target.value);
    }


    const handlechangetier3 = (e) => {
        tier2setValue(e.target.value);
    }




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

        alert(data);
        searchnetworkid();

    }

    const searchplanid = (fdata) => {
        var arr = [];
        alert(fdata.target.value);

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan/get/${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setPlanidsList([]);
                    console.log(planidslist);
                    return Promise.reject(error);

                } else {
                    console.log(data);
                    setPlanidsList(data.data);
                    console.log(planidslist);


                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const options = [
        { value: 'UWI_STAFF', label: 'UWI_STAFF' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    const searchnetworkid = (fdata) => {
        var arr = [];

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/superprovidernetwork/get/${fdata}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setPlanidsList([]);
                    console.log(planidslist);
                    return Promise.reject(error);

                } else {
                    console.log(data);
                    setPlanidsList(data.data);
                    console.log(planidslist);


                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getAllSuperProviderNetworkIds = (fdata) => {
        var arr = [];

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/superprovidernetworkids`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setPlanidsList([]);
                    // console.log(planidslist);
                    return Promise.reject(error);

                } else {
                    console.log(data.data);
                    setSuperOptions(data.data);
                    // console.log(superoptions);


                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

const[value,setValue]=useState(null);


const [selectedOption, setSelectedOption] = useState(null);

    const mahesh=(e)=>{
        console.log(e);
        alert(e.value)
        setValue(e.value);
        // searchnetworkid(e.value)
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



            <form key={10} >



                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Plan Search</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className='row align-items-center'>

                                    <div className="col-md-5  align-items-center">
                                        <div className="form-group mb-3">
                                            <small>Plan ID</small>
                                            <input type="text" onKeyUp={(e) => searchplanid(e)}  {...register2("plan_id", {
                                                required: true,
                                            })} className="form-control" name="plan_id" id="" />
                                            {errors2.plan_id?.type === 'required' && <p role="alert" className="notvalid">Plan Id is required </p>}

                                        </div>
                                    </div>



                                    <div className="col-md-5 align-items-center">


                                        <div className="form-group mb-3">

                                            <button  type="submit" style={successbtnstyle} className='btn btn-success float-right'>Search</button>

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
                                                <input className="align-items-right" type="date"  {...register2("effective_from", {
                                                })} />
                                                {errors2.effective_from?.type === 'required' && <p role="alert" className="notvalid">Effective From date  is Required</p>}

                                            </div>
                                        </div>


                                        <div className="col-md-5  align-items-center">
                                            <div className="form-group mb-4">
                                                <small>Effective To :</small>
                                                <input className="align-items-right" type="date"  {...register2("effective_to", {
                                                })} className="form-control" name="effective_to" id="" />
                                                {errors2.effective_to?.type === 'required' && <p role="alert" className="notvalid">Effective To date required</p>}

                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>

                                        <h6 className='text-align-center'>Date Range will Displays all plans that have  effective date during that time period</h6>

                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col-md-12 table-responsive">
                                            <table className="table table-bordered  table-responsive">
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

                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-info">Add Benefit Code</button>
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
                                <div className="form-group">
                                    <small>Tier 1</small>
                                    <input type="date"  {...register("coverage_eff_date_1", {
                                        // required: true,
                                    })} className="form-control" name="coverage_eff_date_1" id="" />
                                    {errors.coverage_eff_date_1?.type === 'required' && <p role="alert" className="notvalid">Tier 1 date  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group ">
                                    <small>Tier 2</small>
                                    <input type="date" {...register("coverage_eff_date_2", {
                                        // required: true,
                                    })} className="form-control" name="coverage_eff_date_2" id="" />
                                    {errors.coverage_eff_date_2?.type === 'required' && <p role="alert" className="notvalid">Tier 2 date  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group ">
                                    <small>Tier 3</small>
                                    <input type="date" {...register("coverage_eff_date_3", {
                                        // required: true,
                                    })} className="form-control" name="coverage_eff_date_3" id="" />
                                    {errors.coverage_eff_date_3?.type === 'required' && <p role="alert" className="notvalid">Tier 3 date  required</p>}


                                </div>
                            </div>

                            <div className="col-md-3 align-items-center">
                                <p>Plan ID</p>

                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <small>&nbsp;</small>

                                    <input type="text" {...register("plan_id_1", {
                                        // required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,
                                    })} className="form-control" name="plan_id_1" id="" />
                                    <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal"><span className="fa fa-search form-icon"></span></a>

                                    {/* <a className="btn  btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add Benifit Code <i className="fa fa-search form-icon"></i></a> */}


                                    {/* {errors.plan_id_1?.type === 'required' && <p role="alert" className="notvalid">Plan id is  required</p>}
                                    {errors.plan_id_1?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>} */}

                                </div>


                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <div className="form-group mb-3">
                                        <small>&nbsp;</small>
                                        <input type="text" {...register("plan_id_2", {
                                            // required: true,
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
                                        <small>&nbsp;</small>

                                        <input type="text" {...register("plan_id_3", {
                                            // required: true,
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
                                    <input type="text" {...register("misc_data_1", {
                                        // required: true,
                                    })} className="form-control" name="misc_data_1" id="" />
                                    {errors.misc_data_1?.type === 'required' && <p role="alert" className="notvalid">miscellaneous data is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" {...register("misc_data_2", {
                                        // required: true,
                                    })} className="form-control" name="misc_data_2" id="" />
                                    {errors.misc_data_2?.type === 'required' && <p role="alert" className="notvalid">miscellaneous data is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" {...register("misc_data_3", {
                                        // required: true,
                                    })} className="form-control" name="misc_data_3" id="" />
                                    {errors.misc_data_3?.type === 'required' && <p role="alert" className="notvalid">miscellaneous data is  required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12">
                                <h5 className="mb-2">Provider Verification Options :</h5>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <small>Provider Options</small> 
                                    {/* Column not there in customer table */}
                                    <select className="form-select" {...register("pharmacy_exceptions_flag", {
                                        // required: true
                                    })} name="pharmacy_exceptions_flag">
                                        <option value="">--select--</option>
                                        <option value="1">No Provider Check</option>
                                        <option value="2">Validate Provider Format</option>
                                        <option value="3">Provider must exist within Provider Master</option>
                                        <option value="4">Must exist in Provider Network</option>
                                        <option value="5">Validate Provider In/Out of Network</option>
                                    </select>
                                    {errors.pharmacy_exceptions_flag?.type === 'required' && <p role="alert" className="notvalid">Provider Options is  required</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <small>Super Provider Networks</small>
                                    {/* <input type="text" className="form-control" {...register("super_rx_network_id", {
                                        required: true,
                                    })} name="super_rx_network_id" id="" /> */}
                                    {/* <a href="" data-bs-toggle="modal" data-bs-target="#supernetwork"><span className="fa fa-search form-icon"></span></a> */}
                                    <Select    
 options={superoptions}   name="super_rx_network_id" value={value}  {...register('super_rx_network_id')}  onChange={(e) => mahesh(e)}  />
                               


                               

                               

                                


                                   


                                    {errors.super_rx_network_id?.type === 'required' && <p role="alert" className="notvalid">Super Provider Networks field is   required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12">
                                <h5 className="mb-2">Prescriber Verification Options</h5>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <small>Prescriber Options</small>
                                    <select className="form-select" {...register("prescriber_exceptions_flag", {
                                        // required: true,
                                    })} name="prescriber_exceptions_flag" >
                                        <option value="">--select--</option>
                                        <option value="1">None</option>
                                        <option value="2">Validate DEA Code</option>
                                        <option value="3">primary Prescriber Validation</option>
                                        <option value="4">Must Exist in Prescriber Master</option>

                                    </select>
                                    {errors.prescriber_exceptions_flag?.type === 'required' && <p role="alert" className="notvalid">Prescriber Options is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <small>Prescriber Options 2</small>
                                    <select className="form-select" {...register("prescriber_exceptions_flag", {
                                        // required: true,
                                    })} name="prescriber_exceptions_flag">
                                        <option value="">--select--</option>
                                        <option value="1">None</option>
                                        <option value="2">Validate DEA Code</option>
                                        <option value="3">primary Prescriber Validation</option>
                                        <option value="4">Must Exist in Prescriber Master</option>
                                    </select>
                                    {errors.prescriber_exceptions_flag?.type === 'required' && <p role="alert" className="notvalid">Prescriber Options is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <small>Prescriber Grouping ID</small>


                                    {/* // not included in DB */}
                                    <select className="form-select" {...register("Prescriber_Grouping_id", {
                                        // required: true,
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


            <form key={4} onSubmit={handleSubmit3(searchSubmit)}>



                <div className="modal fade" id="supernetwork" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Search Super Provider Networks</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className='row align-items-center'>
                                    <h6>Network ID/NetworkName</h6>
                                    <br></br>
<div>
<SelectSearch options={options} search="true" value="sv" name="language" placeholder="Choose your language" />

</div>


                                    {/* <div className="col-md-5  align-items-center">
                                        <div className="form-group mb-3">
                                            <small>Network ID/NetworkName</small>
                                            <input type="text"  {...register2("rva_list_id", {
                                                required: true,
                                            })} className="form-control" name="rva_list_id" id="" />
                                            {errors2.rva_list_id?.type === 'required' && <p role="alert" className="notvalid">Network Id/Name is required </p>}

                                        </div>
                                    </div> */}


                                    <div className="col-md-5 align-items-center">


                                        {/* <div className="form-group mb-3">

                                            <button    style={successbtnstyle} className='btn btn-success float-right'>Search</button>

                                        </div> */}

                                    </div>



                                    {/* <div className="col-md-5  align-items-center">
                                        <div className="form-group mb-3">
                                            <small>Network Name</small>
                                            <input type="text"  {...register2("list_name", {
                                            })} className="form-control" name="list_name" id="" />
                                            {errors2.plan_id?.type === 'required' && <p role="alert" className="notvalid">Plan Id is required </p>}

                                        </div>
                                    </div> */}





                                </div>

                                <div>


                                    <br></br>
                                    <div className="row">
                                        <div className="col-md-12 table-responsive">
                                            <table className="table table-bordered  table-responsive">
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

                          
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export function Eligibility(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
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


        // alert('mahesh');

    }



    const onSubmit = data => {
        var Eligibilitystatid = customer;
        Eligibilitystatid['Eligibility'] = data;
        setCustomer(Eligibilitystatid);
        console.log(customer);

    }

    useEffect(() => { reset(customer) }, [customer]);





    return (
        <>


            <form key={1} onSubmit={handleSubmit2(searchSubmit)}>



                <div className="modal fade" id="eligibilityidModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Search Eligibility Validation Lists</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

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
                                    <div className="row">
                                        <div className="col-md-12 table-responsive">
                                            <table className="table table-bordered  table-responsive">
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

                            {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-info">Add Benefit Code</button>
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


                                <select className="form-select" {...register("auto_term_level", {
                                    // required: true,
                                })} name="auto_term_level" >
                                    <option value="">--select--</option>
                                    <option value="0">Overlap Allowed Within Database</option>
                                    <option value="1">Automated Termination within client</option>
                                    <option value="2">Automated Termination within Customer</option>
                                    <option value="3">Automated Termination within database</option>
                                    <option value="4">No Automated Termination-Reject-within database</option>

                                </select>
                                {errors.auto_term_level?.type === 'required' && <p role="alert" className="notvalid">Auto Termination Level field is  required</p>}
                                <p className="input-hint">Overlap Allowed Within Database</p>
                            </div>
                            <div className="col-md-4 mb-2">
                                <small>Auto Family Member Terminate</small>
                                <select className="form-select"  {...register("auto_fam_member_term", {
                                    required: true,
                                })} name="auto_fam_member_term">
                                    <option value="">--select--</option>

                                    <option value="0">No Automated Termination</option>
                                    <option value="1">Terminate family member if Termination received for cardholder</option>

                                </select>
                                {errors.auto_family_member_terminate?.type === 'required' && <p role="alert" className="notvalid">Auto Family Member Terminate field is  required</p>}

                                <p className="input-hint">No Automated Family Member Terminations</p>
                            </div>
                            <div className="col-md-4 mb-2">
                                <small>Eligibility Type</small>
                                <select className="form-select" {...register("elig_type", {
                                    required: true,

                                })} name="elig_type">
                                    <option value="">--select--</option>
                                    <option value="1">Not Specified </option>
                                    <option value="2"> Individual Member Records Exist</option>
                                    <option value="3">Family Member Records Exist</option>
                                </select>
                                {errors.elig_type?.type === 'required' && <p role="alert" className="notvalid">Eligibility Type field is  required</p>}

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
                                <select className="form-select" {...register("overlap_coverage_tie_breaker", {
                                    required: true,

                                })} name="overlap_coverage_tie_breaker">
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
                                <select className="form-select" {...register("elig_date_edit_ovr_flag", {
                                    required: true,
                                })} name="elig_date_edit_ovr_flag">
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
                                    <input type="text" className="form-control"  {...register("elig_validation_id", {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,

                                    })} name="elig_validation_id" id="" required="" />

                                    <a href="" data-bs-toggle="modal" data-bs-target="#eligibilityidModal"><span className="fa fa-search form-icon"></span></a>

                                </div>
                                {errors.eligibility_validation_list?.type === 'required' && <p role="alert" className="notvalid">Eligibility Validation List ID is  required</p>}
                                {errors.eligibility_validation_list?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

                            </div>
                            <div className="col-md-4 mb-2">
                                <small>Authorization Transfer</small>

                                <select className="form-select"  {...register("auth_xfer_ind", {
                                    required: true,
                                })} name="auth_xfer_ind">
                                    <option value="">--select--</option>
                                    <option value="0">Not Specified</option>
                                    <option value="1">Customer</option>
                                    <option value="2">Customer/Client</option>
                                    <option value="3">Customer/Client/Group</option>
                                </select>
                                {errors.auth_xfer_ind?.type === 'required' && <p role="alert" className="notvalid">Authorization Transfer is  required</p>}

                            </div>


                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Change Logging</h5>
                            </div>
                            <div className="col-md-4 mb-2">
                                {/* column not found in db */}
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


    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const [customer, setCustomer] = useOutletContext();

    const navigate = useNavigate();


    const onSubmit = data => {
        var Indicatorsid = customer;
        Indicatorsid['Indicators'] = data;
        setCustomer(Indicatorsid);
        console.log(customer);
    }

    useEffect(() => { reset(customer) }, [customer]);



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
                                <select className="form-select" {...register("max_num_trans_interim_elig", {
                                    required: true,
                                })} name='max_num_trans_interim_elig'>
                                    <option value="">--select-- </option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                    <option value="3">option 3</option>
                                </select>
                                {errors.max_num_trans_interim_elig?.type === 'required' && <p role="alert" className="notvalid">Maximum Number Of Transactions Allowed For An Interim field  is  required</p>}

                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Maximum Number Of Days That An Interim Member Will Be..</small>
                                <select className="form-select" {...register("max_days_interim_elig", {
                                    required: true,
                                })} name="max_days_interim_elig">
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
                                    {/* DB COLUMN NOT FOUND */}
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
                                    <input type="text" className="form-control" name="date_written_to_first_fill" {...register("date_written_to_first_fill")} id="" placeholder="" required="" />

                                    {errors.date_written_to_first_fill?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Written to First Fill is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Filled to Date Submitted</small>
                                    <input type="text" className="form-control" {...register("date_filled_to_sub_online", {
                                        required: true,
                                    })} name="date_filled_to_sub_online" id="" placeholder="" required="" />
                                    {errors.date_filled_to_sub_online?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Filled to Date Submitted field  is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Filled to Submitted (Manual)</small>
                                    <input type="text" className="form-control"  {...register("date_filled_to_sub_dmr", {
                                        required: true,
                                    })} name="date_filled_to_sub_dmr" id="" placeholder="" required="" />
                                    {errors.date_filled_to_sub_dmr?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Filled to Submitted (Manual) field  is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from DateFilled to Future Fill Date</small>
                                    <input type="text" className="form-control"  {...register("date_sub_to_filled_future", {
                                        required: true,
                                    })} name="date_sub_to_filled_future" id="" placeholder="" required="" />
                                    {errors.no_of_days_from_date_filled_to_future?.type === 'required' && <p role="alert" className="notvalid">Number of Days from DateFilled to Future Fill Date field  is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days for Reversal</small>
                                    <input type="text" className="form-control" name="days_for_reversals" {...register("days_for_reversals", {
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
                                    <input type="checkbox" id="Tax" {...register("non_profit_tax_exempt_flag", {
                                        required: true,
                                    })} name="non_profit_tax_exempt_flag" className="d-none" />
                                    <label for="Tax">Tax Exempty Entity</label>
                                    {errors.non_profit_tax_exempt_flag?.type === 'required' && <p role="alert" className="notvalid">Tax Exempty Entity field  is   required</p>}

                                </div>
                            </div>

                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="u&c" {...register("reqd_u_and_c_flag", {
                                        required: true,
                                    })} name="reqd_u_and_c_flag" className="d-none" />
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
    console.log(useOutletContext());

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

    useEffect(() => {

    }, [customer]);




    const onSubmit = data => {


        var Exceptionsid = customer;
        Exceptionsid['Exceptions'] = data;
        setCustomer(Exceptionsid);


        console.log('mahesh');
        postTOBackend();

    }



    console.log(process.env.REACT_APP_API_BASEURL);

    const postTOBackend = () => {
        // alert('mahesh');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        };
        console.log(requestOptions); debugger;

        fetch(process.env.REACT_APP_API_BASEURL + '/api/customer/add', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // alert(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                // console.log(data);


                if (response === '200') {
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
                {/* <button type='button' onClick={submit2}>Submit2</button> */}


                <div className="modal fade" id="rvalistidModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Search RVA Lists</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

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
                                    <div className="row">
                                        <div className="col-md-12 table-responsive">
                                            <table className="table table-bordered  table-responsive">
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

                            {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-info">Add Benefit Code</button>
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
                                    <input type="checkbox" id="Plan" className="d-none" {...register("excl_plan_ndc_gpi_excep_flag", {
                                        required: true,
                                    })} name="excl_plan_ndc_gpi_excep_flag" />
                                    <label for="Plan">Bypass Plan NDC/GPI Exception List Processing</label>
                                    {errors.bypass_plan_ndc_gpi?.type === 'required' && <p role="alert" className="notvalid">Bypass Plan NDC/GPI Exception List Processing field   is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="System" className="d-none" {...register('excl_sys_ndc_gpi_excep_flag', {
                                        required: true,
                                    })} name="excl_sys_ndc_gpi_excep_flag" />
                                    <label for="System">Bypass System NDC/GPI Exception List Processing</label>
                                    {errors.excl_sys_ndc_gpi_excep_flag?.type === 'required' && <p role="alert" className="notvalid">Bypass System NDC/GPI Exception List Processing  field   is   required</p>}

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
                                    <input type="text" className="form-control" name="admin_percent" {...register('admin_percent', {
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
                                    <input type="text" className="form-control" name="ucf_fee"   {...register("ucf_fee", {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,
                                    })} id="" placeholder="" required="" />
                                    {errors.ucf_fee?.type === 'required' && <p role="alert" className="notvalid">UCF Claim Fee  field   is   required</p>}
                                    {errors.ucf_fee?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-2">
                                    <small>Elig Update Fee</small>
                                    <input type="text" className="form-control" name="elig_upd_fee"   {...register('elig_upd_fee', {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,


                                    })} id="" placeholder="" required="" />
                                    {errors.elig_upd_fee?.type === 'required' && <p role="alert" className="notvalid">Elig Update Fee  is   required</p>}
                                    {errors.elig_upd_fee?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

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
                                    <input type="text" className="form-control"  {...register('mail_ord_letter_fee', {
                                        required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,

                                    })} name="mail_ord_letter_fee" id="" placeholder="" required="" />
                                    {errors.mail_ord_letter_fee?.type === 'required' && <p role="alert" className="notvalid">Mail Srv Ltr Prd Fee  is   required</p>}
                                    {errors.mail_ord_letter_fee?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}

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