
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';


export default function Clientgroup() {
    const location = useLocation();
    const scollToRef = useRef();
    const currentpath = location.pathname.split('/').pop();
    const [clientgroup, setClientgroup] = useState(false);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [clientGrouplist, setClientGrouplist] = useState([]);

    const [adding, setAdding] = useState(false);


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
        // console.log(clientid);
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

    // useEffect(() => {
    //     reset(clientgroup)
    // }, [clientgroup]);


    useEffect(() => {
        if (clientgroup) {
            setAdding(false);

        } else {
            setAdding(true);
        }

        document.title = 'Benefit Code | ProHealthi';

    }, [clientgroup, adding]);

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
                            <li><a href="">Client/Client Group</a></li>
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
                <h4 style={{ fontWeight: '600' }}>Client/Client Group</h4>
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
                                    <small>Customer ID/ client ID/ group ID/ group name</small>
                                    {/* <input type="text" className="form-control" placeholder="Customer ID" name="" id="" /> */}
                                    {/* <a href=""><span className="fa fa-search form-icon"></span></a> */}
                                    <input type="text" onKeyUp={(e) => searchClientGroup(e)} className="form-control" placeholder='Start typing customer ID/client ID or group ID ' {...register("clientid")} />
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

                            {/* <div className="col-md-12">
                                <div className="form-group">
                                    <input type="checkbox" id="Return" className="d-none" />
                                    <label htmlFor="Return">Return all groups to my list</label>
                                </div>
                            </div> */}
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

                            <TableBody customers={clientGrouplist} getClient={getClientGroup} />

                        </div>
                    </div>
                </div>
            </div>

            <ClientgroupForm  formData={clientgroup} adding={adding} selected={clientgroup} />
            
            <Footer />

        </>
    );
}


