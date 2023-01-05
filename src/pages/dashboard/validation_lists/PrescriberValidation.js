import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import AsyncSelect from 'react-select';

export default function PrescriberValidation()
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/prescriber/get/${ndcid}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/prescriber/details/${ndcid}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/prescriber/search?search=${fdata.target.value}`, requestOptions)
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
                            <li><a href="">Prescriber</a></li>
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
            <SearchPrescriber searchException={searchException} />


            <PrescriberList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />
            <PrescriberForm  viewDiagnosisFormdata={selctedNdc} />


        </>
    )
}

function SearchPrescriber(props)
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
                                <small>Prescriber Validation ID/Name</small>
                                <input type="text"  onKeyUp={(e) => searchException(e)}   className="form-control" placeholder='Start typing presciber validation ID/name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <PrescriberList /> */}
        </>
    )
}

function PrescriberList(props)
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
                            <h5>Prescriber Validation List</h5>
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
                                                    <th>Prescriber Validation ID</th>
                                                    <th>Prescriber Validation Name</th>
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
                                                    <th>Prescriber ID</th>
                                                    <th>Prescriber Status</th>
                                                    <th>Prescriber Name</th>
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
            {/* <PrescriberForm /> */}
        </>
    )
}



function NdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.physician_list == props.selected.physician_list ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.physician_list)}
            >
                <td>{props.ndcRow.physician_list}</td>
                <td >{props.ndcRow.exception_name}</td>

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
                className={(props.selected && props.ndcClassRow.physician_id == props.selected.physician_id ? ' tblactiverow ' : '')}
                onClick={() => props.getNDCItemDetails(props.ndcClassRow.physician_id)}

            >
                <td>{props.ndcClassRow.physician_id}</td>
                <td>{props.ndcClassRow.physician_status}</td>
                <td>{props.ndcClassRow.physician_first_name}    {props.ndcClassRow.physician_last_name}</td>




                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function PrescriberForm(props)
{

    const { register,reset, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => { reset(props.viewDiagnosisFormdata) }, [props.viewDiagnosisFormdata]);
    //fetch prescriber data
const [prescriberId, setPrescriberId] = useState([]);

const fetchClientId = () => {
    fetch(process.env.REACT_APP_API_BASEURL +`/api/validationlist/prescriber/prescriber-list-drop-down`)
    .then((res) => res.json())
    .then((prescriberId) => {
      const prescriberIdList = prescriberId.data.map((item) => ({
        label: item.physician_id +' - '+ item.physician_last_name,
        value: item.physician_id
      }));
      setPrescriberId(prescriberIdList);
    });
}

const [prescriberData, setPrescriberData] = useState([]);

useEffect(() => {
    fetchClientId();
},[])


    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Prescriber List ID</small>
                                    <input type="text" className="form-control" name="physician_list" {...register('physician_list')} id="" placeholder="" required />
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Prescriber List Name</small>
                                    <input type="text" className="form-control" name="exception_name" {...register('exception_name')} id="" placeholder="" required />
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group ">
                                         <small> Prescriber ID </small>
                                <div className="searchmodal">
                                <AsyncSelect
                                    placeholder= "Select Prescriber ID"
                                    options={prescriberId}
                                    noOptionsMessage={() => "Prescriber ID/Name Not Matched"}
                                    name="client_id"
                                    value={prescriberData}
                                    onChange={(e) => setPrescriberData(e)}
                                />
                                       </div>
                                    </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Prescriber Status</small>
                                    <select className="form-select" name="physician_status" {...register('physician_status')}>
                                    <option value=""></option>

                                        <option value="A">Approved</option>
                                        <option value="R">Rejected</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </>
    )
}