import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SuperProvider() {


    
    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');


    const [adding, setAdding] = useState(false);
    const [benifitsData, setBenifitData] = useState(false);



    const AddForm = () => {
        setNdClass(false);
        setAdding(true);

    }


    useEffect(() => {
        if (selctedNdc) {
            setAdding(false);

        } else {
            setAdding(true);
            setSelctedNdc(false);
        }

        document.title = 'Benefit Code | ProHealthi';

    }, [selctedNdc, adding]);

    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/supernetwork/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                console.log(data.data);

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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/supernetwork/get/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setSelctedNdc([]);
                    return Promise.reject(error);
                } else {
                    setSelctedNdc(data.data);
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



        //  console.log(ndcid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/supernetwork/get/${ndcid}`, requestOptions)
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
                    setNdClass([data.data]);
                    // scollToRef.current.scrollIntoView()
                    // return;
                    console.log(ndcClass);
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    



    



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
                                <li><a href="">Super Provider Network</a></li>
                            </ul>
                        </div>
                    </div>
                                        
<div className="col-md-3 ms-auto text-end">
                    <button className="btn  btn-info btn-sm" onClick={e => AddForm()}>
                    Super Provider Networks <i className="fa fa-plus-circle"></i></button>
            </div>

                    <SearchSuperProvider searchException={searchException} />


                    <SuperProviderList ndcListData={ndcData} ndcClassData={ndcClass}  getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails}  selected={benifitsData}  selctedNdc={selctedNdc} />


                    <SuperProviderForm   adding={adding} viewDiagnosisFormdata={selctedNdc} selected={benifitsData}/> 

                </div>
            </div>
            
        </>
    )
}

function SearchSuperProvider(props)
{
    const searchException = (fdata) => {
        // alert(fdata);

        props.searchException(fdata);
    }
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Super Provider NetWork </small>
                                <input type="text" onKeyUp={(e) => searchException(e)}  className="form-control" onkey placeholder='Start typing super provider network id/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




function NdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.super_rx_network_id == props.selected.super_rx_network_id ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItemDetails(props.ndcRow.super_rx_network_id)}
            >
                <td>{props.ndcRow.super_rx_network_id}</td>
                <td >{props.ndcRow.super_rx_network_id_name}</td>
              


                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function NdcClassRow(props) {

    

    useEffect(() => {

    }, [props.selected]);

    return (
        <>
            <tr className={(props.selected && props.ndcClassRow.super_rx_network_id == props.selected.super_rx_network_id ? ' tblactiverow ' : '')}

onClick={() => props.getNDCItems(props.ndcClassRow.super_rx_network_id)}
>
                <td>{props.ndcClassRow.super_rx_network_priority}</td>
                <td>{props.ndcClassRow.super_rx_network_id}</td>
                <td>{props.ndcClassRow.effective_date}</td>
                <td>{props.ndcClassRow.rx_network_type}</td>
                <td>{props.ndcClassRow.price_schedule_ovrd}</td>


                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function SuperProviderList(props)
{


    const scollToRef = useRef();

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
        ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItemDetails={getNDCItemDetails}   selected={props.selctedNdc} />);
    }

    const ndcClassArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        ndcClassArray.push(<NdcClassRow  ndcClassRow={props.ndcClassData[j]} getNDCItems={getNDCItem} />);
    }

    const [ncdListData, setNcdListData] = useState();
    const [show, setShow] = useState("none");
    const handleShow = () => setShow("block");
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Super Provider Network List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>NETWORK ID</th>
                                                    <th>NAME</th>
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
                                                    <th>Priority</th>
                                                    <th>Network Id</th>
                                                    <th>eff. Date</th>
                                                    <th>Network Type</th>
                                                    <th>Price schedule</th>
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

function SuperProviderForm(props)
{

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
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
            fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/superprovider/add`, requestOptions)
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


    useEffect(() => { reset(props.viewDiagnosisFormdata) }, [props.viewDiagnosisFormdata]);
    return(
        <>
<form onSubmit={handleSubmit(addCode)} >

        <div class="data col-md-12">
                    <div class="card mt-3 mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="row">
                                    <div class="col-md-12">
                                        <h5 class="mb-2">Super Provider Network</h5>
                                        <h5 className="mb-2">Prioritize Networks  {props.adding ? ' - (Adding)' : '- (' + props.viewDiagnosisFormdata.super_rx_network_id + ' )'}</h5>

                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>Super Network ID</small>
                                            <input type="text" class="form-control" name="super_rx_network_id" {...register('super_rx_network_id')} id="" placeholder="" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>Super Network Name</small>
                                            <input type="text" class="form-control" name="super_rx_network_id_name" {...register('super_rx_network_id_name')} id="" placeholder="" required />
                                        </div>
                                    </div>
                                    
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Provider Network</h5>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Provider Network ID</small>
                                                <input type="text" class="form-control" name="rx_network_id" {...register('rx_network_id')} id="" placeholder="" required />
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Super Network Priority</small>
                                                <input type="text" class="form-control" name="super_rx_network_priority" {...register('super_rx_network_priority')} id="" placeholder=""  />
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Effective Date</small>
                                                <input type="date" class="form-control" name="effective_date" {...register('effective_date')} id="" placeholder=""  />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Termination Date</small>
                                                <input type="date" class="form-control" name="termination_date" {...register('termination_date')} id="" placeholder=""  />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Pricing</h5>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Price Schedule Override</small>
                                                <input type="text" class="form-control" name="price_schedule_ovrd" {...register('price_schedule_ovrd')} id="" placeholder="" />
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        
                                        
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Communication Charges</h5>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Paid/Accepted</small>
                                                <input type="text" class="form-control" name="comm_charge_paid" {...register('comm_charge_paid')} id="" placeholder="" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Reject/Reversal</small>
                                                <input type="text" class="form-control" name="comm_charge_reject" {...register('comm_charge_reject')} id="" placeholder="" />
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
                                                        <input type="text" class="form-control" name="min_rx_qty" {...register('min_rx_qty')} id="" placeholder="Minimum" />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" name="max_rx_qty"  {...register('max_rx_qty')} id="" placeholder="Maximum"  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Days Supply</small>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" name="days_supply_opt" {...register('days_supply_opt')} id="" placeholder="Minimum"  />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" name="days_supply_opt" {...register('days_supply_opt')} id="" placeholder="Maximum"  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Retail Fills</small>
                                                <input type="text" class="form-control" name="max_retail_fills" {...register('max_retail_fills')} id="" placeholder="Maximum"  />
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Fills</small>
                                                <input type="text" class="form-control" name="max_fills_opt" {...register('max_fills_opt')} id="" placeholder="Maximum"  />
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Starter Dose Date</small>
                                                <input type="text" class="form-control" name="starter_dose_bypass_days" {...register('starter_dose_bypass_days')} id="" placeholder="Maximum"  />
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Starter Dose Bypass Days</small>
                                                <input type="text" class="form-control" name="starter_dose_bypass_days" {...register('starter_dose_bypass_days')} id="" placeholder="Maximum"  />
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>St. Dose Maint. Bypass Days</small>
                                                <input type="text" class="form-control" name="starter_dose_maint_bypass_days"  {...register('starter_dose_maint_bypass_days')} id="" placeholder="Maximum"  />
                                            </div>
                                        </div>



                                    </div>

                                </div>





                            </div>
                            <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>

                        </div>

                    </div>
                </div>

        </form>
        


        </>
    )
}
