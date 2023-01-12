import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import AsyncSelectNew from 'react-select';

export default function MacList() {
    const [macList, setMacList] = useState([]);
    const [macDesc, setMacDesc] = useState([]);
    const [macForm, setMacForm] = useState([]); //for 2nd table
    const [priceSource, setPriceSource] = useState([]);
    const [priceSouceData, setPriceSourceData] = useState([]);
    const [priceType, setPriceType] = useState([]);
    const [priceTypeData, setPriceTypeData] = useState([]);
    const [adding, setAdding] = useState(false);
    const [macListDesc, setMacListDesc] = useState('');

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
        setMacListDesc(row); 
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
        setMacForm(macData);
    }

    const clearForm = () => {
        setAdding(true);
        setMacForm('');
    }

    const loadPriceSource = () => {
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/mac-list/get-price-source`)
            .then((res) => res.json())
            .then((priceSource) => {
                const arrayPriceSource = priceSource.data.map((item) => ({
                    label: item.price_label,
                    value: item.price_id
                }));
                setPriceSource(arrayPriceSource);
                // const transaction_association_exists = arrayTransactionAssociation.some(v => (v.value == plan_data.use_default_ccg));
                // if (transaction_association_exists) {
                //     var data = arrayTransactionAssociation.filter(item => item.value === plan_data.use_default_ccg)
                //     setTransactionAssociationData(data);
                // }
            });
    }

    const loadPriceType = () => {
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/mac-list/get-price-type`)
            .then((res) => res.json())
            .then((priceType) => {
                const arrayPriceType = priceType.data.map((item) => ({
                    label: item.price_type_label,
                    value: item.price_type_id
                }));
                setPriceType(arrayPriceType);
            });
    }


    useEffect(() => {
    }, [macList, macDesc, macForm, priceSource, priceSouceData, priceType, priceTypeData]);

    useEffect(() => {
        loadPriceSource();
        loadPriceType();
    }, []);

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

            <MACListForm macDesc={macForm} priceSource={priceSource} priceSouceData={priceSouceData} setPriceSourceData={setPriceSourceData}
                priceType={priceType} priceTypeData={priceTypeData} setPriceTypeData={setPriceTypeData} adding={adding} clearForm={clearForm} />
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
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // console.log(props.macDesc);

    useEffect(() => {
        if (props.adding) {
            reset({ mac_list: '', mac_desc: '', gpi: '', effective_date:'', termination_date:'', price_source:'', price_type:'', mac_amount: '', allow_fee:'', add_new: 1 }, {
                keepValues: false,
            })
        }
        reset(props.macDesc)
    }, [props.macDesc]);
    const submitMacList = (mac_list_form_data) => {
        console.log(mac_list_form_data)

        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(mac_list_form_data)
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/mac-list/submit`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                });
                console.log(data.data);
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit(submitMacList)} name="macListForm">
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
                                    <input type="text" className="form-control" placeholder="Mac List" {...register("mac_list", { required: true })} autoComplete="off"
                                      readOnly={props.macDesc.mac_list ? true : false} />
                                    {errors.mac_list && <span><p className='notvalid'>This field is required!</p></span>}
                                </div>
                            </div>
                            <div className="col-md-8 mb-3">
                                <div className="form-group">
                                    <small>MAC Description</small>
                                    <textarea rows="1" cols="2" className="form-control" {...register("mac_desc")} placeholder="Surgical Test"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-2 ">
                            <p><b>Generic Product ID: </b></p>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>Generic Product ID: (dropdown)</small>
                                    <input type="text" className="form-control" placeholder="30000" {...register("gpi")} autoComplete="off" />

                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="form-group">
                                    <small>Effective Date: </small>
                                    <input type="date" className="form-control" placeholder="0" {...register("effective_date")} autoComplete="off" />

                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="form-group">
                                    <small>Termination Date: </small>
                                    <input type="text" className="form-control" placeholder="83" {...register("termination_date")} autoComplete="off" />

                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="form-group">
                                    <small>Price Source: </small>
                                    {/* <select className="form-select" {...register("price_source", { required: true })}>
                                    <option>Predifined Calculation</option>
                                </select> */}
                                    <AsyncSelectNew
                                        placeholder="Select price source"
                                        options={props.priceSource}
                                        name="price_source"
                                        value={props.priceSourceData}
                                        onChange={(e) => props.setPriceSourceData(e)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="form-group">
                                    <small>Price Type: </small>
                                    <AsyncSelectNew
                                        placeholder="Select Price Type"
                                        options={props.priceType}
                                        name="price_type"
                                        value={props.priceTypeData}
                                        onChange={(e) => props.setPriceTypeData(e)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="form-group">
                                    <small>Maximum Available Cost: </small>
                                    <input type="text" className="form-control" placeholder="83" {...register("mac_amount")} autoComplete="off" />
                                </div>
                            </div>
                            <div className="col-md-4 mb-4 mt-4">
                                <div className="form-group">
                                    <input type="checkbox" id="ReturnMaxQ" {...register("allow_fee")} className="d-none" value="1" />
                                    <label htmlFor="ReturnMaxQ"> Allow Fee (Rx/OTC) </label>
                                </div>
                            </div>
                            <div className="col-md-12 ">
                                <div className="float-end">
                                    {/* <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a> */}
                                    <button type='submit' className='btn btn-theme pt-2 pb-2'>{props.macDesc.mac_list != null ? "Update" : "Add"}</button>
                                </div>
                            </div>
                            <div className="col-md-12 ">
                                <div className="float-end">
                                    {props.macDesc.mac_list ? <button type='button' onClick={props.clearForm} className='btn btn-warning'>Clear</button> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}