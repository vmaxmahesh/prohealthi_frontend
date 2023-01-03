import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { Alert } from 'react-bootstrap';
import { Button, Col, Row } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';






function TraditionalNetworks(props) {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
    const { register, handleSubmit, watch, reset, control, formState: { errors } } = useForm();
    const [adding, setAdding] = useState(false);


    const [provider, setProvider] = useState([]);
    const [ProviderData, setProviderdata] = useState([]);

    const [tableData, settableData] = useState([]);

    const [traditionalnetwork, SetTraditionalNetwork] = useState([]);
    const [customerlist, setCustomerlist] = useState([]);

    const [traditionalData, setTraditionalData] = useState(false);






    const scollToRef = useRef();
    const [customer, setCustomer] = useState([]);




    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');


    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/traditionalnetwork/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                // console.log(data.data);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setNdcData([]);
                    return Promise.reject(error);

                } else {
                    setNdcData(data.data);
                    return;
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }



    const getNDCItems = (ndcid) => {
        // ndc_exception_list
        var test = {};
        test.ndc_exception_list = ndcid;
        setSelctedNdc(test);

        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/traditionalnetwork/get/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setNdClass([]);
                    return Promise.reject(error);
                } else {
                    // console.log(data.data);
                    setNdClass(data.data);

                    // scollToRef.current.scrollIntoView()
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getNDCItemDetails = (ndcid) => {
        console.log(ndcid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/traditionalnetwork/details/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setTraditionalData(data.data);

                    // scollToRef.current.scrollIntoView()
                    // return;
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        if (traditionalData) {
            setAdding(false);

        } else {
            setAdding(true);
            SetTraditionalNetwork(false);
        }

        document.title = 'Benefit Code | ProHealthi';

    }, [traditionalData, adding]);


    useEffect(() => {
        // fillProviderData();
    }, [ndcClass]);

    return (
        <>

            <div className="dashboard-content clearfix">

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Provider Data</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Treditional Network</a></li>
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

                <div className="col-md-12 mb-3">
                    {/* <h4 >Search Client</h4> */}

                    <SearchTraditionalNetwork searchException={searchException} />


                    <TraditionalNetworkList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />

                    <TraditionalNetworkForm formData={traditionalData} selected={traditionalData} adding={adding} />




                </div>


                <Footer />
            </div>
        </>
    )
}





function SearchTraditionalNetwork(props) {



    const searchException = (fdata) => {

        props.searchException(fdata);
    }


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Traditional NetWork </small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing traditional network id/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function TraditionalNetworkList(props) {

    useEffect(() => { }, [props.selctedNdc]);
    // //  console.log(props.selctedNdc);

    const getNDCItem = (ndciemid) => {
        props.getNDCItem(ndciemid);
    }

    const getNDCItemDetails = (ndciemid) => {
        props.getNDCItemDetails(ndciemid);
    }

    const ndcListArray = [];
    for (let i = 0; i < props.ndcListData.length; i++) {
        ndcListArray.push(<TraditionalNdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} selected={props.selctedNdc} />);
    }


    const ndcClassArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        ndcClassArray.push(<TraditionalNdcClassRow ndcClassRow={props.ndcClassData[j]} getNDCItemDetails={getNDCItemDetails} selected={props.selctedNdc} />);
    }






    // const CustomerList = [];
    // // for (let i = 0; i < props.customers.length; i++) {
    // //     CustomerList.push(<Cutomer customer={props.customers[i]} getCustomer={getCustomer} />);
    // // }

    // if (props.customers.length > 0) {
    //     for (let i = 0; i < props.customers.length; i++) {
    //         CustomerList.push(<Cutomer customer={props.customers[i]} />);
    //     }
    // } else {
    //     CustomerList.push(<NoReacords/>);
    // }
    return (
        <>

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Traditional Network List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th> ID</th>
                                                    <th> Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {ndcListArray}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Effective Date</th>
                                                    <th>Termination Date</th>
                                                    <th>Price Schedule </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {ndcClassArray}


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



function NoReacords(params) {
    return (
        <>
            <tr style={{ padding: '10px', color: 'red' }}><td colspan="7">No Records Matches..!</td></tr>
        </>
    )
}


function TraditionalNdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.network_id == props.selected.network_id ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.network_id)}
            >
                <td>{props.ndcRow.network_id}</td>
                <td >{props.ndcRow.network_name}</td>


                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}


