import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
export default function GPIExclusion()
{


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');


    const searchException = (fdata) => {
        
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/gpiExclusion/search?search=${fdata.target.value}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/gpiExclusion/get/${ndcid}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/gpiExclusion/details/${ndcid}`, requestOptions)
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
                            <li><a href="">GPI Exclusion</a></li>
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
            <SearchGPIExclusion searchException={searchException} />

            <GPIExclusionList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />


            <GPIExclusionForm  viewDiagnosisFormdata={selctedNdc} />


        </>
    )
}

function SearchGPIExclusion(props)
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
                                <small>GPI Exclusion</small>
                                <input type="text" className="form-control"  onKeyUp={(e) => searchException(e)} placeholder='Start typing  GPI exclusion ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div> 
            {/* <GPIExclusionList /> */}
        </>
    )
}




function NdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.gpi_exclusion_list == props.selected.gpi_exclusion_list ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.generic_product_id)}
            >
                <td>{props.ndcRow.gpi_exclusion_list}</td>
                <td >{props.ndcRow.exclusion_name}</td>

                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}


function NdcClassRow(props) {

    useEffect(() => {

    }, [props.selected]);


    // console.log(props.selected);

    return (
        <>
            <tr
                className={(props.selected && props.ndcClassRow.generic_product_id == props.selected.generic_product_id ? ' tblactiverow ' : '')}
                onClick={() => props.getNDCItemDetails(props.ndcClassRow.generic_product_id)}

            >
                <td>{props.ndcClassRow.generic_product_id}</td>
              
                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function GPIExclusionList(props)
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
console.log(props.ndcClassData);
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
                            <h5>GPI Exclusion List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <div className="col-md-6">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>GPI Exclusion ID</th>
                                                    <th>GPI Exclusion Name</th>
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
                        <div className="col-md-6">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>GPI </th>
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
                    </div>
                </div>
            </div> 
            {/* <GPIExclusionForm /> */}
        </>
    )
}

function GPIExclusionForm(props)
{

    const { register,reset, handleSubmit, watch, formState: { errors } } = useForm();

    // const [selctedNdc, setSelctedNdc] = useOutletContext();

    useEffect(() => { reset(props.viewDiagnosisFormdata) }, [props.viewDiagnosisFormdata]);
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                                <h5 className="mb-2">GPI Exclusion</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> List ID</small>
                                       <input type="text" name="gpi_exclusion_list"  {...register('gpi_exclusion_list')} className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> List Name</small>
                                     <input type="text" name="exclusion_name" {...register('exclusion_name')} className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group ">
                                         <small> GPI</small>
                                        <div className="searchmodal">
                                       <input type="text" name="generic_product_id" {...register('generic_product_id')} className="form-control" placeholder="" />
                                       {/* <button className="btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-magnifying-glass"></i></button> */}
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    )
}