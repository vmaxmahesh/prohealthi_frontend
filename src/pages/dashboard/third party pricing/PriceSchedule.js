import React, { useEffect, useState, useReducer, createContext } from 'react';
import { Form } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



export default function PriceSchedule() {

    const methods = useForm();
    const {register, handleSubmit, watch, reset, formState : {errors} } = useForm();
    const [priceScheduleList, setPriceScheduleList] = useState([]);
    const [scheduleData, setScheduleData] = useState(false);
    const [adding, setAdding] = useState(false);

    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];

    const OnSearchPriceSchedule = (fdata) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/price-schedule/get?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setPriceScheduleList(data.data);
                    toast.success(response.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getPriceScheduleDetails = (row) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/price-schedule/get-price-schedule-data?search=${row.price_schedule}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                (data.data);
                setScheduleData(data.data);
                // setGenericAvailable(data.data);
                // setGeneric(data.data);
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
    }

    const AddForm = () => {
        setScheduleData(false);
        setAdding(true);
        methods.reset();
        (scheduleData);
    }

    const addBrandItem_old = (brand_item_form) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(brand_item_form)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/price-schedule/update`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    reset(data.data);
                    // var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                    toast.success(data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,

                    });
                }
            });
    }

    const addBrandItem = (brand_item_form) => {
        console.log("brand_item_form");
        console.log(brand_item_form);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(brand_item_form)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/price-schedule/update`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    reset(data.data);
                    // var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                    toast.success(data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,

                    });
                }
            });
    }


    useEffect(() => {
        if (adding) {
            methods.reset({
                price_schedule: '', price_schedule_name: '', copay_schedule: ''
            },
                { keepValues: false, });
        }
        methods.reset(scheduleData);
    }, [scheduleData]);


    useEffect(() => {

        if (scheduleData) {
            setAdding(false);
            // alert("reset");
        } else {
            // alert("else ");
            setAdding(true);
            setScheduleData(false);
        }
        document.title = 'Price Schedule | ProHealthi';

    }, [priceScheduleList, scheduleData, adding]);

    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a className=""> Third Party Pricing </a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a className="">Price Schedule</a></li>
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
            <SearchPriceSchedule OnSearchPriceSchedule={OnSearchPriceSchedule} />
            <div className="col-md-3 ms-auto text-end">
                <button type="button" className="btn btn-info btn-sm" onClick={e => AddForm()}>
                    Add Price Schedule <i className="fa fa-plus-circle"></i></button>
            </div>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <GetPriceSchedules listData={priceScheduleList} getPriceScheduleDetails={getPriceScheduleDetails} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="col-md-8 mb-2">
                                        <h5>Price Schedule Form {adding ? "(Add New Data)" : "(Update Data)"}</h5>
                                    </div><hr />
                                    <FormProvider {...methods} >
                                        <Form onSubmit={handleSubmit(addBrandItem)}>
                                            <StrategyInputs />
                                            <hr />
                                            <div className="data">
                                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                    <Link to="brand-item" className={'nav-link' + (currentpath == 'brand-item' ? ' active' : '')}>Brand Item, No Generic / Non-Drug</Link>
                                                    <Link to="brand-item-generic" className={'nav-link' + (currentpath == 'brand-item-generic' ? ' active' : '')}>Brand Item,Generic Available</Link>
                                                    <Link to="generic-item" className={'nav-link' + (currentpath == 'generic-item' ? ' active' : '')}>Generic Item</Link>
                                                </div>
                                                <hr />

                                                <div className="tab-content" id="nav-tabContent">

                                                    <Outlet context={{ data: [scheduleData, setScheduleData], adding: [adding, setAdding] }} />

                                                    <div className='row'>
                                                        <div className="col-md-2 mt-4">
                                                            <div className="">
                                                                <button type="submit" className="btn m-0 p-2 btn-theme " style={{ width: "100%", fontSize: "12px" }}>{adding ? "Add" : "Update"}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </FormProvider>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

