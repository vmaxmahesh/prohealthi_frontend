import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';

import { Button, Col, Row } from 'react-bootstrap';
import DraggableList from "react-draggable-lists";
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';

export default function AccumulatedBenefits() {


    const scollToRef = useRef();
    const [accum, setAccum] = useState([]);

    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');

    const [accumlatedData, setAccumlatedData] = useState(false);

    const [adding, setAdding] = useState(false);



    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/benifit/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                // console.log(data.data);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setNdcData([]);
                    return Promise.reject(error);

                } else {
                    setNdcData(data.data);
                    return;
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const getNDCItems = (ndcid) => {
        // ndc_exception_list
        var test = {};
        test.ndc_exception_list = ndcid;
        setSelctedNdc(test);

        // //  console.log(accumid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/benifit/get/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setAccum([]);
                    return Promise.reject(error);
                } else {
                    console.log(data.data);
                    setAccum(data.data);

                    // scollToRef.current.scrollIntoView()
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getNDCItemDetails = (ndcid) => {
        //  console.log(ndcid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/benifit/details/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setAccumlatedData(data.data);
                    // scollToRef.current.scrollIntoView()
                    // return;
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    useEffect(() => {
        if (accumlatedData) {
            setAdding(false);

        } else {
            setAdding(true);
        }

        document.title = 'Benefit Code | ProHealthi';

    }, [accumlatedData, adding]);









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


            <SearchAccumulatedBenefit searchException={searchException} />

            <AccumulatedBenefitList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />

            <AccumelatedForm formData={accumlatedData} selected={accumlatedData} adding={adding} />

            {/* <div className="data">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <Link to="exclusion-limitation" className={'nav-link' + (currentpath == 'exclusion-limitation' ? ' active' : '')}>Exclusion Limitation</Link>
                    <Link to="deductible" className={'nav-link' + (currentpath == 'deductible' ? ' active' : '')}>Deductible</Link>
                </div>
                <div className="tab-content" id="nav-tabContent">

                    <Outlet context={[accum, setAccum]} />



                </div>
            </div> */}


        </>
    )
}

function SearchAccumulatedBenefit(props) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const searchException = (fdata) => {

        props.searchException(fdata);
    }

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Accumulated Benefits</small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing accumulated benefits validation plan/deductible name/ NDC exclusion name/ GPI exclisuion name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <AccumulatedBenefitList /> */}
        </>
    )
}



