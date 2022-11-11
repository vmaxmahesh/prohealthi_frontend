import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function DrugDatabase()
{
    return(
        <>
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Drug Information</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Drug database</a></li>
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
            <SearchDrugDatabase />
            <DrugDatabaseList />
            <DrugDatabaseTabs />
        </>
    )
}

function SearchDrugDatabase()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8 mb-3">
                                <div className="col-md-12 mb-2">
                                    <h5>Search for NDC</h5>
                                </div>
                              
                                <div className="card mt-3 mb-3">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-md-12 mb-3">
                                                <div className="form-group">
                                                    <small>NDC/ Label Name/ Generic Name</small>
                                                    <input type="text" className="form-control" placeholder='Start typing NDC/ label name/ generic name to search'
                                                    />
                                                </div>
                                            </div>                       
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="row">
                                    <div className="col-md-12 mb-2">
                                        <h5>Return the Following</h5>
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <div className="form-group">
                                            <small>NDC</small>
                                            <input type="text" name="" id="" className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="checkbox" id="html" className="d-none" />
                                            <label htmlFor="html">All Lebeler's Products</label>
                                            <div className="clearfix mb-3"></div>                                            
                                            <input type="checkbox" id="html" className="d-none" />
                                            <label htmlFor="html">All Package Sizes</label><br />
                                            <div className="clearfix mb-3"></div>
                                            <input type="checkbox" id="html" className="d-none" />
                                            <label htmlFor="html">NDC</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                                <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-danger">Select NDC</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                                <button href="provider-search.html" className="btn btn-info">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