function StrategyInputs(handleClick) {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useFormContext();

    return (
        <>              
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group mb-2">
                        <small>Price Schedule</small>
                        <input type="text" className="form-control" {...register("price_schedule")} placeholder="Price Schedule" />
                        {errors.price_schedule && <span><p className='notvalid'>This field is required</p></span>}
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group mb-2">
                        <small>Price Schedule Name</small>
                        <input type="text" className="form-control" {...register("price_schedule_name")} placeholder="Price Schedule" />
                        {errors.price_schedule_name && <span><p className='notvalid'>This field is required</p></span>}
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group mb-2">
                        <small>Copay Schedule</small>
                        <input type="text" className="form-control" {...register("copay_schedule")} placeholder="Price Schedule" />
                        {errors.copay_schedule && <span><p className='notvalid'>This field is required</p></span>}
                    </div>
                </div>
            </div>
        </>
    )
}

function SearchPriceSchedule(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small> Price Schedule </small>
                                <input type="text" onKeyUp={e => props.OnSearchPriceSchedule(e)} className="form-control" placeholder='Start typing price schedule id/ name/ copay schedule to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function GetPriceSchedules(props) {
    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];

    const listArray = [];
    if (props.listData) {
        for (let i = 0; i < props.listData.length; i++) {
            listArray.push(<PriceScheduleRow rowData={props.listData[i]} getPriceScheduleDetails={props.getPriceScheduleDetails} />)
        }
    }

    return (
        <>
            {/* <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row"> */}
            {/* <div className="col-md-8 mb-2"> */}
            <h5>Price Schedule List</h5>
            {/* </div> */}
            {/* <div className="col-md-4 mb-3 text-end"> */}
            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
            {/* </div> */}

            {/* <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body"> */}
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                    <thead className='stickt-thead'>
                        <tr>
                            <th>Price Schedule ID</th>
                            <th>Price Schedule Name</th>
                            <th>Copay Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listArray}
                    </tbody>
                </table>
            </div>
            {/* </div>
                            </div>
                        </div> */}
            {/* form starts */}

            {/* form ends  */}
            {/* </div>
                </div>
            </div> */}
        </>
    );
}

function PriceScheduleRow(props) {
    return (
        <>
            <tr onClick={() => props.getPriceScheduleDetails(props.rowData)}
                className={(props.selected && props.rowData.price_schedule == props.selected.price_schedule ? 'tblactiverow' : '')}>
                <td>{props.rowData.price_schedule}</td>
                <td>{props.rowData.price_schedule_name}</td>
                <td>{props.rowData.copay_schedule}</td>
            </tr>
        </>
    )
}

