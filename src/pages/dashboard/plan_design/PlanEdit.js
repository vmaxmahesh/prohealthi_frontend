import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function PlanEdit()
{
    return(
        <>
        <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Plan Design</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Plan Edit</a></li>
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
            <SearchPlanEdit />
            <PlanEditList />
            <ShowTabs />
        </>
    )
}

function SearchPlanEdit()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Plan Edit </small>
                                <input type="text" className="form-control" placeholder='Start typing  plan ID/ name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
        </>
    )
}

function PlanEditList()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Plan Edit List</h5>
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
                                                    <th>Plan ID</th>
                                                    <th>Effective Date</th>
                                                    <th>Termination Date</th>
                                                    <th>Plan Name</th>
                                                    <th>Default Drug Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>

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

function ShowTabs()
{ 
    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];
    console.log(currentpath);
    return(
        <>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link to="plan-formulary" className={'nav-link' + (currentpath == 'plan-formulary' ? ' active' : '')}>Plan / Formularly</Link>
            <Link to="rx-limitations" className={'nav-link' + (currentpath == 'rx-limitations' ? ' active' : '')}>Rx Limitations</Link>
            <Link to="date-limitations" className={'nav-link' + (currentpath == 'date-limitations' ? ' active' : '')}>Date Limitations</Link>
            <Link to="refill-limitations" className={'nav-link' + (currentpath == 'refill-limitations' ? ' active' : '')}>Refill Limitations</Link>
            <Link to="notes" className={'nav-link' + (currentpath == 'notes' ? ' active' : '')}>Notes</Link>        
        </div>
        <Outlet />
        </>
    )
}

export function PlanFormulary()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div class='row'>
                                    <div className="col-md-6">
                                        <h5 className="mb-2">Plan</h5>
                                        <div className="form-group mb-2">
                                            <small> ID</small>
                                            <input type="text" className="form-control" name="" id="" placeholder="" required />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h5 className="mb-1">Name</h5>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Effective Date</small>
                                                    <input type="date" className="form-control" name="" id="" placeholder="" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="form-group mb-2">
                                                    <small>Classification</small>
                                                   <select className="form-select">
                                                        <option value="">Select </option>
                                                        <option value="">Cash</option>
                                                        <option value="">Medicaid</option>
                                                        <option value="">Third Party</option>
                                                        <option>Unclassified</option>
                                                        <option>Workers Compensation</option>
                                                    </select>
                                                </div>
                                            </div>
                                              <div className="col-md-12">
                                                 <h5 className="mb-1">Plan Participation</h5>
                                             </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Eligibility</small>
                                                    <select className="form-select">
                                                        <option value="">Select </option>
                                                        <option value="">None (No Eligibility check)</option>
                                                        <option value="">Validate Patient by PIN</option>
                                                        <option value="">Check Eligibility By Member Date of Birth & Gender</option>
                                                        <option>Check Eligibility By Member Gender</option>
                                                        <option>Check Eligibility By Member Birth Year</option>
                                                         <option>Check Eligibility By Member Birth Month and Year</option>
                                                    </select>
                                                </div>
                                                <small style={{fontSize: "9px",fontWeight: "600"}}>Check Eligibilty by Member Date of Birth & Gender</small>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Provider</small>
                                                    <select className="form-select">
                                                        <option value="">Select </option>
                                                        <option value="">Must Exist Within Provider Master</option>
                                                        <option value="">Must Exist Within Provider Network</option>
                                                        <option value="">Validate Provider Format</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Must Exist within Provider Master</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Super Provider</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Prescriber</small>
                                                   <select className="form-select">
                                                        <option value="">Select </option>
                                                        <option value="">No Prescriber check</option>
                                                        <option value="">Validate DEA Code</option>
                                                        <option value="">Primary Phisician Validation</option>
                                                        <option value="">Must Exist in Physician Master</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Exhausted Benefits Opt</small>
                                                     <select className="form-select">
                                                        <option value="">Select </option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="form-group mb-2">
                                                    <small>Exhausted Benefits Plan ID</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="" required />
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    <div className="col-md-6">
                                        <h5 className="mb-1">Formularly Excemptions</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>By Drug Category List</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>By Therapy Class List</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>By GPI</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>By NDC</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Enter" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Census Date</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Census Date" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Super Benefit List</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Active Contracts" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Maj Med Spr Bene List</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Active Memebers" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Prov Type/ Proc Association</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Termed Contracts" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Prov Type Valid List</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Termed Memebers" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Proc. Excetion List</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Pending Contracts" required />
                                                </div>
                                            </div>
                                            
                                             
                                            
                                            
                                            <h5 className="mb-1">Strategy Validations</h5>
                                             <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Pricing Strategy ID</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Termed Memebers" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Copy Strategy ID</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Pending Contracts" required />
                                                </div>
                                            </div>
                                             <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Accum Benfint Strategy</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Pending Contracts" required />
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                                 <h5 className="mb-1">Formularly Type</h5>
                                             </div>
                                              <div className="col-md-3">
                                                 <h5 className="mb-1">Pricing Defaults</h5>
                                             </div>
                                             
                                             
                                             <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group mb-2">
                                                    <small>Formularly Type</small>
                                                     <select className="form-select">
                                                        <option value="">Select </option>
                                                        <option value="">Approved, Formularly</option>
                                                        <option value="">Approved, Non Formularly</option>
                                                        <option value="">Rejected</option>
                                                        <option value="">Rejected-No Rx Coverage</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            
                                           
                                             <div className="col-md-3">
                                                <div className="form-group mb-2">
                                                    <small>Price Schedule</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Termed Memebers" required />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group mb-2">
                                                    <small>Max Allow cost List</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Pending Contracts" required />
                                                </div>
                                            </div>
                                             <div className="col-md-3">
                                                <div className="form-group mb-2">
                                                    <small>Procedue UCR List</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Pending Contracts" required />
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

