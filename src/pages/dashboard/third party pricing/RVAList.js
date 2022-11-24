import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export default function RVAList() {

    const [rvaNames, setRvaNames] = useState(false);
    const [rvaLists, setRvaLists] = useState(false);
    const [rvaFormData, setRvaFormData] = useState(false);

    const getRvaNames = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/rva-list/get`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setRvaNames(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    const getRvalist = (rva_list_id) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/rva-list/get-rva-list?search=${rva_list_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setRvaLists(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    const getRvaForm = (formdata) => {
        setRvaFormData(formdata);
    }

    useEffect(() => {
        if (!rvaNames) {
            getRvaNames();
        }
    }, [rvaNames, rvaLists, rvaFormData]);

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
                            <li><a href="">RVA Lists</a></li>
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

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">RVA List</h5>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <RvaNames rvaNames={rvaNames} getRvalist={getRvalist} rvaFormData={rvaFormData} />
                        </div>
                        <div className="col-md-6">
                            <RvaList rvaLists={rvaLists} getRvaForm={getRvaForm} rvaFormData={rvaFormData} />
                        </div>
                    </div>
                </div>
            </div>
            <RVAListForm rvaFormData={rvaFormData} />
        </>
    )
}

function RvaNames(props) {
    const namesArray = [];
    for (let i = 0; i < props.rvaNames.length; i++) {
        namesArray.push(<RvaNameRow nameRow={props.rvaNames[i]} getRvalist={props.getRvalist} rvaFormData={props.rvaFormData} />);
    }
    return (
        <>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                <table className="table  table-bordered">
                    <thead className='stickt-thead'>
                        <tr>
                            <th>RVA ID</th>
                            <th>RVA Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {namesArray}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function RvaNameRow(props) {
    return (
        <>
            <tr onClick={(e) => props.getRvalist(props.nameRow.rva_list_id)}
                className={(props.rvaFormData && props.rvaFormData.rva_list_id == props.nameRow.rva_list_id ? 'tblactiverow' : '')} >
                <td>{props.nameRow.rva_list_id}</td>
                <td>{props.nameRow.description}</td>
            </tr>
        </>
    )
}

function RvaList(props) {
    const listArray = [];
    for (let i = 0; i < props.rvaLists.length; i++) {
        listArray.push(<RvaListRow listRow={props.rvaLists[i]} getRvaForm={props.getRvaForm} rvaFormData={props.rvaFormData} />);
    }
    return (
        <>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                <table className="table  table-bordered">
                    <thead className='stickt-thead'>
                        <tr>
                            <th>Effective Date</th>
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

function RvaListRow(props) {
    return (
        <>
            <tr onClick={(e) => props.getRvaForm(props.listRow)}
                className={(props.rvaFormData && props.rvaFormData.effective_date == props.listRow.effective_date ? 'tblactiverow' : '')} >
                <td>{props.listRow.effective_date}</td>
            </tr>
        </>
    )
}

function RVAListForm(props) {

    const { register, handleSubmit, reset, watch, formState: { error } } = useForm();
    useEffect(() => { reset(props.rvaFormData) }, [props.rvaFormData]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12">
                            {/* <h5 className="mb-2">Adding</h5> */}
                        </div>
                        <div className="col-md-12">
                            <p><b>RVA List</b></p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <small>RVA List:</small>
                                <input type="text" className="form-control" placeholder="JaimaicaOTC" {...register("rva_list_id", { required: true })} autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-md-8 mb-3">
                            <div className="form-group">
                                <small>RVA Description:</small>
                                <textarea rows="1" cols="2" className="form-control" {...register("description", { required: true })} placeholder="OC Tax"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-2 ">
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <small>Effective Date: </small>
                                <input type="date" className="form-control" placeholder="0.15" {...register("effective_date", { required: true })} autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="form-group">
                                <small>Termination Date: </small>
                                <input type="date" className="form-control" placeholder="0" {...register("termination_date", { required: true })} autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="form-group">
                                <small>RVA Value : </small>
                                <input type="text" className="form-control" placeholder="0" {...register("rva_value", { required: true })} autoComplete="off" />

                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-12 ">
                                    <div className="float-end">
                                <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                            </div> 
                            </div> */}
                </div>
            </div>
        </>
    )
}