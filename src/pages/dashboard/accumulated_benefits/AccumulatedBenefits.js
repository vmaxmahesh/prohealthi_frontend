import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import DraggableList from "react-draggable-lists";

export default function AccumulatedBenefits() 
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/benifit/search?search=${fdata.target.value}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/benifit/get/${ndcid}`, requestOptions)
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
                    console.log(data.data);
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

    const getNDCItemDetails = (ndcid) => {
        //  console.log(ndcid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/speciality/details/${ndcid}`, requestOptions)
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
                    setSelctedNdc(data.data);
                    // scollToRef.current.scrollIntoView()
                    // return;
                }


                if (response === '200') {
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
                            <li><a href="">Accumulated Benefits</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Accumulated Benefit</a></li>
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


            <SearchAccumulatedBenefit searchException={searchException} />

            <AccumulatedBenefitList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />




        </>
    )
}

function SearchAccumulatedBenefit(props)
{

    const { register, handleSubmit, watch, formState: { errors } } = useForm();


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
                                <small>Accumulated Benefits</small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing accumulated benefits validation plan/deductible name/ NDC exclusion name/ GPI exclisuion name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div> 
            {/* <AccumulatedBenefitList /> */}
        </>
    )
}



function NdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.plan_accum_deduct_id == props.selected.plan_accum_deduct_id ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.plan_accum_deduct_id)}
            >
                <td>{props.ndcRow.plan_accum_deduct_id}</td>
                <td >{props.ndcRow.plan_accum_deduct_name}</td>
                <td>{props.ndcRow.ndc_exclusion_list}</td>
                <td>{props.ndcRow.gpi_exclusion_list}</td>

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
                className={(props.selected && props.ndcClassRow.specialty_id == props.selected.specialty_id ? ' tblactiverow ' : '')}
                onClick={() => props.getNDCItemDetails(props.ndcClassRow.specialty_id)}

            >
                <td>{props.ndcClassRow.priority}</td>
                <td>{props.ndcClassRow.specialty_status}</td>
              
                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function AccumulatedBenefitList(props)
{


    const scollToRef = useRef();


    useEffect(() => { }, [props.selctedNdc]);
    // //  console.log(props.selctedNdc);

    const getNDCItem = (ndciemid) => {
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
                            <h5>Accumulated Benefits List</h5>
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
                                                    <th>Accum Benefits Plan</th>
                                                    <th>Plan Accum Deductible Name</th>
                                                    <th>NDC Exclusion List Name</th>
                                                    <th>GPI Exclusion List Name</th>
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
                    </div>
                </div>
            </div>
            <AccumulatedBenefitForm  />
        </>
    )
}

