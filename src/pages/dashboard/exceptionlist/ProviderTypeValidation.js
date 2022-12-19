import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ProviderTypeValidation() {
    const [providerTypeValidationList, setProviderTypeValidationList] = useState([]);
    const [providerTypeData, setProviderTypeData] = useState(false);
    const [selctedNdc, setSelctedNdc] = useState('');
    const [ndcClass, setNdClass] = useState([]);
    const [ndcData, setNdcData] = useState([]);

    const [benifitsData, setBenifitData] = useState(false);



    const [adding, setAdding] = useState();


    const AddForm = () => {
        setBenifitData(false);
        setAdding(true);

        

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




    const searchProviderTypeValid = (fdata) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
            fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/provider-type-validation/get?search=${fdata.target.value}`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        setProviderTypeValidationList(data.data);
                        toast.success(response.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

       
    }
    useEffect(() => { }, [providerTypeValidationList]);

    const getNDCItems = (ndcid) => {
        var test = {};
        test.ndc_exception_list = ndcid;
        setSelctedNdc(test);

        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/provider-type-validation/getList/${ndcid}`, requestOptions)
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

    const getNDCItemDetails = (ndcid,ndcid2) => {
        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/provider-type-validation/getDetails/${ndcid}/${ndcid2}`, requestOptions)
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

                    scollToRef.current.scrollIntoView()
                    return;
                }

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => { }, [selctedNdc]);
    return (
        <>
            <div className="dashboard-content clearfix">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Exception List</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Provider Type Validation</a></li>
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


                    <div className="col-md-3 ms-auto text-end">
                    <button className="btn  btn-info btn-sm" onClick={e => AddForm()}>
                    Accumulated Benefit Strategy <i className="fa fa-plus-circle"></i></button>
            </div>


                    <SearchProviderValidation searchProviderTypeValid={searchProviderTypeValid} />
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <div className="col-md-12">
                                <h5 className="mb-2">Provider Type Validation</h5>
                            </div>
                            <div className="row">
                                <ProviderValidationList  ndcListData={ndcData} listData={providerTypeValidationList}  ndcClassData={ndcClass} getNDCItem={getNDCItems}   getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc}  />

                                <ProviderTypeForm    selected={benifitsData}   adding={adding}   />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function SearchProviderValidation(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Provider Type Validation </small>
                                <input type="text" className="form-control" name="search_provider" onKeyUp={(e) => props.searchProviderTypeValid(e)} placeholder='Start typing ID/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProviderValidationList(props) {



   

    
    const getNDCItem = (ndciemid) => {
        props.getNDCItem(ndciemid);
    }

    const getNDCItemDetails = (ndciemid,ndciemid2) => {
        props.getNDCItemDetails(ndciemid,ndciemid2);
    }

    const listArray = [];
    for (let i = 0; i < props.listData.length; i++) {
        listArray.push(<ProviderTypeRow providerRow={props.listData[i]}   getNDCItem={getNDCItem} getProviderTypeValidation={props.getProviderTypeValidation} />);
    }

         

    const ndcClassArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]}  getNDCItemDetails={getNDCItemDetails}  selected={props.selctedNdc} />);
    }

    return (
        <>

                        

                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                                         {listArray}
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
                                                    <th>Provider type</th>
                                                    <th>Process Code List</th>
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

          


        </>
    )
}





function ProviderTypeRow(props) {
    return (
        <>
            <tr onClick={() => props.getNDCItem(props.providerRow.prov_type_list_id)}
                className={(props.selected && props.providerRow.prov_type_list_id == props.selected.prov_type_list_id ? ' tblactiverow ' : '')}>
                <td>{props.providerRow.prov_type_list_id}</td>
                <td>{props.providerRow.description}</td>
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
                className={(props.selected && props.ndcClassRow.proc_code_list_id == props.selected.proc_code_list_id ? ' tblactiverow ' : '')}
                onClick={() => props.getNDCItemDetails(props.ndcClassRow.proc_code_list_id,props.ndcClassRow.provider_type)}

            >
                <td>{props.ndcClassRow.effective_date}</td>
                <td>{props.ndcClassRow.provider_type}</td>
                <td>{props.ndcClassRow.proc_code_list_id}</td>
             
            </tr>
        </>
    )
}

function ProviderTypeForm(props) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();



    useEffect(() => {


        if (props.adding) {
            reset({ prov_type_list_id: '', description: '', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ prov_type_list_id: '',description: '',pharm_type_variation_ind:'',network_part_variation_ind:'',claim_type_variation_ind:'',plan_accum_deduct_id:'', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);

    useEffect(() => { reset(props.selected) }, [props.selected]);


    const addCode = (data) => {
        // console.log(selctedNdc);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
    
        };
        // console.log(watch(data)); 
        if (process.env.REACT_APP_API_BASEURL == 'NOT') {
            toast.success('Added Successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
    
            });
        } else {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/provider-type-validation/add`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    // console.log(response);
    
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        // reset(selctedNdc);
                        // setSelctedNdc([]);
                        console.log(data);
                        var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                        toast.success(msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
    
                        });
                    }
    
    
                    if (response === '200') {
                        setSelctedNdc([]);
                    }
    
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    
    }
    const onSubmit = (e) => {
        e.preventDefault();
    }

       return (
        <>

<form onSubmit={handleSubmit(addCode)}>

        <div className="card mt-3 mb-3 data" >
                    <div className="card-body"> 
            <div className="col-md-8">
                <div className="row mb-2">
                    <div className="col-md-12 mb-2">
                        <h5>Provider Type Validation</h5>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <small>List ID</small>
                            <input type="text" className="form-control" name="" id=""  {...register('prov_type_list_id', { required: true })} />
                            {errors.prov_type_list_id && <span><p className='notvalid'>This field is required</p></span>}
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <small>Description</small>
                            <input type="text" className="form-control" name="description" id="" {...register('description', { required: true })} />
                        </div>
                    </div>
                    <div className="col-md-12 mb-2">
                        <h5>Codes</h5>
                    </div>
                    <div className="col-md-3 mb-2">
                        <div className="form-group">
                            <small>Provider Type</small>
                            <input type="text" className="form-control" name="" id="" {...register('provider_type', { required: true })} />
                            <a href=""><span className="fa fa-search form-icon"></span></a>
                        </div>
                    </div>
                    <div className="col-md-3 mb-2">
                        <div className="form-group">
                            <small>Proc. Data List ID</small>
                            <input type="text" className="form-control" name="" id="" {...register('proc_code_list_id', { required: true })} />
                            <a href=""><span className="fa fa-search form-icon"></span></a>
                        </div>
                    </div>

                    <div className="col-md-3 mb-2">
                        <div className="form-group">
                            <small>Effective Date</small>
                            <input type="date" className="form-control" name="" id="" {...register('effective_date', { required: true })} />
                        </div>
                    </div>

                    <div className="col-md-3 mb-2">
                        <div className="form-group">
                            <small>Termination Date</small>
                            <input type="date" className="form-control" name="" id="" {...register('termination_date', { required: true })} />
                        </div>
                    </div>
                </div>
                </div>
                </div> 
            </div>
            {console.log(props.adding)}

            <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>

        </form>
           
        </>
    )
}