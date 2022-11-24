import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ProcedureUCRList() {

    const [procName, setProcName] = useState([]);
    const [procList, setProcList] = useState([]);
    const [procForm, setProcForm] = useState([]);
    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/procedure-ucr-list/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setProcName(data.data);
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
    }

    const getListData = (row) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/procedure-ucr-list/get-procedure-list-data?search=${row.procedure_ucr_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setProcList(data.data);
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
    }

    const getFormData = (formdata) => {
        setProcForm(formdata);
    }

    useEffect(() => { }, [procName, procList, procForm]);
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href=""> Third Party Pricing </a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href=""> Procedure UCR List </a></li>
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

            <SearchProcedureUCRList onSearch={onSearch} />
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    {/* <div style={{ height: '400px', overflowY: 'scroll' }}> */}
                    <div className="col-md-12">
                        <h5 className="mb-2">Procedure UCR List</h5>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <ProcedureList procName={procName} getListData={getListData} procForm={procForm} />
                        </div>
                        <div className="col-md-6">
                            <ProcedureDesc procList={procList} getFormData={getFormData} procForm={procForm} />
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
            <ProcedureListForm procForm={procForm} />
        </>
    )
}

function SearchProcedureUCRList(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Procedure UCR List </small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing procedure UCR list id/ description to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProcedureList(props) {
    const nameArray = [];
    for (let i = 0; i < props.procName.length; i++) {
        nameArray.push(<NameRow nameRowData={props.procName[i]} getListData={props.getListData} procForm={props.procForm} />);
    }
    return (
        <>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                <table className="table  table-bordered">
                    <thead className='stickt-thead'>
                        <tr>
                            <th>Procedure UCR ID</th>
                            <th>Procedure UCR Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nameArray}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function NameRow(props) {
    return (
        <>
            <tr onClick={e => props.getListData(props.nameRowData)}
                className={(props.procForm && props.procForm.procedure_ucr_id == props.nameRowData.procedure_ucr_id ? 'tblactiverow' : '')}>
                <td>{props.nameRowData.procedure_ucr_id}</td>
                <td>{props.nameRowData.description}</td>
            </tr>
        </>
    )
}

function ProcedureDesc(props) {
    const listArray = [];
    for (let i = 0; i < props.procList.length; i++) {
        listArray.push(<ListRow listRowData={props.procList[i]} getFormData={props.getFormData} procForm={props.procForm} />);
    }
    return (
        <>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                <table className="table  table-bordered">
                    <thead className='stickt-thead'>
                        <tr>
                            <th>Effective Date</th>
                            <th>Procedure Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listArray}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function ListRow(props) {
    return (
        <>
            <tr onClick={e => props.getFormData(props.listRowData)}
                className={(props.procForm && props.listRowData.procedure_code == props.procForm.procedure_code ? 'tblactiverow' : '')}>
                <td>{props.listRowData.effective_date}</td>
                <td>{props.listRowData.procedure_code}</td>
            </tr>
        </>
    )
}

function ProcedureListForm(props) {
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => { reset(props.procForm) }, [props.procForm]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">

                    <div className="row mb-2">
                        <div className="col-md-12">
                            {/* <h5 className="mb-2">Procedure UCR List: SANDELS_UC, Proc. Code:11420, Eff. Date:01-01-2001</h5> */}
                        </div>
                        <p><b>UCR List : </b></p>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <small>UCR List</small>
                                <input type="text" className="form-control" placeholder="Surgical" {...register("procedure_ucr_id", { required: true })} autoComplete="off" />

                            </div>
                        </div>
                        <div className="col-md-8 mb-3">
                            <div className="form-group">
                                <small>UCR Description</small>
                                <textarea rows="1" cols="2" className="form-control" {...register("description", { required: true })} placeholder="Surgical Test"></textarea>

                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row mb-2 ">
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <small>Procedure Code: </small>
                                <input type="text" className="form-control" placeholder="30000" {...register("procedure_code", { required: true })} autoComplete="off" />

                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="form-group">
                                <small>Effective Date: </small>
                                <input type="date" className="form-control" placeholder="0" {...register("effective_date", { required: true })} autoComplete="off" />

                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="form-group">
                                <small>Termination Date: </small>
                                <input type="text" className="form-control" placeholder="83" {...register("termination_date", { required: true })} autoComplete="off" />

                            </div>
                        </div>


                        <div className="col-md-3 mb-4">
                            <div className="form-group">
                                <small>Unit Value: </small>
                                <input type="text" className="form-control" placeholder="83" {...register("unit_value", { required: true })} autoComplete="off" />

                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="form-group">
                                <small>UCR: </small>
                                <input type="text" className="form-control" placeholder="83" {...register("ucr_currency", { required: true })} autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-md-12 ">
                            <div className="float-end">
                                <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: "100%" }}>Next</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}