function DrugDatabaseList()
{
    return(
        <>
        <div className="card mt-3 mb-3 data">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>NDC</th>
                                            <th>Label Name</th>
                                            <th>Manufacturer Name</th>
                                            <th>Package Size</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

function DrugDatabaseTabs()
{
    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];
    return(
        <>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <Link to="general" className={'nav-link' + (currentpath == 'general' ? ' active' : '')}>General</Link>
                <Link to="id-codes" className={'nav-link' + (currentpath == 'id-codes' ? ' active' : '')}>ID Codes</Link>
                <Link to="distribution" className={'nav-link' + (currentpath == 'distribution' ? ' active' : '')}>Distribution/Packag</Link>
                <Link to="pricing" className={'nav-link' + (currentpath == 'pricing' ? ' active' : '')}>Pricing</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export function General()
{
    return(
        <>
         <div  className="card mt-3 mb-3">
                                <div  className="card-body">
                                    <div  className="row">
                                        <div  className="col-md-12">
                                            <h5  className="mb-2">NDC Information</h5>

                                            <div  className="row">
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>NDC</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Customer ID" readonly="" />
                                                    </div>
                                                </div>
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>Label Names</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Client ID" readonly="" />
                                                    </div>
                                                </div>
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>Superceded NDC</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Client ID" readonly="" />
                                                    </div>
                                                </div>
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>Preceded NDC</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Client ID" readonly="" />
                                                    </div>
                                                </div>
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>Drug Status</small>
                                                        <select  className="form-select">
                                                            <option value="">Select Status</option>
                                                            <option value="">A</option>
                                                            <option value="">B</option>
                                                            <option value="">C</option>
                                                        </select>
                                                        <p  className="input-hint">Active</p>
                                                    </div>
                                                </div>

                                                <div  className="col-md-12">
                                                    <h5  className="mb-1">Generic Information</h5>
                                                </div>
                                                <div  className="col-md-6">
                                                    <div  className="form-group mb-2">
                                                        <small>Product ID</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Name" readonly="" />
                                                    </div>
                                                </div>
                                                <div  className="col-md-6">
                                                    <div  className="form-group mb-2">
                                                        <small>Product Name</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Address 1" readonly="" />
                                                    </div>
                                                </div>

                                                <div  className="col-md-12 mt-2">
                                                    <h5  className="mb-1">Manufacturer Information</h5>
                                                </div>
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>ID</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Address 1" readonly="" />
                                                    </div>
                                                </div>
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>Name</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Address 1" />
                                                    </div>
                                                </div>
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>Abbreviation</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Address 1" />
                                                    </div>
                                                </div>

                                                <div  className="col-md-12 mt-2">
                                                    <h5  className="mb-1">Product Information</h5>
                                                </div>
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>Legend Change Date</small>
                                                        <input type="date"  className="form-control" name="" id="" />
                                                    </div>
                                                </div>
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>Next Smaller Suffix</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Address 1" readonly="" />
                                                    </div>
                                                </div>
                                                <div  className="col-md-4">
                                                    <div  className="form-group mb-2">
                                                        <small>Next Larger Suffix</small>
                                                        <input type="text"  className="form-control" name="" id="" placeholder="Address 1" readonly="" />
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

export function IDCodes()
{
    return(
        <>
         <div  className="card mt-3 mb-3">
                                <div  className="card-body">
                                    <div  className="row">
                                        <div  className="col-md-12 mb-1">
                                            <h5  className="mb-2">ID Codes</h5>
                                        </div>
                                    </div>
                                    <div  className="row">
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Generic Code</small>
                                                <select  className="form-select">
                                                    <option value="">Select Code</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Original with Generics</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>DEA Class Code</small>
                                                <select  className="form-select">
                                                    <option value="">Select DEA Class Code</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">A DEA Class Code is not Applicable</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Therapeutic Class</small>
                                                <select  className="form-select">
                                                    <option value="">Select Class</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Miscellaneous Anagesics and Antipyretics</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Therapeutic Equiv</small>
                                                <select  className="form-select">
                                                    <option value="">Select Equiv</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Information is unavailable or not applicable</p>
                                            </div>
                                        </div>

                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Rx OCT Indicator</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Rx Multi-source</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>OTC Equiv Indicator</small>
                                                <input type="text"  className="form-control" name="" />
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>3rd Party Restriction</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">No Third-Party Restrication Code Applicable</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>DESI Code</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Non DESI/IRS drugs or DESI/IRS drugs intermined to be safe and effective</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Internal/External Code</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Internally Administered</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Maint Drug Code</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Oil</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Dispensing Unit</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Old Amount 3</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Route Admin Code</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Oral</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Form Type code</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Solid</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Dollar Rank code</small>
                                                <input type="text"  className="form-control" name="" />
                                                <p  className="input-hint">Description</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Rx Rank code</small>
                                                <input type="text"  className="form-control" name="" />
                                                <p  className="input-hint">Description</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-4">
                                            <div  className="form-group mb-3">
                                                <small>Single Combo Code</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Standard Packaging</p>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
        </>
    )
}

export function Distribution()
{
    return(
        <>
        <div  className="card mt-3 mb-3">
                                <div  className="card-body">
                                    <div  className="row">
                                        <div  className="col-md-12 mb-1">
                                            <h5  className="mb-2">Distribution Information</h5>
                                        </div>
                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Metric Strength</small>
                                                <input type="text"  className="form-control" name="" />
                                            </div>
                                        </div>
                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Unit Dose code</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Standard Packaging</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Strngth Unit Mesr</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Milligram</p>
                                            </div>
                                        </div>
                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Dosage From</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Tablet</p>
                                            </div>
                                        </div>

                                        <div  className="col-md-12 mb-1">
                                            <h5  className="mb-2">Packaging Information</h5>
                                        </div>

                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Gen Prod Package Code</small>
                                                <input type="text"  className="form-control" name="" />
                                            </div>
                                        </div>
                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Package Size</small>
                                                <input type="text"  className="form-control" name="" />
                                            </div>
                                        </div>
                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Package Description</small>
                                                <input type="text"  className="form-control" name="" />
                                            </div>
                                        </div>
                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Package Unit of Measure</small>
                                                <select  className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                                <p  className="input-hint">Each</p>
                                            </div>
                                        </div>

                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Package Quantity</small>
                                                <input type="text"  className="form-control" name="" />
                                            </div>
                                        </div>
                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Total Package Quantity</small>
                                                <input type="text"  className="form-control" name="" />
                                            </div>
                                        </div>
                                        <div  className="col-md-3">
                                            <div  className="form-group mb-3">
                                                <small>Repackage Index</small>
                                                <input type="text"  className="form-control" name="" />
                                            </div>
                                        </div>

                                        <div  className="col-md-12 mb-1">
                                            <h5  className="mb-2">Date Information</h5>
                                        </div>

                                        <div  className="col-md-6">
                                            <div  className="form-group mb-3">
                                                <small>Medi-Span Last change Date</small>
                                                <input type="date"  className="form-control" name="" />
                                            </div>
                                        </div>
                                        <div  className="col-md-6">
                                            <div  className="form-group mb-3">
                                                <small>System Effective Date</small>
                                                <input type="date"  className="form-control" name="" />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
        </>
    )
}

export function Pricing()
{
    return(
        <>
         <div  className="card mt-3 mb-3">
                                <div  className="card-body">
                                    <div  className="row">
                                        <div  className="col-md-12 mb-1">
                                            <h5  className="mb-2">Pricing</h5>
                                        </div>
                                        <div  className="col-md-6 mb-2">
                                            <small>NDC</small>
                                            <input type="text"  className="form-control" name="" id="" />
                                        </div>
                                        <div  className="col-md-6 mb-2">
                                            <small>Label Name</small>
                                            <input type="text"  className="form-control" name="" id="" />
                                        </div>
                                        <div  className="col-md-12 mt-2">
                                            <table  className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Price Source</th>
                                                        <th>Price Type</th>
                                                        <th>Effective Date1</th>
                                                        <th>Amount 1</th>
                                                        <th>Effective Date 2</th>
                                                        <th>Amount 2</th>
                                                        <th>Effective Date 3</th>
                                                        <th>Amount 3</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>USR</td>
                                                        <td>USR</td>
                                                        <td>2006-04-28</td>
                                                        <td>15,000.00</td>
                                                        <td>0000-00-00</td>
                                                        <td>00</td>
                                                        <td>0000-00-00</td>
                                                        <td>00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>USR</td>
                                                        <td>USR</td>
                                                        <td>2006-04-28</td>
                                                        <td>15,000.00</td>
                                                        <td>0000-00-00</td>
                                                        <td>00</td>
                                                        <td>0000-00-00</td>
                                                        <td>00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>USR</td>
                                                        <td>USR</td>
                                                        <td>2006-04-28</td>
                                                        <td>15,000.00</td>
                                                        <td>0000-00-00</td>
                                                        <td>00</td>
                                                        <td>0000-00-00</td>
                                                        <td>00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
        </>
    )
}