function TraditionalNdcClassRow(props) {

    useEffect(() => {

    }, [props.selected]);

    return (
        <>
            <tr
                className={(props.selected && props.ndcClassRow.pharmacy_nabp == props.selected.pharmacy_nabp ? ' tblactiverow ' : '')}
                onClick={() => props.getNDCItemDetails(props.ndcClassRow.pharmacy_nabp)}

            >
                <td>{props.ndcClassRow.pharmacy_nabp}</td>
                <td>{props.ndcClassRow.pharmacy_name}</td>
                <td>{props.ndcClassRow.effecetive_date}</td>
                <td>{props.ndcClassRow.termination_date}</td>
                <td>{props.ndcClassRow.price_schedule_ovrd}</td>


                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}



function TraditionalNetworkForm(props) {
    const { register, reset, handleSubmit, watch, control, formState: { errors } } = useForm();
    const [traditionalData, setTraditionalData] = useState(false);

    useEffect(() => { reset(props.formData) }, [props.formData]);





    const [PriceScheduleInput, setPriceScheduleInput] = useState('');
    // const [PriceScheduleInput, setPriceScheduleInput] = useState('');
    const [ndcInput, setNdcInput] = useState('');




    const handlePriceScheduleInput = (e) => {
        console.log(e)
        setPriceScheduleInput(e);
    }




    const handleNdcInput = (ndc_input) => {
        console.log(ndc_input)
        setNdcInput(ndc_input);
    }


    const loadPriceScheduleOptions = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/price-schedule/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ price_schedule }) => ({
                            price_value: price_schedule,
                            price_label: price_schedule
                        }))
                    )
                })
        })
    }

    const loadGpiList = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/gpi/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ exception_name }) => ({
                            gpi_value: exception_name,
                            gpi_label: exception_name
                        }))
                    )
                })
        })
    }


    const loadNDCList = (ndc_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/ndc/search?search=${ndc_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ exception_name }) => ({
                            ndc_value: exception_name,
                            ndc_label: exception_name
                        }))
                    )
                })
        })
    }


    const loadProviderId = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/provider/id/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ pharmacy_nabp }) => ({
                            provider_id_value: pharmacy_nabp,
                            provider_id_label: pharmacy_nabp
                        }))
                    )
                })
        })
    }

    const addCode = (data) => {
        // console.log(data);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        };
        // console.log(watch(data)); 
        if (process.env.REACT_APP_API_BASEURL == 'NOT') {
            toast.success('Added Successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        } else {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/traditionalnetwork/add`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    // console.log(response);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        reset(data.data);
                        console.log(data.data);
                        var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                        toast.success(msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,

                        });
                    }


                    if (response === '200') {
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }

    }
    const onSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {


        if (props.adding) {
            reset({ accum_bene_strategy_name: '', description: '', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ accum_bene_strategy_name: '', accum_bene_strategy_id: '', description: '', pharm_type_variation_ind: '', network_part_variation_ind: '', claim_type_variation_ind: '', plan_accum_deduct_id: '', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);


    return (
        <>
            <form onSubmit={handleSubmit(addCode)} >
                <div class="data">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#Network" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Network</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Providers" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Providers</button>
                    </div>

                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="Network" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div class="card mt-3 mb-3">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Network</h5>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Network ID</small>
                                                <input type="text" class="form-control" name="" {...register('network_id')} id="" placeholder="" required="" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Network Name</small>
                                                <input type="text" class="form-control" name="network_name" {...register('network_name')} id="" placeholder="" required="" />
                                            </div>
                                        </div>
                                        <div class="clearfix mb-1"></div>
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h5 class="mb-2">Pricing</h5>
                                                </div>
                                                <div class="col-md-12 mb-3">
                                                    <div class="form-group">

                                                        <small>Price Schedule Override</small>


                                                        <Controller name="price_schdule"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <AsyncSelect
                                                                    {...field}
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    // value={selectedValue}
                                                                    getOptionLabel={e => e.price_label}
                                                                    getOptionValue={e => e.price_value}
                                                                    loadOptions={loadPriceScheduleOptions}
                                                                    onInputChange={handlePriceScheduleInput}
                                                                    // onChange={handleChange}
                                                                    placeholder="Price Schedule 2"
                                                                    value={{ price_label: props.formData.price_schedule_ovrd, price_value: props.formData.price_schedule_ovrd }}

                                                                />
                                                            )} />                                               </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <h5 class="mb-2">Communication Charges</h5>
                                                </div>
                                                <div class="col-md-6 mb-3">
                                                    <div class="form-group">
                                                        <small>Paid/Accepted</small>
                                                        <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6 mb-3">
                                                    <div class="form-group">
                                                        <small>Reject/Reversal</small>
                                                        <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <h5 class="mb-2">Formulary Exceptions</h5>
                                                </div>
                                                <div class="col-md-6 mb-3">
                                                    <div class="form-group">
                                                        <small>By GPI List</small>

                                                        <Controller name="gpi_list"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <AsyncSelect
                                                                    {...field}
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    getOptionLabel={e => e.gpi_label}
                                                                    getOptionValue={e => e.gpi_value}

                                                                    loadOptions={loadGpiList}
                                                                    onInputChange={handlePriceScheduleInput}
                                                                    // onChange={handleChange}
                                                                    placeholder="Gpi List"
                                                                    value={{ gpi_label: props.formData.gpi_exception_list_ovrd, gpi_value: props.formData.gpi_exception_list_ovrd }}

                                                                />
                                                            )} />
                                                    </div>
                                                </div>
                                                <div class="col-md-6 mb-3">
                                                    <div class="form-group">
                                                        <small>By NDC List</small>

                                                        <Controller name="ndc_list"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <AsyncSelect
                                                                    {...field}
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    // value={selectedValue}
                                                                    getOptionLabel={e => e.ndc_label}
                                                                    getOptionValue={e => e.ndc_value}

                                                                    loadOptions={loadNDCList}
                                                                    onInputChange={handleNdcInput}
                                                                    placeholder="NDC List"
                                                                    value={{ ndc_label: props.formData.gpi_exception_list_ovrd, ndc_value: props.formData.gpi_exception_list_ovrd }}

                                                                />
                                                            )} />
                                                        {/* <a href=""><span class="fa fa-search form-icon"></span></a> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h5 class="mb-2">Rx Limitations</h5>
                                                </div>

                                                <div class="col-md-12 mb-3">
                                                    <div class="form-group">
                                                        <small>Rx Quantity</small>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <input type="text" class="form-control" name="" id="" placeholder="Minimum" required="" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mb-3">
                                                    <div class="form-group">
                                                        <small>Days Supply</small>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <input type="text" class="form-control" name="" id="" placeholder="Minimum" required="" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-12 mb-3">
                                                    <div class="form-group">
                                                        <small>Retail Fills</small>
                                                        <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mb-3">
                                                    <div class="form-group">
                                                        <small>Fills</small>
                                                        <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mb-3">
                                                    <div class="form-group">
                                                        <small>Starter Dose Date</small>
                                                        <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mb-3">
                                                    <div class="form-group">
                                                        <small>Starter Dose Bypass Days</small>
                                                        <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mb-3">
                                                    <div class="form-group">
                                                        <small>St. Dose Maint. Bypass Days</small>
                                                        <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="tab-pane fade" id="Providers" role="tabpanel" aria-labelledby="nav-profile-tab">

                            <div class="card mt-3 mb-3">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Providers within Network</h5>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <small>Provider ID</small>

                                                <Controller name="pharmacy_nabp"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <AsyncSelect {...register('pharmacy_nabp')}
                                                            {...field}
                                                            cacheOptions
                                                            defaultOptions
                                                            getOptionLabel={e => e.provider_id_label}
                                                            getOptionValue={e => e.provider_id_value}
                                                            loadOptions={loadProviderId}
                                                            onInputChange={handlePriceScheduleInput}
                                                            // onChange={handleChange}
                                                            placeholder="Provider Id"
                                                            value={{ provider_id_label: props.formData.pharmacy_nabp, provider_id_value: props.formData.pharmacy_nabp }}

                                                        />
                                                    )} />
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group mb-3">
                                                <small>Price Schedule2</small>

                                                <Controller name="price_schdule"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <AsyncSelect
                                                            {...field}
                                                            cacheOptions
                                                            defaultOptions
                                                            // value={selectedValue}
                                                            getOptionLabel={e => e.price_label}
                                                            getOptionValue={e => e.price_value}
                                                            loadOptions={loadPriceScheduleOptions}
                                                            onInputChange={handlePriceScheduleInput}
                                                            // onChange={handleChange}
                                                            placeholder="Price Schedule 2"
                                                            value={{ price_label: props.formData.price_schedule_ovrd, price_value: props.formData.price_schedule_ovrd }}

                                                        />
                                                    )} />
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group mb-3 mt-4">
                                                <small>&nbsp;</small>
                                                <input type="checkbox" id="male" class="d-none" />
                                                <label for="male">Parcipation Denied</label>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group mb-3">
                                                <small>Effective Date</small>
                                                <input type="date" class="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group mb-3">
                                                <small>Termination Date</small>
                                                <input type="date" class="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                            </div>
                                        </div>
                                        <div class="clearfix mb-2"></div>

                                        <div class="col-md-6 ms-auto text-end mb-3">
                                            <button href="" class="btn btn-danger">Clear</button>&nbsp;&nbsp;
                                            <button href="" class="btn btn-warning ">Remove From List</button>&nbsp;&nbsp;
                                            {/* <a href="provider-search.html" class="btn btn-info">Add to List</a> */}
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>

                </div>

            </form>

        </>
    )
}




