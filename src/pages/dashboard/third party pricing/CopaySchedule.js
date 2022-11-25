import { ErrorResponse } from '@remix-run/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { registerLocale } from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CopaySchedule() {
    return(
        <>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href=""> Third Party Pricing </a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href=""> Copay Schedule </a></li>
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
                <CopaySearch />
        </>
    )
}

function CopaySearch() {
    return(
        <>
            <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>Copay Schedule </small>
                                    <input type="text" className="form-control" placeholder='Start typing price schedule id/ name to search'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <List />
        </>
    )
}

function List()
{
    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];
    const[copayList, setCopayScheduleList] = useState([]);
    const[copaySchedule, setCopaySchedule] = useState(false);
    const onCopaySearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/copay-schedule/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setCopayScheduleList(data.data);
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

    const getCopayData = (copay_data) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/copay-schedule/get-copay-data?search=${copay_data.copay_schedule}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                
                setCopaySchedule(data.data);
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

    useEffect(() => {}, [copayList]);

    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href=""> Third Party Pricing </a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href=""> Copay Schedule </a></li>
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
            <CopaySearch onSearch={onCopaySearch}/>

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Copay Schedule List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <List listData={copayList} getCopayData={getCopayData}/>
                        {/* <CopayScheduleTabs /> */}
                        <div className="col-md-8">
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="data">
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <Link to="brand-item" className={'nav-link' + (currentpath == 'brand-item' ? ' active' : '')}>Brand Item, No Generic / Non-Drug</Link>
                                <Link to="brand-item-generic" className={'nav-link' + (currentpath == 'brand-item-generic' ? ' active' : '')}>Brand Item,Generic Available</Link>
                                <Link to="generic-item" className={'nav-link' + (currentpath == 'generic-item' ? ' active' : '')}>Generic Item</Link>
                            </div>
                            <hr />
                            <div className="tab-content" id="nav-tabContent">
                                <Outlet context={[copaySchedule, setCopaySchedule]}/>
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