export function RxLimitations()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div class='row'>
                                    <div className="col-md-11 mb-1">
                                        <h5 className="mb-2">Rx Limitations</h5>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                <div className="col-md-6 form-btm">
                                    <div className="row">
                                    <div className="col-md-6">
                                    </div>
                                    <div className="col-md-3 ">
                                       <label>Minimum</label>
                                    </div>
                                    <div className="col-md-3 ">
                                        <label>Maximum</label>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <p>RX Quantity</p>
                                    </div>
                                    <div className="col-md-3 ">
                                        
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> Quantity Over Time</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                     <div className="col-md-6">
                                        <p>Days Supply</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                     <div className="col-md-6">
                                        <p> Days Over Time</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> CTS Days Supply</p>
                                    </div>
                                    <div className="col-md-3 ">
                                        <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> Retails Fills</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> Days Per Time</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> Quantity Per Fill</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> Daily Dose</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> Starter Dose Days</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                    </div>
                                    
                                </div>
                                
                                 <div className="col-md-6 form-btm">
                                    <div className="row">
                                    <div className="col-md-6">
                                    </div>
                                    <div className="col-md-3 ">
                                       <label>Minimum</label>
                                    </div>
                                    <div className="col-md-3 ">
                                        <label>Maximum</label>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <p>Strt Dose Bypass Days</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> Strt. Dose. Maint. By. Days</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                     <div className="col-md-6">
                                        <p>Days Untill Cover Effective</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                     <div className="col-md-6">
                                        <p> Age</p>
                                    </div>
                                    <div className="col-md-3 ">
                                        <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> Price</p>
                                    </div>
                                    <div className="col-md-3 ">
                                        <input type="text" className="form-control" placeholder="" /> 
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> RX / Patient</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> accum Benefit / Patient</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> Coverage Start Days</p>
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p> Brand Copay Amount</p>
                                    </div>
                                    <div className="col-md-3 ">
                                        <input type="text" className="form-control" placeholder="" /> 
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-6">
                                        <p>Generic Copay</p>
                                    </div>
                                    <div className="col-md-3 ">
                                        <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-3 ">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                     <div className="col-md-6">
                                        <p>DFLT Brand Copay</p>
                                    </div>
                                    <div className="col-md-3 ">
                                        <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                     <div className="col-md-6">
                                        <p>DFLT Generic Copay</p>
                                    </div>
                                    <div className="col-md-3 ">
                                        <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    <div className="col-md-3 ">
                                    </div>
                                    
                                    </div>
                                    
                                </div>
                                    
                                
                                </div>
                            </div>
                        </div>
        </>
    )
}

