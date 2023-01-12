import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';

export default function CopayStepSchedule() {

    const [copayStepData, setCopayStepData] = useState([]);

    const [formData, setFormData] = useState([]);
    const [type, setType] = useState(false);
    const [adding, setAdding] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isCopayListExist, setIsCopayListExist] = useState(false);
    const [isFormDisable, setIsFormDisable] = useState(false);

    const checkLengh = (suffix) => {
        if (suffix.target.value.length > 3) {
            setIsError(true);
            setIsFormDisable(true);
        } else {
            setIsError(false);
            setIsFormDisable(false);
        }
    }

    const selectType = (e) => {
        setType(e.target.value);
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/copay-step-schedule/get?search=${e.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setCopayStepData(data.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const showData = (data) => {
        setFormData(data);
        setAdding(false);
    }

    const clearForm = (e) => {
        setFormData(false);
        setAdding(true);
    }

    const checkCopayListExisting = (copay_list) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/copay-step-schedule/check-copay-list-existing?copay_list=${copay_list.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(data.data);
                if(data.data > 0)
                {
                    setIsCopayListExist(true);
                    setIsFormDisable(true);
                }else{
                    setIsCopayListExist(false);
                    setIsFormDisable(false);
                }
            })

    }

    useEffect(() => { }, [copayStepData, formData, type, adding, isError, isCopayListExist, isFormDisable]);
    return (
        <>
            <div className='dashboard-content clearfix'>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href=""> Third Party Pricing </a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Step Schedule</a></li>
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

                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                            <h5 className="mb-2">Step Schedules </h5>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="row comparis-ionn">
                                    <div className=""><span>Schedule Type:</span></div>
                                    <div className="col-md-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" onClick={selectType} value="days_supply" name='flexRadioDefault' id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Days Supply
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ">
                                        <div className="form-check">
                                            <input className="form-check-input" onClick={selectType} type="radio" name='flexRadioDefault' value="max_cost" id="flexRadioDefault2" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Max Cost
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <GetStepScheduleTable copayStepData={copayStepData} dataType={type} showData={showData} />
                    </div>
                    <div className="col-md-8">
                        <DataForm formData={formData} dataType={type} clearForm={clearForm} adding={adding} checkLengh={checkLengh} isError={isError}
                            checkCopayListExisting={checkCopayListExisting} isCopayListExist={isCopayListExist} isFormDisable={isFormDisable}/>
                    </div>
                </div>

            </div>
        </>
    )
}

function GetStepScheduleTable(props) {
    const listArray = [];
    const type = props.dataType;
    if (props.copayStepData) {
        for (let i = 0; i < props.copayStepData.length; i++) {
            listArray.push(<CopayStepRow rowData={props.copayStepData[i]} dType={type} showData={props.showData} />);
        }
    }


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">

                    <h5 className="mb-2">Step Schedules table</h5>
                </div>
                <div style={{ height: '360px', overflowY: 'scroll' }}>
                    <table className="table  table-bordered">
                        <thead className='stickt-thead'>
                            <tr>
                                <th>{type != '' ? String(type).replace("_", " ").toUpperCase() : "Days Supply/Max Cost"}
                                </th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listArray}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

function CopayStepRow(props) {
    return (
        <>
            <tr onClick={e => props.showData(props.rowData)}
            >
                <td>{props.dType == 'days_supply' ? props.rowData.days_supply : props.rowData.cost_max}
                </td>
                <td>-</td>
            </tr>
        </>
    )
}

