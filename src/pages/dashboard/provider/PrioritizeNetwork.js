import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import DraggableList from 'react-draggable-lists';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function PrioritizeNetwork()
{



    const scollToRef = useRef();



    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

        const [adding, setAdding] = useState(false);

    const [benifitsData, setBenifitData] = useState(false);


    const [selctedNdc, setSelctedNdc] = useState('');

    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/prioritize/search?search=${fdata.target.value}`, requestOptions)
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


    const AddForm = () => {
        setBenifitData(false);
        setAdding(true);

    }

    useEffect(() => {
        if (benifitsData) {
            setAdding(false);

        } else {
            setAdding(true);
            setBenifitData(false);
        }

        document.title = 'Benefit Code | ProHealthi';

    }, [benifitsData, adding]);


    const getNDCItems = (ndcid) => {
        // ndc_exception_list


        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/prioritize/get/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setBenifitData([]);
                    return Promise.reject(error);
                } else {
                    setBenifitData(data.data);
                    // scollToRef.current.scrollIntoView()
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    return(
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
                                <li><a href="">Prioritize Network</a></li>
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


<div className="col-md-3 ms-auto text-end">
                    <button className="btn  btn-info btn-sm" onClick={e => AddForm()}>
                    Prioritize Networks <i className="fa fa-plus-circle"></i></button>
            </div>
                    <SearchPrioritize searchException={searchException} />

                    <PrioritizeList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} selected={benifitsData} selctedNdc={selctedNdc} />


                    <PrioritizeForm   adding={adding} selected={benifitsData}   />


                </div>
            </div>
        </>
    )
}

function SearchPrioritize(props)
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
                                    <small>Prioritize NetWork </small>
                                    <input type="text" className="form-control" onKeyUp={(e) => searchException(e)} placeholder='Start typing prioritize network id/ name to search'
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

                onClick={() => props.getNDCItem(props.ndcRow.super_rx_network_id)}
            >
                <td>{props.ndcRow.super_rx_network_id}</td>
                <td >{props.ndcRow.super_rx_network_id_name}</td>


                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function PrioritizeList(props)
{


    const [selctedNdc, setSelctedNdc] = useState('');

    const scollToRef = useRef();

    useEffect(() => { }, [props.selctedNdc]);
    //  console.log(props.selctedNdc);

    const getNDCItem = (ndciemid) => {
        // alert(ndciemid);
        props.getNDCItem(ndciemid);
    }

    const getNDCItemDetails = (ndciemid) => {
        props.getNDCItemDetails(ndciemid);
    }


    const ndcListArray = [];
    for (let i = 0; i < props.ndcListData.length; i++) {
        ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} selected={props.selctedNdc} />);
    }
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Prioritize Network List </h5>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ndcListArray}

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-9">

                        </div>
                    </div>



                </div>
            </div>
        </>
    )
}

function PrioritizeForm(props)
{



    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();



    const [benifitsData, setBenifitData] = useState(false);


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
            fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/prioritize/add`, requestOptions)
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








    // useEffect(() => { reset(props.viewDiagnosisFormdata) }, [props.viewDiagnosisFormdata]);

     useEffect(() => {


        if (props.adding) {
            reset({ super_rx_network_id: '', super_rx_network_id_name: '',effective_date:'', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ super_rx_network_id: '',super_rx_network_id_name:'',effective_date:'', description: '',pharm_type_variation_ind:'',network_part_variation_ind:'',claim_type_variation_ind:'',plan_accum_deduct_id:'', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);

    const fruits=[];

    const listItems = [

        "Entertainment",

        "Private Time",

        "Rest",

        "Meal",

        "Exercise",

        "Work",

        "Home Projects",

        "Family"

    ];


    // console.log(props.viewDiagnosisFormdata);
    return(
        <>


<form onSubmit={handleSubmit(addCode)} >

        <div className="data col-md-12" >
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-2">Prioritize Networks  {props.adding ? ' - (Adding)' : '- (' + props.selected.super_rx_network_id + ' )'}</h5>

                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small>Super Network ID</small>
                                        <input type="text" className="form-control" name="super_rx_network_id" {...register('super_rx_network_id')} id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small>Super Network Name</small>
                                        <input type="text" className="form-control" name="super_rx_network_id_name" {...register('super_rx_network_id_name')} id="" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small>Network ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder=""  />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small>Effective Date</small>
                                        <input type="date" className="form-control" name="effective_date" id="" placeholder=""  />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small>Priority</small>
                                        <input type="text" className="form-control" name="" id="" placeholder=""  />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <p>Click on Network and Drag to New Position to Assign New Priority</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <DiagPrioritizeDragable dragData={props.viewDiagnosisFormdata['list']} /> */}




                <DraggableList width={300} height={50} rowSize={1} className="draggablelist">

                  { props.viewDiagnosisFormdata ? props.viewDiagnosisFormdata['list'].map((item, index) => (

console.log(item.super_rx_network_id)




                )): ''}


            </DraggableList>
            <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>

        </form>


        </>
    )
}

function DiagPrioritizeDragable(props) {


    // const listItems = [
    //     "Entertainment",
    //     "Private Time",
    //     "Rest",
    //     "Meal",
    //     "Exercise",
    //     "Work",
    //     "Home Projects",
    //     "Family"
    // ];
    useEffect(()=>{

    }, [props.dragData])

    // console.log(props.dragData);


    return (
        <>
            <DraggableList width={300} height={50} rowSize={1} className="draggablelist">
                {/* {props.dragData ?
                props.dragData.map((item, index) => (
                    <li key={index}>{`${index + 1}.  ${item.super_rx_network_priority}`}</li>
                )) : ''} */}

                {/* { props.dragData ?
                    props.dragData.forEach(element => {

                        console.log(element)
;
                        <li key={element}>{element[0]}</li>

                    }):''


                } */}











            </DraggableList>
        </>
    )
}