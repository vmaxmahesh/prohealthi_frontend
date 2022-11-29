import React from "react";
import { Link, Outlet } from "react-router-dom";

function SystemParameter(){
    return (
        <>
         
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Exception List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">GPI Exception</a></li>
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




            <div>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {/* <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#Rules" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Member</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Pricing" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Group</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Override" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Plan</button>
                     */}

                    <Link to="parameters-maintanace" className="nav-link">Parameters / Maintenance / Processor</Link>
                    <Link to="systemlimit-eligibility" className="nav-link">System Limits / Eligibility Parameters</Link>

                </div>
                <div className="tab-content" id="nav-tabContent">


                    <Outlet />



                </div>
            </div>


            <div className="footer">
                <div className="">
                    <small>© 2022 All Rights Reserved by ProHealthi</small>
                </div>
            </div>

        </>
    )
}

export function ParametersMaintanace (props) {
    return (
        <>
        <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="row">
                                       <div className="col-md-12">
                                            <h5 className="mb-2">Parameters</h5>
                                            <div className="row">
                                                <div className="col-md-3 mb-3">
                                                    <small>Number of Routers</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                  <div className="col-md-3 mb-3">
                                                    <small>Client ID</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>Router Priority  </small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>Net Start Sleep Interval (Minutes)</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>PriAdi Message Priority</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>TPA Message Priority</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>PostAdi Message Priority</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>General Processor Priority</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Number of General Processes</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Version Number </small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>Third Party Type</small>
                                                    <select className="form-select">
                                                        <option>Private</option>
                                                          <option></option>
                                                    </select>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Immediate Shutdown </small>
                                                    <div className="form-group mt-2">
                                                <input type="checkbox" id="shutdown" className="d-none"/>
                                                <label for="shutdown"></label>
                                            </div>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Reject Transaction if Plan Association not found </small>
                                                    <div className="form-group mt-2">
                                                <input type="checkbox" id="shutdown1" className="d-none"/>
                                                <label for="shutdown1"></label>
                                            </div>
                                                </div>
                                            </div>
                                            
                                             <h5 className="mb-2 mt-3">Maintenance</h5>
                                             <h6 className="mb-2 mt-3">Number of days to retain information</h6>
                                            <div className="row">
                                                <div className="col-md-3 mb-3">
                                                    <small>Performance Statisticcs</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>RX Transactions</small>
                                                     <input type="date" className="form-control" name="" id="" required=""/>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>RX Transaction Log</small>
                                                     <input type="date" className="form-control" name="" id="" required=""/>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Time of day maintenance will occur</small>
                                                     <input type="date" className="form-control" name="" id="" required=""/>
                                                </div>
                                                
                                            </div>
                                            
                                             <h5 className="mb-2 mt-3">Processor</h5>
                                            <div className="row">
                                                <div className="col-md-3 mb-3">
                                                    <small>Processor #</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>Name</small>
                                                     <input type="date" className="form-control" name="" id="" required=""/>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Address</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>City</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>State / Country / Zip</small>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                             <select className="form-select">
                                                        <option>1</option>
                                                          <option></option>
                                                    </select>
                                                        </div>
                                                        <div className="col-md-4">
                                                             <select className="form-select">
                                                                <option>1</option>
                                                                  <option></option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-4">
                                                         <input type="text" className="form-control" name="" id="" required=""/>
                                                      </div>
                                                    </div>
                                                </div>
                                                
                                                  <div className="col-md-3 mb-3">
                                                    <small>Phone</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                 </div>
                                            </div>
                                            
                                              <h5 className="mb-2 mt-3">System Flags</h5>
                                            <div className="row">
                                                <div className="col-md-3 mb-3">
                                                    <small>System Use</small>
                                                <div className="d-flex">
                                                 <div className="form-check">
                                                  <input type="radio" className="form-check-input" id="radio1" name="optradio" value="option1" checked/>TPA
                                                  <label className="form-check-label" for="radio1"></label>
                                                </div>
                                                <div className="form-check">
                                                  <input type="radio" className="form-check-input" id="radio2" name="optradio" value="option2"/>Retail
                                                  <label className="form-check-label" for="radio2"></label>
                                                </div>
                                                 </div>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>Audit Trail</small>
                                                    <div className="form-group mt-2">
                                                        <input type="checkbox" id="shutdown3" className="d-none"/>
                                                        <label for="shutdown3"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Case Sensitivity</small>
                                                    <div className="form-group mt-2">
                                                        <input type="checkbox" id="shutdown5" className="d-none"/>
                                                        <label for="shutdown5"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>DMR Review Flag</small>
                                                     <div className="form-group mt-2">
                                                        <input type="checkbox" id="shutdown6" className="d-none"/>
                                                        <label for="shutdown6"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Tax Status</small>
                                                     <select className="form-select">
                                                                <option>1</option>
                                                                  <option></option>
                                                            </select>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Mandatory U and C Plan</small>
                                                     <select className="form-select">
                                                                <option>1</option>
                                                                  <option></option>
                                                            </select>
                                                </div>
                                                 
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    
                                   
                            </div>     
                         </div>
        </>

    );

}