function DataForm(props) {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const RepeatCharacters = ({ times, children }) => {
        return React.cloneElement(children, {
            // This will override the original ASCIIChar in the text.
            ASCIIChar: children.props.ASCIIChar.repeat(times),
        })
    }

    const CreateTextWithProps = ({ text, ASCIIChar, ...props }) => {
        return (
            <>
                <span {...props}>
                    {text}{ASCIIChar}
                </span>
                <button type='button' className='btn btn-warning' >Add + </button>
            </>
        )
    };

    const submitForm = (fdata) => {
        console.log(fdata);
        fdata.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fdata)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/copay-step-schedule/submit`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    // get error message from body or default to response status
                    // const error = (data && data.message) || response.status;
                    // return Promise.reject(error);
                    toast.error("There was an error!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
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
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        if (props.adding) {
            reset({
                copay_list: '', copay_amount: '', copay_percentage: '', days_supply: '', max_cost: '', new: 1, max_cost: ''
            },
                { keepValues: false, });
        }
        reset(props.formData)
    }, [props.formData]);

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="row mb-2">
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>Copay List</small>
                                    <input type="text" className="form-control" {...register("copay_list", { required: true })} autoComplete="off"
                                        readOnly={props.formData.copay_list ? true : false} onKeyUp={e => props.checkCopayListExisting(e)} />
                                    {errors.copay_list && <span><p className='notvalid'>This field is required</p></span>}
                                    {props.isCopayListExist ? <span><p className='notvalid'>Copay already existed !</p></span> : ''}
                                </div>
                            </div>
                            <div className="col-md-8 mb-3">
                                <div className="form-group">
                                    <small>Copay Description</small>
                                    <textarea rows="1" cols="2" className="form-control"  ></textarea>
                                </div>
                            </div>
                            {!props.formData.copay_list ? <><div className="col-md-12">
                                <div className=""><span>Schedule Type:</span></div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        {...register("step_schedule_indicator", { required: true })} readOnly={!props.formData.copay_list ? false : true} value="d" />
                                    <label className="form-check-label" >
                                        Days Supply
                                    </label>
                                </div>
                            </div>
                                <div className="col-md-6 ">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio"
                                            {...register("step_schedule_indicator", { required: true })} readOnly={!props.formData.copay_list ? false : true} value="m" />
                                        <label className="form-check-label" >
                                            Max Cost
                                        </label>
                                    </div>
                                </div> </> : ''}

                            {errors.step_schedule_indicator && <span><p className='notvalid'>This field is required</p></span>}
                        </div>
                        <div className="row mb-2 ">
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>{props.dataType ? props.dataType : "Days Supply/Max Cost"}</small>
                                    {props.dataType == 'days_supply' ?
                                        <input type="text" className="form-control"  {...register("days_supply", { required: true })} autoComplete="off" />
                                        : <input type="text" className="form-control"  {...register("cost_max", { required: true })} autoComplete="off" />}
                                </div>
                                {errors.days_supply || errors.cost_max && <span><p className='notvalid'>This field is required</p></span>}
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>$</small>
                                    <input type="text" className="form-control" {...register("copay_amount", { required: true, pattern: '[0-9]' })} autoComplete="off" />
                                    {errors.copay_amount && <span><p className='notvalid'>This field is required</p></span>}
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>%</small>
                                    <input type="text" className="form-control" {...register("copay_percentage", { required: true })} autoComplete="off"
                                        onKeyUp={e => props.checkLengh(e)} />
                                    {errors.copay_percentage && <span><p className='notvalid'>This field is required</p></span>}
                                    {props.isError ? <span><p className='notvalid'>Invalid Percentage !</p></span> : ""}
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    {/* <button type='submit' className='btn btn-primary' disabled={props.adding ? false : true}>{props.adding ? 'Add' : 'Update'} Item</button> */}
                                    {/* <button type='button' className='btn btn-warning' >Add + </button> */}
                                    <RepeatCharacters times={10}>
                                        <CreateTextWithProps
                                            text="Habdul Hazeez"
                                            ASCIIChar=' @ '
                                        />
                                    </RepeatCharacters>
                                </div>
                            </div>
                        </div>

                        <div id="newRow"></div>

                        <div className="col-md-3 ">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <button type='submit' className='btn btn-primary' disabled={props.isFormDisable ? true : false}>{props.formData.copay_list && ! props.adding? 'Update' : 'Add'} Item</button>
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <button type='button' className='btn btn-danger' disabled={props.adding ? true : false}>Remove Item</button>
                                </div>
                            </div>

                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <button type='button' onClick={e => props.clearForm(e)} className='btn btn-info'>Clear Item</button>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </form>

                </div>
            </div >

        </>
    );
}