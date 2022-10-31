import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';

export default function BenefitList() {
    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');

    const getNDCItems = (ndcid) => {
        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/ndc/get/${ndcid}`, requestOptions)
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

    // getNDCItemList
    const getNDCItemDetails = (ndcid) => {
        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/ndc/details/${ndcid}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/ndc/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

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



    useEffect(() => { }, [ndcData, ndcClass, selctedNdc]);

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
                            <li><a href="">Benefit List</a></li>
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
            <SearchNDC searchException={searchException} />

            <ShowNDCList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />

            <div ref={scollToRef}>
                <AddNcdList selectedNdc={selctedNdc} />
            </div>


        </>
    )
}

function SearchNDC(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const searchException = (fdata) => {

        props.searchException(fdata);
    }


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Benefit ID/Name</small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing benefit ID/name' {...register("ndc_id", { required: true })} />

                            </div>
                        </div>
                        {/* <div className="col-md-2 mb-2">
                            <div className="form-group">
                                <small>&nbsp;</small><br />
                                <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }} onClick={e => fillNdcArray()}>Search</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

function ShowNDCList(props) {

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
        ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} />);
    }

    const ndcClassArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]} getNDCItemDetails={getNDCItemDetails} />);
    }

    const [ncdListData, setNcdListData] = useState();
    const [show, setShow] = useState("none");
    const handleShow = () => setShow("block");
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Benefit Exception List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add Benefit List</button>
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Action</th>
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

                        <div className="col-md-8">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Effective Date</th>
                                                    <th>Benefit Code</th>
                                                    <th>Action</th>
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
        </>
    )
}

function NdcRow(props) {
    return (
        <>
            <tr>
                <td>{props.ndcRow.ndc_exception_list}</td>
                <td>{props.ndcRow.exception_name}</td>
                <td><button className="btn btn-sm btn-info" id="" onClick={() => props.getNDCItem(props.ndcRow.ndc_exception_list)}><i className="fa fa-eye"></i> View</button></td>
            </tr>
        </>
    )
}

function NdcClassRow(props) {
    return (
        <>
            <tr>
                <td>{props.ndcClassRow.ndc_exception_list}</td>
                <td>{props.ndcClassRow.ndc}</td>
                <td>{props.ndcClassRow.effective_date}</td>
                <td>{props.ndcClassRow.new_drug_status}</td>
                <td>{props.ndcClassRow.process_rule}</td>
                <td><button className="btn btn-sm btn-info" id="" onClick={() => props.getNDCItemDetails(props.ndcClassRow.ndc)}><i className="fa fa-eye"></i> View</button></td>
            </tr>
        </>
    )
}

function AddNcdList(props) {
    const location = useLocation();

    const [selctedNdc, setSelctedNdc] = useState({});


    const currentpath = location.pathname.split('/').pop();

    useEffect(() => { setSelctedNdc(props.selectedNdc) }, [props.selectedNdc, selctedNdc]);
    // //  console.log(selctedNdc);

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">

                    <div className="row">

                        <div className="col-md-8">

                            <div className="row mb-2">
                                <div className="col-md-12 mb-2">
                                    <h5>Benefit List</h5>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group mb-2">
                                        <small>ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Enter ID" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group mb-2">
                                        <small>Description</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Enter description" />
                                    </div>
                                </div>

                                <div className="col-md-12 mb-2">
                                    <h5>Benefit Code</h5>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Benefit Code</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Benefit code" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Effective Date</small>
                                        <input type="date" className="form-control" name="" id="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Termination Date</small>
                                        <input type="date" className="form-control" name="" id="" />
                                    </div>
                                </div>
                                <div className="col-md-12 mt-2">
                                    <div className="form-group">
                                        <input type="checkbox" id="one" className="d-none" />
                                        <label htmlFor="one"> User exit will not be invoked for this section</label>
                                    </div>
                                </div>

                                <div className="clearfix mb-3"></div>

                                <div className="col-md-12 mb-2">
                                    <h5>Pricing Overrides</h5>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Pricing  Strategy</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Pricing  Strategy" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Accum. Bene. Strategy</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Accume Benefit  Strategy" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Copay Strategy</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Copay  Strategy" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Limitations</h5>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Amount Due</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Age</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <small>Days Until. Covg Effective</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <small>Days Until. Over Time </small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <small>Price per Day</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <small>Price Per Diagnosis Code</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <small>Base Benefit</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <small>Base Percentage</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-12 mt-2 mb-2">
                                    <div className="form-group">
                                        <input type="checkbox" id="SMBPP" className="d-none" />
                                        <label htmlFor="SMBPP"> Use SMBPP</label> &nbsp;&nbsp;&nbsp;

                                        <input type="checkbox" id="Applies" className="d-none" />
                                        <label htmlFor="Applies"> Applies To MM Claim Max</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>User Message</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <small>Message</small>
                                        <textarea className="form-control" rows="3"></textarea>
                                        <p className="input-hint">Message returned to the provider</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <small>Stop Date</small>
                                        <input type="date" className="form-control" name="" id="" />
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" id="one" className="d-none" />
                                        <label htmlFor="one"> Message sent only when transaction rejected</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mt-3">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Member Restriction</h5>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Valid Relationship</small>
                                        <select className="form-select">
                                            <option value="">Select</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <div className="form-group">
                                        <small>Gender Restrictions - (Not Covered)</small>
                                        <div className="row">
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <input type="checkbox" id="male" className="d-none" />
                                                    <label htmlFor="male"> Male</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <input type="checkbox" id="female" className="d-none" />
                                                    <label htmlFor="female"> Female</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mt-2">
                                                <div className="form-group">
                                                    <input type="checkbox" id="none" className="d-none" />
                                                    <label htmlFor="none"> None</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}