export function BrandItem() {

    // const [scheduleData, setScheduleData] = useOutletContext(false);
    const {
        data: [scheduleData, setScheduleData],
        adding: [adding, setAdding],
    } = useOutletContext();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useFormContext();
    useEffect(() => {
        if (adding) {
            reset({
                bng1_source: '', bng1_markup_amount: '', bng1_markup_percent: '', bng1_type: '', bng1_fee_percent: '', bng1_fee_amount: '',
                bng1_stdpkg: '0', new: 1
            },
                { keepValues: false, });
        }
        reset(scheduleData)
    }, [scheduleData, adding]);


    return (
        <>
            <div className='row'>
                <div className="col-md-12">
                    <h5 className="mb-2">Brand Item, No Generic / Non-Drug</h5>
                    <div className="row mt-3 mb-3">
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    First available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Greatest off all available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Least off all available
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Source</small>
                                <input type="text" className="form-control" {...register("bng1_source")} placeholder="Source " />
                                {errors.bng1_source && <span><p className='notvalid'>This field is required</p></span>}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" {...register("bng1_markup_percent")} placeholder="Percentage" />
                                {errors.bng1_markup_amount && <span><p className='notvalid'>This field is required</p></span>}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" {...register("bng1_markup_amount")} placeholder="In dollars" />
                                {errors.bng1_markup_percent && <span><p className='notvalid'>This field is required</p></span>}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Type</small>
                                <select className="form-select" {...register("bng1_type")}>
                                    <option value="MAC">MAC  Plan's Maximum Allowable Charge</option>
                                    <option value="UCR">UCR  Usual and Customary Reimbursment</option>
                                </select>
                                {errors.bng1_type && <span><p className='notvalid'>This field is required</p></span>}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <small>Fee</small>
                            <div className="form-group mb-2">
                                <input type="text" className="form-control" {...register("bng1_fee_amount")} placeholder="Percentage" />
                                {errors.bng1_fee_amount && <span><p className='notvalid'>This field is required</p></span>}
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Fee</small>
                                <input type="text" className="form-control" {...register("bng1_fee_percent")} placeholder="In dollars" />
                                {errors.bng1_fee_percent && <span><p className='notvalid'>This field is required</p></span>}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return2" className="d-none" {...register("bng1_stdpkg")} />
                                <label htmlFor="Return2">Std Pkg </label>
                            </div>
                            {errors.bng1_stdpkg && <span><p className='notvalid'>This field is required</p></span>}
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return3" className="d-none" />
                                <label htmlFor="Return3">1 per fill</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export function BrandItemGeneric() {
    // const [scheduleData, setScheduleData] = useOutletContext(false);
    // const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    // useEffect(() => { reset(scheduleData) }, [scheduleData]);

    const {
        data: [scheduleData, setScheduleData],
        adding: [adding, setAdding],
    } = useOutletContext();

    const { register, handleSubmit, watch, reset, formState: { error } } = useFormContext();
    useEffect(() => {
        if (adding) {
            reset({
                bga1_source: '', bga1_markup_amount: '', bga1_markup_percent: '', bga1_type: '', bga1_fee_percent: '', bga1_fee_amount: ''
                , bga1_stdpkg: '0'
            },
                { keepValues: false, });
        }
        reset(scheduleData)
    }, [scheduleData, adding]);
    return (
        <>
            <div className='row'>
                <div className="col-md-12">
                    <h5 className="mb-2">Brand Item,Generic Available</h5>
                    <div className="row mt-3 mb-3">
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    First available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Greatest off all available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Least off all available
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Source</small>
                                <input type="text" className="form-control" {...register("bga1_source")} placeholder="Source " />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" {...register("bga1_fee_percent")} placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" {...register("bga1_fee_amount")} placeholder="In dollars" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Type</small>
                                <select className="form-select" {...register("bga1_type")}>
                                    <option>Type 1</option>
                                    <option>Type 2</option>
                                    <option>Type 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <small>Fee</small>
                            <div className="form-group mb-2">
                                <input type="text" className="form-control" {...register("bga1_fee_factor")} placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Fee</small>
                                <input type="text" className="form-control" {...register("bga1_fee_matrix")} placeholder="In dollars" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return5" className="d-none" {...register("bga1   _stdpkg")} />
                                <label htmlFor="Return5">Std Pkg</label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return6" className="d-none" />
                                <label htmlFor="Return6">1 per fill</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function GetGenericItem() {
    // const [scheduleData, setScheduleData] = useOutletContext(false);
    // const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    // (scheduleData);
    // useEffect(() => { reset(scheduleData) }, [scheduleData]);

    const {
        data: [scheduleData, setScheduleData],
        adding: [adding, setAdding],
    } = useOutletContext();

    const { register, handleSubmit, watch, reset, formState: { error } } = useFormContext();
    useEffect(() => {
        if (adding) {
            reset({
                gen1_source: '', gen1_markup_amount: '', gen1_markup_percent: '', gen1_type: '', gen1_fee_percent: '', gen1_fee_amount: ''
                , gen1_stdpkg: '0'
            },
                { keepValues: false, });
        }
        reset(scheduleData)
    }, [scheduleData, adding]);

    return (
        <>
            <div className='row'>
                <div className="col-md-12">
                    <h5 className="mb-2">Generic Item</h5>
                    <div className="row mt-3 mb-3">
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    First available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Greatest off all available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Least off all available
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Source</small>
                                <input type="text" className="form-control" {...register("gen1_source")} placeholder="Source " />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" {...register("gen1_fee_percent")} placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" {...register("gen1_fee_amount")} placeholder="In dollars" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Type</small>
                                <select className="form-select" {...register("gen1_type")}>
                                    <option>Type 1</option>
                                    <option>Type 2</option>
                                    <option>Type 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <small>Fee</small>
                            <div className="form-group mb-2">
                                <input type="text" className="form-control" {...register("gen1_fee_factor")} placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Fee</small>
                                <input type="text" className="form-control" {...register("gen1_fee_matrix")} placeholder="In dollars" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return8" className="d-none" {...register("gen1_stdpkg")} />
                                <label htmlFor="Return8">Std Pkg</label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return9" className="d-none" />
                                <label htmlFor="Return9">1 per fill</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}