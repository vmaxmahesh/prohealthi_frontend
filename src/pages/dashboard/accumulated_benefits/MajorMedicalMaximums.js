import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';

export default function MajorMedicalMaximums()
{



    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);


    const [ndcGroup, setNdcGroup] = useState([]);


    const[formData,setformData]=useState([]);


    const [selctedNdc, setSelctedNdc] = useState('');

    const[selectedgroupNdc,setGroupNdc]=useState('');

    


    const searchException = (fdata) => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/customer/search?search=${fdata.target.value}`, requestOptions)
        
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/client/get/${ndcid}`, requestOptions)
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
                    // console.log(data.data);
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/clientgroup/get/${ndcid}`, requestOptions)
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
                    // setSelctedNdc(data.data);

                    setNdcGroup(data.data);
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


    const getOneItemDetails = (ndcid) => {
        //  console.log(ndcid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/clientgroup/details/${ndcid}`, requestOptions)
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
                    // setSelctedNdc(data.data);

                    setformData(data.data);
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
                            <li><a href=""> Major Medical Maximums </a></li>
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
            <SeacrchMajorMedicalMax searchException={searchException} />

            <MajorMedicalMaximumsList ndcListData={ndcData} ndcClassData={ndcClass} ndcGroupData={ndcGroup} getNDCItem={getNDCItems}   getOneItemDetails={getOneItemDetails }    getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />

            <MajorMedicalMaximumForms  viewDiagnosisFormdata={formData} />

        </>
    )
}

function SeacrchMajorMedicalMax(props)
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
                                <small>Major Medical Maximums</small>
                                <input type="text" className="form-control" name="search" onKeyUp={(e) => searchException(e)} placeholder='Start typing  major medical maximums ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
            {/* <MajorMedicalMaximumsList /> */}
        </>
    )
}



function NdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.customer_id == props.selected.customer_id ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.customer_id)}
            >
                
                <td>{props.ndcRow.customer_id}</td>
                <td>{props.ndcRow.customer_name}</td>


                



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
                className={(props.selected && props.ndcClassRow.client_id == props.selected.client_id ? ' tblactiverow ' : '')}
                onClick={() => props.getNDCItemDetails(props.ndcClassRow.client_id)}

            >
                <td>{props.ndcClassRow.client_id}</td>
                <td>{props.ndcClassRow.client_name}</td>


                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}


function NdcGroupRow(props) {

    useEffect(() => {

    }, [props.selected]);

    console.log(props.selected);

    return (
        <>
            <tr
                className={(props.selected && props.ndcGroupRow.client_group_id == props.selected.client_group_id ? ' tblactiverow ' : '')}
                onClick={() => props.getOneItemDetails(props.ndcGroupRow.client_group_id)}

            >
                <td>{props.ndcGroupRow.client_group_id}</td>
                <td>{props.ndcGroupRow.effective_date}</td>


                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function MajorMedicalMaximumsList(props)
{


    const scollToRef = useRef();

    useEffect(() => { }, [props.selctedNdc]);
    // //  console.log(props.selctedNdc);

    const getNDCItem = (ndciemid) => {
        props.getNDCItem(ndciemid);
    }


    

    const getClientid=(clientid)=>{
        alert('mahesh');
        console.log(props)
    }


     



    const getOneItemDetails = (ndciemid) => {
        props.getOneItemDetails(ndciemid);
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
        ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]}   getNDCItemDetails={getNDCItemDetails}   selected={props.selctedNdc} />);
    }


    const ndsGroupArray=[];

    for (let k = 0; k < props.ndcGroupData.length; k++) {
        ndsGroupArray.push(<NdcGroupRow ndcGroupRow={props.ndcGroupData[k]}  getOneItemDetails={getOneItemDetails}   getNDCItemDetails={getNDCItemDetails}   selected={props.selctedNdc} />);
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
                            <h5>Major Medical Maximums</h5>
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
                                                    <th>Customer ID</th>
                                                    <th>Customer Name</th>
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
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Client ID</th>
                                                    <th>Client Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {ndcClassArray}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Group ID</th>
                                                    <th>Effective Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ndsGroupArray}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* <MajorMedicalMaximumForms /> */}
        </>
    )
}

function MajorMedicalMaximumForms(props)
{


    const { register,reset, handleSubmit, watch, formState: { errors } } = useForm();

    // const [selctedNdc, setSelctedNdc] = useOutletContext();
    console.log(props.viewDiagnosisFormdata);

    useEffect(() => { reset(props.viewDiagnosisFormdata) }, [props.viewDiagnosisFormdata]);
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                                    <div className="row comparis-ionn mt-3">
                                        <div className=""><span>Major Medical Maximums:</span></div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Customer ID</small>
                                                  <input className="form-control" type="text" name="customer_id" {...register('customer_id')} id="" />
                                                </div>
                                          </div>
                                         <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Client ID</small>
                                                  <input className="form-control" type="text" name="client_id" {...register('client_id')} id="" />
                                                </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Group ID</small>
                                                  <input className="form-control" type="text" name="client_group_id" {...register('client_group_id')} id="" />
                                                </div>
                                          </div>
                                  </div>

                                  <div className="row comparis-ionn mt-4">
                                        <div className=""><span> Maximums:</span></div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Effective Date</small>
                                                  <input  className="form-control" type="date" name="effective_date" {...register('effective_date')} id="" />
                                                </div>
                                          </div>
                                         <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Termination Date</small>
                                                  <input className="form-control" type="date" name="group_termination_date" {...register('group_termination_date')} id="" />
                                                </div>
                                          </div>
                                         <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Major Medical Claim Max</small>
                                                  <input className="form-control" type="date" name="max_days_interim_elig" {...register('max_days_interim_elig')} id="" />
                                                </div>
                                          </div>
                                           <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Major Medical Claim Max Grouping</small>
                                                  <select className="form-select">
                                                      <option>1</option>
                                                  </select>
                                                </div>
                                          </div>
                                           <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Major Medical Lifetime Max</small>
                                                  <input className="form-control" type="date" name="" id="" />
                                                </div>
                                          </div>

                                           <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Grouping Type:</small>
                                                  <select className="form-select">
                                                      <option>1</option>
                                                  </select>
                                                </div>
                                          </div>
                                  </div>
                        </div>
                    </div>
        </>
    )
}