export function DateLimitations()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div class='row'>
                                    <div className="col-md-12 mb-1">
                                        <h5 className="mb-2">Override System Date Limitations</h5>
                                    </div>
                                    <div className="col-md-8">
                                    </div>
                                     <div className="col-md-2">
                                        <p>Maximum</p>
                                    </div>
                                     <div className="col-md-2">
                                         <p>System Default</p>
                                    </div>
                                    
                                    <div className="col-md-6">
                                         <p>Days from Days Written to First Fill</p>
                                    </div>
                                     <div className="col-md-3">
                                         <input type="text" className="form-control" placeholder="" />
                                    </div>
                                     <div className="col-md-3">
                                         <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                     <div className="col-md-6">
                                         <p>Days from Days Filled to date Submitted (On line)</p>
                                    </div>
                                     <div className="col-md-3">
                                         <input type="text" className="form-control" placeholder="" />
                                    </div>
                                     <div className="col-md-3">
                                         <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                    <div className="col-md-6">
                                         <p>Days from Days Filled to date Submitted (DMR / UCF)</p>
                                    </div>
                                     <div className="col-md-3">
                                         <input type="text" className="form-control" placeholder="" />
                                    </div>
                                     <div className="col-md-3">
                                         <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                     <div className="col-md-6">
                                         <p>Days from Days Submitted to Date Filled (Future Fill)</p>
                                    </div>
                                     <div className="col-md-3">
                                         <input type="text" className="form-control" placeholder="" />
                                    </div>
                                     <div className="col-md-3">
                                         <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                    <div className="col-md-6">
                                         <p>Days of Reversal</p>
                                    </div>
                                     <div className="col-md-3">
                                         <input type="text" className="form-control" placeholder="" />
                                    </div>
                                     <div className="col-md-3">
                                         <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                </div>
                                
                                
                                 <div class='row'>
                                    <div className="col-md-12 mt-3 mb-3">
                                        <h5 className="mb-2">Miscellaneous Flags</h5>
                                    </div>
                                    <div className="col-md-4">
                                        <p>Tax Status</p>
                                    </div>
                                     <div className="col-md-2">
                                       <input type="text" className="form-control" placeholder="" />
                                    </div>
                                     <div className="col-md-4">
                                         <p>Mandatory U and C Plan</p>
                                    </div>
                                    <div className="col-md-2">
                                            <input type="text" className="form-control" placeholder="" />
                                    </div>
                                    
                                     <div className="col-md-8  mb-3">
                                          <p>Syringes With Issuling Same Day</p>
                                    </div>
                                     <div className="col-md-4 mb-3">
                                         <div className="form-group">
                                           <input type="checkbox" id="ReturnMax" className="d-none" />
                                           <label htmlFor="ReturnMax"></label>
                                         </div>
                                    </div>
                                    
                                     <div className="col-md-8 mb-3">
                                          <p>Exclude System NDC/GPI Formularly Edits for Out of Network Claim</p>
                                    </div>
                                     <div className="col-md-4 mb-3">
                                         <div className="form-group">
                                            <input type="checkbox" id="ReturnMaxQ" className="d-none" />
                                            <label htmlFor="ReturnMaxQ">  </label>
                                        </div>
                                    </div>
                                    
                                     <div className="col-md-8 mb-3">
                                          <p>Exclude Plan NDC/GPI Formularly Edits for Out of Network Claim</p>
                                    </div>
                                     <div className="col-md-4 mb-3">
                                         <div className="form-group"> 
                                            <input type="checkbox" id="ReturnMax1" className="d-none" />
                                            <label htmlFor="ReturnMax1">  </label>
                                        </div>
                                    </div>
                                    
                                     <div className="col-md-8 mb-3">
                                          <p>Reject Claim for Missing Cardholder ID</p>
                                    </div>
                                     <div className="col-md-4 mb-3">
                                         <div className="form-group">
                                            <input type="checkbox" id="ReturnMax2" className="d-none" />
                                            <label htmlFor="ReturnMax2">  </label>
                                        </div>
                                    </div>
                                    
                                    
                                    
                                </div>
                            </div>
                        </div>
        </>
    )
}

