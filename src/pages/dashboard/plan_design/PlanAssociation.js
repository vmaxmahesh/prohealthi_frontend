import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';

export default function PlanAssociation() {
    const scollToRef = useRef();
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();

    const [planList, setPlanList] = useState([]);
    const [planForm, setPlanForm] = useState(false);
    const [adding, setAdding] = useState(false);


    const clearForm = () => {
        setAdding(true);
        setPlanForm(false);
        reset();
    }

    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setPlanList(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getFormData = (plan_data) => {
        setPlanForm(plan_data);
        scollToRef.current.scrollIntoView()
    }

    useEffect(() => { }, [planList, planForm]);
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Plan Design</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Plan Association</a></li>
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
            <SearchPlanAssociation onSearch={onSearch} />
            <PlanAssociationList planList={planList} getFormData={getFormData} planForm={planForm} />
            <div ref={scollToRef}>
                <PlanAssociationForm planForm={planForm} clearForm={clearForm} />
            </div>
        </>
    )
}

function SearchPlanAssociation(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Plan Association </small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing bin number/ process control number/ group/ plan ID to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PlanAssociationList(props) {
    const listArray = [];
    for (let i = 0; i < props.planList.length; i++) {
        listArray.push(<PlanRow planRow={props.planList[i]} getFormData={props.getFormData} planForm={props.planForm} />);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Plan Association List</h5>
                        </div>
                        {/* <div className="col-md-4 mb-3 text-end"> */}
                        {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        {/* </div> */}

                        <div className="col-md-12">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Bin No.</th>
                                                    <th>Process Control No.</th>
                                                    <th>Group</th>
                                                    <th>Plan ID</th>
                                                    <th>Bin Suffix</th>
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
                    </div>
                </div>
            </div>
        </>
    )
}

function PlanRow(props) {
    return (
        <>
            <tr onClick={e => props.getFormData(props.planRow)}
                className={props.planForm && props.planRow.bin_number == props.planForm.bin_number ? 'tblactiverow' : ''}>
                <td>{props.planRow.bin_number}</td>
                <td>{props.planRow.process_control_number}</td>
                <td>{props.planRow.group_number}</td>
                <td>{props.planRow.plan_id}</td>
                <td>{props.planRow.pin_number_suffix}</td>
            </tr>
        </>
    )
}

function PlanAssociationForm(props) {
    const { register, handleSubmit, watch, reset, control, formState: { errors } } = useForm();
    const [pharmacyChainInput, setPharmacyChainInput] = useState('');
    const [formId, setFormId] = useState('');
    const [memProcFlag, setMemProcFlag] = useState('');
    const [customer, setCustomer] = useState('');
    const [client, setClient] = useState('');
    const [clientGroup, setClientGroup] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionAssociation, setTransactionAssociation] = useState('');
    const [memProcFlagSelected, setMemProcFlagSelected] = useState('');

    const handlePharmacyChainInput = (pharm_input) => {
        setPharmacyChainInput(pharm_input);
    }

    const loadPharmacyChailOptions = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-pharmacy-chain?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ pharmacy_chain }) => ({
                            pharm_value: pharmacy_chain,
                            pharm_label: pharmacy_chain
                        }))
                    )
                })
        })
    }

    const loadFormIdOptions = (form_input) => {
        setFormId(form_input);
    }

    const handleFormIdInput = (formId) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-form-id?search=${formId}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ pharmacy_chain }) => ({
                            form_id_value: pharmacy_chain,
                            form_id_label: pharmacy_chain
                        }))
                    )
                })
        })
    }

    const handleMemProcFlagInput = (mem_proc_flag) => {
        setMemProcFlag(mem_proc_flag);
    }

    const loadMemProcFlagOptions = (memProcFlag) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-membership-process-flag?search=${memProcFlag}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ membership_processing_flag, label }) => ({
                            form_id_value: membership_processing_flag,
                            form_id_label: label
                        }))
                    )
                })
                setMemProcFlagSelected("1");
                console.log(memProcFlag,"63");
                
        })
    }

    const submitPlanAssociation = (planAssociationData) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(planAssociationData)
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/submit-form`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    toast.success(data.message, {
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
    }

    const handleCustomerInput = (cust_input) => {
        setCustomer(cust_input);
    }

    const loadCustomerOptions = (customer) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-customer?search=${customer}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ customer_id, customer_name }) => ({
                            cust_value: customer_id,
                            cust_label: customer_name
                        }))
                    )
                })
        })
    }

    const handleTransactionTypeInput = (trans_input) => {
        setTransactionType(trans_input);
    }

    const loadTransactionTypeOptions = (transactionType) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-transaction-type?search=${transactionType}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ trans_type_value, trans_type_label }) => ({
                            tt_value: trans_type_value,
                            tt_label: trans_type_label
                        }))
                    )
                })
        })
    }

    const handleTransactionAssociationInput = (trans_ass_input) => {
        setTransactionAssociation(trans_ass_input);
    }

    const loadTransactionAssociationOptions = (transactionAssociation) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-transaction-association?search=${transactionAssociation}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ trans_ass_value, trans_ass_label }) => ({
                            ta_value: trans_ass_value,
                            ta_label: trans_ass_label
                        }))
                    )
                })
        })
    }

    const handleClientInput = (client_input) => {
        setClient(client_input);
    }

    const loadClientOptions = (client) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-client?search=${client}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ client_id, client_name }) => ({
                            client_value: client_id,
                            client_label: client_name
                        }))
                    )
                })
        })
    }

    const handleClientGroupInput = (client_group_input) => {
        setClientGroup(client_group_input);
    }

    const loadClientGroupOptions = (clientGroup) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-client-group?search=${clientGroup}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ client_group_id, group_name }) => ({
                            client_group_value: client_group_id,
                            client_group_label: group_name
                        }))
                    )
                })
        })
    }

    const handleMemProcFlagChange = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        if (!props.adding) {
            reset({
                bin_number: '', process_control_number: '', group_number: '', pharmacy_chain: '', plan_id: '', form_id: '',
                membership_processing_flag: '', pin_number_suffix: '', transaction_type: '', customer_id: '', client_id: '',
                client_group_id: '', new: 1
            },
                { keepValues: false });
        }
        reset(props.planForm)
    }, [props.planForm, pharmacyChainInput, formId, memProcFlag, customer, client, clientGroup,
         transactionType, transactionAssociation, memProcFlagSelected]);
    return (
        <>
            <form onSubmit={handleSubmit(submitPlanAssociation)}>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{props.adding ? "Add" : "Update"} Plan Association</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Bin Number</small>
                                            <input type="text" className="form-control" {...register("bin_number", { required: true })}
                                                disabled={props.planForm ? true : false} />
                                            {errors.bin_number && <span><p className='notvalid'>This field is required!</p></span>}
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Process Control Number</small>
                                            <input type="text" className="form-control" {...register("process_control_number", { required: true })}
                                                disabled={props.planForm ? true : false} />
                                            {errors.process_control_number && <span><p className='notvalid'>This field is required!</p></span>}
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Group Number</small>
                                            <input type="text" className="form-control" {...register("group_number", { required: true })}
                                                disabled={props.planForm ? true : false} />
                                            {errors.group_number && <span><p className='notvalid'>This field is required!</p></span>}
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Pharmacy Chain</small>
                                            {/* <input type="text" className="form-control" {...register("pharmacy_chain")} />
                                            <a href=""><span className="fa fa-search form-icon"></span></a> */}
                                            <Controller name="pharmacy_chain"
                                                control={control}
                                                render={({ field }) => (
                                                    <AsyncSelect
                                                        {...field}
                                                        cacheOptions
                                                        defaultOptions
                                                        // value={selectedValue}
                                                        getOptionLabel={e => e.pharm_label}
                                                        getOptionValue={e => e.pharm_value}
                                                        loadOptions={loadPharmacyChailOptions}
                                                        onInputChange={handlePharmacyChainInput}
                                                        // onChange={handleChange}
                                                        placeholder="Select Pharmacy Chain"
                                                    />
                                                )} />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Plan ID</small>
                                            <input type="text" className="form-control" {...register("plan_id")} />
                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Mail Plan Server ID</small>
                                            {/* <input type="text" className="form-control" {...register("form_id")} />
                                            <a href=""><span className="fa fa-search form-icon"></span></a> */}

                                            <Controller name="form_id"
                                                control={control}
                                                render={({ field }) => (
                                                    <AsyncSelect
                                                        {...field}
                                                        cacheOptions
                                                        defaultOptions
                                                        // value={selectedValue}
                                                        getOptionLabel={e => e.form_id_label}
                                                        getOptionValue={e => e.form_id_value}
                                                        loadOptions={loadFormIdOptions}
                                                        onInputChange={handleFormIdInput}
                                                        // onChange={handleChange}
                                                        placeholder="Select Mail Plan Server ID
                                                        "
                                                    />
                                                )} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small className="required">Membership Proc Flag</small>
                                            <Controller name="membership_processing_flag" value="0"
                                                control={control}
                                                render={({ field }) => (
                                                    <AsyncSelect
                                                        {...field}
                                                        cacheOptions
                                                        defaultOptions
                                                        // value={memProcFlag}
                                                        value={{ form_id_label: props.planForm.membership_processing_flag, form_id_value: props.planForm.membership_processing_flag }}
                                                        getOptionLabel={e => e.form_id_label}
                                                        getOptionValue={e => e.form_id_value}
                                                        loadOptions={loadMemProcFlagOptions}
                                                        onInputChange={handleMemProcFlagInput}
                                                        // onChange={handleMemProcFlagChange}
                                                        placeholder="Select Membership Proc Flag"
                                                    />
                                                )} />
                                            {/* <p className="input-hint">Required</p> */}
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Pin Suffix</small>
                                            <input type="text" className="form-control" {...register("pin_number_suffix")} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small className="required">Transaction Type</small>
                                            <Controller name="transaction_type"
                                                control={control}
                                                render={({ field }) => (
                                                    <AsyncSelect
                                                        {...field}
                                                        cacheOptions
                                                        defaultOptions
                                                        // value={selectedValue}
                                                        value={{ tt_label: props.planForm.transaction_type, tt_value: props.planForm.transaction_type }}
                                                        getOptionLabel={e => e.tt_label}
                                                        getOptionValue={e => e.tt_value}
                                                        loadOptions={loadTransactionTypeOptions}
                                                        onInputChange={handleTransactionTypeInput}
                                                        // onChange={handleChange}
                                                        search={true}
                                                        placeholder="Select Transaction Type"

                                                    />
                                                )} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small className="required">Transaction Association</small>
                                            <Controller name="use_default_ccg"
                                                control={control}
                                                render={({ field }) => (
                                                    <AsyncSelect
                                                        {...field}
                                                        cacheOptions
                                                        defaultOptions
                                                        // value={selectedValue}
                                                        value={{ ta_label: props.planForm.use_default_ccg, ta_value: props.planForm.use_default_ccg }}
                                                        getOptionLabel={e => e.ta_label}
                                                        getOptionValue={e => e.ta_value}
                                                        loadOptions={loadTransactionAssociationOptions}
                                                        onInputChange={handleTransactionAssociationInput}
                                                        // onChange={handleChange}
                                                        search={true}
                                                        placeholder="Select Transaction Type"

                                                    />
                                                )} />
                                            {/* <p className="input-hint">Not Applicable</p> */}
                                            {errors.use_default_ccg && <span><p className='notvalid'>This field is required!</p></span>}
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Customer</small>
                                            <Controller name="customer_id"
                                                control={control}
                                                render={({ field }) => (
                                                    <AsyncSelect
                                                        {...field}
                                                        cacheOptions
                                                        defaultOptions
                                                        // value={selectedValue}
                                                        value={{ cust_label: props.planForm.customer_id, cust_value: props.planForm.customer_id }}
                                                        getOptionLabel={e => e.cust_label}
                                                        getOptionValue={e => e.cust_value}
                                                        loadOptions={loadCustomerOptions}
                                                        onInputChange={handleCustomerInput}
                                                        // onChange={handleChange}
                                                        placeholder="Select Customer"
                                                    />
                                                )} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Client</small>
                                            <Controller name="client_id"
                                                control={control}
                                                render={({ field }) => (
                                                    <AsyncSelect
                                                        {...field}
                                                        cacheOptions
                                                        defaultOptions
                                                        // value={selectedValue}
                                                        value={{ client_label: props.planForm.client_id, client_value: props.planForm.client_id }}
                                                        getOptionLabel={e => e.client_label}
                                                        getOptionValue={e => e.client_value}
                                                        loadOptions={loadClientOptions}
                                                        onInputChange={handleClientInput}
                                                        // onChange={handleChange}
                                                        search={true}
                                                        placeholder="Select Client"

                                                    />
                                                )} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Group</small>
                                            <Controller name="client_group_id"
                                                control={control}
                                                render={({ field }) => (
                                                    <AsyncSelect
                                                        {...field}
                                                        cacheOptions
                                                        defaultOptions
                                                        // value={selectedValue}
                                                        value={{ client_group_label: props.planForm.client_group_id, client_group_value: props.planForm.client_group_id }}
                                                        getOptionLabel={e => e.client_group_label}
                                                        getOptionValue={e => e.client_group_value}
                                                        loadOptions={loadClientGroupOptions}
                                                        onInputChange={handleClientGroupInput}
                                                        // onChange={handleChange}
                                                        search={true}
                                                        placeholder="Select Client Group"

                                                    />
                                                )} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={props.clearForm} className="btn btn-secondary" data-bs-dismiss="modal">Clear</button>
                                <button type="submit" className="btn btn-info">{props.planForm ? "Update" : "Add"} </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}