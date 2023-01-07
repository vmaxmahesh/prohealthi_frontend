import React, {useEffect, useRef, useState} from 'react';
import {render} from 'react-dom';
import {useForm,Controller} from 'react-hook-form';
import LoadingSpinner from '../../../loader/loader';
import EmptyRowComponent from '../../../shared/NoDataFound';
import Footer from '../../../shared/Footer';
import {useAuth} from '../../../hooks/AuthProvider';
import {toast} from 'react-toastify';
import AsyncSelect from 'react-select/async';


export default function ProviderValidation() {

    const scollToRef = useRef();
    const [providerValidationsData, setProviderValidationsData] = useState([]);
    const [providerData, setProviderData] = useState([]);
    const [selctedProviderRow, setSelctedProviderRow] = useState('');
    const [providerFormData, setProviderFormData] = useState([]);
    const [selectProviderListRow, setSelectProviderListRow] = useState('');
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [adding, setAdding] = useState(false);

    const clearForm = (e) => {
        setAdding(false);
        // setSelctedProviderRow('');
        setProviderFormData([]);
        setSelectProviderListRow('');
        document.getElementById('providerForm').reset();
    }

    const resetForm = () => {
        setAdding(false);
        setSelctedProviderRow('');
        setProviderFormData([]);
        setSelectProviderListRow('');
        setProviderData([]);
        document.getElementById('providerForm').reset();
    }


    const getProviderLists = (provider_list) => {
        setLoader(true)
        var test = {};
        test.provider_list = provider_list;
        setSelctedProviderRow(test);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: encodeURIComponent(data)
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/provider/get/${provider_list}`, requestOptions).then(async response => {
            const isJson = response.headers.get('content-type') ?. includes('application/json');
            const data = isJson && await response.json();
            // console.log(response);

            // check for error response
            if (!response.ok) { // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                setProviderData([]);
                return Promise.reject(error);
            } else {
                setProviderData(data.data);
                setLoader(false);
                setSelectProviderListRow('');

            }

        }).catch(error => {
            console.error('There was an error!', error);
        });
    }


    const getProviderListDetails = (data) => {
        var provider_list = data.pharmacy_list;
        var provider_nabp = data.pharmacy_nabp;

        var test = {};
        test.pharmacy_nabp = provider_nabp;
        setSelectProviderListRow(test);

        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: encodeURIComponent(data)
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/provider/details/${provider_list}/${provider_nabp}`, requestOptions).then(async response => {
            const isJson = response.headers.get('content-type') ?. includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) { // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                setProviderFormData(data.data);
                scollToRef.current.scrollIntoView();
                setAdding(true);
                return;
            }
        }).catch(error => {
            console.error('There was an error!', error);
        });
    }


    const searchProvider = (fdata) => {
        setLoading(true);

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/provider/search?search=${
            fdata.target.value
        }`, requestOptions).then(async response => {
            const isJson = response.headers.get('content-type') ?. includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) { // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                setProviderValidationsData([]);
                return Promise.reject(error);

            } else {
                setProviderValidationsData(data.data);
                setLoading(false);
                setProviderFormData([]);
                setSelctedProviderRow('');
                setSelectProviderListRow('');
                setProviderData([]);
                document.getElementById('providerForm').reset();
                return;
            }

        }).catch(error => {
            console.error('There was an error!', error);
        });
    }
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li>
                                <a href="">Home</a>
                            </li>
                            <li>
                                <i className="fas fa-angle-right"></i>
                            </li>
                            <li>
                                <a href="">Validation List</a>
                            </li>
                            <li>
                                <i className="fas fa-angle-right"></i>
                            </li>
                            <li>
                                <a href="">Provider</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="breadcrum ">
                        <ul>
                            <li className="float-end m-0">
                                <a href="">Page Hint
                                    <i className="fa-solid fa-lightbulb"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <SearchProviderValidation searchProvider={searchProvider}/>
            <ProviderList key='proivder_list'
                providerValidationListData={providerValidationsData}
                providerData={providerData}
                getProviderList={getProviderLists}
                getProviderListDetails={getProviderListDetails}
                selctedProviderRow={selctedProviderRow}
                loading={loading}
                loader={loader}
                selectProviderListRow={selectProviderListRow}/>
            <div ref={scollToRef}>
                <ProviderValidationForm viewProviderFormData={providerFormData}
                    clearForm={clearForm}
                    adding={adding} resetForm={resetForm} />
            </div>
            <Footer/>


        </>
    )
}


function ProviderValidationRow(props) {
    useEffect(() => {}, [props.selected]);

    return (
        <>
            <tr className={
                    (props.selected && props.providerValidationRow.pharmacy_list == props.selected.provider_list ? ' tblactiverow ' : '')
                }

                onClick={
                    () => props.getProviderList(props.providerValidationRow.pharmacy_list)
            }>
                <td>{
                    props.providerValidationRow.pharmacy_list
                }</td>
                <td>{
                    props.providerValidationRow.exception_name
                }</td>
            </tr>
        </>
    )
}


function ProviderRows(props) {
    useEffect(() => {}, [props.selected]);

    return (
        <>
            <tr className={
                    (props.selected && props.providerRow.pharmacy_nabp == props.selected.pharmacy_nabp ? ' tblactiverow ' : '')
                }
                onClick={
                    () => props.getProviderListDetails(props.providerRow)
            }>
                <td>{
                    props.providerRow.pharmacy_nabp
                }</td>
                <td>{
                    props.providerRow.pharmacy_status == 'A' ? 'Approved' : 'Rejected'
                }</td>
                <td>{
                    props.providerRow.pharmacy_name
                }</td>
            </tr>
        </>
    )
}

function SearchProviderValidation(props) {


    const searchProvider = (fdata) => {
        props.searchProvider(fdata);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Provider Validation ID/Name</small>
                                <input type="text"
                                    onKeyUp={
                                        (e) => searchProvider(e)
                                    }
                                    className="form-control"
                                    placeholder='Start typing provider validation ID/name to search'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProviderList(props) {


    const scollToRef = useRef();

    useEffect(() => {}, [props.selctedProviderRow]);

    const getProviderList = (provider_list) => {
        props.getProviderList(provider_list);
    }

    const getProviderListDetails = (data) => {
        props.getProviderListDetails(data);
    }

    // Provider Validation List
    const providerValidationListArray = [];
    if (props.providerValidationListData.length > 0) {
        for (let i = 0; i < props.providerValidationListData.length; i++) {
            providerValidationListArray.push (
                <ProviderValidationRow key={
                        'provider_validation_row' + [i]
                    }
                    providerValidationRow={
                        props.providerValidationListData[i]
                    }
                    getProviderList={getProviderList}
                    selected={
                        props.selctedProviderRow
                    }/>
            );
        }
    } else {
        providerValidationListArray.push (
            <EmptyRowComponent colSpan='2'/>
        );
    }


    const providerListArray = [];
    if (props.providerData.length > 0) {
        for (let j = 0; j < props.providerData.length; j++) {
            providerListArray.push (
                <ProviderRows key={
                        'provider_row' + [j]
                    }
                    providerRow
                    ={props.providerData[j]}
                    getProviderListDetails={getProviderListDetails}
                    selected={
                        props.selectProviderListRow
                    }/>
            );
        }
    } else {
        providerListArray.push (
            <EmptyRowComponent colSpan='3'/>
        )
    }


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Provider Validation List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end"></div>
                        <div className="col-md-6">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={
                                        {
                                            height: '400px',
                                            overflowY: 'scroll'
                                        }
                                    }>
                                        <table className="table table-striped table-bordered"
                                            style={
                                                {position: 'relative'}
                                        }>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Provider Validation ID</th>
                                                    <th>Provider Validation Name</th>
                                                </tr>
                                            </thead>
                                            <tbody> {
                                                props.loading ? <LoadingSpinner colSpan='2'/> : providerValidationListArray
                                            } </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={
                                        {
                                            height: '400px',
                                            overflowY: 'scroll'
                                        }
                                    }>
                                        <table className="table table-striped table-bordered"
                                            style={
                                                {position: 'relative'}
                                        }>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Provider ID</th>
                                                    <th>Provider Status</th>
                                                    <th>Provider Name</th>
                                                </tr>
                                            </thead>
                                            <tbody> {
                                                props.loader ? <LoadingSpinner colSpan='3'/> : providerListArray
                                            } </tbody>
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

function ProviderValidationForm(props) {
    const { register, reset, handleSubmit,control, formState: { errors } } = useForm();
    const { user } = useAuth();

    // useEffect(() => { reset(props.viewProviderFormData) }, [props.viewProviderFormData]);

    useEffect(() => {
        if (!props.adding) {
            reset({
                pharmacy_list: '',
                exception_name: '',
                pharmacy_nabp: '',
                pharmacy_status: '',
                new: 1
            }, {keepValues: false})
        } else {
            reset(props.viewProviderFormData)
        }
    }, [props.viewProviderFormData]);


    const addProviderFormData = (formData) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/provider/submit-provider-form`, requestOptions).then(async response => {
            const isJson = response.headers.get('Content-Type') ?. includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                toast.error("There was an error !", {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined
                });
            } else {
                toast.success(data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined
                });
                props.resetForm();
            }
        }).catch(error => {
            console.error('There was an error !', error);
        });
    }

    // const [providerValue, setProviderValue] = useState(props.viewProviderFormData.pharmacy_nabp);

    //provider id  options using API call
    const loadProviderOptions = (inputProviderValue) => {
        return new Promise((resolve) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/provider/provider-list-drop-down/${inputProviderValue}`)
                .then((response) => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ pharmacy_nabp,pharmacy_name }) => ({
                            value: pharmacy_nabp,
                            label: pharmacy_nabp+' - '+pharmacy_name,
                        })),
                    );
                });
        });
    };


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <form id="providerForm" name="providerForm"
                        onSubmit={
                            handleSubmit(addProviderFormData)
                    }>
                        <div className="row">
                        <input type="hidden" name="user_name" value={user.name} {...register('user_name')} />
                            <div className="col-md-12">
                                <h5 className="mb-2">Provider</h5>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Provider List ID</small>
                                    <input type="text" className="form-control" name="pharmacy_list" {...register('pharmacy_list', {required:true})} id="pharmacy_list" placeholder="Provider List ID"/> {
                                    errors.pharmacy_list && <span>
                                        <p className='notvalid'>This field is required.</p>
                                    </span>
                                } </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Provider List Name</small>
                                    <input type="text" className="form-control" name="exception_name" {...register('exception_name', { required: true })} id="" placeholder=""/> {
                                    errors.exception_name && <span>
                                        <p className='notvalid'>This field is required.</p>
                                    </span>
                                } </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Provider ID</small>

                                    <Controller  name="pharmacy_nabp"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                {...field}
                                                        isClearable
                                                        // value={{ value: 'ARX7128'}}
                                                        // inputValue={props.viewProviderFormData.pharmacy_nabp }
                                                        loadOptions={loadProviderOptions}
                                                    />
                                                    )} />

                                    {/* <input type="text" className="form-control" name="pharmacy_nabp" {...register('pharmacy_nabp', { required: true })} id="" placeholder="" /> */}
                                    {
                                    errors.pharmacy_nabp && <span>
                                        <p className="notvalid">This field is required.</p>
                                    </span>
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Provider Status</small>
                                    <select className="form-select" name="pharmacy_status" {...register('pharmacy_status', {required:true})}>
                                        <option value="">--select--</option>
                                        <option value="A">Approved</option>
                                        <option value="R">Rejected</option>
                                    </select>
                                    {
                                    errors.pharmacy_status && <span>
                                        <p className='notvalid'>This field is required.</p>
                                    </span>
                                } </div>
                            </div>
                            <div className="col-md-12 text-end">
                                <button  type="submit" className="btn btn-primary ">{ props.adding?'Update':'Add'}
                                </button>&nbsp;&nbsp;&nbsp;
                                <button onClick={
                                        e => props.clearForm(e)
                                    }
                                    type="button"
                                    className="btn btn-danger">
                                    Clear
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
