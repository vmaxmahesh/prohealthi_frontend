import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { objToQueryString } from '../../../hooks/healper';
import { useOutletContext } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "react-toastify/dist/ReactToastify.css";

export default function PriceSchedule() {
    return(
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
             <GetPriceSchedules />
             <SearchPriceSchedule />
             <BrandTabs />
        </>
    );
}

function GetPriceSchedules() {
    return(
        <>
       <div className="card mt-3 mb-3">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="mb-2">Price Schedules</h5>
                            </div>
                            <table className= "table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Price Schedule</th>
                                        <th>Schedule Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <tr>
                                        <td>100PC</td>
                                        <td>100p</td>
                                        <td><button className="btn btn-sm btn-info" id=""><i className="fa fa-eye"></i> View</button></td>
                                    </tr>
                                     <tr>
                                        <td>50PC</td>
                                        <td>200p</td>
                                        <td><button className="btn btn-sm btn-info" id=""><i className="fa fa-eye"></i> View</button></td>
                                    </tr>
                                </tbody>
                            </table>
     
                       </div>
                   </div>
                   </div>
                   </>
    );
}

function SearchPriceSchedule() {
    const {register,handleSubmit, watch, formState: { errors }} = useForm();

    const search_data = (data) => {
        console.log(data);
    }
    return(
        <>
        <form onSubmit={handleSubmit(search_data)}>
                    <div className="card-body">
                       <div className="row mb-4">                            
                                <div className="col mb-2">
                                    <div className="form-group">
                                        <small>Price Schedule ID</small>
                                        <input type="text" className="form-control" placeholder="Price Schedule ID" name=""
                                         {...register("schedule_id", { required:true })} autoComplete="off"/>
                                         {errors.price_schedule_id && <span><p className="notvalid">This field is required</p></span>}
                                    </div>
                                </div>
                                <div className="col mb-2">
                                    <div className="form-group">
                                        <small>Schedule Name</small>
                                        <input type="text" className="form-control" placeholder="Schedule Name" name="" {...register("schedule_name", { required:true })} />
                                        {errors.schedule_name && <span><p className='notvalid'>This field is required</p></span>}
                                    </div>
                                </div>
                                <div className="col mb-2">
                                    <div className="form-group">
                                        <small>Copay Schedule</small>
                                        <input type="text" className="form-control" placeholder="Copay Schedule" name="" {...register("copay_schedule", { required:true })} />
                                        {errors.copay_schedule && <span><p className='notvalid'>This field is required</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-2 mb-2">
                                    <div className="form-group">
                                        <small>&nbsp;</small><br/>
                                        <button type="submit" className="btn m-0 p-2 btn-theme" style={{width: "100%", fontSize: "12px"}}>Search</button>
                                    </div>
                                </div>                              
                            </div>
                        </div>
                        </form>
        </>
    )
}

function BrandTabs() {    
    return(
        <>
            <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3">
                <Tab eventKey="home" title="Brand Item, No Generic / Non-Drug">
                    <GetGeneric />
                </Tab>
                <Tab eventKey="profile" title="Brand Item,Generic Available">
                    <GetNonGeneric />
                </Tab>
                <Tab eventKey="contact" title="Generic Item">
                    <GetGenericItem />
                </Tab>
            </Tabs>
        </>
    )
}

function GetGeneric()
{
    return(
        <>
         <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="Identification" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="card mt-3 mb-3">
                                    <div className="card-body">
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
                                                            <input type="text" className="form-control" name="" id="" placeholder="Source "  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Mkp</small>
                                                            <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Mkp</small>
                                                            <input type="text" className="form-control" name="" id="" placeholder="In dollars"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Type</small>
                                                            <select className="form-select">
                                                                <option>Type 1</option>
                                                                <option>Type 2</option>
                                                                <option>Type 3</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <small>Fee</small>
                                                        <div className="form-group mb-2">
                                                            <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Fee</small>
                                                            <input type="text" className="form-control" name="" id="" placeholder="In dollars"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group mt-4">
                                                            <input type="checkbox" id="Return2" className="d-none" />
                                                            <label htmlFor="Return2">Std Pkg</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group mt-4">
                                                            <input type="checkbox" id="Return3" className="d-none" /> 
                                                            <label htmlFor="Return3">1 per fill</label>
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
    );
}

function GetNonGeneric()
{
    return(
        <>
         <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="Identification" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="card mt-3 mb-3">
                                    <div className="card-body">
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
                                                            <input type="text" className="form-control" name="" id="" placeholder="Source "  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Mkp</small>
                                                            <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Mkp</small>
                                                            <input type="text" className="form-control" name="" id="" placeholder="In dollars"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Type</small>
                                                            <select className="form-select">
                                                                <option>Type 1</option>
                                                                <option>Type 2</option>
                                                                <option>Type 3</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <small>Fee</small>
                                                        <div className="form-group mb-2">
                                                            <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Fee</small>
                                                            <input type="text" className="form-control" name="" id="" placeholder="In dollars"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group mt-4">
                                                            <input type="checkbox" id="Return2" className="d-none" />
                                                            <label htmlFor="Return2">Std Pkg</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group mt-4">
                                                            <input type="checkbox" id="Return3" className="d-none" /> 
                                                            <label htmlFor="Return3">1 per fill</label>
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
    );
}

function GetGenericItem()
{
    return(
        <>
         <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="Identification" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="card mt-3 mb-3">
                                    <div className="card-body">
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
                                                            <input type="text" className="form-control" name="" id="" placeholder="Source "  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Mkp</small>
                                                            <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Mkp</small>
                                                            <input type="text" className="form-control" name="" id="" placeholder="In dollars"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Type</small>
                                                            <select className="form-select">
                                                                <option>Type 1</option>
                                                                <option>Type 2</option>
                                                                <option>Type 3</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <small>Fee</small>
                                                        <div className="form-group mb-2">
                                                            <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="form-group mb-2">
                                                            <small>Fee</small>
                                                            <input type="text" className="form-control" name="" id="" placeholder="In dollars"  />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group mt-4">
                                                            <input type="checkbox" id="Return2" className="d-none" />
                                                            <label htmlFor="Return2">Std Pkg</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group mt-4">
                                                            <input type="checkbox" id="Return3" className="d-none" /> 
                                                            <label htmlFor="Return3">1 per fill</label>
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
    );
}