function CopaySearch(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Copay Schedule </small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing price schedule id/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function List(props) {

    const listArray = [];
    for(let i=0; i < props.listData.length; i++)
    {
        listArray.push(<CopayListRow rowData={props.listData[i]} getCopayData={props.getCopayData}/>);
    }
    return (
        <>
            <div className="col-md-4">
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div style={{ height: '400px', overflowY: 'scroll' }}>
                            <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                <thead className='stickt-thead'>
                                    <tr>
                                        <th>Copay Schedule ID</th>
                                        <th>Copay Schedule Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listArray}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function CopayListRow(props)
{
    return(
        <>
         <tr onClick={e => props.getCopayData(props.rowData)}
         className={(props.selected && props.rowData.copay_schedule == props.selected.copay_schedule ? 'tblactiverow' : '')}>
            <td>{props.rowData.copay_schedule}</td>
            <td>{props.rowData.copay_schedule_name}</td>
         </tr>
        </>
    )
}

export function NonGeneric(props) {
    const{register, handleSubmit, reset, watch, formState : {error} } = useForm();
    const [copaySchedule, setCopaySchedule] = useOutletContext(false);    
    useEffect(() => { reset(copaySchedule) }, [copaySchedule]);
    return (
        <>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="Identification" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-md-12">
                                    <h5 className="mb-2">Brand Item, No Generic / Non-Drug</h5>

                                    <div className="row mt-4 mb-3 comparis-ionn">
                                        <div className=""><span>Comparision</span></div>
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
                                        <div className="col-md-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Least off all available
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-4 mb-3 comparis-ionn">
                                        <div className="col-md-6">
                                            <div className="form-group mt-4">
                                                <input type="checkbox" id="ReturnMax" className="d-none" />
                                                <label htmlFor="ReturnMax">Max Copay is Claim Cost</label>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3">
                                            <small><b>Copay $</b></small>
                                        </div>
                                        <div className="col-md-3">
                                            <small><b>Copay %</b></small>
                                        </div>
                                        <div className="col-md-3">
                                            <small><b>Copay</b> </small>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <p><b>1.</b></p>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>Source</small>
                                                <select className="form-select" {...register("bng1_source", {register : true})}>
                                                    <option>Based on Caluculated Amount</option>
                                                    <option>Type 2</option>
                                                    <option>Type 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>&nbsp;</small>
                                                <input type="text" className="form-control"  placeholder="In dollars"
                                                 {...register("bng1_copay_amount", {register : true})}/>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small> &nbsp;</small>
                                                <input type="text" className="form-control"  placeholder="Percentage"
                                                {...register("bng1_copay_percent", {register : true})} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small> List</small>
                                                <input type="text" className="form-control" placeholder=""
                                                {...register("copay_schedule", {register : true})} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <small>Type</small>
                                            <select className="form-select" {...register("bng1_type", {register : true})}>
                                                <option>Total Price Calculated</option>
                                                <option>Type 2</option>
                                                <option>Type 3</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>Factor</small>
                                                <select className="form-select" {...register("bng1_copay_factor", {register : true})}>
                                                    <option>Factor 0</option>
                                                    <option>Factor 1</option>
                                                    <option>Factor 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2 mt-4">
                                            <div className="">
                                                <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }}>Search</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 float-end">
                        <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: "100%" }}>Next</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export function Generic() {
    const{register, handleSubmit, reset, watch, formState : {error} } = useForm();
    const [copaySchedule, setCopaySchedule] = useOutletContext(false);    
    useEffect(() => { reset(copaySchedule) }, [copaySchedule]);
    return (
        <>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="Strategy" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
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
                                        <div className="col-md-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Least off all available
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3">
                                            <small><b>Copay $</b></small>
                                        </div>
                                        <div className="col-md-3">
                                            <small><b>Copay %</b></small>
                                        </div>
                                        <div className="col-md-3">
                                            <small><b>Copay</b> </small>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <p><b>1.</b></p>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>Source</small>
                                                <select className="form-select" {...register("bga1_source", {register : true})}>
                                                    <option>Based on Caluculated Amount</option>
                                                    <option>Type 2</option>
                                                    <option>Type 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>&nbsp;</small>
                                                <input type="text" className="form-control" {...register("bga1_copay_amount", {register : true})} placeholder="In dollars" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small> &nbsp;</small>
                                                <input type="text" className="form-control" {...register("bga1_copay_percent", {register : true})} placeholder="Percentage" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small> List</small>
                                                <input type="text" className="form-control" {...register("copay_schedule", {register : true})} placeholder="" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <small>Type</small>
                                            <select className="form-select" {...register("bga1_type", {register : true})}>
                                                <option>Total Price Calculated</option>
                                                <option>Type 2</option>
                                                <option>Type 3</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>Factor</small>
                                                <select className="form-select" {...register("bga1_copay_factor", {register : true})}>
                                                    <option>Factor 0</option>
                                                    <option>Factor 1</option>
                                                    <option>Factor 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2 mt-4">
                                            <div className="">
                                                <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }}>Search</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 float-end">
                        <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: "100%" }}>Next</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export function GenericItem() {
    const{register, handleSubmit, reset, watch, formState : {error} } = useForm();
    const [copaySchedule, setCopaySchedule] = useOutletContext(false);    
    useEffect(() => { reset(copaySchedule) }, [copaySchedule]);
    return (
        <>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="Eligibility" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
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
                                        <div className="col-md-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Least off all available
                                                </label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3">
                                            <small><b>Copay $</b></small>
                                        </div>
                                        <div className="col-md-3">
                                            <small><b>Copay %</b></small>
                                        </div>
                                        <div className="col-md-3">
                                            <small><b>Copay</b> </small>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <p><b>1.</b></p>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>Source</small>
                                                <select className="form-select" {...register("gen1_source", {register : true})}>
                                                    <option>Based on Caluculated Amount</option>
                                                    <option>Type 2</option>
                                                    <option>Type 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>&nbsp;</small>
                                                <input type="text" className="form-control" {...register("gen1_copay_amount", {register : true})} placeholder="In dollars" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small> &nbsp;</small>
                                                <input type="text" className="form-control" {...register("gen1_copay_percent", {register : true})} placeholder="Percentage" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small> List</small>
                                                <input type="text" className="form-control" {...register("copay_schedule", {register : true})} placeholder="" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <small>Type</small>
                                            <select className="form-select" {...register("gen1_type", {register : true})}>
                                                <option>Total Price Calculated</option>
                                                <option>Type 2</option>
                                                <option>Type 3</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mb-2">
                                                <small>Factor</small>
                                                <select className="form-select" {...register("gen1_copay_factor", {register : true})}>
                                                    <option>Factor 0</option>
                                                    <option>Factor 1</option>
                                                    <option>Factor 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2 mt-4">
                                            <div className="">
                                                <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }}>Search</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 float-end">
                        <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: "100%" }}>Next</a>
                    </div>
                </div>
            </div>
        </>
    )
}