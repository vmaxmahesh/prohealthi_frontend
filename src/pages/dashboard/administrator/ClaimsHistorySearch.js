import React, { useEffect } from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../loader/loader';

function ClaimsHistorySearch() {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Membership Data</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Zip Codes</a></li>
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
            <div>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <Link to="general-history" className={'nav-link' + (currentpath == 'general-history' ? ' active' : '')}>General</Link>
                    <Link to="optional-history" className={'nav-link' + (currentpath == 'optional-history' ? ' active' : '')}>Optional Criteria</Link>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <div className='card'>
                        <div className='card-body'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    {/* <General />
                    <Optional /> */}
                    {/* <GeneralTable /> */}
                </div>
            </div>

        </>
    );
}

export function General(props) {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [generalTableList, setGeneralTabelList] = useState(false);
    const [loading, setloading] = useState(false);

    const searchSubmit = (searchFormData) => {
        setloading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(searchFormData)
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/claim-history/search`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setGeneralTabelList(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setloading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => { }, [generalTableList]);
    return (
        <>
            <div className="col-md-12 mb-2">
                <h5>Criteria</h5>
            </div>
            <form onSubmit={handleSubmit(searchSubmit)} id="GeneralForm">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Cardholder ID</small>
                            <input type="text" className="form-control" {...register("cardholder_id")} />
                        </div>
                    </div>
                    <div className="col-md-2 mb-3">
                        <div className="form-group">
                            <small>Person Code</small>
                            <input type="text" className="form-control" {...register("person_code")} />
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Provider ID</small>
                            <input type="text" className="form-control" {...register("provider_id")} />
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Pin</small>
                            <input type="text" className="form-control" {...register("patient_pin_number")} />
                        </div>
                    </div>
                </div>


                <div className="row mb-3">
                    <div className="col-md-12 mb-2">
                        <h5>Date Range</h5>
                    </div>
                    <div className="col-md-6 mb-2">
                        <input type="radio" value="date_filled" {...register("date_type")} /> Date of Service from
                        <input type="date" name="" className="form-control" {...register("from_date")} />
                    </div>
                    <div className="col-md-6 mb-2">
                        <input type="radio" value="date_submitted" {...register("date_type")} /> Date of Submitted to
                        <input type="date" name="" className="form-control" {...register("to_date")} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-8 mb-2">
                        <h5>View Laminators</h5>

                        <div className="col-md-12 mb-3">
                            <div className="row mb-2">
                                <div className="col-md-3 mb-2 mt-2">
                                    <input type="radio" value="" /> Paid Claims
                                </div>
                                <div className="col-md-3 mb-2 mt-2">
                                    <input type="radio" value="" /> Reversed Claims
                                </div>
                                <div className="col-md-3 mb-2 mt-2">
                                    <input type="radio" value="" /> Rejected Claims
                                </div>
                                <div className="col-md-3 mb-2 mt-2">
                                    <input type="radio" value="" /> All Claims
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <p>Sort by</p>
                            <select className="form-select">
                                <option value="">Select</option>
                                <option value="1">Date submitted(decending), time submitted(decending)</option>
                                <option value="2">Provider ID, RX number, Date of service(decending order)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                    <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                    <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                    <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                    <button type='submit' className="btn btn-info">Search</button>
                </div>
            </form>
            <GeneralTable generalTableList={generalTableList} loading={loading}/>
        </>
    );
}

function GeneralTable(props) {

    const genListArray = [];
    for (let i = 0; i < props.generalTableList.length; i++) {
        genListArray.push(<GenRow genRowData={props.generalTableList[i]} />);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2"></h5>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ height: "700px", overflowY: "scroll" }}>
                                <table className="table  table-bordered">
                                    <thead className='stickt-thead'>
                                        <tr>
                                            <th>Date of SVC</th>
                                            <th>Provider ID</th>
                                            <th>Claim Ref#</th>
                                            <th>RX#</th>
                                            <th>New Refil</th>
                                            <th>Procedure Code</th>
                                            <th>Label Name/ Procedure Description</th>
                                            <th>Cardholder ID</th>
                                            <th>Person Code</th>
                                            <th>Total $</th>
                                            <th>Status</th>
                                            <th>Bin #</th>
                                            <th>Plan ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.loading ? <LoadingSpinner /> : genListArray}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function GenRow(props) {
    return (
        <>
            <tr>
                <td>{props.genRowData.date_filled}</td>
                <td>(column not found in DB!!!)</td>
                <td>{props.genRowData.claim_reference_number}</td>
                <td>{props.genRowData.rx_number}</td>
                <td>{props.genRowData.new_refill}</td>
                <td>{props.genRowData.procedure_code}</td>
                <td>(column not found in DB!!!)</td>
                <td>{props.genRowData.cardholder_id}</td>
                <td>{props.genRowData.person_code}</td>
                <td>{props.genRowData.total_amount_paid}</td>
                <td>{props.genRowData.transaction_status}</td>
                <td>{props.genRowData.bin_number}</td>
                <td>{props.genRowData.plan_id}</td>
            </tr>
        </>
    )
}


export function Optional(props) {
    const { register, control, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [ndcInput, setNdcInput] = useState('');
    const [gpiInput, setGpiInput] = useState('');
    const [procedureCode, setProcedureCode] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [clientId, setClientId] = useState('');
    const [clinetGroup, setClientGroup] = useState('');
    const [optionalTableList, setOptionalTableList] = useState('');
    const [loading, setloading] = useState(false);


    const handleNDCInputChange = (ndcInput) => {
        setNdcInput(ndcInput);
    }

    const loadNDCOptions = (ndcInput) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/claim-history/get-ndcdrops?search=${ndcInput}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ ndc }) => ({
                            ndcvalue: ndc,
                            ndclabel: ndc
                        }))
                        // data.map(({ id, name }) => ({
                        //     ndcvalue: id,
                        //     ndclabel: name
                        // }))
                    )
                })
        })
    }

    const handleGPInputChange = (gpiInput) => {
        setGpiInput(gpiInput);
    }

    const loadGPIOptions = (gpiInput) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/claim-history/get-gpidrops?search=${gpiInput}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ gpi_exception_list }) => ({
                            gpivalue: gpi_exception_list,
                            gpilabel: gpi_exception_list
                        }))
                    )
                })
        })
    }

    const handleProcedureCodeInputChange = (proCodeInput) => {
        setProcedureCode(procedureCode);
    }

    const loadProcedureCodeOptions = (procCodeInput) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/claim-history/get-proceduer-code?search=${procCodeInput}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ procedure_code }) => ({
                            procvalue: procedure_code,
                            proclabel: procedure_code
                        }))
                    )
                })
        })
    }

    const handleCustomerIdIputChange = (custIn) => {
        setCustomerId(custIn);
    }

    const loadCustomerIdOptions = (custInput) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/claim-history/get-customer-id?search=${custInput}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ customer_id, customer_name }) => ({
                            custvalue: customer_id,
                            custlabel: customer_name
                        }))
                    )
                })
        })
    }

    const handleClientIdIputChange = (cltIn) => {
        setClientId(cltIn);
    }

    const loadClientIdOptions = (clientId) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/claim-history/get-client-id?search=${clientId}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ client_id }) => ({
                            clientvalue: client_id,
                            clientlabel: client_id
                        }))
                    )
                })
        })
    }

    const handleClientGroupIputChange = (cltGroupIn) => {
        setClientGroup(cltGroupIn);
    }

    const loadClientGroupOptions = (clientGroup) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/claim-history/get-client-group?search=${clientGroup}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ client_group_id }) => ({
                            client_groupvalue: client_group_id,
                            client_grouplabel: client_group_id
                        }))
                    )
                })
        })
    }

    const optionFormSubmit = (optionFormData) => {
        setloading(true);
        const requestOptions = {
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(optionFormData)
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/claim-history/search-optional-data`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setOptionalTableList(data.data);   
                setloading(false);
            })
    }

    useEffect(() => { }, [ndcInput, gpiInput, procedureCode, customerId, clinetGroup, clientId, optionalTableList]);
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h5>Optional Creteria</h5>
                </div>
                <form onSubmit={handleSubmit(optionFormSubmit)} id="OptinalForm">
                    <div className="row mb-3">
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Rx Number</small>
                                <input type="text" {...register("rx_number")} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Claim Ref No.</small>
                                <input type="text" {...register("claim_reference_number")} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>NDC</small>
                                <Controller name="ndc"
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            {...field}
                                            cacheOptions
                                            defaultOptions
                                            // value={selectedValue}
                                            getOptionLabel={e => e.ndclabel}
                                            getOptionValue={e => e.ndcvalue}
                                            loadOptions={loadNDCOptions}
                                            onInputChange={handleNDCInputChange}
                                            // onChange={handleChange}
                                            placeholder="Select NDC"
                                        />
                                    )} />
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <small>GPI</small>
                                <Controller name="gpi"
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            {...field}
                                            cacheOptions
                                            defaultOptions
                                            // value={selectedValue}
                                            getOptionLabel={e => e.gpilabel}
                                            getOptionValue={e => e.gpivalue}
                                            loadOptions={loadGPIOptions}
                                            onInputChange={handleGPInputChange}
                                            // onChange={handleChange}
                                            placeholder="Select GPI"

                                        />
                                    )} />
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <small>Procedure Code</small>
                                <Controller name="procedure_code"
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            {...field}
                                            cacheOptions
                                            defaultOptions
                                            // value={selectedValue}
                                            getOptionLabel={e => e.procvalue}
                                            getOptionValue={e => e.proclabel}
                                            loadOptions={loadProcedureCodeOptions}
                                            onInputChange={handleProcedureCodeInputChange}
                                            // onChange={handleChange}
                                            placeholder="Select Procedure Code"

                                        />
                                    )} />
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <h5>Customer / Client / Group</h5>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Customer ID</small>
                                <Controller name="customer_id"
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            {...field}
                                            cacheOptions
                                            defaultOptions
                                            // value={selectedValue}
                                            getOptionLabel={e => e.custvalue}
                                            getOptionValue={e => e.custlabel}
                                            loadOptions={loadCustomerIdOptions}
                                            onInputChange={handleCustomerIdIputChange}
                                            // onChange={handleChange}
                                            placeholder="Select Customer ID"

                                        />
                                    )} />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Client ID</small>
                                <Controller name="client_id"
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            {...field}
                                            cacheOptions
                                            defaultOptions
                                            // value={selectedValue}
                                            getOptionLabel={e => e.clientvalue}
                                            getOptionValue={e => e.clientlabel}
                                            loadOptions={loadClientIdOptions}
                                            onInputChange={handleClientIdIputChange}
                                            // onChange={handleChange}
                                            placeholder="Select Client ID"

                                        />
                                    )} />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Group ID</small>
                                <Controller name="client_group"
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            {...field}
                                            cacheOptions
                                            defaultOptions
                                            // value={selectedValue}
                                            getOptionLabel={e => e.client_groupvalue}
                                            getOptionValue={e => e.client_grouplabel}
                                            loadOptions={loadClientGroupOptions}
                                            onInputChange={handleClientGroupIputChange}
                                            // onChange={handleChange}
                                            placeholder="Select Client Group"
                                        />
                                    )} />
                            </div>
                        </div>
                        <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                            <a  className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                            <a  className="btn btn-danger">Select</a>&nbsp;&nbsp;
                            <a  className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                            <button type='submit' className="btn btn-info">Search</button>
                        </div>
                    </div>
                </form>
            </div>

            <OptionalTable optionalTableList={optionalTableList} loading={loading}/>
        </>
    );
}


