import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CopayStepSchedule() {

    const[copayStepData, setCopayStepData] = useState([]);
    const[type, setType] = useState([]);
    const[formData, setFormData] = useState([]);
    const selectType = (e) => {
        setType(e);
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/copay-step-schedule/get?search=${e}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setCopayStepData(data.data);
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
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const showData = (data) => {
        setFormData(data);
    }
    useEffect(() => {}, [copayStepData, formData]);
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
                                            <input className="form-check-input" type="radio"  onClick={e => selectType("days_supply")} name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Days Supply
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ">
                                        <div className="form-check">
                                            <input className="form-check-input" onClick={e => selectType("max_cost")} type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
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
                        <GetStepScheduleTable copayStepData={copayStepData} dataType={type} showData={showData}/>
                    </div>
                    <div className="col-md-8">
                        <DataForm  formData={formData} dataType={type}/>
                    </div>
                </div>

            </div>
        </>
    )
}

function GetStepScheduleTable(props) {
    const listArray = [];
    const type = props.dataType;
    for(let i=0; i < props.copayStepData.length; i++)
    {
        listArray.push(<CopayStepRow rowData={props.copayStepData[i]} dType={type} showData={props.showData}/>);
    }
    
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">

                    <h5 className="mb-2">Step Schedules table</h5>
                </div>
                <table className="table  table-bordered">
                    <thead>
                        <tr>
                            <th>{String(type).replace("_", " ").toUpperCase()}
                            </th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listArray}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function CopayStepRow(props)
{
    return(
        <>
         <tr onClick={e => props.showData(props.rowData)}>
            <td>{props.dType == 'days_supply' ? props.rowData.days_supply : props.rowData.cost_max}
                </td>
            <td>-</td>
         </tr>
        </>
    )
}

function DataForm(props) {
const{register, handleSubmit, reset, watch, formState : {error} } = useForm();
useEffect(() => { reset(props.formData) }, [props.formData]);
console.log(props.dataType);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <small>Copay List</small>
                                <input type="text" className="form-control" placeholder="Surgical" {...register("copay_list", {required : true})}  autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-md-8 mb-3">
                            <div className="form-group">
                                <small>Copay Description</small>
                                <textarea rows="1" cols="2" className="form-control" {...register("copay_list", {required : true})} placeholder="Surgical Test"></textarea>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className=""><span>Schedule Type:</span></div>
                            <div className="form-check">

                                {/* console.log() */}
                                <input className="form-check-input" type="radio"  checked={props.formData.days_supply != '0'} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1" >
                                    Days Supply
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" checked={props.formData.cost_max != '0'}  
                                // {...props.formData.cost_max == '0' ? '' : defaultChecked } 
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Max Cost
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2 ">
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>{props.dataType}</small>
                                {props.dataType == 'days_supply' ? 
                                <input type="text" className="form-control"  {...register("days_supply", {required : true})} autoComplete="off" /> 
                                :  <input type="text" className="form-control"  {...register("cost_max", {required : true})} autoComplete="off" /> }
                               

                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>$</small>
                                <input type="text" className="form-control" placeholder="0" {...register("copay_amount", {required : true})} autoComplete="off" />

                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>%</small>
                                <input type="text" className="form-control" placeholder="83" {...register("copay_percentage", {required : true})} autoComplete="off" />

                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                            <button className='btn btn-primary'>Add</button>
                            </div>
                        </div>

                        {/* <div className="col-md-3 mb-3">
                            <button className='btn btn-primary'>Add</button>
                        </div> */}
                    </div>
                    

                    <div className="row mb-2 ">
                        <div className="col-md-9 mb-3">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Maximum Cost</th>
                                        <th>$</th>
                                        <th>%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>20000</td>
                                        <td>80</td>
                                        <td>90</td>
                                    </tr>
                                    <tr>
                                        <td>30000</td>
                                        <td>60</td>
                                        <td>85</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                       
                        <div className="col-md-3 mb-3">
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
}