export function RefillLimitations()
{
    return(
        <>
            <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div class='row align-items-center'>
                                    <div className="col-md-12 mb-1">
                                        <h5 className="mb-2">Early Refill Limitations</h5>
                                    </div>
                                    
                                     <div className="col-md-4 text-center">
                                        <h6><b>Limit 1</b></h6>
                                    </div>
                                    <div className="col-md-4">
                                       <p>RX Maximum Days Supply</p>
                                       <p>Minimum Use Percentage</p>
                                    </div>
                                    <div className="col-md-4 ">
                                        <small>Limit</small>
                                         <input type="text" className="form-control mb-2" placeholder="" />
                                         <input type="text" className="form-control mb-2" placeholder="" />
                                    </div>
                                    <hr />
                                    
                                    <div className="col-md-4 text-center">
                                        <h6><b>Limit 2 - Above Limit 1</b></h6>
                                    </div>
                                    <div className="col-md-4">
                                       <p>RX Maximum Days Supply</p>
                                       <p>Minimum Use Percentage</p>
                                    </div>
                                    <div className="col-md-4 ">
                                         <input type="text" className="form-control mb-2" placeholder="" />
                                         <input type="text" className="form-control mb-2" placeholder="" />
                                    </div>
                                    <hr />
                                    
                                     <div className="col-md-4 text-center">
                                        <h6><b> Above Limit 2</b></h6>
                                    </div>
                                    <div className="col-md-4">
                                       <p> Maximum Use Maximum</p>
                                    </div>
                                    <div className="col-md-4 ">
                                         <input type="text" className="form-control mb-2" placeholder="" />
                                    </div>
                                    <hr />
                                    
                                     <div className="col-md-4 text-center">
                                    </div>
                                    <div className="col-md-4">
                                       <p> Search Indication</p>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                         <select className="form-select">
                                             <option>Select</option>
                                             <option>Name Portion of GPI</option>
                                             <option>Full GPI</option>
                                         </select>
                                    </div>
                                    <hr />
                                    
                                    
                                    <div className="col-md-12 mt-3 mb-3">
                                        <h5 className="mb-2">Mail Service Early Refiil Limitations</h5>
                                    </div>
                                    
                                     <div className="col-md-4 text-center">
                                        <h6><b>Limit 1</b></h6>
                                    </div>
                                    <div className="col-md-4">
                                       <p>RX Maximum Days Supply</p>
                                       <p>Minimum Use Percentage</p>
                                    </div>
                                    <div className="col-md-4 ">
                                        <small>Limit</small>
                                         <input type="text" className="form-control mb-2" placeholder="" />
                                         <input type="text" className="form-control mb-2" placeholder="" />
                                    </div>
                                    <hr/>
                                    
                                    <div className="col-md-4 text-center">
                                        <h6><b>Limit 2 - Above Limit 1</b></h6>
                                    </div>
                                    <div className="col-md-4">
                                       <p>RX Maximum Days Supply</p>
                                       <p>Minimum Use Percentage</p>
                                    </div>
                                    <div className="col-md-4 ">
                                         <input type="text" className="form-control mb-2" placeholder="" />
                                         <input type="text" className="form-control mb-2" placeholder="" />
                                    </div>
                                    <hr/>
                                    
                                     <div className="col-md-4 text-center">
                                        <h6><b> Above Limit 2</b></h6>
                                    </div>
                                    <div className="col-md-4">
                                       <p> Maximum Use Maximum</p>
                                    </div>
                                    <div className="col-md-4 ">
                                         <input type="text" className="form-control mb-2" placeholder="" />
                                    </div>
                                    <hr/>
                                    
                                     <div className="col-md-4 text-center">
                                    </div>
                                    <div className="col-md-4">
                                       <p> Search Indication</p>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                         <select className="form-select">
                                             <option>Select</option>
                                             <option>Name Portion of GPI</option>
                                             <option>Full GPI</option>
                                         </select>
                                    </div>
                                    <hr/>
                                    
                                </div>
                            </div>
                        </div>                        
        </>
    )
}

export function PlanEditNotes()
{
    const textareastyle = {
        border: '1px solid rgba(0, 0, 0, 0.05)', 
    }

    
    return(
        <>
         <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12 mb-2">
                                            <h5>Notes</h5>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <textarea className="form-control" rows="15" style={{}}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>  
        </>
    )
}