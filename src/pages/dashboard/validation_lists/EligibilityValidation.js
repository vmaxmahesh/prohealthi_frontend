import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';


export default function EligibilityValidation()
{




    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');


    const searchException = (fdata) => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosis/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                // console.log(data.data);

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
    return(
        <>
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Validation List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Eligibility</a></li>
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

            <SearchEligibility searchException={searchException} />

        </>
    )
}

function SearchEligibility(props)
{


    const searchException = (fdata) => {

        props.searchException(fdata);
    }

    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Eligibility Validation ID/Name</small>
                                <input type="text" onKeyUp={(e) => searchException(e)}  className="form-control" placeholder='Start typing eligibility validation ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
            <EligibilityList />
        </>
    )
}

function EligibilityList()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Eligibility Validation List</h5>
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
                                                    <th>Eligibility Validation ID</th>
                                                    <th>Eligibility Validation Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                           <div className="col-md-6">
                                <h5 className="mb-2">Eligibility Identification</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small> Eligibility Validation ID: </small>
                                       <input type="text" name="" placeholder="" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Eligibility Validation Name: </small>
                                    <input type="text" name="" placeholder="100PC" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        <div className="col-md-6">
                                <h5 className="mb-2">Members History Information</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Age Limit Verification: </small>
                                      <select className="form-select">
                                          <option>Through Birthday</option>
                                          <option>Up to birth day</option>
                                          <option>Through week that birth day occurs</option>
                                          <option>Through month that birth day occurs</option>
                                          <option>Through year that birth day occurs</option>
                                          <option>Through specified date</option>
                                      </select>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Age Limit Month: </small>
                                      <select className="form-select">
                                          <option>Through Birthday</option>
                                      </select>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Age Limit Day: </small>
                                    <input type="text" name="" placeholder="100PC" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="col-md-12">
                                <h5 className="mb-2">Relationship Verification Options</h5>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th>Code</th>
                                     <th>Relationship</th>
                                      <th>Covered</th>
                                       <th>Age</th>
                                   </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Cardholder</td>
                                        <td> 
                                            <div className="form-group mt-2">
                                                <input type="checkbox" id="Return2" className="d-none" />
                                                <label htmlFor="Return2"></label>
                                            </div>
                                       </td>
                                       <td> </td>

                                    </tr>

                                     <tr>
                                        <td>2</td>
                                        <td>Spouse</td>
                                        <td> 
                                            <div className="form-group mt-2">
                                                <input type="checkbox" id="Return3" className="d-none" />
                                                <label htmlFor="Return3"></label>
                                            </div>
                                       </td>
                                       <td> </td>

                                    </tr>

                                     <tr>
                                        <td>3</td>
                                        <td>Child</td>
                                        <td> 
                                            <div className="form-group mt-2">
                                                <input type="checkbox" id="Return4" className="d-none" />
                                                <label htmlFor="Return4"></label>
                                            </div>
                                       </td>
                                       <td>
                                        <div className="form-group">
                                       <input type="text" className="form-control" name="" />
                                   </div>
                                       </td>

                                    </tr>


                                    <tr>
                                        <td>4</td>
                                        <td>Student </td>
                                        <td> 
                                            <div className="form-group mt-2">
                                                <input type="checkbox" id="Return8" className="d-none" />
                                                <label htmlFor="Return8"></label>
                                            </div>
                                       </td>
                                       <td>
                                        <div className="form-group">
                                       <input type="text" className="form-control" name="" />
                                   </div>
                                       </td>

                                    </tr>


                                    <tr>
                                        <td>5</td>
                                        <td>Disabled Dependent</td>
                                        <td> 
                                            <div className="form-group mt-2">
                                                <input type="checkbox" id="Return5" className="d-none" />
                                                <label htmlFor="Return5"></label>
                                            </div>
                                       </td>
                                       <td>
                                        <div className="form-group">
                                       <input type="text" className="form-control" name="" />
                                   </div>
                                       </td>

                                    </tr>

                                    <tr>
                                        <td>7</td>
                                        <td>Adult Dependent</td>
                                        <td> 
                                            <div className="form-group mt-2">
                                                <input type="checkbox" id="Return6" className="d-none" />
                                                <label htmlFor="Return6"></label>
                                            </div>
                                       </td>
                                       <td></td>

                                    </tr>

                                    <tr>
                                        <td>6</td>
                                        <td>Significant Other</td>
                                        <td> 
                                            <div className="form-group mt-2">
                                                <input type="checkbox" id="Return7" className="d-none" />
                                                <label htmlFor="Return7"></label>
                                            </div>
                                       </td>
                                       <td></td>

                                    </tr>

                                    

                                </tbody>
                            </table>

                            <div className="col-md-6 ms-auto text-end mb-3">
                                    <button href="" className="btn btn-primary">Set Family</button>&nbsp;&nbsp;
                                    <button href="" className="btn btn-danger">Set All</button>&nbsp;&nbsp;
                                    <button href="" className="btn btn-warning ">Clear</button>&nbsp;&nbsp;
                                </div>
                        </div>
                    </div>
                        </div>

                       
                       
                                           
                    
            </div>
        </>
    )
}