function ClientgroupForm(props) {

    const { register, handleSubmit,control, watch, reset, formState: { errors } } = useForm();

    useEffect(() => { reset(props.formData) }, [props.formData]);





    const addCode = (data) => {
        console.log(data);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        };
        // console.log(watch(data)); 
        if (process.env.REACT_APP_API_BASEURL == 'NOT') {
            toast.success('Added Successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        } else {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/clientgroup/add`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    // console.log(response);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        reset(data.data);
                        console.log(data.data);
                        var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                        toast.success(msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,

                        });
                    }


                    if (response === '200') {
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }

    }
    const onSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {


        if (props.adding) {
            reset({ rx_network_rule_id: '', rx_network_rule_name: '', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ rx_network_rule_id: '', rx_network_rule_name: '', description: '', pharm_type_variation_ind: '', network_part_variation_ind: '', claim_type_variation_ind: '', plan_accum_deduct_id: '', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);


    const loadStates = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/state/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ state_code }) => ({
                            state_label: state_code,
                            state_value: state_code

                        }))
                    )
                })
        })
    }



    const loadCountries = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/countries/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ country_code }) => ({
                            country_label: country_code,
                            country_value: country_code

                        }))
                    )
                })
        })
    }


    const loadPlanIDS = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/planid/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ plan_id }) => ({
                            plan_id_label: plan_id,
                            plan_id_value: plan_id

                        }))
                    )
                })
        })
    }


    const loadSuperProviderNetworksOptions = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/supernetwork/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ super_rx_network_id }) => ({
                            super_label: super_rx_network_id,
                            super_value: super_rx_network_id

                        }))
                    )
                })
        })
    }



    const loadEligibilityValidationIds = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/eligibility/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ elig_validation_id }) => ({
                            elig_label: elig_validation_id,
                            elig_value: elig_validation_id

                        }))
                    )
                })
        })
    }

    const loadRvaListIds = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/rva-list/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ rva_list_id }) => ({
                            rva_label: rva_list_id,
                            rva_value: rva_list_id

                        }))
                    )
                })
        })
    }


    return (
        <>
            <form onSubmit={handleSubmit(addCode)} >
                <div class="data">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#identification" type="button" role="tab" aria-controls="nav-home" aria-selected="true">identification</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#strategy" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">strategy</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#eligibility" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Eligibility</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#indicators" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Indicators</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#charges" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">charges</button>



                    </div>

                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="identification" role="tabpanel" aria-labelledby="nav-home-tab">

                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className='row'>
                                        <div className="col-md-7 mb-3">
                                            <h5 className="mb-2">Customer ID</h5>

                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group mb-2">
                                                        <small>Customer ID</small>
                                                        <input type="text" class="form-control" {...register('customer_id')} name="customer_id" id="" placeholder="Customer ID" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group mb-2">
                                                        <small>Client ID</small>
                                                        <input type="text" class="form-control"   {...register('client_id')} name="client_id" id="" placeholder="Client ID" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group mb-2">
                                                        <small>Group ID</small>
                                                        <input type="text" class="form-control" {...register('client_group_id')}  name="client_group_id" id="" placeholder="Group ID"/>
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
                                                            //required: true,
                                                        })} name="group_name" id="" placeholder="Name" />
                                                        {errors.group_name?.type === 'required' && <p role="alert" className="notvalid">customer name is   required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Address 1</small>
                                                        <input type="text" className="form-control" {...register('address_1', {
                                                            //required: true,
                                                        })} name="address_1" id="" placeholder="Address 1" />
                                                        {errors.address_1?.type === 'required' && <p role="alert" className="notvalid">address is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Address 2</small>
                                                        <input type="text" className="form-control" {...register('address_2', {
                                                            //required: true,
                                                        })} name="address_2" id="" placeholder="Address 2" />
                                                        {errors.address_2?.type === 'required' && <p role="alert" className="notvalid">address is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Country</small>


                                                        <Controller name="rule_id"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <AsyncSelect
                                                                    {...field}
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    // value={selectedValue}
                                                                    getOptionLabel={e => e.country_label}
                                                                    getOptionValue={e => e.country_value}
                                                                    loadOptions={loadCountries}
                                                                    // onInputChange={handlePriceScheduleInput}
                                                                    // onChange={handleChange}
                                                                    placeholder="Rule Id "
                                                                    value={{ country_label: props.formData.country_code, country_value: props.formData.country_code }}

                                                                />
                                                            )} />   

                                                        {errors.country?.type === 'required' && <p role="alert" className="notvalid">Country is  required</p>}

                                                    </div>

                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>City / State</small>
                                                        <Controller name="rule_id"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <AsyncSelect
                                                                    {...field}
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    // value={selectedValue}
                                                                    getOptionLabel={e => e.state_label}
                                                                    getOptionValue={e => e.state_value}
                                                                    loadOptions={loadStates}
                                                                    // onInputChange={handlePriceScheduleInput}
                                                                    // onChange={handleChange}
                                                                    placeholder="Rule Id "
                                                                    value={{ state_label: props.formData.state_code, state_value: props.formData.state_code }}

                                                                />
                                                            )} />

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
                                                        <input type="text" {...register('zip_code', {
                                                            //required: true,
                                                        })} className="form-control" name="zip_code" id="" placeholder="ZIP Code" />
                                                        {errors.zip_code?.type === 'required' && <p role="alert" className="notvalid">Zip code  is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Phone</small>
                                                        <input {...register('phone', {
                                                            //required: true,
                                                        })} type="text" className="form-control" name="phone" id="" placeholder="Phone" />
                                                        {errors.phone?.type === 'required' && <p role="alert" className="notvalid">phone  is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Fax</small>
                                                        <input type="text" {...register('fax', {
                                                            //required: true,
                                                        })} className="form-control" name="fax" id="" placeholder="Fax" />
                                                        {errors.phone?.type === 'required' && <p role="alert" className="notvalid">fax  is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>EDI Address</small>
                                                        <input type="text" {...register('edi_address', {
                                                            //required: true,
                                                        })} className="form-control" name="edi_address" id="" placeholder="EDI Address" />
                                                        {errors.edi_address?.type === 'required' && <p role="alert" className="notvalid">EDI Address is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Contact</small>
                                                        <input  {...register('contact', {
                                                            //required: true,
                                                        })} type="text" className="form-control" name="contact" id="" placeholder="Contact" />
                                                        {errors.contact?.type === 'required' && <p role="alert" className="notvalid">Contact is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Test</small>
                                                        <input {...register('test', {
                                                            //required: true,
                                                        })} type="text" className="form-control" name="test" id="" placeholder="Test" />
                                                        {errors.contact?.type === 'required' && <p role="alert" className="notvalid">Test is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Type</small>
                                                        <input type="text"  {...register('elig_type', {
                                                            //required: true,
                                                        })} className="form-control" name="elig_type" id="" placeholder="Type" />
                                                        {errors.elig_type?.type === 'required' && <p role="alert" className="notvalid">Type is  required</p>}

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
                                                            //required: true,
                                                        })} name="effective_date" id="" placeholder="Address 1" />
                                                        {errors.effective_date?.type === 'required' && <p role="alert" className="notvalid">Effective Date is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Termination Date</small>
                                                        <input {...register('termination_date', {
                                                            //required: true,
                                                        })} type="date" className="form-control" name="termination_date" id="" placeholder="Address 2" />
                                                        {errors.termination_date?.type === 'required' && <p role="alert" className="notvalid">Termination date is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Policy Ann. Month</small>
                                                        <select {...register("policy_anniv_month", {
                                                            //required: true,
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
                                                        {errors.policy_anniv_month?.type === 'required' && <p role="alert" className="notvalid">Policy Ann. Month is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Policy Ann. Day</small>
                                                        <input type="text" className="form-control" name="policy_anniv_day" {...register('policy_anniv_day', {
                                                            //required: true,
                                                        })} id="" placeholder="Enter" />
                                                        {errors.policy_anniv_day?.type === 'required' && <p role="alert" className="notvalid">Policy Ann. Day is  required</p>}

                                                    </div>
                                                </div>
                                            </div>
                                            <h5 className="mb-1">Census</h5>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group mb-2">
                                                        <small>Census Date</small>
                                                        <input type="date" {...register('census_date', {
                                                            //required: true,
                                                        })} className="form-control" name="census" id="" placeholder="Census Date" />

                                                        {errors.census_date?.type === 'required' && <p role="alert" className="notvalid">Census Date is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Active Contracts</small>
                                                        <input type="text" className="form-control"  {...register('num_of_active_contracts', {
                                                            //required: true,
                                                        })} name="active_contracts" id="" placeholder="Active Contracts" />
                                                        {errors.num_of_active_contracts?.type === 'required' && <p role="alert" className="notvalid">Active Contracts is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Active Memebers</small>
                                                        <input type="text" className="form-control" name="num_of_active_members" {...register('num_of_active_members', {
                                                            //required: true,
                                                        })} id="" placeholder="Active Memebers" />
                                                        {errors.num_of_active_members?.type === 'required' && <p role="alert" className="notvalid">Active Memebers is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Termed Contracts</small>
                                                        <input type="text" className="form-control" {...register('num_of_termed_contracts', {
                                                            //required: true,
                                                        })} name="num_of_termed_contracts" id="" placeholder="Termed Contracts" />
                                                        {errors.num_of_termed_contracts?.type === 'required' && <p role="alert" className="notvalid">Termed  Contracts is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Termed Memebers</small>
                                                        <input type="text" className="form-control" {...register('num_of_termed_members', {
                                                            //required: true,
                                                        })} name="num_of_termed_members" id="" placeholder="Termed Memebers" />

                                                        {errors.num_of_termed_members?.type === 'required' && <p role="alert" className="notvalid">Termed  Memebers is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Pending Contracts</small>
                                                        <input type="text" className="form-control" {...register('num_of_pending_contracts', {
                                                            //required: true,
                                                        })} name="num_of_pending_contracts" id="" placeholder="Pending Contracts" />
                                                        {errors.num_of_pending_contracts?.type === 'required' && <p role="alert" className="notvalid">Pending Contracts is  required</p>}

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Pending Memebers</small>
                                                        <input type="text" {...register('num_of_pending_members', {
                                                            //required: true,
                                                        })} className="form-control" name="num_of_pending_members" id="" placeholder="Pending Members" />
                                                        {errors.num_of_pending_members?.type === 'required' && <p role="alert" className="notvalid">pending members   is  required</p>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Marketing Group</small>
                                                <input  {...register('marketing_rep_id', {
                                                    //required: true,
                                                })} type="text" className="form-control" name="marketing_rep_id" id="" placeholder="Pending Members" />
                                                {errors.marketing_rep_id?.type === 'required' && <p role="alert" className="notvalid">Marketing Group is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Anniversary Date</small>
                                                <input type="date" className="form-control" {...register('anniv_date', {
                                                    //required: true,
                                                })} name="anniv_date" id="" placeholder="Pending Members" />
                                                {errors.anniv_date?.type === 'required' && <p role="alert" className="notvalid">Anniversary Date is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Plan Classification</small>
                                                <select className="form-select" name="plan_classification" {...register('plan_classification', {
                                                    //required: true,
                                                })}>
                                                    <option value="">--select--</option>
                                                    <option value="C">Cash</option>
                                                    <option value="M">Medicated</option>
                                                    <option value="3">Third Party</option>
                                                    <option value="4">Un Classified</option>

                                                </select>
                                                {errors.plan_classification?.type === 'required' && <p role="alert" className="notvalid">plan classification  is  required</p>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div class="tab-pane fade" id="strategy" role="tabpanel" aria-labelledby="nav-profile-tab">

                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className='row'>
                                        <div className="col-md-11 mb-1">
                                            <h5 className="mb-2">Coverage Strategy</h5>
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
                                                    //required: true,
                                                })} id="" />
                                                {errors.tier_1?.type === 'required' && <p role="alert" className="notvalid">Tier 1 Date is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-3">
                                                <small>Tier 2</small>
                                                <input type="date" className="form-control" name="tier_2" {...register('tier_2', {
                                                    //required: true
                                                })} id="" />
                                                {errors.tier_2?.type === 'required' && <p role="alert" className="notvalid">Tier 2 Date is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-3">
                                                <small>Tier 3</small>
                                                <input type="date" className="form-control" name="tier_2" {...register('tier_3', {
                                                    //required: true
                                                })} id="" />
                                                {errors.tier_3?.type === 'required' && <p role="alert" className="notvalid">Tier 3 Date is  required</p>}
                                            </div>
                                        </div>

                                        <div className="col-md-3 align-items-center">
                                            <p>Plan ID</p>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-3">
                                            <Controller name="plan_id_1"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <AsyncSelect
                                                            {...field}
                                                            cacheOptions
                                                            defaultOptions
                                                            // value={selectedValue}
                                                            getOptionLabel={e => e.plan_id_label}
                                                            getOptionValue={e => e.plan_id_value}
                                                            loadOptions={loadPlanIDS}
                                                            // onInputChange={handlePriceScheduleInput}
                                                            // onChange={handleChange}
                                                            placeholder="Plan Id "
                                                        // value={{ plan_id_label: props.formData.plan_id, plan_id_value: props.formData.country_code }}

                                                        />
                                                    )} />
                                            </div>
                                            {errors.plan_id?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-3">
                                                <div className="form-group mb-3">
                                                <Controller name="plan_id_1"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <AsyncSelect
                                                            {...field}
                                                            cacheOptions
                                                            defaultOptions
                                                            // value={selectedValue}
                                                            getOptionLabel={e => e.plan_id_label}
                                                            getOptionValue={e => e.plan_id_value}
                                                            loadOptions={loadPlanIDS}
                                                            // onInputChange={handlePriceScheduleInput}
                                                            // onChange={handleChange}
                                                            placeholder="Plan Id "
                                                        // value={{ plan_id_label: props.formData.plan_id, plan_id_value: props.formData.country_code }}

                                                        />
                                                    )} />                                 

                                                </div>
                                                {errors.plan_id_2?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-3">
                                                <div className="form-group mb-3">
                                                <Controller name="plan_id_1"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <AsyncSelect
                                                            {...field}
                                                            cacheOptions
                                                            defaultOptions
                                                            // value={selectedValue}
                                                            getOptionLabel={e => e.plan_id_label}
                                                            getOptionValue={e => e.plan_id_value}
                                                            loadOptions={loadPlanIDS}
                                                            // onInputChange={handlePriceScheduleInput}
                                                            // onChange={handleChange}
                                                            placeholder="Plan Id "
                                                        // value={{ plan_id_label: props.formData.plan_id, plan_id_value: props.formData.country_code }}

                                                        />
                                                    )} />                                   
                                                </div>
                                                {errors.plan_id_2?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                                            </div>
                                        </div>

                                        <div className="col-md-3 align-items-center">
                                            <p>Miscellaneous Data</p>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-3">
                                                <input type="text" {...register('misc_data_1', {
                                                    //required: true,
                                                })} className="form-control" name="misc_data_1" id="" />
                                                {errors.misc_data_1?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous data  is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-3">
                                                <input type="text" {...register('misc_data_2', {
                                                    //required: true,
                                                })} className="form-control" name="misc_data_2" id="" />
                                                {errors.misc_data_2?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous data  is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-3">
                                                <input type="text" className="form-control" {...register('misc_data_3')} name="misc_data_3" id="" />
                                                {errors.misc_data_3?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous data  is  required</p>}

                                            </div>
                                        </div>

                                        <div className="clearfix mb-3"></div>

                                        <div className="col-md-12">
                                            <h5 className="mb-2">Provider Verification Options :</h5>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <small>Provider Options</small>
                                                <select className="form-select" {...register("pharmacy_exceptions_flag", {
                                                    //required: true
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
                                            {errors.pharmacy_exceptions_flag?.type === 'required' && <p role="alert" className="notvalid">Provider Verification Options  is  required</p>}

                                        </div>
                                        <div className="col-md-6">

                                            <div className="form-group mb-3">
                                                <small>Super Provider Networks</small>
                                                <Controller name="rule_id"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <AsyncSelect
                                                            {...field}
                                                            cacheOptions
                                                            defaultOptions
                                                            // value={selectedValue}
                                                            getOptionLabel={e => e.super_label}
                                                            getOptionValue={e => e.super_value}
                                                            loadOptions={loadSuperProviderNetworksOptions}
                                                            // onInputChange={handlePriceScheduleInput}
                                                            // onChange={handleChange}
                                                            placeholder="Rule Id "
                                                        // value={{ country_label: props.formData.country_code, country_value: props.formData.country_code }}

                                                        />
                                                    )} /> 

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
                                                    //required: true,
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
                                                <select className="form-select" {...register("prescriber_exceptions_flag_2", {
                                                    //required: true,
                                                })} name="prescriber_exceptions_flag_2">
                                                    <option value="">--select--</option>
                                                    <option value="1">None</option>
                                                    <option value="2">Validate DEA Code</option>
                                                    <option value="3">primary Prescriber Validation</option>
                                                    <option value="4">Must Exist in Prescriber Master</option>
                                                </select>
                                                {errors.prescriber_exceptions_flag_2?.type === 'required' && <p role="alert" className="notvalid">Prescriber Options is   required</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                            <small>Prescriber Grouping ID</small>

                                            <select className="form-select" {...register("presciber_grouping_id", {
                                                    // //required: true,
                                                })} name="Prescriber_Grouping_id">
                                                    <option value="">--Select--</option>
                                                    <option value="1">None</option>
                                                    <option value="2">Validate DEA Code</option>
                                                    <option value="3">primary Prescriber Validation</option>
                                                    <option value="4">Must Exist in Prescriber Master</option>
                                                </select>
                                                {errors.presciber_grouping_id?.type === 'required' && <p role="alert" className="notvalid">Prescriber Grouping id   is  required</p>}

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>


                        </div>


                        <div class="tab-pane fade" id="eligibility" role="tabpanel" aria-labelledby="nav-profile-tab">

                        <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Load Parameters</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Auto Termination Level</small>
                                <select className="form-select" {...register("auto_term_level", {
                                    //required: true,
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

                            <div className="col-md-6 mb-2">
                                <small>Eligibility Type</small>
                                <select className="form-select" {...register("elig_type", {
                                    //required: true,

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
                            <div className="col-md-6 mb-2">
                                <small>Membership Processing Flag</small>
                                <select className="form-select" {...register("membership_processing_flag", {
                                    //required: true,
                                })} name="membership_processing_flag">
                                    <option value="">--Select--</option>
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
                                <select className="form-select" {...register("elig_date_edit_ovr_flag", {
                                    //required: true,
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
                                {errors.elig_date_edit_ovr_flag?.type === 'required' && <p role="alert" className="notvalid">Eligibility Options is  required</p>}
                                <p className="input-hint">Check Eligibility By Member:</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Eligibility Validation List ID</small>
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control"  {...register("elig_validation_id", {
                                        //required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,

                                    })} name="elig_validation_id" id="" required="" />

                                    <a href="" data-bs-toggle="modal" data-bs-target="#eligibilityidModal"><span className="fa fa-search form-icon"></span></a>

                                </div>
                                {errors.elig_validation_id?.type === 'required' && <p role="alert" className="notvalid">Eligibility Validation List ID is  required</p>}
                                {errors.elig_validation_id?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Change Logging</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Eligibility Change Log Indicator</small>
                                <select className="form-select" {...register("eligibility_change_log_indicator", {
                                    //required: true,
                                })} name="eligibility_change_log_indicator">
                                    <option value="">--Select--</option>
                                    <option value="1">Not Specified</option>
                                    <option value="2">Member Record changes will NOT be logged </option>
                                    <option value="3">Member Record changes will be logged</option>
                                </select>
                            </div>
                            {errors.eligibility_change_log_indicator?.type === 'required' && <p role="alert" className="notvalid">Eligibility Change Log Indicator</p>}

                        </div>
                    </div>
                </div>

                        </div>

                        <div class="tab-pane fade" id="indicators" role="tabpanel" aria-labelledby="nav-profile-tab">

                        <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Indicators:</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Accumelated Benifits Ind:</small>
                                <select className="form-select" name="accum_bene_fam_sum_ind" {...register('accum_bene_fam_sum_ind', {
                                    //required: true,
                                })}  >
                                    <option value="">--Select--</option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                </select>
                                {errors.accum_bene_fam_sum_ind?.type === 'required' && <p role="alert" className="notvalid">Accumelated Benifits Ind field is  required</p>}

                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Secondory Coverage Ind</small>
                                <select className="form-select" name="secondary_coverage" {...register('secondary_coverage', {
                                    //required: true,
                                })}>
                                    <option value="">--Select--</option>
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
                                <select className="form-select" {...register("max_num_trans_interim_elig", {
                                    //required: true,
                                })} name='max_num_trans_interim_elig'>
                                    <option value="">--select-- </option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                    <option value="3">option 3</option>
                                </select>
                                {errors.max_no_of_transaction_allowed?.type === 'required' && <p role="alert" className="notvalid">Maximum Number Of Transactions Allowed For An Interim field  is  required</p>}

                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Maximum Number Of Days That An Interim Member Will Be..</small>
                                <select className="form-select" {...register("max_days_interim_elig", {
                                    //required: true,
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
                            <div className="col-md-7 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" name="bypass" id="html1" {...register('bypass', {
                                        //required: true,
                                    })} className="d-none" />
                                    <label for="html1">Bypass Member Eligibility Date Edits Against Customer Effective Dates</label>
                                    {errors.bypass?.type === 'required' && <p role="alert" className="notvalid">Bypass Member Eligibility DAte Edits Against Customer Effective Dates field is  required</p>}

                                </div>
                            </div>

                            <div className="col-md-5 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" {...register('require_person', {
                                        //required: true,
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
                                    <select className="form-select" name="copay_sched_ovr_flag" {...register('copay_sched_ovr_flag', {
                                        //required: true,
                                    })}>
                                        <option value="">--Select--</option>
                                        <option value="1">option 1</option>
                                        <option value="2">option 2</option>
                                    </select>
                                </div>
                                {errors.copay_sched_ovr_flag?.type === 'required' && <p role="alert" className="notvalid">Copy Schedule Override field is  required</p>}

                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <small>Shedule</small>
                                    <input type="text" className="form-control" name="copay_sched_ovr" {...register('copay_sched_ovr', {
                                        //required: true,
                                    })} id="" placeholder="" />

                                    {errors.copay_sched_ovr?.type === 'required' && <p role="alert" className="notvalid">Schedule  field is  required</p>}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                        </div>


                        <div class="tab-pane fade" id="charges" role="tabpanel" aria-labelledby="nav-profile-tab">

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
                                        //required: true,
                                    })} name="admin_fee" id="" placeholder="" />
                                    {errors.admin_fee?.type === 'required' && <p role="alert" className="notvalid">Admin Fee is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Admin %</small>
                                    <input type="text" className="form-control" {...register('admin_percent', {
                                        //required: true,
                                    })} name="admin_percent" id="" placeholder="" />
                                    {errors.admin_percent?.type === 'required' && <p role="alert" className="notvalid">Admin percentage is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>DMR Free</small>
                                    <input type="text" className="form-control" {...register('dmr_fee', {
                                        //required: true,
                                    })} name="dmr_fee" id="" placeholder="" />
                                    {errors.admin_percentage?.type === 'required' && <p role="alert" className="notvalid">DMR fee is   required</p>}


                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>UCF Claim Fee</small>
                                    <input type="text" className="form-control" {...register('ucf_fee', {
                                        //required: true,
                                    })} name="ucf_fee" id="" placeholder="" />
                                    {errors.ucf_fee?.type === 'required' && <p role="alert" className="notvalid">UCF fee is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Elig Update Fee</small>
                                    <input type="text" className="form-control" name="elig_upd_fee" {...register('elig_upd_fee', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.elig_update?.type === 'required' && <p role="alert" className="notvalid">Elig Update Fee is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Prior Auth Fee</small>
                                    <input type="text" className="form-control" name="prior_auth_fee" {...register('prior_auth_fee', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.prior_auth_fee?.type === 'required' && <p role="alert" className="notvalid">Prior Auth  Fee is   required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Exception List Processing</h5>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="Plan" className="d-none" {...register('excl_plan_ndc_gpi_excep_flag', {
                                        //required: true,
                                    })} name="excl_plan_ndc_gpi_excep_flag" />
                                    <label for="Plan">Bypass Plan NDC/GPI Exception List Processing</label>
                                    {errors.excl_plan_ndc_gpi_excep_flag?.type === 'required' && <p role="alert" className="notvalid">Bypass Plan NDC/GPI Exception List Processing is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="System" name="excl_sys_ndc_gpi_excep_flag" {...register('excl_sys_ndc_gpi_excep_flag', {
                                        //required: true,
                                    })} className="d-none" />
                                    <label for="System">Bypass System NDC/GPI Exception List Processing</label>
                                    {errors.excl_sys_ndc_gpi_excep_flag?.type === 'required' && <p role="alert" className="notvalid">Bypass System NDC/GPI Exception List Processing is   required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Miscellaneous</h5>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Written to First Fill</small>
                                    <input type="text" className="form-control" {...register('date_written_to_first_fill', {
                                        //required: true,
                                    })} name="date_written_to_first_fill" id="" placeholder="" />
                                    {errors.date_written_to_first_fill?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Written to First Fill is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Filled to Date Submitted</small>
                                    <input type="text" className="form-control" name="date_filled_to_sub_online" {...register('date_filled_to_sub_online', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.date_filled_to_sub_online?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Filled to Date Submitted is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Filled to Submitted (Manual)</small>
                                    <input type="text" className="form-control" name="date_filled_to_sub_dmr" {...register('date_filled_to_sub_dmr', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.date_filled_to_sub_dmr?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Filled to Submitted (Manual) is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from DateFilled to Future Fill Date</small>
                                    <input type="text" className="form-control" name="date_sub_to_filled_future" {...register('date_sub_to_filled_future', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.date_sub_to_filled_future?.type === 'required' && <p role="alert" className="notvalid">Number of Days from DateFilled to Future Fill Date is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days for Reversal</small>
                                    <input type="text" className="form-control" name="days_for_reversals" {...register('days_for_reversals', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.days_for_reversals?.type === 'required' && <p role="alert" className="notvalid">Number of Days for Reversal is   required</p>}

                                </div>
                            </div>
                            <div className="clearfix mb-2"></div>
                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="Tax" name="non_profit_tax_exempt_flag" {...register('non_profit_tax_exempt_flag', {
                                        //required: true,
                                    })} className="d-none" />
                                    <label for="Tax">Tax Exempty Entity</label>
                                    {errors.non_profit_tax_exempt_flag?.type === 'required' && <p role="alert" className="notvalid">Tax Exempty Entity is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" name='reqd_u_and_c_flag' {...register('reqd_u_and_c_flag', {
                                        //required: true,
                                    })} id="u&amp;c" className="d-none" />
                                    <label for="u&amp;c">Mandatory U and C</label>
                                    {errors.reqd_u_and_c_flag?.type === 'required' && <p role="alert" className="notvalid">Mandatory U and C is   required</p>}

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
                                        //required: true,
                                    })} name="smbpp" id="" placeholder="" />
                                    {errors.smbpp?.type === 'required' && <p role="alert" className="notvalid">SMBPP is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>RVA List ID</small>
                                <div className="form-group mb-3">
                                <Controller name="rule_id"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <AsyncSelect
                                                            {...field}
                                                            cacheOptions
                                                            defaultOptions
                                                            // value={selectedValue}
                                                            getOptionLabel={e => e.rva_label}
                                                            getOptionValue={e => e.rva_value}
                                                            loadOptions={loadRvaListIds}
                                                            // onInputChange={handlePriceScheduleInput}
                                                            // onChange={handleChange}
                                                            placeholder="Rva List Id "
                                                        // value={{ elig_label: props.formData.elig_validation_id, elig_value: props.formData.elig_validation_id }}

                                                        />
                                                    )} />
                                </div>
                                {errors.rva_list_id?.type === 'required' && <p role="alert" className="notvalid">RVA List ID is   required</p>}

                            </div>

                        </div>
                    </div>
                </div>
                        </div>




                    </div>

                    <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>

                </div>

            </form>
        </>
    )

}


function TableBody(props) {

    const getClient = (clientid) => {
        // console.log(clientid);
        props.getClient(clientid);
    }

    const ClientList = [];
    // for (let i = 0; i < props.customers.length; i++) {
    //     ClientList.push(<Cutomer customer={props.customers[i]} getClient={getClient} />);
    // }

    if (props.customers.length > 0) {
        for (let i = 0; i < props.customers.length; i++) {
            ClientList.push(<TableRow customer={props.customers[i]} getClient={getClient} />);
        }
    } else {
        ClientList.push(<NoReacords />);
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
                                    </tr>
                                </thead>
                                <tbody>

                                    {ClientList}
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
            <tr onClick={() => props.getClient(props.customer.client_group_id)}>
                <td>{props.customer.customer_id}</td>
                <td>{props.customer.client_id}</td>
                <td>{props.customer.client_group_id}</td>
                <td>{props.customer.group_name}</td>
            </tr>
        </>
    )
}


export function Charges(params) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

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
                        <div className="row">
                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Other Charges</h5>
                            </div>

                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Admin Fee</small>
                                    <input type="text" className="form-control" {...register('admin_fee', {
                                        //required: true,
                                    })} name="admin_fee" id="" placeholder="" />
                                    {errors.admin_fee?.type === 'required' && <p role="alert" className="notvalid">Admin Fee is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Admin %</small>
                                    <input type="text" className="form-control" {...register('admin_percent', {
                                        //required: true,
                                    })} name="admin_percent" id="" placeholder="" />
                                    {errors.admin_percent?.type === 'required' && <p role="alert" className="notvalid">Admin percentage is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>DMR Free</small>
                                    <input type="text" className="form-control" {...register('dmr_fee', {
                                        //required: true,
                                    })} name="dmr_fee" id="" placeholder="" />
                                    {errors.admin_percentage?.type === 'required' && <p role="alert" className="notvalid">DMR fee is   required</p>}


                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>UCF Claim Fee</small>
                                    <input type="text" className="form-control" {...register('ucf_fee', {
                                        //required: true,
                                    })} name="ucf_fee" id="" placeholder="" />
                                    {errors.ucf_fee?.type === 'required' && <p role="alert" className="notvalid">UCF fee is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Elig Update Fee</small>
                                    <input type="text" className="form-control" name="elig_upd_fee" {...register('elig_upd_fee', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.elig_update?.type === 'required' && <p role="alert" className="notvalid">Elig Update Fee is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group mb-2">
                                    <small>Prior Auth Fee</small>
                                    <input type="text" className="form-control" name="prior_auth_fee" {...register('prior_auth_fee', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.prior_auth_fee?.type === 'required' && <p role="alert" className="notvalid">Prior Auth  Fee is   required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Exception List Processing</h5>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="Plan" className="d-none" {...register('excl_plan_ndc_gpi_excep_flag', {
                                        //required: true,
                                    })} name="excl_plan_ndc_gpi_excep_flag" />
                                    <label for="Plan">Bypass Plan NDC/GPI Exception List Processing</label>
                                    {errors.excl_plan_ndc_gpi_excep_flag?.type === 'required' && <p role="alert" className="notvalid">Bypass Plan NDC/GPI Exception List Processing is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-6 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="System" name="excl_sys_ndc_gpi_excep_flag" {...register('excl_sys_ndc_gpi_excep_flag', {
                                        //required: true,
                                    })} className="d-none" />
                                    <label for="System">Bypass System NDC/GPI Exception List Processing</label>
                                    {errors.excl_sys_ndc_gpi_excep_flag?.type === 'required' && <p role="alert" className="notvalid">Bypass System NDC/GPI Exception List Processing is   required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Miscellaneous</h5>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Written to First Fill</small>
                                    <input type="text" className="form-control" {...register('date_written_to_first_fill', {
                                        //required: true,
                                    })} name="date_written_to_first_fill" id="" placeholder="" />
                                    {errors.date_written_to_first_fill?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Written to First Fill is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Filled to Date Submitted</small>
                                    <input type="text" className="form-control" name="date_filled_to_sub_online" {...register('date_filled_to_sub_online', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.date_filled_to_sub_online?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Filled to Date Submitted is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from Date Filled to Submitted (Manual)</small>
                                    <input type="text" className="form-control" name="date_filled_to_sub_dmr" {...register('date_filled_to_sub_dmr', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.date_filled_to_sub_dmr?.type === 'required' && <p role="alert" className="notvalid">Number of Days from Date Filled to Submitted (Manual) is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days from DateFilled to Future Fill Date</small>
                                    <input type="text" className="form-control" name="date_sub_to_filled_future" {...register('date_sub_to_filled_future', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.date_sub_to_filled_future?.type === 'required' && <p role="alert" className="notvalid">Number of Days from DateFilled to Future Fill Date is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Number of Days for Reversal</small>
                                    <input type="text" className="form-control" name="days_for_reversals" {...register('days_for_reversals', {
                                        //required: true,
                                    })} id="" placeholder="" />
                                    {errors.days_for_reversals?.type === 'required' && <p role="alert" className="notvalid">Number of Days for Reversal is   required</p>}

                                </div>
                            </div>
                            <div className="clearfix mb-2"></div>
                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" id="Tax" name="non_profit_tax_exempt_flag" {...register('non_profit_tax_exempt_flag', {
                                        //required: true,
                                    })} className="d-none" />
                                    <label for="Tax">Tax Exempty Entity</label>
                                    {errors.non_profit_tax_exempt_flag?.type === 'required' && <p role="alert" className="notvalid">Tax Exempty Entity is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-4 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" name='reqd_u_and_c_flag' {...register('reqd_u_and_c_flag', {
                                        //required: true,
                                    })} id="u&amp;c" className="d-none" />
                                    <label for="u&amp;c">Mandatory U and C</label>
                                    {errors.reqd_u_and_c_flag?.type === 'required' && <p role="alert" className="notvalid">Mandatory U and C is   required</p>}

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
                                        //required: true,
                                    })} name="smbpp" id="" placeholder="" />
                                    {errors.smbpp?.type === 'required' && <p role="alert" className="notvalid">SMBPP is   required</p>}

                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>RVA List ID</small>
                                <div className="form-group mb-3">
                                    <input type="text" {...register('rva_list_id', {
                                        //required: true,
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

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

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
                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Indicators:</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Accumelated Benifits Ind:</small>
                                <select className="form-select" name="accum_bene_fam_sum_ind" {...register('accum_bene_fam_sum_ind', {
                                    //required: true,
                                })}  >
                                    <option value="">--Select--</option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                </select>
                                {errors.accum_bene_fam_sum_ind?.type === 'required' && <p role="alert" className="notvalid">Accumelated Benifits Ind field is  required</p>}

                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Secondory Coverage Ind</small>
                                <select className="form-select" name="secondary_coverage" {...register('secondary_coverage', {
                                    //required: true,
                                })}>
                                    <option value="">--Select--</option>
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
                                <small>Maximum Number Of Transactions Allowed For An Interim..</small>MAX_NUM_TRANS_INTERIM_ELIG
                                <select className="form-select" {...register("max_num_trans_interim_elig", {
                                    //required: true,
                                })} name='max_num_trans_interim_elig'>
                                    <option value="">--select-- </option>
                                    <option value="1">option 1</option>
                                    <option value="2">option 2</option>
                                    <option value="3">option 3</option>
                                </select>
                                {errors.max_no_of_transaction_allowed?.type === 'required' && <p role="alert" className="notvalid">Maximum Number Of Transactions Allowed For An Interim field  is  required</p>}

                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Maximum Number Of Days That An Interim Member Will Be..</small>
                                <select className="form-select" {...register("max_days_interim_elig", {
                                    //required: true,
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
                            <div className="col-md-7 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" name="bypass" id="html1" {...register('bypass', {
                                        //required: true,
                                    })} className="d-none" />
                                    <label for="html1">Bypass Member Eligibility Date Edits Against Customer Effective Dates</label>
                                    {errors.bypass?.type === 'required' && <p role="alert" className="notvalid">Bypass Member Eligibility DAte Edits Against Customer Effective Dates field is  required</p>}

                                </div>
                            </div>

                            <div className="col-md-5 mb-1">
                                <div className="form-group">
                                    <input type="checkbox" {...register('require_person', {
                                        //required: true,
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
                                    <select className="form-select" name="copay_sched_ovr_flag" {...register('copay_sched_ovr_flag', {
                                        //required: true,
                                    })}>
                                        <option value="">--Select--</option>
                                        <option value="1">option 1</option>
                                        <option value="2">option 2</option>
                                    </select>
                                </div>
                                {errors.copay_sched_ovr_flag?.type === 'required' && <p role="alert" className="notvalid">Copy Schedule Override field is  required</p>}

                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <small>Shedule</small>
                                    <input type="text" className="form-control" name="copay_sched_ovr" {...register('copay_sched_ovr', {
                                        //required: true,
                                    })} id="" placeholder="" />

                                    {errors.copay_sched_ovr?.type === 'required' && <p role="alert" className="notvalid">Schedule  field is  required</p>}


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

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

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
                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Load Parameters</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Auto Termination Level</small>
                                <select className="form-select" {...register("auto_term_level", {
                                    //required: true,
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

                            <div className="col-md-6 mb-2">
                                <small>Eligibility Type</small>
                                <select className="form-select" {...register("elig_type", {
                                    //required: true,

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
                            <div className="col-md-6 mb-2">
                                <small>Membership Processing Flag</small>
                                <select className="form-select" {...register("membership_processing_flag", {
                                    //required: true,
                                })} name="membership_processing_flag">
                                    <option value="">--Select--</option>
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
                                <select className="form-select" {...register("elig_date_edit_ovr_flag", {
                                    //required: true,
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
                                {errors.elig_date_edit_ovr_flag?.type === 'required' && <p role="alert" className="notvalid">Eligibility Options is  required</p>}
                                <p className="input-hint">Check Eligibility By Member:</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Eligibility Validation List ID</small>
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control"  {...register("elig_validation_id", {
                                        //required: true,
                                        pattern: /^(0|[1-9][0-9]*)$/,

                                    })} name="elig_validation_id" id="" required="" />

                                    <a href="" data-bs-toggle="modal" data-bs-target="#eligibilityidModal"><span className="fa fa-search form-icon"></span></a>

                                </div>
                                {errors.elig_validation_id?.type === 'required' && <p role="alert" className="notvalid">Eligibility Validation List ID is  required</p>}
                                {errors.elig_validation_id?.type === 'pattern' && <p role="alert" className="notvalid">This field Must be a Number!</p>}
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-12 mb-1">
                                <h5 className="mb-2">Eligibility Change Logging</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <small>Eligibility Change Log Indicator</small>
                                <select className="form-select" {...register("eligibility_change_log_indicator", {
                                    //required: true,
                                })} name="eligibility_change_log_indicator">
                                    <option value="">--Select--</option>
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

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const [clientgroup, setClientgroup] = useOutletContext();
    const [startDate, setStartDate] = useState(new Date());
    const [afterDate, setAfterDate] = useState(new Date());
    const [superoptions, setSuperOptions] = useState(false)

    useEffect(() => { reset(clientgroup) }, [clientgroup]);

    const onSubmit = data => {


        // console.log(Identificationdata);

        const id = clientgroup;
        id['identification'] = data;
        console.log(clientgroup);




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

    useEffect(() => {
        if (!superoptions) {
            getAllSuperProviderNetworkIds();

        }
    }, [superoptions])


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
                                        //required: true,
                                    })} id="" />
                                    {errors.tier_1?.type === 'required' && <p role="alert" className="notvalid">Tier 1 Date is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <small>Tier 2</small>
                                    <input type="date" className="form-control" name="tier_2" {...register('tier_2', {
                                        //required: true
                                    })} id="" />
                                    {errors.tier_2?.type === 'required' && <p role="alert" className="notvalid">Tier 2 Date is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <small>Tier 3</small>
                                    <input type="date" className="form-control" name="tier_2" {...register('tier_3', {
                                        //required: true
                                    })} id="" />
                                    {errors.tier_3?.type === 'required' && <p role="alert" className="notvalid">Tier 3 Date is  required</p>}
                                </div>
                            </div>

                            <div className="col-md-3 align-items-center">
                                <p>Plan ID</p>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" {...register('plan_id', {
                                        //required: true,
                                    })} name="plan_id" id="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                                {errors.plan_id?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" {...register('plan_id_2', {
                                            //required: true,
                                        })} name="plan_id_2" id="" />                                        <a href=""><span className="fa fa-search form-icon"></span></a>

                                    </div>
                                    {errors.plan_id_2?.type === 'required' && <p role="alert" className="notvalid">Plan Id  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" {...register('plan_id_3', {
                                            //required: true,
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
                                    <input type="text" {...register('misc_data_1', {
                                        //required: true,
                                    })} className="form-control" name="misc_data_1" id="" />
                                    {errors.misc_data_1?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous data  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" {...register('misc_data_2', {
                                        //required: true,
                                    })} className="form-control" name="misc_data_2" id="" />
                                    {errors.misc_data_2?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous data  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" {...register('misc_data_3')} name="misc_data_3" id="" />
                                    {errors.misc_data_3?.type === 'required' && <p role="alert" className="notvalid">Miscellaneous data  is  required</p>}

                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12">
                                <h5 className="mb-2">Provider Verification Options :</h5>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <small>Provider Options</small>
                                    <select className="form-select" {...register("pharmacy_exceptions_flag", {
                                        //required: true
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
                                {errors.pharmacy_exceptions_flag?.type === 'required' && <p role="alert" className="notvalid">Provider Verification Options  is  required</p>}

                            </div>
                            <div className="col-md-6">

                                <div className="form-group mb-3">
                                    <small>Super Provider Networks</small>
                                    {/* <input type="text" className="form-control" {...register("super_rx_network_id", {
                                        //required: true,
                                    })} name="super_rx_network_id" id="" /> */}
                                    {/* <a href="" data-bs-toggle="modal" data-bs-target="#supernetwork"><span className="fa fa-search form-icon"></span></a> */}
                                    <Select
                                        options={superoptions} name="super_rx_network_id"   {...register('super_rx_network_id')} onChange={(e) => mahesh(e)} />

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
                                        //required: true,
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
                                    <select className="form-select" {...register("prescriber_exceptions_flag_2", {
                                        //required: true,
                                    })} name="prescriber_exceptions_flag_2">
                                        <option value="">--select--</option>
                                        <option value="1">None</option>
                                        <option value="2">Validate DEA Code</option>
                                        <option value="3">primary Prescriber Validation</option>
                                        <option value="4">Must Exist in Prescriber Master</option>
                                    </select>
                                    {errors.prescriber_exceptions_flag_2?.type === 'required' && <p role="alert" className="notvalid">Prescriber Options is   required</p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <small>Prescriber Grouping ID</small>
                                    <input type="text"  {...register('presciber_grouping_id', {
                                        //required: true,
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
    const [selectedOption, setSelectedOption] = useState(null);


    const onSubmit = data => {


        // console.log(Identificationdata);

        const id = clientgroup;
        id['identification'] = data;
        console.log(clientgroup);




    }

    const Cstates = [
        { label: "AD", value: 1 },
        { label: "KG", value: 2 },

    ];

    const onStateChange = (e) => {
        getStates();
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


    useEffect(() => { reset(clientgroup) }, [clientgroup]);
    const countries = [
        { value: 'Jamica', label: 'Jamaica' },

    ];

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
                                                //required: true,
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
                                                //required: true,
                                            })} name="group_name" id="" placeholder="Name" />
                                            {errors.group_name?.type === 'required' && <p role="alert" className="notvalid">customer name is   required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Address 1</small>
                                            <input type="text" className="form-control" {...register('address_1', {
                                                //required: true,
                                            })} name="address_1" id="" placeholder="Address 1" />
                                            {errors.address_1?.type === 'required' && <p role="alert" className="notvalid">address is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Address 2</small>
                                            <input type="text" className="form-control" {...register('address_2', {
                                                //required: true,
                                            })} name="address_2" id="" placeholder="Address 2" />
                                            {errors.address_2?.type === 'required' && <p role="alert" className="notvalid">address is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Country</small>


                                            <Select   {...register("country", {
                                                //required: true,

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
                                                //required: true,

                                            })} name="city" className="form-select" defaultValue={{ label: "AD", value: 1 }} options={Cstates}
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
                                            <input type="text" {...register('zip_code', {
                                                //required: true,
                                            })} className="form-control" name="zip_code" id="" placeholder="ZIP Code" />
                                            {errors.zip_code?.type === 'required' && <p role="alert" className="notvalid">Zip code  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Phone</small>
                                            <input {...register('phone', {
                                                //required: true,
                                            })} type="text" className="form-control" name="phone" id="" placeholder="Phone" />
                                            {errors.phone?.type === 'required' && <p role="alert" className="notvalid">phone  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Fax</small>
                                            <input type="text" {...register('fax', {
                                                //required: true,
                                            })} className="form-control" name="fax" id="" placeholder="Fax" />
                                            {errors.phone?.type === 'required' && <p role="alert" className="notvalid">fax  is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>EDI Address</small>
                                            <input type="text" {...register('edi_address', {
                                                //required: true,
                                            })} className="form-control" name="edi_address" id="" placeholder="EDI Address" />
                                            {errors.edi_address?.type === 'required' && <p role="alert" className="notvalid">EDI Address is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Contact</small>
                                            <input  {...register('contact', {
                                                //required: true,
                                            })} type="text" className="form-control" name="contact" id="" placeholder="Contact" />
                                            {errors.contact?.type === 'required' && <p role="alert" className="notvalid">Contact is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Test</small>
                                            <input {...register('test', {
                                                //required: true,
                                            })} type="text" className="form-control" name="test" id="" placeholder="Test" />
                                            {errors.contact?.type === 'required' && <p role="alert" className="notvalid">Test is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Type</small>
                                            <input type="text"  {...register('elig_type', {
                                                //required: true,
                                            })} className="form-control" name="elig_type" id="" placeholder="Type" />
                                            {errors.elig_type?.type === 'required' && <p role="alert" className="notvalid">Type is  required</p>}

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
                                                //required: true,
                                            })} name="effective_date" id="" placeholder="Address 1" />
                                            {errors.effective_date?.type === 'required' && <p role="alert" className="notvalid">Effective Date is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termination Date</small>
                                            <input {...register('termination_date', {
                                                //required: true,
                                            })} type="date" className="form-control" name="termination_date" id="" placeholder="Address 2" />
                                            {errors.termination_date?.type === 'required' && <p role="alert" className="notvalid">Termination date is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Policy Ann. Month</small>
                                            <select {...register("policy_anniv_month", {
                                                //required: true,
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
                                            {errors.policy_anniv_month?.type === 'required' && <p role="alert" className="notvalid">Policy Ann. Month is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Policy Ann. Day</small>
                                            <input type="text" className="form-control" name="policy_anniv_day" {...register('policy_anniv_day', {
                                                //required: true,
                                            })} id="" placeholder="Enter" />
                                            {errors.policy_anniv_day?.type === 'required' && <p role="alert" className="notvalid">Policy Ann. Day is  required</p>}

                                        </div>
                                    </div>
                                </div>
                                <h5 className="mb-1">Census</h5>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group mb-2">
                                            <small>Census Date</small>
                                            <input type="date" {...register('census_date', {
                                                //required: true,
                                            })} className="form-control" name="census" id="" placeholder="Census Date" />

                                            {errors.census_date?.type === 'required' && <p role="alert" className="notvalid">Census Date is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Active Contracts</small>
                                            <input type="text" className="form-control"  {...register('num_of_active_contracts', {
                                                //required: true,
                                            })} name="active_contracts" id="" placeholder="Active Contracts" />
                                            {errors.num_of_active_contracts?.type === 'required' && <p role="alert" className="notvalid">Active Contracts is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Active Memebers</small>
                                            <input type="text" className="form-control" name="num_of_active_members" {...register('num_of_active_members', {
                                                //required: true,
                                            })} id="" placeholder="Active Memebers" />
                                            {errors.num_of_active_members?.type === 'required' && <p role="alert" className="notvalid">Active Memebers is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termed Contracts</small>
                                            <input type="text" className="form-control" {...register('num_of_termed_contracts', {
                                                //required: true,
                                            })} name="num_of_termed_contracts" id="" placeholder="Termed Contracts" />
                                            {errors.num_of_termed_contracts?.type === 'required' && <p role="alert" className="notvalid">Termed  Contracts is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Termed Memebers</small>
                                            <input type="text" className="form-control" {...register('num_of_termed_members', {
                                                //required: true,
                                            })} name="num_of_termed_members" id="" placeholder="Termed Memebers" />

                                            {errors.num_of_termed_members?.type === 'required' && <p role="alert" className="notvalid">Termed  Memebers is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Pending Contracts</small>
                                            <input type="text" className="form-control" {...register('num_of_pending_contracts', {
                                                //required: true,
                                            })} name="num_of_pending_contracts" id="" placeholder="Pending Contracts" />
                                            {errors.num_of_pending_contracts?.type === 'required' && <p role="alert" className="notvalid">Pending Contracts is  required</p>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <small>Pending Memebers</small>
                                            <input type="text" {...register('num_of_pending_members', {
                                                //required: true,
                                            })} className="form-control" name="num_of_pending_members" id="" placeholder="Pending Members" />
                                            {errors.num_of_pending_members?.type === 'required' && <p role="alert" className="notvalid">pending members   is  required</p>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Marketing Group</small>
                                    <input  {...register('marketing_rep_id', {
                                        //required: true,
                                    })} type="text" className="form-control" name="marketing_rep_id" id="" placeholder="Pending Members" />
                                    {errors.marketing_rep_id?.type === 'required' && <p role="alert" className="notvalid">Marketing Group is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Anniversary Date</small>
                                    <input type="date" className="form-control" {...register('anniv_date', {
                                        //required: true,
                                    })} name="anniv_date" id="" placeholder="Pending Members" />
                                    {errors.anniv_date?.type === 'required' && <p role="alert" className="notvalid">Anniversary Date is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Plan Classification</small>
                                    <select className="form-select" name="plan_classification" {...register('plan_classification', {
                                        //required: true,
                                    })}>
                                        <option value="">Choose plan</option>
                                        <option value="1">Select City</option>
                                        <option value="2">Select City</option>
                                        <option value="3">Select City</option>
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