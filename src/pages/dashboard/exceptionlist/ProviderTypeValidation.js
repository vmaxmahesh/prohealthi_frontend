import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ProviderTypeValidation() {
    const [providerTypeValidationList, setProviderTypeValidationList] = useState([]);
    const [providerTypeData, setProviderTypeData] = useState(false);
    
    const searchProviderTypeValid = (fdata) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
            fetch(process.env.REACT_APP_API_BASEURL + `/api/provider-type-validation/get?search=${fdata.target.value}`, requestOptions)
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

    const getProviderTypeValidation = (id) => {
        setProviderTypeData(id);
        
        // console.log(id);
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        // }
        //     fetch(process.env.REACT_APP_API_BASEURL + `/api/provider-type-validation/getFormData?${ new URLSearchParams(id).toString()}`, requestOptions)
        //         .then(async response => {
        //             const isJson = response.headers.get('content-type')?.includes('application/json');
        //             const data = isJson && await response.json();
        //             if (!response.ok) {
        //                 const error = (data && data.message) || response.status;
        //                 return Promise.reject(error);
        //             } else {
        //                 setProviderTypeValidationList(data.data);
        //                 toast.success(response.message, {
        //                     position: "top-right",
        //                     autoClose: 5000,
        //                     hideProgressBar: false,
        //                     closeOnClick: true,
        //                     pauseOnHover: true,
        //                     draggable: true,
        //                     progress: undefined,
        //                 });
        //             }

        //         })
        //         .catch(error => {
        //             console.error('There was an error!', error);
        //         });
    }
    useEffect(() => { }, [providerTypeData]);
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
                    <SearchProviderValidation searchProviderTypeValid={searchProviderTypeValid} />
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <div className="col-md-12">
                                <h5 className="mb-2">Provider Type Validation</h5>
                            </div>
                            <div className="row">
                                <ProviderValidationList listData={providerTypeValidationList} getProviderTypeValidation={getProviderTypeValidation} />

                                <ProviderTypeForm formData={providerTypeData} />
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
    const listArray = [];
    for (let i = 0; i < props.listData.length; i++) {
        listArray.push(<ProviderTypeRow providerRow={props.listData[i]} getProviderTypeValidation={props.getProviderTypeValidation} />);
    }
    return (
        <>

            <div className="col-md-4">
                <div style={{ height: '400px', overflowY: 'scroll' }}>
                    <table className="table  table-bordered" style={{ position: 'relative' }}>
                        <thead className='stickt-thead'>
                            <tr>
                                <th>Effective Date</th>
                                <th>Provider Type</th>
                                <th>Proc. Code List ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listArray}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}

function ProviderTypeRow(props) {
    return (
        <>
            <tr onClick={() => props.getProviderTypeValidation(props.providerRow)}
                className={(props.selected && props.providerRow.effective_date == props.selected.effective_date ? ' tblactiverow ' : '')}>
                <td>{props.providerRow.effective_date}</td>
                <td>{props.providerRow.provider_type}</td>
                <td>{props.providerRow.proc_code_list_id}</td>
            </tr>
        </>
    )
}

function ProviderTypeForm(props) {
    console.log(props.formData);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    useEffect(() => { reset(props.formData) }, [props.formData]);
    return (
        <>
            {/* <div className="card mt-3 mb-3 data" >
                    <div className="card-body"> */}
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
                            <input type="text" className="form-control" name="" id="" {...register('provider_type', { required: true })} />
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
                {/* </div>
                </div> */}
            </div>
        </>
    )
}