export function SystemlimitsEligibility (props) {
    return (
        <>
        
        <div className="card mt-3 mb-3">
                               <div className="card-body">
                                    <div className="row">
                                       <div className="col-md-12">
                                            <h5 className="mb-2">System Level Date Limitations</h5>
                                            <div className="row">
                                                <div className="col-md-3 mb-3">
                                                    <small>Days From date written to first fill</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                  <div className="col-md-3 mb-3">
                                                    <small>Days From date filled to date submitted (On-line)</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                  <div className="col-md-3 mb-3">
                                                    <small>Days From date filled to date submitted (DMR)</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Days From date submitted  to date filled (future fill)</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Days for reversals</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Days untill user password expires</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                               
                                            </div>
                                            
                                             <h5 className="mb-2 mt-3">Ap Processes</h5>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <small>Start Date</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3">
                                                    <small>Finish Date</small>
                                                     <input type="date" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3">
                                                    <small>Excecution Flag</small>
                                                     <div className="form-group mt-2">
                                                <input type="checkbox" id="shutdown11" className="d-none"/>
                                                <label for="shutdown11"></label>
                                                 </div>
                                                </div>
                                                 
                                            </div>
                                            
                                            <h5 className="mb-2 mt-3">Miscellaneous</h5>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <small>Front End Version # </small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3">
                                                    <small>Confidentiality Flag 1</small>
                                                    <div className="form-group mt-2">
                                                <input type="checkbox" id="shutdown11" className="d-none"/>
                                                <label for="shutdown11"></label>
                                                 </div>
                                                   
                                                </div>
                                                 <div className="col-md-3">
                                                    <small>Quanity # Pkgs Limits </small>
                                                       <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 
                                            </div>
                                            
                                             <h5 className="mb-2 mt-3">Eligibility Load Parameters</h5>
                                            <div className="row">
                                                <div className="col-md-3 mb-3">
                                                    <small>Automated Termination Level</small>
                                                      <select className="form-select">
                                                                <option>1</option>
                                                                  <option></option>
                                                            </select>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>Eligibility Load Pending Days</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Eligibility Load Rejecting Days</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small> Termination By Absence Percent</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>Coverage Criteria</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                            </div>
                                            
                                            
                                            <h5 className="mb-2 mt-3">Eligibility Processing Parameters</h5>
                                            <div className="row">
                                                <div className="col-md-3 mb-3">
                                                    <small>Overlap Coverage Tie Breaker</small>
                                                      <select className="form-select">
                                                                <option>1</option>
                                                                  <option></option>
                                                            </select>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>Processor Control Number Flag</small>
                                                     <select className="form-select">
                                                                <option>1</option>
                                                                  <option></option>
                                                            </select>
                                                </div>
                                                <div className="col-md-3 mb-3">
                                                    <small>Processor Control Num Cust Length</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small> Eligibility  Change Log  Indicator</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small>Coverage Criteria</small>
                                                    <select className="form-select">
                                                                <option>1</option>
                                                                  <option></option>
                                                            </select>
                                                </div>
                                            </div>
                                            
                                              <h5 className="mb-2 mt-3">Major Medical</h5>
                                            <div className="row">
                                                <div className="col-md-3 mb-3">
                                                    <small>RVA List</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                                 <div className="col-md-3 mb-3">
                                                    <small> Maximum UCR</small>
                                                     <input type="text" className="form-control" name="" id="" required=""/>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    
                                   
                            </div>
                            </div>
        </>

    );

}

export default SystemParameter;