function Cutomer(props) {
    return (
        <>
            <tr>
                <td>{props.customer.customer_id}</td>
                <td>{props.customer.customer_name}</td>
                <td><Button variant="primary" onClick={() => props.getCustomer(props.customer.customer_id)}>View</Button></td>
            </tr>
        </>
    )
}


function TraditionalNetworkRow(props) {

    const currentpath = location.pathname.split('/').pop();

    const [display, setDisplay] = useState('');


    const [show, setShow] = useState(false);


    const handleshow = (e) => {
        setDisplay('show');

        // console.log(display);


    }

    return (
        <>
            <tr>
                <td>{props.datar.id}</td>

                <td><button type="submit" onClick={handleshow} className="btn btn-sm btn-info" id="show"><i className="fa fa-eye"></i> View</button></td>

            </tr>
        </>
    )
}

function TraditionalNetworkResults(props) {

    // console.log(props.typedata);
    var myData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        myData.push(<TraditionalNetworkRow datar={props.typedata[index]}
        />);
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let modalData = {
        show: 'true',
        hide: 'false'
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> ID</th>
                                <th> Name</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myData}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}






function ProvidersResults(props) {

    var providersData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        providersData.push(<ProvidersRow datar={props.typedata[index]}
        />);
    }
    return (
        <>
            <div className="card mt-3 mb-3 data" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Provider ID</th>
                                        <th>Price Schedule</th>
                                        <th>Parcipation Denied</th>
                                        <th>Effective Date</th>
                                        <th>Termination Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {providersData}

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-3 ms-auto text-end">
                            {/* <button className="btn  btn-info" data-bs-
toggle="modal" data-bs-target="#exampleModal"> 
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}
                            {/* <button className="btn  btn-info" onClick={e =>
                                handleShow()}>
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* <Add show={show} handleClose={handleClose()}/> */}
            {/* <Add props={modalData} /> */}
        </>
    )
}


function ProvidersRow(props) {

    const currentpath = location.pathname.split('/').pop();

    const [display, setDisplay] = useState('');

    const [show, setShow] = useState(false);

    const handleshow = (e) => {
        setDisplay('show');

        // console.log(display);

    }

    const deleteRow = (e) => {
        alert(e.currentTarget.value);
    }

    return (
        <>
            <tr className={(props.selected && props.ndcRow.pricing_strategy_id == props.selected.pricing_strategy_id ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.pricing_strategy_id)}
            >
                <td>{props.datar.pharmacy_nabp}</td>
                <td>{props.datar.price_schedule_ovrd}</td>
                <td>{props.datar.participation_ovrd}</td>
                <td>{props.datar.effective_date}</td>
                <td>{props.datar.termination_date}</td>
                <td><button onClick={deleteRow} value={props.datar.provider_id} className="btn btn-sm btn-warning"><i className="fa fa-trash-alt"></i></button></td>
            </tr>
        </>
    )
}


export default TraditionalNetworks;