function AccumulatedBenefitForm(props)
{
    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];
    return(
        <>
          <div className="data">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <Link to="exclusion-limitation" className={'nav-link' + (currentpath == 'exclusion-limitation' ? ' active' : '')}>Exclusion Limitation</Link>
                    <Link to="deductible" className={'nav-link' + (currentpath == 'deductible' ? ' active' : '')}>Deductible</Link>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export function ExclusionLimitation(props)
{
    return(
        <>
        <div className="card mt-3 mb-3">
           <div className="card-body">
                <div className="row mt-3 mb-3">
                                          <h5 className="mb-2">Exclusion Limitation</h5>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small>Plan ID:</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="Source "  />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small>Name</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small>Grouping Type:</small>
                                                        <select className="form-select">
                                                            <option>Customer</option>
                                                            <option>Client</option>
                                                            <option>Group</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-2">
                                                        <small>Benefit Grouping Type:</small>
                                                        <select className="form-select">
                                                            <option>Benefit List ID</option>
                                                            <option>Client</option>
                                                            <option>Group</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <small>Price Schedule: </small>
                                                    <div className="form-group mb-2">
                                                        <input type="text" className="form-control" name="" id="" placeholder="Percentage"  />
                                                    </div>
                                                </div>
                                                 
                                                <div className="col-md-2 mt-4">
                                                     <div className="">
                                                     <button type="submit" className="btn m-0 p-2 btn-theme" style={{width: "100%",fontSize: "12px"}}>Search</button>
                                                    </div>
                                                </div>


                                                <div class="col-md-12">
                                             <div class="row mt-4 mb-3 comparis-ionn">
                                                <div class=""><h5 class="mb-2">Deduction Information</h5></div>
                                                  
                                                   <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                        <small>Period</small>
                                                        <select class="form-select">
                                                            <option>Annual</option>
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mb-2">
                                                        <small>Month to start Deductions: </small>
                                                        <select class="form-select">
                                                            <option>Annual</option>
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                 <div class="col-md-3">
                                                     <div class="form-group mb-2">
                                                        <small>Day to start Deductions: </small>
                                                       <input type="text" class="form-control" name="" id="" placeholder="Day to start Deductions "/>
                                                    </div>
                                                </div>
                                                 <div class="col-md-3">
                                                     <div class="form-group mb-2">
                                                        <small> Deductable  Refresh Option: </small>
                                                        <select class="form-select">
                                                            <option>Annual</option>
                                                            <option></option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                             <div class="row mt-4 mb-3 comparis-ionn">
                                                <div class=""><h5 className='mb-2'>Exclusive Information</h5></div>
                                                    <div class="row">
                                                        <div class="col-md-3"></div>
                                                        <div class="col-md-3">Deductable</div>
                                                        <div class="col-md-3">Max Out of Pocket</div>
                                                        <div class="col-md-3">Max Benefit</div>
                                                    </div>
                                                  <div class="row">
                                                   <div class="col-md-3">
                                                    <div class="form-group mb-2 mt-4">
                                                        <p>Exclude In Network:</p>
                                                    </div>
                                                  </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return1" class="d-none"/>
                                                        <label for="Return1"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return2" class="d-none"/>
                                                        <label for="Return2"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return3" class="d-none"/>
                                                        <label for="Return3"></label>
                                                    </div>
                                                </div>

                                                 <div class="col-md-3">
                                                    <div class="form-group mb-2 mt-4">
                                                        <p>Exclude Generics:</p>
                                                    </div>
                                                  </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return4" class="d-none"/>
                                                        <label for="Return4"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return5" class="d-none"/>
                                                        <label for="Return5"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return6" class="d-none"/>
                                                        <label for="Return6"></label>
                                                    </div>
                                                </div>

                                                 <div class="col-md-3">
                                                    <div class="form-group mb-2 mt-4">
                                                        <p>Exclude Maintenance Drugs:</p>
                                                    </div>
                                                  </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return7" class="d-none"/>
                                                        <label for="Return7"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return8" class="d-none"/>
                                                        <label for="Return8"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return9" class="d-none"/>
                                                        <label for="Return9"></label>
                                                    </div>
                                                </div>


                                                  <div class="col-md-3">
                                                    <div class="form-group mb-2 mt-4">
                                                        <p>Exclude Mail Service:</p>
                                                    </div>
                                                  </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return10" class="d-none"/>
                                                        <label for="Return10"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return11" class="d-none"/>
                                                        <label for="Return11"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return12" class="d-none"/>
                                                        <label for="Return12"></label>
                                                    </div>
                                                </div>


                                                  <div class="col-md-3">
                                                    <div class="form-group mb-2 mt-4">
                                                        <p>Exclude Patient Differentials:</p>
                                                    </div>
                                                  </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return13" class="d-none"/>
                                                        <label for="Return13"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return14" class="d-none"/>
                                                        <label for="Return14"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return15" class="d-none"/>
                                                        <label for="Return15"></label>
                                                    </div>
                                                </div>


                                                  <div class="col-md-3">
                                                    <div class="form-group mb-2 mt-4">
                                                        <p>Exclude Maintenance Drugs:</p>
                                                    </div>
                                                  </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return16" class="d-none"/>
                                                        <label for="Return16"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return17" class="d-none"/>
                                                        <label for="Return17"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return18" class="d-none"/>
                                                        <label for="Return18"></label>
                                                    </div>
                                                </div>

                                                  <div class="col-md-3">
                                                    <div class="form-group mb-2 mt-4">
                                                        <p>Exclude Deductions:</p>
                                                    </div>
                                                  </div>
                                                <div class="col-md-3"> </div>
                                               
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="checkbox" id="Return19" class="d-none"/>
                                                        <label for="Return19"></label>
                                                    </div>
                                                </div>
                                                <div class="col-md-3"></div>


                                                  <div class="col-md-3">
                                                    <div class="form-group mb-2 mt-4">
                                                        <p>Exclude Max Days Supply Over:</p>
                                                    </div>
                                                  </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                        <input type="text" class="form-control" name="" id="" placeholder="Source "/>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                     <input type="text" class="form-control" name="" id="" placeholder="Source "/>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                     <div class="form-group mt-3">
                                                       <input type="text" class="form-control" name="" id="" placeholder="Source "/>
                                                    </div>
                                                </div>
                                            </div>
                                                </div>


                                                <div class="row mt-4 mb-3 comparis-ionn">
                                                <div class=""><h5 className='mb-2'>Limitation Information</h5></div>

                                                <div class="row">
                                                        <div class="col-md-3 mb-2"></div>
                                                        <div class="col-md-3 mb-2">Deductable</div>
                                                        <div class="col-md-3 mb-2">Max Out of Pocket</div>
                                                        <div class="col-md-3 mb-2">Max Benefit</div>
                                                    </div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                     <div class="form-group mb-2">
                                                        <p>By GPI List</p>
                                                          </div>
                                                </div>
                                                 <div class="col-md-3">
                                                  <div class="form-group mb-2">
                                                    <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                                 <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                     <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                                 <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                     <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                            </div>


                                            <div class="row">
                                                <div class="col-md-3">
                                                     <div class="form-group mb-2">
                                                        <p>By NDC List</p>
                                                          </div>
                                                </div>
                                                 <div class="col-md-3">
                                                  <div class="form-group mb-2">
                                                    <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                                 <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                     <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                                 <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                     <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">
                                                     <div class="form-group mb-2">
                                                        <p>Agg Type Max</p>
                                                          </div>
                                                </div>
                                                 <div class="col-md-3">
                                                  <div class="form-group mb-2">
                                                    <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                                 <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                     <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                                 <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                     <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">
                                                     <div class="form-group mb-2">
                                                        <p>Individual Limit Max</p>
                                                          </div>
                                                </div>
                                                 <div class="col-md-3">
                                                  <div class="form-group mb-2">
                                                    <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                                 <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                     <input type="text" class="form-control" name="" id="" placeholder=""/>
                                                 </div>
                                                </div>
                                                 <div class="col-md-3">
                                                    <div class="form-group mb-2">
                                                     <input type="text" class="form-control" name="" id="" placeholder=""/>
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

export function Deductible()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                                <div className="card-body">
         <div className='row'>
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Deductible</h5>

                                          

                                            <div className="row mt-4 mb-3 comparis-ionn">
                                                <div className=""><span>Deduction Information</span></div>
                                                   
                                                <div className="col-md-4"></div>
                                                <div className="col-md-4 text-center mb-2">Individual</div>
                                                <div className="col-md-4 text-center mb-2">Family</div>
                                            
                                                   <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Max Rxs Per: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                     <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-4">
                                                     <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Max Rx Action: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                      <select className="form-select">
                                                            <option>1</option>
                                                      </select>
                                                </div>
                                                 <div className="col-md-4">
                                                      <select className="form-select">
                                                            <option>1</option>
                                                      </select>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Max Rx Copay Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                      <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-4">
                                                      <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Deductible: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                       <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-4">
                                                      <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Out of Amount: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                      <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-4">
                                                       <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>


                                                 <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Out of Pocket Action: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                      <select className="form-select">
                                                            <option>1</option>
                                                      </select>
                                                </div>
                                                 <div className="col-md-4">
                                                      <select className="form-select">
                                                            <option>1</option>
                                                      </select>
                                                </div>


                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Out of Pocket Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                      <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-4">
                                                       <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>


                                                <hr />



                                                <div className="col-md-4">
                                                    <p><b>Tier 1</b></p>
                                                    <div className="form-group mb-2">
                                                         <p>Benefit: </p>
                                                    </div>
                                                    </div>
                                                <div className="col-md-4">
                                                        <input type="text" className="form-control" name="" id="" placeholder="$10000"  />
                                                </div>
                                                 <div className="col-md-4">
                                                      <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Action: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                       <select className="form-select">
                                                           <option>Add Maximum Over Benefit Amount To be Copay</option>
                                                       </select>
                                                </div>
                                                 <div className="col-md-4">
                                                       <select className="form-select">
                                                           <option>1</option>
                                                       </select>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Price Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                       <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-4">
                                                      <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Copay Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                      <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-4">
                                                       <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>


                                                <hr />



                                                <div className="col-md-4">
                                                    <p><b>Tier 2</b></p>
                                                    <div className="form-group mb-2">
                                                         <p>Benefit: </p>
                                                    </div>
                                                    </div>
                                                <div className="col-md-4">
                                                        <input type="text" className="form-control" name="" id="" placeholder="$10000"  />
                                                </div>
                                                 <div className="col-md-4">
                                                      <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Action: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                       <select className="form-select">
                                                           <option>Add Maximum Over Benefit Amount To be Copay</option>
                                                       </select>
                                                </div>
                                                 <div className="col-md-4 mb-2">
                                                       <select className="form-select">
                                                           <option>1</option>
                                                       </select>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Price Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                       <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-4">
                                                      <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                         <p>Copay Schedule: </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                      <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
                                                    </div>
                                                </div>
                                                 <div className="col-md-4">
                                                       <div className="form-group mb-2">
                                                       <input type="text" className="form-control" name="" id="" placeholder=""  />
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