import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { json, Link, Outlet, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import SelectSearch, { useSelect } from 'react-select-search';
import { toast } from "react-toastify";
import 'react-select-search/style.css';
import AsyncSelect from 'react-select';


export default function UserDefinition() {
    const [groupRowData, setGroupRowData] = useState(false);
    const navigate = useNavigate();

    const loadUserDefinitionForm = (user) => {
        navigate('/dashboard/administrator/user-definition/definition');
    }

    const loadGroupDefinitionForm = (group) => {
        setGroupRowData(group);
        // navigate('/dashboard/administrator/user-definition/group');
        navigate('/dashboard/administrator/user-definition/group', { state: { group_id: group.group_id, group_name: group.group_name, type: 'groupForm' } });

    }

    const [userDefList, setUserDefList] = useState([]);
    const [formData, setFormData] = useState(false);

    const [groupData, setGroupData] = useState(false);

    const getGroupData = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/get-group-data`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setGroupData(data.data);
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

    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setUserDefList(data.data);

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const showFormData = (row) => {
        setFormData(row);
    }

    useEffect(() => { }, [userDefList, formData, groupData]);

    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a className=""> Administrator </a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a className="">User Definition</a></li>
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

            <SearchUserDefinition onSearch={onSearch} />

            <div className="card mt-3 mb-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="col-md-8 mb-2">
                                    <h5>User Definition</h5>
                                </div>
                                <UserDefinitionList loadUserDefinitionForm={loadUserDefinitionForm} userDefList={userDefList} showFormData={showFormData} />
                                {/* <UserDefinitionList userDefList={userDefList} showFormData={showFormData} /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="col-md-8 mb-2">
                                    <h5> User Group Definition </h5>
                                </div>
                                <UserGroupDefinitionList loadGroupDefinitionForm={loadGroupDefinitionForm} getGroupData={getGroupData} groupData={groupData} groupRowData={groupRowData} />
                                {/* <UserGroupDefinitionList getGroupData={getGroupData} groupData={groupData} /> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card mt-3 mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <UserDF formData={formData} />
                                <div className="tab-content" id="nav-tabContent">
                                    <Outlet context={[formData, setFormData]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

function SearchUserDefinition(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>User Definition </small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing price user id/ last name/ first name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function UserDefinitionList(props) {
    const userArry = [];
    for (let i = 0; i < props.userDefList.length; i++) {
        userArry.push(<UserDefRow userDefRow={props.userDefList[i]} showFormData={props.showFormData} />);
    }
    return (
        <>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                    <thead className='stickt-thead'>
                        <tr>
                            <th>User ID</th>
                            <th>User Last Name</th>
                            <th>User First Name</th>
                        </tr>
                    </thead>
                    <tbody>

                        {userArry}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function UserDefRow(props) {
    return (
        <>
            <tr onClick={e => props.showFormData(props.userDefRow)}>
                <td>{props.userDefRow.user_id}</td>
                <td>{props.userDefRow.user_last_name}</td>
                <td>{props.userDefRow.user_first_name}</td>
            </tr>
        </>
    )
}

function UserGroupDefinitionList(props) {
    const e = "group";
    useEffect(() => {
        if (!props.groupData) {
            props.getGroupData();
        }
    }, [props.groupData]);
    const groupList = [];
    for (let i = 0; i < props.groupData.length; i++) {
        groupList.push(<GroupRow groupRow={props.groupData[i]} loadGroupDefinitionForm={props.loadGroupDefinitionForm} />);
    }
    return (
        <>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                    <thead className='stickt-thead'>
                        <tr>
                            <th>Group ID</th>
                            <th>Group Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupList}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function GroupRow(props) {
    return (
        <>
            <tr onClick={e => props.loadGroupDefinitionForm(props.groupRow)}>
                <td>{props.groupRow.group_id}</td>
                <td>{props.groupRow.group_name}</td>
            </tr>
        </>
    )
}

export function UserDF(props) {
    const { state } = useLocation();
    const currentpath = location.pathname.split('/')[4];
    const { register, handleSubmit, reset, watch, formState: { error } } = useForm();
    // const [formData, setFormData] = useState();

    useEffect(() => { reset(props.formData) }, [props.formData]);
    return (
        <>

            <div className="data">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <Link to="definition" className={'nav-link' + (currentpath == 'definition' ? ' active' : '')}>Definition</Link>
                    <Link to="data-access" className={'nav-link' + (currentpath == 'data-access' ? ' active' : '')}>Data Access</Link>
                </div>
            </div>
        </>
    )
}

export function UDefinitionTab() {
    const [formData, setFormData] = useOutletContext();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [securityOption, setSecurityOption] = useState(false);
    const [adding, setAdding] = useState(false);
    const [groupError, setGroupError] = useState(false);
    const [defaultSystemType, setDefaultSystemType] = useState(false);

    useEffect(() => { }, [defaultSystemType]);

    const getSecurityOptions = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/get-security-options`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    toast.error("There was an error!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {

                    setSecurityOption(data.data);

                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const addNew = () => {
        setAdding(true);
        setFormData(false);
        reset();
    }

    const checkValidGroup = (validate) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/validate-group?search=${validate.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(data.data);
                if (data.data <= 0) {
                    setGroupError(true);
                } else {
                    setGroupError(false);
                }
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

    const addUser = (userFormData) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userFormData)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/submit`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(data.data);
                if (!response.ok) {
                    toast.error("There was an error !", {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.success(data.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const changeDefaultSystem = (type) => {
        setDefaultSystemType(type.target.value);
        // alert(defaultSystemType);
    }

    useEffect(() => {
        if (!securityOption) {
            getSecurityOptions();
        }
        if (adding) {
            reset({ user_id: '', user_password: '', user_first_name: '', user_last_name: '', group_id: '', new: 1 }
                , { keepValues: false, });
        }
        reset(formData)
    }, [formData, groupError, defaultSystemType]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <form  onSubmit={handleSubmit(addUser)}>
                        <div className="col-md-12 mb-2">
                            <h5>User Information</h5>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <small>User ID</small>
                                    <input type="text" className="form-control" {...register("user_id", { required: true })} disabled={formData ? true : false} />
                                    {errors.user_id && <span><p className="notvalid">This field is required</p></span>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <small>Password</small>
                                    <input type="text" className="form-control" {...register("user_password", { required: true })} />
                                    {errors.user_password && <span><p className="notvalid">This field is required</p></span>}
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>First Name</small>
                                    <input type="text" className="form-control" {...register("user_first_name")} />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>Last Name</small>
                                    <input type="text" className="form-control" {...register("user_last_name")} />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>Group</small>
                                    <input type="text" className="form-control" onKeyUp={e => checkValidGroup(e)} {...register("group_id")} />
                                    {groupError ? <span><p className='notvalid'>Please enter valid group id</p></span> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <h5>Default System User</h5>
                            </div>
                            <div className="col-md-2 mb-2">
                                <input type="radio" value="prohealthi" name="defaultSystemUser" onClick={changeDefaultSystem} /> ProHealthi
                            </div>
                            <div className="col-md-2 mb-2">
                                <input type="radio" value="client" name="defaultSystemUser" onClick={changeDefaultSystem} /> Client Site
                            </div>

                            <div className="col-md-3">
                                <div className="form-group">
                                    <input type="checkbox" id="Return2" className="d-none" disabled={defaultSystemType ? "client" : ''} />
                                    <label htmlFor="Return2">System Administrator</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <input type="checkbox" id="Return2" className="d-none" disabled={defaultSystemType ? "client" : ''} />
                                    <label htmlFor="Return2">Enforce Restrictive Member Security</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="col-md-3 mt-3">
                                    <button type="submit" className="btn btn-sm btn-info w-100"
                                        disabled={groupError ? true : false}
                                    >{adding || !formData ? "Add" : "Update"}</button>
                                </div>
                                <div className="col-md-3 mt-3">
                                    <button type="button" onClick={e => addNew(e)} className="btn btn-primary"
                                        disabled={groupError ? true : false}
                                    >Clear</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 mb-2 mt-5">
                            <h5>Program Security Options</h5>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Program Section</th>
                                            <th>Privileges</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                        <td>Accumulated Benefits Strategies</td>
                                        <td>Read/Write</td>
                                    </tr>
                                    <tr>
                                        <td>Accumulated Benefits </td>
                                        <td>Read/Write</td>
                                    </tr>
                                    <tr>
                                        <td>Audit Trail Maintenance</td>
                                        <td>Read/Write</td>
                                    </tr> */}
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-md-4">
                                <Form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group mt-3">
                                                <input type="checkbox" id="Return2" className="d-none" />
                                                <label htmlFor="Return2">Read Only</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mt-3">
                                                <input type="checkbox" id="Return3" className="d-none" />
                                                <label htmlFor="Return3">Read / Write</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mt-3">
                                                <input type="checkbox" id="Return4" className="d-none" />
                                                <label htmlFor="Return4">Audit Trail </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 mt-3">
                                            <button className="btn btn-sm btn-info w-100">All</button>
                                        </div>
                                        <div className="col-md-3 mt-3">
                                            <button className="btn btn-sm btn-danger w-100">None</button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export function DataAccessTab() {
    const [formData, setFormData] = useOutletContext();
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const [custData, setCustData] = useState([]);


    const getCustomers = (user_id) => {


        return new Promise((resolve) => {
            const requestOptions = {
                method: 'GET',
                headers: { 'content-type': 'application/json' }
            }
            fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/get-customers?search=${user_id}`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    setCustData(data.data);

                    resolve(custData.map(({ label, value }) => ({
                        value: custData.value, label: custData.label
                    })));

                });
        });
    }

    useEffect(() => {
        reset(formData)

    }, [formData, custData]);

    useEffect(() => {
        getCustomers(formData.user_id);
    }, []);



    //fetch customer data
    const [customerId, setCustomerId] = useState([]);
    const fetchCustomerId = () => {
        fetch(process.env.REACT_APP_API_BASEURL +`/api/administrator/user-defination/get-customers-list`)
        .then((res) => res.json())
        .then((customerId) => {
        const customerIdList = customerId.data.map((item) => ({
            label: item.customer_id +' - '+ item.customer_name,
            value: item.customer_id
        }));
        setCustomerId(customerIdList);
        });
    }
    //fetch client data
    const [clientId, setClientId] = useState([]);
    const fetchClientId = () => {
        fetch(process.env.REACT_APP_API_BASEURL +`/api/administrator/user-defination/get-clients`)
        .then((res) => res.json())
        .then((clientId) => {
        const clientIdList = clientId.data.map((item) => ({
            label: item.client_id +' - '+ item.client_name,
            value: item.client_id
        }));
        setClientId(clientIdList);
        });
    }

    //fetch client group data
    const [clientGroupId, setClientGroupId] = useState([]);
    const fetchClientGroupId = () => {
        fetch(process.env.REACT_APP_API_BASEURL +`/api/administrator/user-defination/get-client-groups`)
        .then((res) => res.json())
        .then((clientGroupId) => {
        const clientGroupIdList = clientGroupId.data.map((item) => ({
            label: item.client_group_id +' - '+ item.group_name,
            value: item.client_group_id
        }));
        setClientGroupId(clientGroupIdList);
        });
    }

    useEffect(() => {
        fetchCustomerId();
        fetchClientId();
        fetchClientGroupId();
    }, [])

    return (
        <>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h5>Data Access</h5>
                    </div>
                    <form>
                        <div className="row mb-3">
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <small>Customer</small>
                                    <Controller name="customer_id"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                {...field}
                                                    placeholder="Select Customer ID"
                                                    options={customerId}
                                                    noOptionsMessage={() => "Customer ID/Name Not Matched"}
                                                />
                                            )} />


                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <small>Client</small>

                                    <Controller name="client_id"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                {...field}
                                                    placeholder="Select Client ID"
                                                    options={clientId}
                                                    noOptionsMessage={() => "Client ID/Name Not Matched"}
                                                />
                                            )} />



                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <small>Client Group</small>
                                    <Controller name="client_groups"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                {...field}
                                                    placeholder="Select Client Group ID"
                                                    options={clientGroupId}
                                                    noOptionsMessage={() => "Client Group ID/Name Not Matched"}
                                                />
                                            )} />


                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Status</small>
                                    <select className="form-select" {...register("customer_id", { required: true })}>
                                        <option value="">Select</option>
                                        <option value="A">Active</option>
                                        <option value="I">In Active</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Exclude Flag</small>
                                    <select className="form-select" {...register("customer_id", { required: true })}>
                                        <option value="">Select</option>
                                        <option value="Y">Yes</option>
                                        <option value="N">No</option>
                                        <option value="R">Restricted</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                                <a href="" className="btn btn-danger">Clear</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-warning ">Remove</a>&nbsp;&nbsp;
                                <button href="provider-search.html" className="btn btn-info">Add</button>
                            </div>
                        </div>
                    </form>

                    <div className="col-md-12">
                        <table className="table table-striped table-bordered" {...register("customer_id", { required: true })}>
                            <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Client ID</th>
                                    <th>Client Group ID</th>
                                    <th>Status</th>
                                    <th>Exclude</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