function OptionalTable(props) {

    const optionalListArray = [];
    for (let i = 0; i < props.optionalTableList.length; i++) {
        optionalListArray.push(<OptionalRow optionalRowData={props.optionalTableList[i]} />);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2"></h5>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ height: "700px", overflowY: "scroll" }}>
                                <table className="table  table-bordered">
                                    <thead className='stickt-thead'>
                                        <tr>
                                            <th>Date of SVC</th>
                                            <th>Provider ID</th>
                                            <th>Claim Ref#</th>
                                            <th>RX#</th>
                                            <th>New Refil</th>
                                            <th>Procedure Code</th>
                                            <th>Label Name/ Procedure Description</th>
                                            <th>Cardholder ID</th>
                                            <th>Person Code</th>
                                            <th>Total $</th>
                                            <th>Status</th>
                                            <th>Bin #</th>
                                            <th>Plan ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.loading ? <LoadingSpinner /> : optionalListArray}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function OptionalRow(props) {
    return (
        <>
            <tr>
                <td>{props.optionalRowData.date_filled}</td>
                <td>(column not found in DB!!!)</td>
                <td>{props.optionalRowData.claim_reference_number}</td>
                <td>{props.optionalRowData.rx_number}</td>
                <td>{props.optionalRowData.new_refill}</td>
                <td>{props.optionalRowData.procedure_code}</td>
                <td>(column not found in DB!!!)</td>
                <td>{props.optionalRowData.cardholder_id}</td>
                <td>{props.optionalRowData.person_code}</td>
                <td>{props.optionalRowData.total_amount_paid}</td>
                <td>{props.optionalRowData.transaction_status}</td>
                <td>{props.optionalRowData.bin_number}</td>
                <td>{props.optionalRowData.plan_id}</td>
            </tr>
        </>
    )
}

export default ClaimsHistorySearch;