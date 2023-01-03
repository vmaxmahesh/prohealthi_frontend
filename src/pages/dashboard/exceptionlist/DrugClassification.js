import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Tab, Tabs } from 'react-bootstrap';

export default function DrugClassification()
{



    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();

    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');

    const [benifitsData, setBenifitData] = useState(false);
    const [adding, setAdding] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/drugcalss/search?search=${fdata.target.value}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/get/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                 console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setNdClass([]);
                    return Promise.reject(error);
                } else {
                    console 
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



    const AddForm = () => {
        setBenifitData(false);
        setAdding(true);

        

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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/accumulated/details/${ndcid}`, requestOptions)
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
                    setBenifitData(data.data);
                    // console.log(selctedNdc);
                    // scollToRef.current.scrollIntoView()
                    return;
                }


                if (response === '200') {

                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        if (benifitsData) {
            setAdding(false);

        } else {
            setAdding(true);
            setBenifitData(false);
        }

        document.title = 'Benefit Code | ProHealthi';

    }, [benifitsData, adding]);


    
    return(
        <>
        <div  className="row">
                    <div  className="col-md-6 mb-3">
                        <div  className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i  className="fas fa-angle-right"></i></li>
                                <li><a href="">Exception List</a></li>
                                <li><i  className="fas fa-angle-right"></i></li>
                                <li><a href="">Drug Classification</a></li>
                            </ul>
                        </div>
                    </div>
                    <div  className="col-md-6 mb-3">
                        <div  className="breadcrum ">
                            <ul>
                                <li  className="float-end m-0"><a href="">Page Hint <i  className="fa-solid fa-lightbulb"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>


            <SearchDrugClassification searchException={searchException} />



            <DrugClassificationList drugList={ndcData} drugClass={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />




            {/* <DrugClassificationList /> */}

        </>
    )
}

function SearchDrugClassification(props)
{
    const{register, handleSubmit, watch, formState : {errors}} = useForm();
    const[drugClassificationList, setdrugClassificationList] = useState('');
    const[drugClassificationClass, setdrugClassificationClass] = useState('');



    const searchException = (fdata) => {
        // alert(fdata);

        props.searchException(fdata);
    }


    const showSearchResult = (e) => {
        var arr = [
            {drug_classification_id : '5621', name : 'drug clssification one'},
            {drug_classification_id : '5372', name : 'drug clssification two'},
            {drug_classification_id : '8368', name : 'drug clssification three'}
        ];
        var class_arr = [
            {class : 'clas one', eff_date : '12/12/2022', progress_status : 'success/true', process_rule : 'rule 1'},
            {class : 'clas two', eff_date : '15/12/2022', progress_status : 'success/true', process_rule : 'rule 2'},
            {class : 'clas three', eff_date : '18/12/2022', progress_status : 'success/true', process_rule : 'rule 3'},
            {class : 'clas four', eff_date : '120/12/2022', progress_status : 'success/true', process_rule : 'rule 4'},
        ];
        setdrugClassificationList(arr);
        setdrugClassificationClass(class_arr);
    }
    useEffect(() => {}, [drugClassificationList, drugClassificationClass]);

    return(
        <>
        <form onSubmit={handleSubmit(showSearchResult)}>
        <div className="card mt-3 mb-3">
                <div className="card-body">                    
                        <div className="row mb-2">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>ID</small>
                                <input type="text" className="form-control" onKeyUp={(e) => searchException(e)} placeholder='Enter drug classification ID to search' {...register("drug_classification_id",{required:true})}/>
                                {errors.drug_classification_id && <span><p className='notvalid'>This field is required</p></span>}
                                </div>
                            </div>
                            
                        </div>
                    </div>
        </div>
        </form>
        </>
    )
}

function DrugClassificationList(props)
{





    const getNDCItem = (ndciemid) => {
        alert(ndciemid);
        props.getNDCItem(ndciemid);
    }

    const getNDCItemDetails = (ndciemid) => {
        props.getNDCItemDetails(ndciemid);
    }
    const drugArray = [];
    for(let i=0; i<props.drugList.length; i++)
    {
        drugArray.push(<DrugRow drugListRow={props.drugList[i]} getNDCItem={getNDCItem} />);
    }
    const drugClassArray = [];
    for (let j = 0; j < props.drugClass.length; j++) {
        drugClassArray.push(<DrugClassRow drugClassRow={props.drugClass[j]} />);
    }



    // const ndcListArray = [];
    // for (let i = 0; i < props.ndcListData.length; i++) {
    //     ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} selected={props.selctedNdc} />);
    // }

    // const ndcClassArray = [];
    // for (let j = 0; j < props.ndcClassData.length; j++) {
    //     ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]} getNDCItemDetails={getNDCItemDetails} selected={props.selctedNdc} />);
    // }


    return(
        <>
        <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8 mb-2">
                                <h5>Drug Classification</h5>
                            </div>
                            <div className="col-md-4 mb-3 text-end">
                                {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add GPI List</button> */}
                            </div>
                            <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {drugArray}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                            <div className="col-md-8">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                            
                                                <th>Class</th>
                                                <th>eff. Date</th>
                                                <th>New process status</th>
                                                <th>Process rule</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {drugClassArray}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                            
                        </div>
                    </div>
                </div>
                <DrugClassificationTabs />
                </>
    )
}

function DrugRow(props)
{
    return(
        <>
 <tr className={(props.selected && props.drugListRow.accum_bene_strategy_id == props.selected.accum_bene_strategy_id ? ' tblactiverow ' : '')}

onClick={() => props.getNDCItem(props.drugListRow.drug_catgy_exception_list)}
>            <td>{props.drugListRow.drug_catgy_exception_list}</td>
            <td>{props.drugListRow.drug_catgy_exception_name}</td>
        </tr>
        </>
    )
}

function DrugClassRow(props)
{
    return(
        <>
            <tr>
                <td>{props.drugClassRow.class}</td>
                <td>{props.drugClassRow.eff_date}</td>
                <td>{props.drugClassRow.progress_status}</td>
                <td>{props.drugClassRow.process_rule}</td>
                <td><button className="btn btn-sm btn-info" id=""><i className="fa fa-eye"></i> View</button></td>
            </tr>
        </>
    )
}

function DrugClassificationTabs()
{
    return(
        <>
        <Tabs defaultActiveKey="home">
            <Tab eventKey="home" title="Process Rules">
                <Process />
            </Tab>            
            <Tab eventKey="profile" title="Rx Limitations/Pricing">
                <RXLimitation />
            </Tab>
            <Tab eventKey="homeone" title="Validations/Override">
                <Validations />
            </Tab>
        </Tabs>
        </>
    )
}

function Process()
{
    return(
        <>
        <div className="tab-pane fade show active" id="Rules" role="tabpanel" aria-labelledby="nav-home-tab">
        <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className="mb-2">Information</h5>
                                            <div className="row mb-2">
                                                <div className="col-md-12">
                                                    <div className="form-group mb-2">
                                                        <small>ID</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="Enter ID" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Name</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="Name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>NDC</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Termination Date</small>
                                                        <input type="date" className="form-control" name="" id="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Effective Date</small>
                                                        <input type="date" className="form-control" name="" id="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h5 className="mb-1">Process Rules</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>New Drug Status</small>
                                                        <select className="form-select">
                                                            <option value="">Select</option>
                                                            <option value="">Approved</option>
                                                            <option value="">Non Fourmulary</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Rule</small>
                                                        <select className="form-select">
                                                            <option value="">Select</option>
                                                            <option value="">R - Reject if status indicator</option>
                                                            <option value="">L - Limitations are Exceeded</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-group">
                                                        <input type="checkbox" id="user" className="d-none" />
                                                        <label htmlFor="user">User will Exit will not be Invoked for this Section</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <h5 className="mb-1">Product Exception</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Preferred NDC</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Conversion NDC</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <h5 className="mb-1">User Message</h5>
                                        </div>

                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <small>Message</small>
                                                <textarea className="form-control" rows="3"></textarea>
                                                <p className="input-hint">Message Returned to the Provider</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <small>Stop Date</small>
                                                <input type="date" name="" id="" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mt-4 mb-4">
                                            <div className="form-group">
                                                <input type="checkbox" id="message" className="d-none" />
                                                <label htmlFor="message">Message sent only when Transation is Rejected</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 float-end">
                                <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                            </div>
                            </div>
        </>
    )
}

function RXLimitation()
{
    return(
        <>
        <div className="tab-pane fade show active" id="Rules" role="tabpanel" aria-labelledby="nav-home-tab">
        <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="row mb-2">
                                                <div className="col-md-12">
                                                    <h5 className="mb-2">Rx Limitations</h5>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="form-group">
                                                        <small>Rx Quantity</small>
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
                                                <div className="col-md-4">
                                                    <small>Rxs/Patient</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-8">
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
                                                <div className="col-md-4">
                                                    <small>Accum. Ben./Patient</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-8">
                                                    <div className="form-group">
                                                        <small>Day Supply</small>
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
                                                <div className="col-md-4">
                                                    <small>Retail Fills</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-8">
                                                    <div className="form-group">
                                                        <small>Ctl Days Supply</small>
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
                                                <div className="col-md-4">
                                                    <small>Quantity/Fill</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4">
                                                    <small>Days Fill</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                                <div className="col-md-4">
                                                    <small>Daily Dose</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                                <div className="col-md-4">
                                                    <small>Starter Dose Days</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-8">
                                                    <small>Days Until. Covg Effective</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                                <div className="col-md-4">
                                                    <small>Star Dose Bypass Days</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-8">
                                                    <small>Acute Dosing Days</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                                <div className="col-md-4">
                                                    <small>Star Dose Maint. by Days</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>

                                            </div>

                                            <div className="row mb-2">
                                                <div className="col-md-8">
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
                                                <div className="col-md-4">
                                                    <small>Maint. Daily Dose</small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>

                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-8 mb-2">
                                                    <div className="form-group mt-4">
                                                        <input type="checkbox" id="Return2" className="d-none" />
                                                        <label htmlFor="Return2">Merge Plan Rx Limitation</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <small>Quantity Over Time </small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                                <div className="col-md-8 mb-2">
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <small>Days Over Time </small>
                                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <h5 className="mb-2">Mail Service Limitation</h5>
                                            <div className="row mb-2">
                                                <div className="col-md-12 mb-2">
                                                    <div className="form-group">
                                                        <small>Daily Supply</small>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <input type="text" className="form-control" placeholder="" name="" id="" />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <input type="text" className="form-control" placeholder="" name="" id="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-2">
                                                    <div className="form-group">
                                                        <small>Mail Service Fills</small>
                                                        <input type="text" className="form-control" name="" id="" />
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 className="mb-2">Member Rigistration</h5>

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

                                            <h5 className="mb-2">Pricing Overrides</h5>
                                            <div className="col-md-12 mb-2">
                                                <div className="form-group">
                                                    <small>Alt Price Schedule</small>
                                                    <input type="text" className="form-control" name="" id="" />
                                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-2">
                                                <div className="form-group">
                                                    <small>Alt Copay Schedule</small>
                                                    <input type="text" className="form-control" name="" id="" />
                                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-2">
                                                <div className="form-group">
                                                    <small>Brand Copay Amount</small>
                                                    <input type="text" className="form-control" name="" id="" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-2">
                                                <div className="form-group">
                                                    <small>Generic Copay Amount</small>
                                                    <input type="text" className="form-control" name="" id="" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-2">
                                                <div className="form-group">
                                                    <small>Max Allowable Amount</small>
                                                    <input type="text" className="form-control" name="" id="" />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 float-end">
                                <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                            </div>
        </div>
        </>
    )
}

function Validations()
{
    return(
        <>
         <div  className="tab-pane fade show active" id="Override" role="tabpanel" aria-labelledby="nav-contact-tab">
        <div  className="card mt-3 mb-3">
                                <div  className="card-body">
                                    <div  className="row">
                                        <div  className="col-md-12">
                                            <h5  className="mb-2">Validations</h5>
                                        </div>
                                        <div  className="col-md-3 mb-2">
                                            <small>Provider</small>
                                            <div  className="form-group">
                                                <input type="text"  className="form-control" name="" id="" required="" />
                                                <a href=""><span  className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div  className="col-md-3 mb-2">
                                            <small>Prescriber</small>
                                            <div  className="form-group">
                                                <input type="text"  className="form-control" name="" id="" required="" />
                                                <a href=""><span  className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div  className="col-md-3 mb-2">
                                            <small>Specilty</small>
                                            <div  className="form-group">
                                                <input type="text"  className="form-control" name="" id="" required="" />
                                                <a href=""><span  className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div  className="col-md-3 mb-2">
                                            <small>Diagnosis</small>
                                            <div  className="form-group">
                                                <input type="text"  className="form-control" name="" id="" required="" />
                                                <a href=""><span  className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div  className="clearfix mb-2"></div>
                                        

                                        <div  className="col-md-12 mb-1">
                                            <h5  className="mb-2">Processing Overrides</h5>
                                        </div>
                                        <div  className="col-md-4 mb-2">
                                            <small>Generic Indicator</small>
                                            <select  className="form-select">
                                                <option value="">Select</option>
                                                <option value=""></option>
                                                <option value=""></option>
                                            </select>
                                        </div>
                                        <div  className="col-md-4 mb-2">
                                            <small>Denial Override Code</small>
                                            <input type="text"  className="form-control" name="" id="" />
                                        </div>
                                        <div  className="col-md-4 mb-2">
                                            <small>Denial Override Code</small>
                                            <input type="text"  className="form-control" name="" id="" placeholder="Not Allowed" readOnly/>
                                        </div>

                                        <div  className="clearfix mb-2"></div>

                                        <div  className="col-md-12 mb-1">
                                            <h5  className="mb-2">Include/Exclude</h5>
                                        </div>
                                        <div  className="col-md-6 mb-3">
                                            <div  className="form-group">
                                                <input type="checkbox" id="one"  className="d-none" />
                                                <label htmlFor="one">Exclude Single Source Brand Drugs</label>
                                            </div>
                                        </div>
                                        <div  className="col-md-6 mb-3">
                                            <div  className="form-group">
                                                <input type="checkbox" id="two"  className="d-none" />
                                                <label htmlFor="two">Exclude Multi-Source Brand Drugs</label>
                                            </div>
                                        </div>
                                        <div  className="col-md-6 mb-3">
                                            <div  className="form-group">
                                                <input type="checkbox" id="three"  className="d-none" />
                                                <label htmlFor="three">Exclued Original with Generic Drugs</label>
                                            </div>
                                        </div>
                                        <div  className="col-md-6 mb-3">
                                            <div  className="form-group">
                                                <input type="checkbox" id="four"  className="d-none" />
                                                <label htmlFor="four">Exclued Generic Drugs</label>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div  className="col-md-1 float-end">
                                <a href=""  className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                            </div>
                        </div>
                        </>
    )
}