import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function MacList() {
    const [macList, setMacList] = useState([]);
    const [macDesc, setMacDesc] = useState([]);
    const [macForm, setMacForm] = useState([]);

    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/mac-list/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                setMacList(data.data);
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

    const getMacDesc = (row) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/mac-list/get-mac-list?search=${row}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setMacDesc(data.data);
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

    const getFormData = (macData) => {
        console.log(macData);
        setMacForm(macData);
    }
    useEffect(() => { }, [macList, macDesc, macForm]);

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
                            <li><a href=""> MAC List </a></li>
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
            <SearchMacList onSearch={onSearch} />
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">MAC List</h5>
                    </div>
                    <div className="row">
                        <MacIdList showMacList={macList} getMacDesc={getMacDesc} />
                        <MacDescList macDesc={macDesc} getFormData={getFormData} />
                    </div>
                </div>
            </div>

            <MACListForm macDesc={macForm} />
        </>
    )
}

function SearchMacList(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>MAC List </small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing MAC list id/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <MacIdList /> */}
        </>
    )
}

function MacIdList(props) {
    const listArray = [];
    if (props.showMacList) {
        for (let i = 0; i < props.showMacList.length; i++) {
            listArray.push(<MacRow rowData={props.showMacList[i]} getMacDesc={props.getMacDesc} />);
        }
    }


    return (
        <>

            <div className="col-md-6">
                <table className="table  table-bordered">
                    <thead>
                        <tr>
                            <th>List</th>
                            <th>Description</th>
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

function MacRow(props) {
    return (
        <>
            <tr onClick={e => props.getMacDesc(props.rowData.mac_list)}
                className={(props.selected && props.rowData.mac_list == props.selected.mac_list ? 'tblactiverow' : '')}>
                <td>{props.rowData.mac_list}</td>
                <td>{props.rowData.mac_desc}</td>
            </tr>
        </>
    )
}

function MacDescList(props) {

    const macArray = [];
    for (let i = 0; i < props.macDesc.length; i++) {
        macArray.push(<MacDescRow rowMacData={props.macDesc[i]} getFormData={props.getFormData} />);
    }
    return (
        <>
            <div className="col-md-6">
                <table className="table  table-bordered">
                    <thead>
                        <tr>
                            <th>Effective Date</th>
                            <th>GPI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {macArray}
                    </tbody>
                </table>
            </div>

        </>
    )
}


function MacDescRow(props) {
    return (
        <>
            <tr onClick={e => props.getFormData(props.rowMacData)}
                className={(props.selected && props.rowMacData.mac_list == props.selected.mac_list ? 'tblactiverow' : '')}>
                <td>{props.rowMacData.effective_date}</td>
                <td>{props.rowMacData.gpi}</td>
            </tr>
        </>
    )
}


function MACListForm(props) {
    // console.log(props.macDesc);
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => { reset(props.macDesc) }, [props.macDesc]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12">
                            {/* <h5 className="mb-2">MCA List: fr44,GPI:21700090000310, Eff. Date:20-10-2022</h5> */}
                        </div>
                        <p><b>MAC List : </b></p>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <small>MAC List</small>
                                <input type="text" className="form-control" placeholder="Surgical" {...register("mac_list", { required: true })} autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-md-8 mb-3">
                            <div className="form-group">
                                <small>MAC Description</small>
                                <textarea rows="1" cols="2" className="form-control" {...register("mac_desc", { required: true })} placeholder="Surgical Test"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-2 ">
                        <p><b>Generic Product ID: </b></p>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <small>Generic Product ID: </small>
                                <input type="text" className="form-control" placeholder="30000" {...register("gpi", { required: true })} autoComplete="off" />

                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="form-group">
                                <small>Effective Date: </small>
                                <input type="date" className="form-control" placeholder="0" {...register("effective_date", { required: true })} autoComplete="off" />

                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="form-group">
                                <small>Termination Date: </small>
                                <input type="text" className="form-control" placeholder="83" {...register("termination_date", { required: true })} autoComplete="off" />

                            </div>
                        </div>


                        <div className="col-md-4 mb-4">
                            <div className="form-group">
                                <small>Price Source: </small>
                                <select className="form-select" {...register("price_source", { required: true })}>
                                    <option>Predifined Calculation</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="form-group">
                                <small>Price Type: </small>
                                <select className="form-select" {...register("price_type", { required: true })}>
                                    <option>Usual and Customary charge</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="form-group">
                                <small>Maximum Available Cost: </small>
                                <input type="text" className="form-control" placeholder="83" {...register("mac_amount", { required: true })} autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 mt-4">
                            <div className="form-group">
                                <input type="checkbox" id="ReturnMaxQ" {...register("mac_list", { required: true })} className="d-none" />
                                <label htmlFor="ReturnMaxQ"> Allow Fee (Rx/OTC) </label>
                            </div>
                        </div>
                        <div className="col-md-12 ">
                            <div className="float-end">
                                {/* <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}