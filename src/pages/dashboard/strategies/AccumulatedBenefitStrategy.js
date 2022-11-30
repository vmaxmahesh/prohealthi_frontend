import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function AccumulatedBenefitStrategy()
{


    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();

    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');

    const [benifitsData, setBenifitData] = useState(false);
    const [benifitsList, setBenifitList] = useState([]);
    const [adding, setAdding] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/search?search=${fdata.target.value}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/get/${ndcid}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/details/${ndcid}`, requestOptions)
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
                    // console.log(selctedNdc);
                    // scollToRef.current.scrollIntoView()
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


    return(
        <>
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Strategies</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Accumulated Benefit Strategy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="breadcrum ">
                        <ul>
                            <li className="float-end m-0"><a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a></li>
                        </ul>
                        <div className="col-md-3 ms-auto text-end">
                                    <button className="btn  btn-info btn-sm" onClick={e => AddForm()}>
                                        Add Benefit Code <i className="fa fa-plus-circle"></i></button>
                                </div>
                    </div>
                </div>
            </div> 
            <SearchAccumulatedStrategy searchException={searchException} />

            <AccumulatedBenefitStrategyList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />

             {/* <AccumeBenefitStrategyForm   viewDiagnosisFormdata={selctedNdc}/>  */}


             <AccumeBenefitStrategyForm  show={show} adding={adding} handleClose={handleClose} selected={benifitsData} />




          
        </>
    )
}

function SearchAccumulatedStrategy(props)
{

    const searchException = (fdata) => {
        // alert(fdata);

        props.searchException(fdata);
    }


    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Accumulated Benefit Strategy</small>
                                <input type="text" className="form-control" onKeyUp={(e) => searchException(e)} placeholder='Start typing  accumulated benefit strategy ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
        </>
    )
}

function AccumulatedBenefitStrategyList(props)
{


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



    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Accumulated Benefit Strategy List</h5>
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
                                                    <th>Accumulated Benefit Strategy ID</th>
                                                    <th>Accumulated Benefit Strategy Name</th>
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
                                                    <th>Accume Benefits Plan ID</th>
                                                    <th>Exclusion Flag</th>
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



function NdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.accum_bene_strategy_id == props.selected.accum_bene_strategy_id ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.accum_bene_strategy_id)}
            >
                <td>{props.ndcRow.accum_bene_strategy_id}</td>
                <td >{props.ndcRow.accum_sat_name}</td>

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
                className={(props.selected && props.ndcClassRow.accum_bene_strategy_id == props.selected.accum_bene_strategy_id ? ' tblactiverow ' : '')}
                onClick={() => props.getNDCItemDetails(props.ndcClassRow.accum_bene_strategy_id)}

            >
                <td>{props.ndcClassRow.effective_date}</td>
                <td>{props.ndcClassRow.pharm_type_variation_ind}</td>
                <td>{props.ndcClassRow.network_part_variation_ind}</td>
                <td>{props.ndcClassRow.claim_type_variation_ind}</td>
                <td>{props.ndcClassRow.formulary_variation_ind}</td>
                <td>{props.ndcClassRow.plan_accum_deduct_id}</td>
                <td>{props.ndcClassRow.accum_exclusion_flag}</td>


                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function AccumeBenefitStrategyForm(props)
{

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
            fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/add`, requestOptions)
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
            reset({ accum_bene_strategy_name: '', description: '', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ accum_bene_strategy_name: '',accum_bene_strategy_id:'', description: '',pharm_type_variation_ind:'',network_part_variation_ind:'',claim_type_variation_ind:'',plan_accum_deduct_id:'', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);


    useEffect(() => { reset(props.selected) }, [props.selected]);
    return(
        <>

<form onSubmit={handleSubmit(addCode)} >


<div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                                <h5 className="mb-2">Accumulate Benefit Strategy Identification  {props.adding ? ' - (Adding)' : '- (' + props.selected.accum_bene_strategy_id + ' )'}</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <small> Strategy ID: </small>
                                       <input type="text" name="accum_bene_strategy_id" {...register('accum_bene_strategy_id')} placeholder="" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <small> Strategy Name: </small>
                                    <input type="text" name="accum_bene_strategy_name" {...register('accum_bene_strategy_name')}  className="form-control" />
                                    </div>
                                </div>
                            </div>
                        {/* </div>
        </div>

        <div className="card mt-3 mb-3">
            <div className="card-body"> */}
            
                <div className="row mb-2">
                        <div className="col-md-12">
                    <h5 className="mb-2">Variations</h5>
                </div>
                    
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Provider Type:</small>
                                <select className="form-select" name="pharm_type_variation_ind" {...register('pharm_type_variation_ind')}>\
                                    <option value="">--select--</option>
                                    <option value="R">Retail</option>
                                    <option value="M">Mail Service </option>
                                    <option value="*">WildCard - No Variation</option>
                                </select>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Network Partification:</small>
                                <select className="form-select" name="network_part_variation_ind" {...register('network_part_variation_ind')}>
                                    <option value="">--select--</option>
                                    <option value="I">In Network</option>
                                    <option value="O">Out of Network </option>
                                    <option value="*">WildCard - No Variation</option>
                                </select>
                                
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Claim Type:</small>
                                <select className="form-select" name='claim_type_variation_ind' {...register('claim_type_variation_ind')}>
                                    <option value="">--select--</option>
                                    <option value="P">POS</option>
                                    <option value="D">DMR </option>
                                    <option value="U">UCF</option>
                                    <option value="*">WildCard - No Variation</option>
                                </select>
                                
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Formulary:</small>
                                <select className="form-select" name='formulary_variation_ind' {...register('formulary_variation_ind')}>
                                    <option value="">--select--</option>
                                    <option value="F">Formularly</option>
                                    <option value="N">Non-Formulary </option>
                                    {/* <option>UCF</option> */}
                                    <option value="*">Wild Card - No Variation</option>
                                </select>
                                
                        </div>
                    </div>
                </div>
                
                    <div className="row mb-2 ">
                    
                    <div className="col-md-3 mb-4">
                        <div className="form-group">
                                <small>Effective Date: </small>
                                <input type="date" className="form-control" placeholder="" name="effective_date" {...register('effective_date')} id="" required="" autoComplete="off" /> 
                        </div>
                    </div>
                        
                </div>

              

                <div className="col-md-12 ">
                        <div className="float-end">
                    {/* <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a> */}
                </div> 
                </div>




                
                <div className="row mb-2">
                    <div className="col-md-12">
                        <h5 className="mb-2">Identifiers</h5>
                </div>

                <div className="col-md-3 mb-4">
                        <div className="form-group">
                                <small>Accumulate Benefit Plan ID    </small>
                                <input type="text" className="form-control" placeholder="" name="plan_accum_deduct_id" {...register('plan_accum_deduct_id')} id="" required="" autoComplete="off" /> 
                        </div>
                    </div>
                    
                <div className="col-md-3 mb-4"> 
                        <small className="mb-2"></small>
                        <div className="form-group mt-4">
                            <input type="checkbox" id="Return2" className="d-none" />
                            <label htmlFor="Return3">Accumlated Benefit Exclusion Flag </label>
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


                </div>
        </div>

        <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>

            
        </form>
      

           
        </>
    )
}