function CustRow(props) {
    // console.log(props.custRow);
    return (
        <>
            <tr>
                <td>{props.custRow.customer_id}</td>
                <td>{props.custRow.customer_id}</td>
                <td>{props.custRow.customer_id}</td>
                <td>{props.custRow.customer_id}</td>
                <td>{props.custRow.customer_id}</td>
            </tr>
        </>
    )
}

function GetCustomer(props) {
    return (
        <>
            {props.custData.customer_name}
            <option value={props.custData.customer_id}>{props.custData.customer_name}</option>
        </>
    )
}

export function GroupForm() {
    const { state } = useLocation();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    // const { data: { id } = {} } = useLocation();
    useEffect(() => { reset(state) }, [state]);

    return (
        <>
            <div className="col-md-8 mb-2 mt-5">
                <h5>Group Information </h5>
            </div>
            <Form>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <small>Group ID</small>
                            <input type="text" className="form-control" {...register("group_id")} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <small>Group Name</small>
                            <input type="text" className="form-control" {...register("group_name")} />
                        </div>
                    </div>
                </div>
            </Form>

            <div className="col-md-8 mb-2 mt-5">
                <h5>Program Security Options</h5>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Program Section</th>
                                <th>Privileges</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Accumulated Benefits Strategies</td>
                                <td>Read/Write</td>
                            </tr>
                            <tr>
                                <td>Accumulated Benefits </td>
                                <td>Read/Write</td>
                            </tr>
                            <tr>
                                <td>Audit Trail Maintenance</td>
                                <td>Read/Write</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col-md-4">
                    <Form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <input type="checkbox" id="Return2" className="d-none" />
                                    <label htmlFor="Return2">Read Only</label>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <input type="checkbox" id="Return3" className="d-none" />
                                    <label htmlFor="Return3">Read / Write</label>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <input type="checkbox" id="Return4" className="d-none" />
                                    <label htmlFor="Return4">Audit Trail </label>
                                </div>
                            </div>

                            <div className="col-md-3 mt-3">
                                <button className="btn btn-sm btn-info w-100">All</button>
                            </div>
                            <div className="col-md-3 mt-3">
                                <button className="btn btn-sm btn-danger w-100">None</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}