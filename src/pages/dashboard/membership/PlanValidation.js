import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function PlanValidations() {

    const [planValidationList, setPlanValidationList] = useState(false);
    const [clientList, setClientList] = useState(false);
    const [clientFormData, setClientFormData] = useState(false);

    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/membership/plan-validation/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setPlanValidationList(data.data);
                toast.success(response.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getClient = (formData) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/membership/plan-validation/get-client-details?customer_id=${formData.customer_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setClientList(data.data);
                toast.success(response.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const fillClientForm = (clientFormData) => {
        setClientFormData(clientFormData);
    }

    useEffect(() => { }, [planValidationList, clientList, clientFormData]);

    return (
        <>
            <div className="dashboard-content clearfix">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Membership</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Plan Validations</a></li>
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
                    <SearchPlanValidation onSearch={onSearch} />
                    <PlanValidationList planValidationList={planValidationList} getClient={getClient}
                        clientList={clientList} fillClientForm={fillClientForm} />
                    <PlanValidationForm clientFormData={clientFormData}/>
                </div>
            </div>
        </>
    )
}

function SearchPlanValidation(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Plan Validation </small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing ID/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PlanValidationList(props) {
    const planValArray = [];
    for (let i = 0; i < props.planValidationList.length; i++) {
        planValArray.push(<PlanValRow planValRow={props.planValidationList[i]} getClient={props.getClient} />);
    }

    const clientArray = [];
    for (let i = 0; i < props.clientList.length; i++) {
        clientArray.push(<ClientRow clientRow={props.clientList[i]} fillClientForm={props.fillClientForm} />);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Provider Type Validation</h5>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div style={{ height: "400px", overflowY: "scroll" }}>
                                <table className="table  table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Customer ID</th>
                                            <th>Customer Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {planValArray}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div style={{ height: "400px", overflowY: "scroll" }}>
                                <table className="table  table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Client ID</th>
                                            <th>Group ID</th>
                                            <th>Plan ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientArray}
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

function PlanValRow(props) {
    return (
        <>
            <tr onClick={e => props.getClient(props.planValRow)}>
                <td>{props.planValRow.customer_id}</td>
                <td>{props.planValRow.customer_name}</td>
            </tr>
        </>
    )
}

function ClientRow(props) {
    return (
        <>
            <tr onClick={e => props.fillClientForm(props.clientRow)}>
                <td>{props.clientRow.client_id}</td>
                <td>{props.clientRow.client_group_id}</td>
                <td>{props.clientRow.plan_id}</td>
            </tr>
        </>
    )
}

function PlanValidationForm(props) {
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => {reset(props.clientFormData)},[props.clientFormData]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Add Customer</h5>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Customer ID</small>
                                <input type="text" className="form-control" placeholder="" {...register("customer_id", {required:true})} />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Client ID</small>
                                <input type="text" className="form-control" placeholder="" {...register("client_id", {required:true})} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Client Group ID</small>
                                <input type="text" className="form-control" placeholder="" {...register("client_group_id", {required:true})} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Plan ID</small>
                                <input type="text" className="form-control" placeholder="" {...register("plan_id", {required:true})} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>

                        <div className="col-md-2 ms-auto text-end">
                            <a href="" className="btn btn-theme p-2">Adding</a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}