import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function PricingStrategies() {

    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');

    const [benifitsData, setBenifitData] = useState(false);
    const [adding, setAdding] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/pricingstrategy/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                console.log(data.data);

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

        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/pricingstrategy/get/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setNdClass([]);
                    return Promise.reject(error);
                } else {
                    setNdClass(data.data);
                    // scollToRef.current.scrollIntoView()
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    const AddForm = () => {
        setBenifitData(false);
        setAdding(true);

        

    }


    const getNDCItemDetails = (ndcid) => {
        console.log(ndcid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/pricingstrategy/details/${ndcid}`, requestOptions)
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
                    setBenifitData(data.data);
                    console.log(selctedNdc);
                    scollToRef.current.scrollIntoView()
                    return;
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }



    useEffect(() => {
        if (benifitsData) {
            setAdding(false);

        } else {
            setAdding(true);
            setBenifitData(false);
        }

        document.title = 'Benefit Code | ProHealthi';

    }, [benifitsData, adding]);



    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Strategies</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Pricing Strategy</a></li>
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


            <div className="col-md-3 ms-auto text-end">
                    <button className="btn  btn-info btn-sm" onClick={e => AddForm()}>
                    Accumulated Benefit Strategy <i className="fa fa-plus-circle"></i></button>
            </div>


            <SearchPricingStrategy searchException={searchException} />


            <PricingStrategyList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />

            {/* <PriceScheduleForm viewDiagnosisFormdata={selctedNdc} /> */}


            <PriceScheduleForm  show={show} adding={adding} handleClose={handleClose} selected={benifitsData} />

        </>
    )
}

function SearchPricingStrategy(props) {

    const searchException = (fdata) => {
        // alert(fdata);

        props.searchException(fdata);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Pricing Strategy</small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing  pricing strategy ID/name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



function NdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.pricing_strategy_id == props.selected.pricing_strategy_id ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.pricing_strategy_id)}
            >
                <td>{props.ndcRow.pricing_strategy_id}</td>
                <td >{props.ndcRow.pricing_strategy_name}</td>

                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}


function NdcClassRow(props) {

    useEffect(() => {

    }, [props.selected]);

    return (
        <>
            <tr
                className={(props.selected && props.ndcClassRow.pricing_strategy_id == props.selected.pricing_strategy_id ? ' tblactiverow ' : '')}
                onClick={() => props.getNDCItemDetails(props.ndcClassRow.pricing_strategy_id)}

            >
                <td>{props.ndcClassRow.effective_date}</td>
                <td>{props.ndcClassRow.pharm_type_variation_ind}</td>
                <td>{props.ndcClassRow.network_part_variation_ind}</td>
                <td>{props.ndcClassRow.claim_type_variation_ind}</td>
                <td>{props.ndcClassRow.formulary_variation_ind}</td>
                <td>{props.ndcClassRow.price_schedule}</td>
                <td>{props.ndcClassRow.mac_list}</td>


                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function PricingStrategyList(props) {

    const scollToRef = useRef();

    useEffect(() => { }, [props.selctedNdc]);
    // //  console.log(props.selctedNdc);

    const getNDCItem = (ndciemid) => {
        // alert(ndciemid);
        props.getNDCItem(ndciemid);
    }

    const getNDCItemDetails = (ndciemid) => {
        props.getNDCItemDetails(ndciemid);
    }


    const ndcListArray = [];
    for (let i = 0; i < props.ndcListData.length; i++) {
        ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} selected={props.selctedNdc} />);
    }

    const ndcClassArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]} getNDCItemDetails={getNDCItemDetails} selected={props.selctedNdc} />);
    }

    const [ncdListData, setNcdListData] = useState();
    const [show, setShow] = useState("none");
    const handleShow = () => setShow("block");
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Pricing Strategy List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Pricing Strategy ID</th>
                                                    <th>Pricing Strategy Name</th>
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
                        <div className="col-md-8">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Effective Date</th>
                                                    <th>Provider Type Variation</th>
                                                    <th>Network Participation Variation</th>
                                                    <th>Claim Type Variation</th>
                                                    <th>Formulary Variation</th>
                                                    <th>Price Schedule ID</th>
                                                    <th>MAC List</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {ndcClassArray}


                                            </tbody>
                                        </table>
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

function PriceScheduleForm(props) {


    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();



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
            fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/pricingstrategy/add`, requestOptions)
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
            reset({ pricing_strategy_id: '', pricing_strategy_name: '', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ pricing_strategy_id: '',pricing_strategy_name:'', description: '',pharm_type_variation_ind:'',network_part_variation_ind:'',claim_type_variation_ind:'',plan_accum_deduct_id:'',formulary_variation_ind:'',price_schedule:'',mac_list:'', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);


    useEffect(() => { reset(props.selected) }, [props.selected]);



    return (
        <>

<form onSubmit={handleSubmit(addCode)} >
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Pricing Strategy Identification  {props.adding ? ' - (Adding)' : '- (' + props.selected.pricing_strategy_id + ' )'}</h5>

                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small> Strategy ID: </small>
                                <input type="text" name="pricing_strategy_id" {...register('pricing_strategy_id',{
                                    required:true,
                                })} placeholder="" className="form-control" />
                                {errors.pricing_strategy_id && <span><p role="alert" className="notvalid">This field is required</p></span>}

                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small> Strategy Name: </small>
                                <input type="text" name="pricing_strategy_name" {...register('pricing_strategy_name',{
                                    required:true,
                                })}  className="form-control" />
                                {errors.pricing_strategy_name && <span><p role="alert" className="notvalid">This field is required</p></span>}

                            </div>
                        </div>
                    </div>


                    <div className="row mb-2">
                        <div className="col-md-12">
                            <h5 className="mb-2">Variations</h5>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Provider Type:</small>
                                <select className="form-select" name="pharm_type_variation_ind" {...register('pharm_type_variation_ind',{
                                    required:true,
                                })}>
                                    <option value="">--select--</option>
                                    <option value="R">Retail</option>
                                    <option value="M">Mail Service </option>
                                    <option value="*">WildCard - No Variation</option>
                                </select>
                                {errors.pharm_type_variation_ind && <span><p role="alert" className="notvalid">This field is required</p></span>}

                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Network Partification:</small>
                                <select className="form-select" name="network_part_variation_ind" {...register('network_part_variation_ind',{
                                    required:true,
                                })}>
                                    <option value="">--select--</option>
                                    <option value="I">In Network</option>
                                    <option value="O">Out of Network </option>
                                    <option value="*">WildCard - No Variation</option>
                                </select>
                                {errors.network_part_variation_ind && <span><p role="alert" className="notvalid">This field is required</p></span>}


                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Claim Type:</small>
                                <select className="form-select" name="claim_type_variation_ind" {...register('claim_type_variation_ind',{
                                    required:true,
                                })}>
                                    <option value="">--select--</option>
                                    <option value="P">POS</option>
                                    <option value="D">DMR </option>
                                    <option value="U">UCF</option>
                                    <option value="*">WildCard - No Variation</option>
                                </select>

                                {errors.claim_type_variation_ind && <span><p role="alert" className="notvalid">This field is required</p></span>}


                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Formulary:</small>
                                <select className="form-select" name="formulary_variation_ind" {...register('formulary_variation_ind',{
                                    required:true,
                                })}>
                                    <option value="">--select--</option>
                                    <option value="F">Formularly</option>
                                    <option value="N">Non-Formulary </option>
                                    {/* <option>UCF</option> */}
                                    <option value="*">Wild Card - No Variation</option>
                                </select>

                                {errors.formulary_variation_ind && <span><p role="alert" className="notvalid">This field is required</p></span>}


                                

                            </div>
                        </div>
                    </div>

                    <div className="row mb-2 ">
                        <div className="col-md-3 mb-3">
                            <div className="form-group ">
                                <small> Schedule ID</small>
                                <div className="searchmodal">
                                    <input type="text" name="price_schedule" {...register('price_schedule')} className="form-control" placeholder="" />
                                    {errors.formulary_variation_ind && <span><p role="alert" className="notvalid">This field is required</p></span>}

                                    {/* <button className="btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-magnifying-glass"></i></button> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group ">
                                <small> MAC List</small>
                                <div className="searchmodal">
                                    <input type="text" name="mac_list" {...register('mac_list',{
                                        required:true,
                                    })} className="form-control" placeholder="" />
                                    {errors.mac_list && <span><p role="alert" className="notvalid">This field is required</p></span>}

                                    {/* <button className="btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-magnifying-glass"></i></button> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="form-group">
                                <small>Effective Date: </small>
                                <input type="date" className="form-control" placeholder="" name="effective_date"  {...register('effective_date')} id="" required="" autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <small className="mb-2"></small>
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return2" className="d-none" />
                                <label htmlFor="Return2">User exit will not be invoked for the strategy </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 ">
                        <div className="float-end">
                            {/* <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a> */}
                        </div>
                    </div>
                </div>
            </div>

            <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>


        </form>
            




        </>
    )
}