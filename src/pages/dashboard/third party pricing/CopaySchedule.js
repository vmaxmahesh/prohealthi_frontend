import { ErrorResponse } from '@remix-run/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { registerLocale } from 'react-datepicker';
import { useForm } from 'react-hook-form';

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
                                <li><a href="">Copay Schedule</a></li>
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
            <CopayTabs />
        </>
    )
}

function CopaySearch() {
    const{register, handleSubmit, watch, formState : { errors }} = useForm();
    const[searchCopay, setCopay] = useState([]);
    const searchCopayData = (e) => {
        var arr = [
            {copay_schedule_id : '1342', copay_schedule_name : 'copay_schedule_name 1', copay_schedule : 'copay_schedule 1', transaction_cost : '111'},
            {copay_schedule_id : '6542', copay_schedule_name : 'copay_schedule_name 2', copay_schedule : 'copay_schedule 2', transaction_cost : '112'},
            {copay_schedule_id : '865', copay_schedule_name : 'copay_schedule_name 3', copay_schedule : 'copay_schedule 3', transaction_cost : '113'}
        ];
        setCopay(arr);
    }
    useEffect(() => {}, [searchCopay]);
    return(
        <>
        <form onSubmit={handleSubmit(searchCopayData)}>
        <div className="card mt-3 mb-3">
                    <div className="card-body">
                       <div className="row mb-4">
                                <div className="col mb-2">
                                    <div className="form-group">
                                        <small>Copay Schedule ID</small>
                                        <input type="text" className="form-control" placeholder="20PCT" {...register("copay_schedule_id", {required : true})} autoComplete="off" />
                                        {errors.copay_schedule_id && <span><p className="notvalid">This field is required</p></span>} 
                                    </div>
                                </div>
                                <div className="col mb-2">
                                    <div className="form-group">
                                        <small>Copay Schedule Name</small>
                                        <input type="text" className="form-control" placeholder="20 Percent Copay"  {...register("copay_schedule_name",{required : true})}/>
                                        {errors.copay_schedule_name && <span><p className="notvalid">This field is required</p></span>}
                                    </div>
                                </div>
                                <div className="col mb-2">
                                    <div className="form-group">
                                        <small>Coinsurance Calculation Option</small>
                                        <input type="text" className="form-control" placeholder="Copay Schedule" {...register("copay_schedule", {required : true})} /> 
                                        {errors.copay_schedule && <span><p className="notvalid">This field is required</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-2 mb-2">
                                    <div className="form-group">
                                        <small>&nbsp;</small><br/>
                                            <select className="form-select" {...register("transaction_cost", {required : true})}>
                                                <option value="">Total Transaction Cost</option>
                                                <option value="">Type 2</option>
                                                <option value="">Type 3</option>
                                            </select>
                                            {errors.transaction_cost && <span><p className="notvalid">This field is required</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-2 mb-2">
                                    <div className="form-group">
                                        <small>&nbsp;</small><br/>
                                        <button type="submit" className="btn m-0 p-2 btn-theme" style={{width: "100%", fontSize: "12px"}} onClick={e => searchCopayData()}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                    <List copayData={searchCopay}/>
                    </>
    )
}

function List(props)
{
    const copayArray = [];
    for(let i=0; i<props.copayData.length; i++)
    {
        copayArray.push(<CopayRow copayRowData={props.copayData[i]} />);
    }
    return(
        <>
        <div className="card mt-3 mb-3">
            <div className="card-body">

                <div className="row">
                    <div className="col-md-12">
                        <h5 className="mb-2">Copay Schedules</h5>
                    </div>
                    <table className= "table  table-bordered">
                        <thead>
                            <tr>
                                <th>Copay Schedule ID</th>
                                <th>Copay Schedule Name</th>
                                <th>Coinsurance Calculation Option</th>
                                <th>Transaction Cost</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                {copayArray}
                        </tbody>
                    </table>     
                </div>
            </div>
        </div> 
                   </>
    )
}

function CopayRow(props)
{
    return(
        <>
        <tr>
            <td>{props.copayRowData.copay_schedule_id}</td>
            <td>{props.copayRowData.copay_schedule_name}</td>
            <td>{props.copayRowData.copay_schedule}</td>
            <td>{props.copayRowData.transaction_cost}</td>
            <td><button className="btn btn-sm btn-info" id=""><i className="fa fa-eye"></i> View</button></td>
        </tr>
        </>
    )
}


function CopayTabs() {
    return(
        <>
        <Tabs defaultActiveKey="tab1" className="mb-3">
            <Tab eventKey="tab1" title="Brand Item, No Generic / Non-Drug">
                <NonGeneric />
            </Tab>
            <Tab eventKey="tab2" title="Brand Item,Generic Available">
                <Generic />
            </Tab>
            <Tab eventKey="tab3" title="Generic Item">
                <GenericItem />
            </Tab>
        </Tabs>
        </>
    )
}

function NonGeneric() {
    return(
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
                                                        <select className="form-select">
                                                            <option>Based on Caluculated Amount</option>
                                                            <option>Type 2</option>
                                                            <option>Type 3</option>
                                                        </select>
                                                </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small>&nbsp;</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="In dollars"  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small> &nbsp;</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small> List</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <small>Type</small>
                                                    <select className="form-select">
                                                            <option>Total Price Calculated</option>
                                                            <option>Type 2</option>
                                                            <option>Type 3</option>
                                                        </select>
                                                </div>
                                                 <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small>Factor</small>
                                                         <select className="form-select">
                                                            <option>Factor 0</option>
                                                            <option>Factor 1</option>
                                                            <option>Factor 2</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 mt-4">
                                                     <div className="">
                                                     <button type="submit" className="btn m-0 p-2 btn-theme" style={{width: "100%",fontSize: "12px"}}>Search</button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 float-end">
                                <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                            </div>
                        </div>
        </div>
        </>
    )
}

function Generic() {
    return(
        <>
        <div className="tab-content" id="nav-tabContent">
        <div className=   "tab-pane fade show active" id="Strategy" role="tabpanel" aria-labelledby="nav-profile-tab">
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
                                                        <select className="form-select">
                                                            <option>Based on Caluculated Amount</option>
                                                            <option>Type 2</option>
                                                            <option>Type 3</option>
                                                        </select>
                                                </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small>&nbsp;</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="In dollars"  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small> &nbsp;</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small> List</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <small>Type</small>
                                                    <select className="form-select">
                                                            <option>Total Price Calculated</option>
                                                            <option>Type 2</option>
                                                            <option>Type 3</option>
                                                        </select>
                                                </div>
                                                 <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small>Factor</small>
                                                         <select className="form-select">
                                                            <option>Factor 0</option>
                                                            <option>Factor 1</option>
                                                            <option>Factor 2</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 mt-4">
                                                     <div className="">
                                                     <button type="submit" className="btn m-0 p-2 btn-theme" style={{width: "100%",fontSize: "12px"}}>Search</button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 float-end">
                                <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                            </div>
                        </div>
        </div>
        </>
    )
}

function GenericItem() {
    return(
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
                                                        <select className="form-select">
                                                            <option>Based on Caluculated Amount</option>
                                                            <option>Type 2</option>
                                                            <option>Type 3</option>
                                                        </select>
                                                </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small>&nbsp;</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="In dollars"  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small> &nbsp;</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small> List</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <small>Type</small>
                                                    <select className="form-select">
                                                            <option>Total Price Calculated</option>
                                                            <option>Type 2</option>
                                                            <option>Type 3</option>
                                                        </select>
                                                </div>
                                                 <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small>Factor</small>
                                                         <select className="form-select">
                                                            <option>Factor 0</option>
                                                            <option>Factor 1</option>
                                                            <option>Factor 2</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 mt-4">
                                                     <div className="">
                                                     <button type="submit" className="btn m-0 p-2 btn-theme" style={{width: "100%",fontSize: "12px"}}>Search</button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 float-end">
                                <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                            </div>
                        </div>
        </div>
        </>
    )
}