function AccumelatedForm(props) {


    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();


    const addCode = (data) => {
        // console.log(data);
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
            fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/benifit/add`, requestOptions)
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


    useEffect(() => { reset(props.formData) }, [props.formData]);


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



    return (
        <>
            <form onSubmit={handleSubmit(addCode)} >
                <div class="data">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#exclusion" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Exclusion Limitation</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#deductable" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Deductable</button>

                    </div>

                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="exclusion" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="row mt-3 mb-3">
                                        <h5 className="mb-2">Exclusion Limitation</h5>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>Plan ID:</small>
                                                <input type="text" className="form-control" name="plan_accum_deduct_id" {...register('plan_accum_deduct_id')} id="" placeholder="Source " />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>Name</small>
                                                <input type="text" className="form-control" name="plan_accum_deduct_name"  {...register('plan_accum_deduct_name')} id="" placeholder="Percentage" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>Grouping Type:</small>
                                                <select className="form-select" name="grouping_type" {...register('grouping_type')}>
                                                    <option value="">--select--</option>
                                                    <option value="A">Customer</option>
                                                    <option value="B">Client</option>
                                                    <option value="C">Group</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>Benefit Grouping Type:</small>
                                                <select className="form-select" name="benefit_grouping_type" {...register('benefit_grouping_type')}>
                                                    <option value=''>--select--</option>
                                                    <option value="A">Benefit List ID</option>
                                                    <option value="B">Client</option>
                                                    <option value="C">Group</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <small>Price Schedule: </small>
                                            <div className="form-group mb-2">
                                                <input type="text" className="form-control" name="accum_bene_price_schedule" {...register('accum_bene_price_schedule')} id="" placeholder="Percentage" />
                                            </div>
                                        </div>




                                        <div class="col-md-12">
                                            <div class="row mt-4 mb-3 comparis-ionn">
                                                <div class=""><h5 class="mb-2">Deduction Information</h5></div>

                                                <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                        <small>Period</small>
                                                        <select class="form-select" name="deduc_period" {...register('deduc_period')}>
                                                            <option value="MN">Montly</option>
                                                            <option value="LI">Lifetime</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                        <small>Month to start Deductions: </small>
                                                        <select class="form-select" name="deduc_start" {...register('deduc_start')}>
                                                            <option>Annual</option>
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                        <small>Day to start Deductions: </small>
                                                        <input type="text" class="form-control" name="deduc_start_day" {...register('deduc_start_day')} id="" placeholder="Day to start Deductions " />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                        <small> Deductable  Refresh Option: </small>
                                                        <select class="form-select" name="deduct_refresh_option" {...register('deduct_refresh_option')}>
                                                            <option name>Annual</option>
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row mt-4 mb-3 comparis-ionn">
                                                <div class=""><h5 className='mb-2'>Exclusive Information</h5></div>
                                                <div class="row">
                                                    <div class="col-md-3"></div>
                                                    <div class="col-md-3">Deductable</div>
                                                    <div class="col-md-3">Max Out of Pocket</div>
                                                    <div class="col-md-3">Max Benefit</div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2 mt-4">
                                                            <p>Exclude In Network:</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" name="exclude_in_network_ded" {...register('exclude_in_network_ded')} id="Return1" class="d-none" />
                                                            <label for="Return1"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return2" name="exclude_in_network_mop" {...register('exclude_in_network_mop')} class="d-none" />
                                                            <label for="Return2"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return3" class="d-none" name="exclude_in_network" {...register('exclude_in_network')} />
                                                            <label for="Return3"></label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2 mt-4">
                                                            <p>Exclude Generics:</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return4" name="exclude_generics_ded" {...register('exclude_generics_ded')} class="d-none" />
                                                            <label for="Return4"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return5" name="exclude_generics_mop"  {...register('exclude_generics_mop')} class="d-none" />
                                                            <label for="Return5"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return6" class="d-none" name="exclude_generics" {...register('exclude_generics')} />
                                                            <label for="Return6"></label>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2 mt-4">
                                                            <p>Exclude Maintenance Drugs:</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return7" name="exclude_maint_drug_ded" {...register('exclude_maint_drug_ded')} class="d-none" />
                                                            <label for="Return7"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return8" name="exclude_maint_drug_mop" {...register('exclude_maint_drug_mop')} class="d-none" />
                                                            <label for="Return8"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return9" name="exclude_maintenance_drugs" {...register('exclude_maintenance_drugs')} class="d-none" />
                                                            <label for="Return9"></label>
                                                        </div>
                                                    </div>


                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2 mt-4">
                                                            <p>Exclude Mail Service:</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" name="exclude_mail_ord_ded" {...register('exclude_mail_ord_ded')} id="Return10" class="d-none" />
                                                            <label for="Return10"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return11" name="exclude_mail_ord_mop" {...register('exclude_mail_ord_mop')} class="d-none" />
                                                            <label for="Return11"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return12" name="exclude_mail_order" {...register('exclude_mail_order')} class="d-none" />
                                                            <label for="Return12"></label>
                                                        </div>
                                                    </div>


                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2 mt-4">
                                                            <p>Exclude Patient Differentials:</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return13" name="exclude_patient_differential" {...register('exclude_patient_differential')} class="d-none" />
                                                            <label for="Return13"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return14" class="d-none" />
                                                            <label for="Return14"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return15" class="d-none" />
                                                            <label for="Return15"></label>
                                                        </div>
                                                    </div>


                                                   

                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2 mt-4">
                                                            <p>Exclude Deductions:</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3"> </div>

                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="checkbox" id="Return19" class="d-none" />
                                                            <label for="Return19"></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3"></div>


                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2 mt-4">
                                                            <p>Exclude Max Days Supply Over:</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="text" class="form-control" name="" id="" placeholder="Source " />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="text" class="form-control" name="" id="" placeholder="Source " />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mt-3">
                                                            <input type="text" class="form-control" name="" id="" placeholder="Source " />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="row mt-4 mb-3 comparis-ionn">
                                                <div class=""><h5 className='mb-2'>Limitation Information</h5></div>

                                                <div class="row">
                                                    <div class="col-md-3 mb-2"></div>
                                                    <div class="col-md-3 mb-2">Deductable</div>
                                                    <div class="col-md-3 mb-2">Max Out of Pocket</div>
                                                    <div class="col-md-3 mb-2">Max Benefit</div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <p>By GPI List</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="gpi_exclusion_list_ded" {...register('gpi_exclusion_list_ded')} id="ty " placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="gpi_exclusion_list_mop" {...register('gpi_exclusion_list_mop')} id="546" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="gpi_exclusion_list" {...register('gpi_exclusion_list')} id="" placeholder="" />
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <p>By NDC List</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="ndc_exclusion_list_ded" {...register('ndc_exclusion_list_ded')} id="" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="ndc_exclusion_list_mop" {...register('ndc_exclusion_list_mop')} id="" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="ndc_exclusion_list" {...register('ndc_exclusion_list')} id="" placeholder="" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <p>Agg Type Max</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="aggregate_type_ded"  {...register('aggregate_type_ded')} id="" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="aggregate_type_mop" {...register('aggregate_type_mop')} id="" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="aggregate_type_max"  {...register('aggregate_type_max')} id="" placeholder="" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <p>Individual Limit Max</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="apply_indiv_limit_ded" {...register('apply_indiv_limit_ded')} id="" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="apply_indiv_limit_mop" {...register('apply_indiv_limit_mop')} id="" placeholder="" />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="form-group mb-2">
                                                            <input type="text" class="form-control" name="apply_indiv_limit_max" {...register('apply_indiv_limit_max')} id="" placeholder="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="tab-pane fade" id="deductable" role="tabpanel" aria-labelledby="nav-profile-tab">

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
                                                        <input type="text" className="form-control" {...register('max_rxs_per_ded_period')} name="max_rxs_per_ded_period" id="" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="fam_max_rxs_per_ded_period" {...register('fam_max_rxs_per_ded_period')} id="" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Max Rx Action: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <select className="form-select" name="max_rxs_action" {...register('max_rxs_action')}>
                                                        <option value="">---select--</option>
                                                        <option value="Z">Zero</option>
                                                        <option value="C">Change copay Sechudule</option>
                                                        <option value="1">100%</option>
                                                        <option value="R">Rejected</option>

                                                    </select>
                                                </div>
                                                <div className="col-md-4">
                                                    <select className="form-select" name="max_rxs_action" {...register('fam_max_rxs_action')}>
                                                        <option>--select--</option>
                                                        <option value="Z">Zero</option>
                                                        <option value="C">Change copay Sechudule</option>
                                                        <option value="1">100%</option>
                                                        <option value="R">Rejected</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Max Rx Copay Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="max_rxs_copay_schedule" {...register('max_rxs_copay_schedule')} id="" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="fam_max_rxs_copay_schedule" {...register('fam_max_rxs_copay_schedule')} id="" placeholder="" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Deductible: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="ind_deductible" {...register('ind_deductible')} id="" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="family_deductible" {...register('family_deductible')} id="" placeholder="" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Out of Amount: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="ind_out_of_pocket" {...register('ind_out_of_pocket')} id="" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="family_out_of_pocket" {...register('family_out_of_pocket')} id="" placeholder="" />
                                                    </div>
                                                </div>


                                                <div className="col-md-4 mb-2">
                                                    <div className="form-group mb-2">
                                                        <p>Out of Pocket Action: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <select className="form-select" name="ind_out_of_pocket_action">
                                                        <option value="">---select--</option>

                                                        <option value="Z">Zero</option>
                                                        <option value="C">Change copay Sechudule</option>
                                                        <option value="1">100%</option>
                                                        <option value="R">Rejected</option>                                      </select>
                                                </div>
                                                <div className="col-md-4">
                                                    <select className="form-select" name="family_out_of_pocket_action" {...register('family_out_of_pocket_action')}>
                                                        <option value="">---select--</option>

                                                        <option value="Z">Zero</option>
                                                        <option value="C">Change copay Sechudule</option>
                                                        <option value="1">100%</option>
                                                        <option value="R">Rejected</option>                                      </select>
                                                </div>


                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Out of Pocket Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <select className="form-select" name='ind_out_of_pocket_schedule' {...register('ind_out_of_pocket_schedule')}>
                                                            <option value="Z">Zero</option>
                                                            <option value="C">Change copay Sechudule</option>
                                                            <option value="1">100%</option>
                                                            <option value="R">Rejected</option>
                                                        </select>                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <select className="form-select" name="family_out_of_pocket_schedule" {...register('family_out_of_pocket_schedule')}>
                                                            <option value="Z">Zero</option>
                                                            <option value="C">Change copay Sechudule</option>
                                                            <option value="1">100%</option>
                                                            <option value="R">Rejected</option>
                                                        </select>
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
                                                    <input type="text" className="form-control" name="ind_benefit_1" {...register('ind_benefit_1')} id="" />
                                                </div>
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control" name="family_benefit_1" {...register('family_benefit_1')} id="" placeholder="" />
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Action: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <select className="form-select" name="ind_action_1" {...register('ind_action_1')}>
                                                        <option value="R">Reject</option>
                                                        <option value="C">Change the Price sechudule</option>
                                                        <option value="K">Change Copay Sechudule</option>
                                                        <option value="B">Change price and copay sechudule</option>
                                                        <option value="M">Roll To Major Medical</option>
                                                        <option value="A">Add Maximum Over Benefit Amount To be Copay</option>

                                                    </select>
                                                </div>
                                                <div className="col-md-4">
                                                    <select className="form-select" name="family_action_1" {...register('family_action_1')}>
                                                        <option value="R">Reject</option>
                                                        <option value="C">Change the Price sechudule</option>
                                                        <option value="K">Change Copay Sechudule</option>
                                                        <option value="B">Change price and copay sechudule</option>
                                                        <option value="M">Roll To Major Medical</option>
                                                        <option value="A">Add Maximum Over Benefit Amount To be Copay</option>                                    </select>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Price Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="ind_sched_1" {...register('ind_sched_1')} id="" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="family_sched_1"   {...register('family_sched_1')} id="" placeholder="" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Copay Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="ind_copay_1" {...register('ind_copay_1')} id="" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="family_copay_1" {...register('family_copay_1')} id="" placeholder="" />
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
                                                    <input type="text" className="form-control" name="ind_benefit_2" {...register('ind_benefit_2')} id="" />
                                                </div>
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control" name="family_benefit_2" {...register('family_benefit_2')} id="" placeholder="" />
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Action: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <select className="form-select" name="ind_action_2">
                                                        <option value="">--select--</option>
                                                        <option value="R">Reject</option>
                                                        <option value="C">Change the Price sechudule</option>
                                                        <option value="K">Change Copay Sechudule</option>
                                                        <option value="B">Change price and copay sechudule</option>
                                                        <option value="M">Roll To Major Medical</option>
                                                        <option value="A">Add Maximum Over Benefit Amount To be Copay</option>                                        </select>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <select className="form-select" name="family_action_2" {...register('family_action_2')}>
                                                        <option value="">--select--</option>

                                                        <option value="R">Reject</option>
                                                        <option value="C">Change the Price sechudule</option>
                                                        <option value="K">Change Copay Sechudule</option>
                                                        <option value="B">Change price and copay sechudule</option>
                                                        <option value="M">Roll To Major Medical</option>
                                                        <option value="A">Add Maximum Over Benefit Amount To be Copay</option>                                         </select>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Price Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="ind_sched_2"  {...register('ind_sched_2')} id="" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="family_sched_2" {...register('family_sched_2')} id="" placeholder="" />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <p>Copay Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="ind_copay_2" {...register('ind_copay_2')} id="" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="family_copay_2" {...register('family_copay_2')} id="" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>

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



function NdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.plan_accum_deduct_id == props.selected.plan_accum_deduct_id ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItemDetails(props.ndcRow.plan_accum_deduct_id)}
            >
                <td>{props.ndcRow.plan_accum_deduct_id}</td>
                <td >{props.ndcRow.plan_accum_deduct_name}</td>
                <td>{props.ndcRow.ndc_exclusion_list}</td>
                <td>{props.ndcRow.gpi_exclusion_list}</td>

                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}


function AccumulatedBenefitList(props) {


    const scollToRef = useRef();


    useEffect(() => { }, [props.selctedNdc]);
    // //  console.log(props.selctedNdc);

    const getNDCItem = (ndciemid) => {
        props.getNDCItem(ndciemid);
    }

    const getNDCItemDetails = (ndciemid) => {
        props.getNDCItemDetails(ndciemid);
    }

    const ndcListArray = [];
    for (let i = 0; i < props.ndcListData.length; i++) {
        ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} getNDCItemDetails={getNDCItemDetails} selected={props.selctedNdc} />);
    }

    // const ndcClassArray = [];
    // for (let j = 0; j < props.ndcClassData.length; j++) {
    //     ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]} getNDCItemDetails={getNDCItemDetails} selected={props.selctedNdc} />);
    // }

    const [ncdListData, setNcdListData] = useState();
    const [show, setShow] = useState("none");
    const handleShow = () => setShow("block");
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

                                                {ndcListArray}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <AccumulatedBenefitForm  /> */}



        </>
    )
}

function AccumulatedBenefitForm(props) {
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

export function ExclusionLimitation(props) {


    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [accum, setAccum] = useOutletContext();

    console.log(accum);

    useEffect(() => { reset(accum) }, [accum]);


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mt-3 mb-3">
                        <h5 className="mb-2">Exclusion Limitation</h5>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Plan ID:</small>
                                <input type="text" className="form-control" name="plan_accum_deduct_id" {...register('plan_accum_deduct_id')} id="" placeholder="Source " />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Name</small>
                                <input type="text" className="form-control" name="plan_accum_deduct_name"  {...register('plan_accum_deduct_name')} id="" placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Grouping Type:</small>
                                <select className="form-select" name="grouping_type" {...register('grouping_type')}>
                                    <option value="">--select--</option>
                                    <option value="A">Customer</option>
                                    <option value="B">Client</option>
                                    <option value="C">Group</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Benefit Grouping Type:</small>
                                <select className="form-select" name="benefit_grouping_type" {...register('benefit_grouping_type')}>
                                    <option value=''>--select--</option>
                                    <option value="A">Benefit List ID</option>
                                    <option value="B">Client</option>
                                    <option value="C">Group</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <small>Price Schedule: </small>
                            <div className="form-group mb-2">
                                <input type="text" className="form-control" name="accum_bene_price_schedule" {...register('accum_bene_price_schedule')} id="" placeholder="Percentage" />
                            </div>
                        </div>

                        <div className="col-md-2 mt-4">
                            <div className="">
                                <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }}>Search</button>
                            </div>
                        </div>


                        <div class="col-md-12">
                            <div class="row mt-4 mb-3 comparis-ionn">
                                <div class=""><h5 class="mb-2">Deduction Information</h5></div>

                                <div class="col-md-3">
                                    <div class="form-group mb-2">
                                        <small>Period</small>
                                        <select class="form-select" name="deduc_period" {...register('deduc_period')}>
                                            <option value="MN">Montly</option>
                                            <option value="LI">Lifetime</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group mb-2">
                                        <small>Month to start Deductions: </small>
                                        <select class="form-select" name="deduc_start" {...register('deduc_start')}>
                                            <option>Annual</option>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group mb-2">
                                        <small>Day to start Deductions: </small>
                                        <input type="text" class="form-control" name="deduc_start_day" {...register('deduc_start_day')} id="" placeholder="Day to start Deductions " />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group mb-2">
                                        <small> Deductable  Refresh Option: </small>
                                        <select class="form-select" name="deduct_refresh_option" {...register('deduct_refresh_option')}>
                                            <option name>Annual</option>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4 mb-3 comparis-ionn">
                                <div class=""><h5 className='mb-2'>Exclusive Information</h5></div>
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-3">Deductable</div>
                                    <div class="col-md-3">Max Out of Pocket</div>
                                    <div class="col-md-3">Max Benefit</div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group mb-2 mt-4">
                                            <p>Exclude In Network:</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" name="exclude_in_network_ded" {...register('exclude_in_network_ded')} id="Return1" class="d-none" />
                                            <label for="Return1"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return2" name="exclude_in_network_mop" {...register('exclude_in_network_mop')} class="d-none" />
                                            <label for="Return2"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return3" class="d-none" name="exclude_in_network" {...register('exclude_in_network')} />
                                            <label for="Return3"></label>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group mb-2 mt-4">
                                            <p>Exclude Generics:</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return4" name="exclude_generics_ded" {...register('exclude_generics_ded')} class="d-none" />
                                            <label for="Return4"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return5" name="exclude_generics_mop"  {...register('exclude_generics_mop')} class="d-none" />
                                            <label for="Return5"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return6" class="d-none" name="exclude_generics" {...register('exclude_generics')} />
                                            <label for="Return6"></label>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group mb-2 mt-4">
                                            <p>Exclude Maintenance Drugs:</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return7" name="exclude_maint_drug_ded" {...register('exclude_maint_drug_ded')} class="d-none" />
                                            <label for="Return7"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return8" name="exclude_maint_drug_mop" {...register('exclude_maint_drug_mop')} class="d-none" />
                                            <label for="Return8"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return9" name="exclude_maintenance_drugs" {...register('exclude_maintenance_drugs')} class="d-none" />
                                            <label for="Return9"></label>
                                        </div>
                                    </div>


                                    <div class="col-md-3">
                                        <div class="form-group mb-2 mt-4">
                                            <p>Exclude Mail Service:</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" name="exclude_mail_ord_ded" {...register('exclude_mail_ord_ded')} id="Return10" class="d-none" />
                                            <label for="Return10"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return11" name="exclude_mail_ord_mop" {...register('exclude_mail_ord_mop')} class="d-none" />
                                            <label for="Return11"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return12" name="exclude_mail_order" {...register('exclude_mail_order')} class="d-none" />
                                            <label for="Return12"></label>
                                        </div>
                                    </div>


                                    <div class="col-md-3">
                                        <div class="form-group mb-2 mt-4">
                                            <p>Exclude Patient Differentials:</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return13" name="exclude_patient_differential" {...register('exclude_patient_differential')} class="d-none" />
                                            <label for="Return13"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return14" class="d-none" />
                                            <label for="Return14"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return15" class="d-none" />
                                            <label for="Return15"></label>
                                        </div>
                                    </div>


                                    <div class="col-md-3">
                                        <div class="form-group mb-2 mt-4">
                                            <p>Exclude Maintenance Drugs:</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return16" name="exclude_maint_drug_ded" {...register('exclude_maint_drug_ded')} class="d-none" />
                                            <label for="Return16"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" name="exclude_maint_drug_mop" {...register('exclude_maint_drug_mop')} id="Return17" class="d-none" />
                                            <label for="Return17"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return18" name="exclude_maintenance_drugs" {...register('exclude_maintenance_drugs')} class="d-none" />
                                            <label for="Return18"></label>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <div class="form-group mb-2 mt-4">
                                            <p>Exclude Deductions:</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3"> </div>

                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="checkbox" id="Return19" class="d-none" />
                                            <label for="Return19"></label>
                                        </div>
                                    </div>
                                    <div class="col-md-3"></div>


                                    <div class="col-md-3">
                                        <div class="form-group mb-2 mt-4">
                                            <p>Exclude Max Days Supply Over:</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="text" class="form-control" name="" id="" placeholder="Source " />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="text" class="form-control" name="" id="" placeholder="Source " />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mt-3">
                                            <input type="text" class="form-control" name="" id="" placeholder="Source " />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="row mt-4 mb-3 comparis-ionn">
                                <div class=""><h5 className='mb-2'>Limitation Information</h5></div>

                                <div class="row">
                                    <div class="col-md-3 mb-2"></div>
                                    <div class="col-md-3 mb-2">Deductable</div>
                                    <div class="col-md-3 mb-2">Max Out of Pocket</div>
                                    <div class="col-md-3 mb-2">Max Benefit</div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <p>By GPI List</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="gpi_exclusion_list_ded" {...register('gpi_exclusion_list_ded')} id="" placeholder="" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="gpi_exclusion_list_mop" {...register('gpi_exclusion_list_mop')} id="" placeholder="" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="gpi_exclusion_list" {...register('gpi_exclusion_list')} id="" placeholder="" />
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <p>By NDC List</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="ndc_exclusion_list_ded" {...register('ndc_exclusion_list_ded')} id="" placeholder="" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="ndc_exclusion_list_mop" {...register('ndc_exclusion_list_mop')} id="" placeholder="" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="ndc_exclusion_list" {...register('ndc_exclusion_list')} id="" placeholder="" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <p>Agg Type Max</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="aggregate_type_ded"  {...register('aggregate_type_ded')} id="" placeholder="" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="aggregate_type_mop" {...register('aggregate_type_mop')} id="" placeholder="" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="aggregate_type_max"  {...register('aggregate_type_max')} id="" placeholder="" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <p>Individual Limit Max</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="apply_indiv_limit_ded" {...register('apply_indiv_limit_ded')} id="" placeholder="" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="apply_indiv_limit_mop" {...register('apply_indiv_limit_mop')} id="" placeholder="" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group mb-2">
                                            <input type="text" class="form-control" name="apply_indiv_limit_max" {...register('apply_indiv_limit_max')} id="" placeholder="" />
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

export function Deductible(props) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [accum, setAccum] = useOutletContext();

    console.log(accum);

    useEffect(() => { reset(accum) }, [accum]);
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
                                        <input type="text" className="form-control" {...register('max_rxs_per_ded_period')} name="max_rxs_per_ded_period" id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="fam_max_rxs_per_ded_period" {...register('fam_max_rxs_per_ded_period')} id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Max Rx Action: </p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <select className="form-select" name="max_rxs_action" {...register('max_rxs_action')}>
                                        <option value="">---select--</option>
                                        <option value="Z">Zero</option>
                                        <option value="C">Change copay Sechudule</option>
                                        <option value="1">100%</option>
                                        <option value="R">Rejected</option>

                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select" name="max_rxs_action" {...register('fam_max_rxs_action')}>
                                        <option>--select--</option>
                                        <option value="Z">Zero</option>
                                        <option value="C">Change copay Sechudule</option>
                                        <option value="1">100%</option>
                                        <option value="R">Rejected</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Max Rx Copay Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="max_rxs_copay_schedule" {...register('max_rxs_copay_schedule')} id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="fam_max_rxs_copay_schedule" {...register('fam_max_rxs_copay_schedule')} id="" placeholder="" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Deductible: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="ind_deductible" {...register('ind_deductible')} id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="family_deductible" {...register('family_deductible')} id="" placeholder="" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Out of Amount: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="ind_out_of_pocket" {...register('ind_out_of_pocket')} id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="family_out_of_pocket" {...register('family_out_of_pocket')} id="" placeholder="" />
                                    </div>
                                </div>


                                <div className="col-md-4 mb-2">
                                    <div className="form-group mb-2">
                                        <p>Out of Pocket Action: </p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <select className="form-select" name="ind_out_of_pocket_action">
                                        <option value="">---select--</option>

                                        <option value="Z">Zero</option>
                                        <option value="C">Change copay Sechudule</option>
                                        <option value="1">100%</option>
                                        <option value="R">Rejected</option>                                      </select>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select" name="family_out_of_pocket_action" {...register('family_out_of_pocket_action')}>
                                        <option value="">---select--</option>

                                        <option value="Z">Zero</option>
                                        <option value="C">Change copay Sechudule</option>
                                        <option value="1">100%</option>
                                        <option value="R">Rejected</option>                                      </select>
                                </div>


                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Out of Pocket Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <select className="form-select" name='ind_out_of_pocket_schedule' {...register('ind_out_of_pocket_schedule')}>
                                            <option value="Z">Zero</option>
                                            <option value="C">Change copay Sechudule</option>
                                            <option value="1">100%</option>
                                            <option value="R">Rejected</option>
                                        </select>                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <select className="form-select" name="family_out_of_pocket_schedule" {...register('family_out_of_pocket_schedule')}>
                                            <option value="Z">Zero</option>
                                            <option value="C">Change copay Sechudule</option>
                                            <option value="1">100%</option>
                                            <option value="R">Rejected</option>
                                        </select>
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
                                    <input type="text" className="form-control" name="ind_benefit_1" {...register('ind_benefit_1')} id="" />
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" name="family_benefit_1" {...register('family_benefit_1')} id="" placeholder="" />
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Action: </p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <select className="form-select" name="ind_action_1" {...register('ind_action_1')}>
                                        <option value="R">Reject</option>
                                        <option value="C">Change the Price sechudule</option>
                                        <option value="K">Change Copay Sechudule</option>
                                        <option value="B">Change price and copay sechudule</option>
                                        <option value="M">Roll To Major Medical</option>
                                        <option value="A">Add Maximum Over Benefit Amount To be Copay</option>

                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select" name="family_action_1" {...register('family_action_1')}>
                                        <option value="R">Reject</option>
                                        <option value="C">Change the Price sechudule</option>
                                        <option value="K">Change Copay Sechudule</option>
                                        <option value="B">Change price and copay sechudule</option>
                                        <option value="M">Roll To Major Medical</option>
                                        <option value="A">Add Maximum Over Benefit Amount To be Copay</option>                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Price Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="ind_sched_1" {...register('ind_sched_1')} id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="family_sched_1"   {...register('family_sched_1')} id="" placeholder="" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Copay Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="ind_copay_1" {...register('ind_copay_1')} id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="family_copay_1" {...register('family_copay_1')} id="" placeholder="" />
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
                                    <input type="text" className="form-control" name="ind_benefit_2" {...register('ind_benefit_2')} id="" />
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" name="family_benefit_2" {...register('family_benefit_2')} id="" placeholder="" />
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Action: </p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <select className="form-select" name="ind_action_2">
                                        <option value="">--select--</option>
                                        <option value="R">Reject</option>
                                        <option value="C">Change the Price sechudule</option>
                                        <option value="K">Change Copay Sechudule</option>
                                        <option value="B">Change price and copay sechudule</option>
                                        <option value="M">Roll To Major Medical</option>
                                        <option value="A">Add Maximum Over Benefit Amount To be Copay</option>                                        </select>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <select className="form-select" name="family_action_2" {...register('family_action_2')}>
                                        <option value="">--select--</option>

                                        <option value="R">Reject</option>
                                        <option value="C">Change the Price sechudule</option>
                                        <option value="K">Change Copay Sechudule</option>
                                        <option value="B">Change price and copay sechudule</option>
                                        <option value="M">Roll To Major Medical</option>
                                        <option value="A">Add Maximum Over Benefit Amount To be Copay</option>                                         </select>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Price Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="ind_sched_2"  {...register('ind_sched_2')} id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="family_sched_2" {...register('family_sched_2')} id="" placeholder="" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <p>Copay Schedule: </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="ind_copay_2" {...register('ind_copay_2')} id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <input type="text" className="form-control" name="family_copay_2" {...register('family_copay_2')} id="" placeholder="" />
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