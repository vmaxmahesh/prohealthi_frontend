import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';


export default function ProviderValidation()
{



    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');



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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/provider/get/${ndcid}`, requestOptions)
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
         console.log(ndcid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/provider/details/${ndcid}`, requestOptions)
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
                    console.log(selctedNdc);
                    scollToRef.current.scrollIntoView()
                    return;
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }








    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/provider/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                console.log(data.data);

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
                            <li><a href="">Provider</a></li>
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


            <SearchProviderValidation searchException={searchException} />


            <ProviderList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />


            <ProviderValidationForm  viewDiagnosisFormdata={selctedNdc} />


        </>
    )
}





function NdcRow(props) {

    useEffect(() => {
    
    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.pharmacy_list == props.selected.pharmacy_list ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.pharmacy_list)}
            >
                <td>{props.ndcRow.pharmacy_list}</td>
                <td >{props.ndcRow.pharmacy_name}</td>

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
                className={(props.selected && props.ndcClassRow.pharmacy_nabp == props.selected.pharmacy_nabp ? ' tblactiverow ' : '')}
                onClick={() => props.getNDCItemDetails(props.ndcClassRow.pharmacy_nabp)}

            >
                <td>{props.ndcClassRow.pharmacy_nabp}</td>
                <td>{props.ndcClassRow.pharmacy_status}</td>
                <td>{props.ndcClassRow.pharmacy_name}</td>


                
              
                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}






function SearchProviderValidation(props)
{

    
    const searchException = (fdata) => {
        // alert(fdata);

        props.searchException(fdata);
    }
    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Provider Validation ID/Name</small>
                                <input type="text" onKeyUp={(e) => searchException(e)}   className="form-control" placeholder='Start typing provider validation ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
            {/* <ProviderList /> */}
        </>
    )
}

function ProviderList(props)
{


    const scollToRef = useRef();

    useEffect(() => { }, [props.selctedNdc]);
    // //  console.log(props.selctedNdc);

    const getNDCItem = (ndciemid) => {
        // alert(ndciemid);
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
                            <h5>Provider Validation List</h5>
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
                                                    <th>Provider Validation ID</th>
                                                    <th>Provider Validation Name</th>
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
                                                    <th>Provider ID</th>
                                                    <th>Provider Status</th>
                                                    <th>Provider Name</th>
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
            {/* <ProviderValidationForm /> */}
        </>
    )
}

function ProviderValidationForm(props)
{

    const { register,reset, handleSubmit, watch, formState: { errors } } = useForm();


    useEffect(() => { reset(props.viewDiagnosisFormdata) }, [props.viewDiagnosisFormdata]);

    return(
        <>
        <div className="card mt-3 mb-3">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="mb-2">Criteria</h5>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>ID</small>
                                    <input type="text" className="form-control" name="pharmacy_nabp" {...register('pharmacy_nabp')} id="" placeholder="" required />
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Name</small>
                                    <input type="text" className="form-control" name="pharmacy_name"  {...register('pharmacy_name')} id="" placeholder="" required />
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Store Number</small>
                                    <input type="text" className="form-control" name="store_number" {...register('store_number')} id="" placeholder="" required />
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>City</small>
                                    <select className="form-select" name="city" {...register('city')}>
                                        <option value="">Select City</option>
                                        <option value="1">Runaway Bay</option>
                                        <option value="2">Kingston 20</option>
                                        <option value="3">Portmore</option>
                                        <option value="4">Junction</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>State</small>
                                    <select className="form-select">
                                        <option value="" name="state" {...register('state')}>Select State</option>
                                        <option value="1">Andhra pradesh</option>
                                        <option value="2">Telengana</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>County</small>
                                    <select className="form-select" name="country" {...register('country')}>
                                        <option value="">Select County</option>
                                        <option value=""></option>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>ZIP</small> 
                                    <input type="text" className="form-control" name="zip_code" {...register('zip_code')} id="" placeholder="" required />
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Area Code</small>
                                    <input type="text" className="form-control" name="zip_plus_2" {...register('zip_plus_2')} id="" placeholder="" required />
                                </div>
                            </div>

                            {/* <div className="col-md-6 ms-auto text-end mb-3">
                                <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                                <a href="provider-search.html" className="btn btn-info">Search</a>
                            </div> */}
                        </div>


                        


                    </div>
                </div>
        </>
    )
}