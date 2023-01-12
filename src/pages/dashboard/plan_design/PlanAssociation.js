import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import AsyncSelectNew from 'react-select';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../loader/loader';
import axios from 'axios';
import { PropagateLoader } from 'react-spinners';

export default function PlanAssociation() {
    const scollToRef = useRef();
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();

    const [planList, setPlanList] = useState([]);
    const [planForm, setPlanForm] = useState(false);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedClientGroupValue, setSelectedClientGroupValue] = useState('');
    const [selectedClientGroupLabel, setSelectedClientGroupLabel] = useState('');

    const [clientId, setClientId] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [pharmacyChain, setPharmacyChain] = useState([]);
    const [pharmacyChainData, setPharmacyChainData] = useState([]);
    const [memProcFlag, setMemProcFlag] = useState([]);
    const [memProcFlagData, setMemProcFlagData] = useState([]);
    const [transactionType, setTransactionType] = useState([]);
    const [transactionTypeData, setTransactionTypeData] = useState([]);
    const [transactionAssociation, setTransactionAssociation] = useState([]);
    const [transactionAssociationData, setTransactionAssociationData] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [clientGroup, setClientGroup] = useState([]);
    const [clientGroupData, setClientGroupData] = useState([]);
    const [planId, setPlanId] = useState([]);
    const [planData, setPlanData] = useState([]);

    const clearForm = () => {
        setAdding(true);
        setPlanForm(false);
        reset();
    }

    const onSearch = (search) => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setPlanList(data.data);
                setLoading(false);
                //setSelectedClientGroupValue(data.data.client_group_id)
                // console.log(data.data.client_group_id)
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
        // console.log(plan_data, "plan data");
        setPlanForm(plan_data);
        scollToRef.current.scrollIntoView()

        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }




        //client
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-client-group-label?search=${plan_data.client_group_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setSelectedClientGroupLabel(data.group_name, "label");
                // setLoading(false);                
            })

        //Pharmacy Chain
        if (plan_data.pharmacy_chain) {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-pharmacy-chain`)
                .then(async (res) => res.json())
                .then((pharmacyChain) => {
                    const arraypharmacyChain = pharmacyChain.data.map((item) => ({
                        label: item.pharmacy_chain,
                        value: item.pharmacy_chain
                    }));
                    setPharmacyChain(arraypharmacyChain);
                    const pharmacy_chain_exists = arraypharmacyChain.some(v => (v.value == plan_data.pharmacy_chain));
                    if (pharmacy_chain_exists) {
                        var pharmacy_chain_data = arraypharmacyChain.filter(item => item.value === plan_data.pharmacy_chain)
                        setPharmacyChainData(pharmacy_chain_data[0]);
                    }
                });
        }

        //Plan Id
        if (plan_data.plan_id) {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-plan-id`)
                .then(async (res) => res.json())
                .then((planId) => {
                    const arrayPlanId = planId.data.map((item) => ({
                        label: item.pharmacy_chain,
                        value: item.pharmacy_chain
                    }));
                    setPlanId(arrayPlanId);
                    const plan_id_exists = arrayPlanId.some(v => (v.value == plan_data.plan_id));
                    if (plan_id_exists) {
                        var plan_id_data = arrayPlanId.filter(item => item.value === plan_data.plan_id)
                        setPlanData(plan_id_data[0]);
                    }
                });
        }

        //Membership Proc Flag
        if (plan_data.membership_processing_flag) {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-membership-process-flag`)
                .then((res) => res.json())
                .then((memProcFlag) => {
                    const arrayformId = memProcFlag.data.map((item) => ({
                        label: item.label,
                        value: item.membership_processing_flag
                    }));
                    setMemProcFlag(arrayformId);
                    const form_id_exists = arrayformId.some(v => (v.value == plan_data.membership_processing_flag));
                    if (form_id_exists) {
                        var form_id_data = arrayformId.filter(item => item.value === plan_data.membership_processing_flag)
                        setMemProcFlagData(form_id_data[0]);
                    }
                });
        }

        //Transaction Type Data
        if (plan_data.transaction_type) {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-transaction-type`)
                .then((res) => res.json())
                .then((transactionType) => {
                    const arraytransactionType = transactionType.data.map((item) => ({
                        label: item.trans_type_label,
                        value: item.trans_type_value
                    }));
                    const transaction_type_exists = arraytransactionType.some(v => (v.value == plan_data.transaction_type));
                    if (transaction_type_exists) {
                        var data = arraytransactionType.filter(item => item.value === plan_data.transaction_type)
                        setTransactionTypeData(data[0]);
                    }
                });
        }

        //Transaction Association Data
        if (plan_data.use_default_ccg) {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-transaction-association`)
                .then((res) => res.json())
                .then((transactionAssociation) => {
                    const arrayTransactionAssociation = transactionAssociation.data.map((item) => ({
                        label: item.trans_ass_label,
                        value: item.trans_ass_value
                    }));
                    const transaction_association_exists = arrayTransactionAssociation.some(v => (v.value == plan_data.use_default_ccg));
                    if (transaction_association_exists) {
                        var data = arrayTransactionAssociation.filter(item => item.value === plan_data.use_default_ccg)
                        setTransactionAssociationData(data[0]);
                    }
                });
        }

        //Customer
        if (plan_data.customer_id) {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-customer`)
                .then((res) => res.json())
                .then((customer) => {
                    const arrayCustomer = customer.data.map((item) => ({
                        label: item.customer_name,
                        value: item.customer_id
                    }));
                    const customer_exists = arrayCustomer.some(v => (v.value == plan_data.customer_id));
                    if (customer_exists) {
                        var data = arrayCustomer.filter(item => item.value === plan_data.customer_id)
                        setCustomerData(data[0]);
                    }
                });
        }

        //Client ID
        if (plan_data.client_id) {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-client`)
                .then((res) => res.json())
                .then((clientId) => {
                    const userClientId = clientId.data.map((item) => ({
                        label: item.client_name,
                        value: item.client_id
                    }));
                    const client_id_exists = userClientId.some(v => (v.value == plan_data.client_id));
                    if (client_id_exists) {
                        var data = userClientId.filter(item => item.value === plan_data.client_id)
                        setClientData(data[0]);
                    }
                });
        }

        //Client Group 
        if (plan_data.client_group_id) {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-client-group`)
                .then((res) => res.json())
                .then((clientGroup) => {
                    const arrayClientGroup = clientGroup.data.map((item) => ({
                        label: item.group_name,
                        value: item.client_group_id
                    }));
                    const client_group_exists = arrayClientGroup.some(v => (v.value == plan_data.client_group_id));
                    if (client_group_exists) {
                        var data = arrayClientGroup.filter(item => item.value === plan_data.client_group_id)
                        setClientGroupData(data[0]);
                    }
                });
        }

    }

    const loadPharmacyChailOptions = () => {
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-pharmacy-chain`)
            .then((res) => res.json())
            .then((pharmacyChain) => {
                const arraypharmacyChain = pharmacyChain.data.map((item) => ({
                    label: item.pharmacy_chain,
                    value: item.pharmacy_chain
                }));
                setPharmacyChain(arraypharmacyChain);
            });
    }

    // const loadFormIdOptions = (form_input) => {
    //     setFormId(form_input);
    // }

    const loadMemProcFlagOptions = () => {
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-membership-process-flag`)
            .then((res) => res.json())
            .then((memProcFlag) => {
                const arraymemProcFlag = memProcFlag.data.map((item) => ({
                    label: item.label,
                    value: item.membership_processing_flag
                }));
                setMemProcFlag(arraymemProcFlag);
            });
    }

    const loadCustomerOptions = () => {
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-customer`)
            .then((res) => res.json())
            .then((customer) => {
                const arrayCustomer = customer.data.map((item) => ({
                    label: item.customer_name,
                    value: item.customer_id
                }));
                setCustomer(arrayCustomer);
            });
    }

    const loadTransactionTypeOptions = () => {
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-transaction-type`)
            .then((res) => res.json())
            .then((transactionType) => {
                const arraytransactionType = transactionType.data.map((item) => ({
                    label: item.trans_type_label,
                    value: item.trans_type_value
                }));
                setTransactionType(arraytransactionType);
            });
    }
    const loadTransactionAssociationOptions = () => {
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-transaction-association`)
            .then(async (res) => res.json())
            .then((transactionAssociation) => {
                const arrayTransactionAssociation = transactionAssociation.data.map((item) => ({
                    label: item.trans_ass_label,
                    value: item.trans_ass_value
                }));
                setTransactionAssociation(arrayTransactionAssociation);
            });
    }

    const loadClientOptionsfetch = () => {
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-client`)
            .then((res) => res.json())
            .then((clientId) => {
                const userClientId = clientId.data.map((item) => ({
                    label: item.client_name,
                    value: item.client_id
                }));
                setClientId(userClientId);
            });
    }

    const loadClientGroupOptions = () => {
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-client-group`)
            .then((res) => res.json())
            .then((clientGroup) => {
                const arrayClientGroup = clientGroup.data.map((item) => ({
                    label: item.group_name,
                    value: item.client_group_id
                }));
                setClientGroup(arrayClientGroup);
            });

    }

    const loadPlanId = () => {
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get-plan-id`)
            .then((res) => res.json())
            .then((planId) => {
                const arrayPlanId = planId.data.map((item) => ({
                    label: item.id,
                    value: item.id
                }));
                setPlanId(arrayPlanId);
            });
    }

    useEffect(() => {
        if (!planForm) {

        }

    }, [planList, planForm, adding, clientData, pharmacyChainData, memProcFlagData, transactionTypeData, transactionAssociationData, customerData, clientGroupData,
        // }, [planList, planForm, adding
    ]);

    useEffect(() => {
        loadPharmacyChailOptions();
        // loadFormIdOptions();
        loadMemProcFlagOptions();
        loadCustomerOptions();
        loadTransactionTypeOptions();
        loadTransactionAssociationOptions();
        loadClientOptionsfetch();
        loadClientGroupOptions();
        loadPlanId();
    }, []);
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
            <PlanAssociationList planList={planList} getFormData={getFormData} planForm={planForm} loading={loading} />
            <div ref={scollToRef}>
                <PlanAssociationForm planForm={planForm} clearForm={clearForm} selectedClientGroupLabel={selectedClientGroupLabel}
                    clientId={clientId} clientData={clientData} pharmacyChain={pharmacyChain} pharmacyChainData={pharmacyChainData} memProcFlag={memProcFlag} memProcFlagData={memProcFlagData}
                    transactionType={transactionType} transactionTypeData={transactionTypeData} transactionAssociation={transactionAssociation}
                    transactionAssociationData={transactionAssociationData} customer={customer} customerData={customerData} clientGroup={clientGroup} clientGroupData={clientGroupData}
                    planId={planId} planData={planData}
                    setPharmacyChainData={setPharmacyChainData} setMemProcFlagData={setMemProcFlagData} setTransactionTypedata={setTransactionTypeData}
                    setTransactionAssociationData={setTransactionAssociationData} setCustomerData={setCustomerData} setClientData={setClientData}
                    setClientGroupData={setClientGroupData} setPlanData={setPlanData} adding={adding} />
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
                                                {props.loading ? <LoadingSpinner /> : listArray}
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
    const [isError, setIsError] = useState(false);
    const [submitDisable, setSubmitDisable] = useState(false);

    const checkLengh = (suffix) => {
        if (suffix.target.value.length > 4) {
            setIsError(true);
            setSubmitDisable(true);
        } else {
            setIsError(false);
            setSubmitDisable(false);
        }
    }

    const submitPlanAssociation = (planAssociationData) => {
        // console.log(props.customerData);
        // console.log(props.transactionAssociationData, "props.transactionAssociationData");
        // console.log(planAssociationData, "planAssociationData");
        // console.log(props,"props");
        // console.log(props.customerData['value'], "props.customerData['value']")
        // console.log(props.transactionTypeData['value']," props.transactionTypeData['value']")
        const bin_number = planAssociationData.bin_number != null ? planAssociationData.bin_number : null;
        const process_control_number = planAssociationData.process_control_number != null ? planAssociationData.process_control_number : null;
        const group_number = planAssociationData.group_number != null ? planAssociationData.group_number : null;
        const pin_number_suffix = planAssociationData.pin_number_suffix != null ? planAssociationData.pin_number_suffix : null;
        const pharmacy_chain = props.pharmacyChainData['value'] != null ? props.pharmacyChainData['value'] : props.pharmacyChainData['value'];
        const membership_processing_flag = props.memProcFlagData['value'] != null ? props.memProcFlagData['value'] : props.memProcFlagData['value'];
        const transaction_type = props.transactionTypeData['value'] != null ? props.transactionTypeData['value'] : props.transactionTypeData['value'];
        const use_default_ccg = props.transactionAssociationData['value'] != null ? props.transactionAssociationData['value'] : '';
        const customer_id = props.customerData['value'] != null ? props.customerData['value'] : '';
        const client_id = props.clientData['value'] != null ? props.clientData['value'] : '';
        const client_group_id = props.clientGroupData['value'] != null ? props.clientGroupData['value'] : props.clientGroupData['value'];
        const plan_id = props.planData['value'] != null ? props.planData['value'] : props.planData['value'];
        // const add_new = '1';
        console.log(props.adding)
        const add_new = (props.planForm.bin_number == null ? "1" : "0");
        const data = {
            bin_number, process_control_number, group_number, pin_number_suffix, pharmacy_chain, membership_processing_flag, transaction_type,
            use_default_ccg, customer_id, client_id, client_group_id, add_new, plan_id
        };

        console.log(data, "post data");

        axios.post(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/submit-form`, data)
            // fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/submit-form`, requestOptions)
            .then((response) => {
                console.log(response);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // planAssociationData.target.reset();
                reset({
                    bin_number: '', process_control_number: '', group_number: '', pharmacy_chain: '', plan_id: '', form_id: '',
                    membership_processing_flag: '', pin_number_suffix: '', transaction_type: '', customer_id: '', client_id: '',
                    use_default_ccg: '', client_group_id: '', add_new: 1, plan_id: ''
                },
                    { keepValues: false });
            })
            .catch(error => {
                // console.log(error)
            })
    }


    useEffect(() => {
        if (!props.adding) {
            reset({
                bin_number: '', process_control_number: '', group_number: '', pharmacy_chain: '', plan_id: '', form_id: '',
                membership_processing_flag: '', pin_number_suffix: '', transaction_type: '', customer_id: '', client_id: '',
                use_default_ccg: '', client_group_id: '', add_new: 1, plan_id: ''
            },
                { keepValues: false });

        }
        reset(props.planForm)
    }, [props.planForm]);

    return (
        <>
            <form onSubmit={handleSubmit(submitPlanAssociation)}>
                {/* <form onSubmit={submitHandler}> */}
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
                                            <AsyncSelectNew
                                                placeholder="Select Pharmacy Chain"
                                                options={props.pharmacyChain}
                                                name="pharmacy_chain"
                                                value={props.pharmacyChainData}
                                                onChange={(e) => props.setPharmacyChainData(e)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Plan ID</small>
                                            <AsyncSelectNew
                                                placeholder="Select Plan ID"
                                                options={props.planId}
                                                name="plan_id"
                                                value={props.planData}
                                                onChange={(e) => props.setPlanData(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Mail Plan Server ID</small>
                                            <AsyncSelectNew
                                                placeholder="Select Mail Plan Server ID"
                                                // options={formId}
                                                name="form_id"
                                            // value={formIdData}
                                            // onChange={(e) => setFormId(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small className="required">Membership Proc Flag</small>
                                            <AsyncSelectNew
                                                placeholder="Select Membership Proc Flag"
                                                options={props.memProcFlag}
                                                name="membership_processing_flag"
                                                value={props.memProcFlagData}
                                                onChange={(e) => props.setMemProcFlagData(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Pin Suffix</small>
                                            <input type="text" className="form-control" {...register("pin_number_suffix")}
                                                onKeyUp={e => checkLengh(e)}
                                            />
                                            {isError ? <span><p className='notvalid'>Limit is 4 !</p></span> : ""}
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small className="required">Transaction Type </small>
                                            <AsyncSelectNew
                                                placeholder="Select Transaction Type"
                                                options={props.transactionType}
                                                name="transaction_type"
                                                value={props.transactionTypeData}
                                                onChange={(e) => props.setTransactionTypedata(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small className="required">Transaction Association </small>
                                            <AsyncSelectNew
                                                placeholder="Select Transaction Association"
                                                options={props.transactionAssociation}
                                                name="use_default_ccg"
                                                // name="transaction_association"
                                                value={props.transactionAssociationData}
                                                onChange={(e) => props.setTransactionAssociationData(e)}
                                            />
                                            {errors.transaction_association && <span><p className='notvalid'>This field is required!</p></span>}
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Customer</small>
                                            <AsyncSelectNew
                                                placeholder="Select Customer ID"
                                                options={props.customer}
                                                name="customer_id"
                                                value={props.customerData}
                                                onChange={(e) => props.setCustomerData(e)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Client</small>
                                            <AsyncSelectNew
                                                placeholder="Select Client ID"
                                                options={props.clientId}
                                                name="client_id"
                                                value={props.clientData}
                                                onChange={(e) => props.setClientData(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <div className="form-group">
                                            <small>Group</small>
                                            <AsyncSelectNew
                                                placeholder="Select Client Group"
                                                options={props.clientGroup}
                                                name="client_group_id"
                                                value={props.clientGroupData}
                                                onChange={(e) => props.setClientGroupData(e)}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={props.clearForm} className="btn btn-secondary" data-bs-dismiss="modal">Clear</button>
                                <button type="submit" className="btn btn-info" disabled={submitDisable ? true : false}>{props.planForm ? "Update" : "Add"} </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}