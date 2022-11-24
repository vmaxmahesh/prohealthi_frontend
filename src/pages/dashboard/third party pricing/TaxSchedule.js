import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export default function TaxSchedule() {
    const [taxData, setTaxData] = useState(false);
    const [formData, setFormData] = useState(false);
    const showData = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/tax-schedule/get`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setTaxData(data.data);
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

    const getFormData = (row) => {
        setFormData(row);
    }
    useEffect(() => {
        if(!taxData)
        {
            showData()
        }
         }, [taxData]);
    return (
        <>
            <div className="row" >
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href=""> Third Party Pricing </a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href=""> Tax Schedule </a></li>
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
                        <h5 className="mb-2">Tax Schedule List</h5>
                    </div>
                    <div className="row">
                        <TaxScheduleList taxData={taxData} formData={formData} getFormData={getFormData} />
                        <div className="col-md-8">
                            <TaxScheduleForm formData={formData}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function TaxScheduleList(props) {
    const listArray = [];
    for (let i = 0; i < props.taxData.length; i++) {
        listArray.push(<TaxRow rowData={props.taxData[i]} formData={props.formData} getFormData={props.getFormData} />);
    }
    return (
        <>
        
            <div className="col-md-4">
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                <table className="table  table-bordered">
                    <thead className='stickt-thead'>
                        <tr>
                            <th>Tax Schedule ID</th>
                            <th>Tax Schedule Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listArray}
                    </tbody>
                </table>
            </div>
</div>
        </>
    )
}

function TaxRow(props) {
    return (
        <>
            <tr onClick={e => props.getFormData(props.rowData)}
                className={(props.formData && props.rowData.tax_schedule_id == props.formData.tax_schedule_id ? 'tblactiverow' : '')}>
                <td>{props.rowData.tax_schedule_id}</td>
                <td>{props.rowData.tax_schedule_name}</td>
            </tr>
        </>
    )
}

function TaxScheduleForm(props) {
    const{register, handleSubmit, watch, reset, formState : {error} } = useForm();
    useEffect(() => {reset(props.formData)}, [props.formData]);
    return (
        <>

            <div className="row mb-2">
                <div className="col-md-12">
                    <p><b>Tax Schedule Identifcation </b></p>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>Tax Schedule ID :</small>
                        <input type="text" className="form-control" placeholder="JaimaicaOTC" {...register("tax_schedule_id", { required : true })} autoComplete="off" />
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>Tax Schedules Name :</small>
                        <textarea rows="1" cols="2" {...register("tax_schedule_name", { required : true })} className="form-control" placeholder="OC Tax"></textarea>
                    </div>
                </div>
            </div>

            <div className="row mb-2 ">
                <p><b>RX Tax Information: </b></p>
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>Percentage: </small>
                        <input type="text" className="form-control" placeholder="0.15" {...register("rx_tax_percentage", { required : true })} autoComplete="off" />

                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="form-group">
                        <small>Flat Amount: </small>
                        <input type="text" className="form-control" placeholder="0" {...register("rx_flat_tax_amount", { required : true })} autoComplete="off" />

                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="form-group">
                        <small>Calculation : </small>
                        <select className="form-select" {...register("rx_tax_calculation", {required : true})}>
                            <option>Percentage</option>
                        </select>

                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="form-group">
                        <small>Base Price : </small>
                        <select className="form-select" {...register("rx_tax_base_price", { required : true })}>
                            <option>Ingredient Cost</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row mb-2 ">
                <p><b>OTC Tax Information: </b></p>
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>Percentage: </small>
                        <input type="text" className="form-control" placeholder="0.15" {...register("otc_tax_percentage", { required : true })} autoComplete="off" />

                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="form-group">
                        <small>Flat Amount: </small>
                        <input type="text" className="form-control" placeholder="0" {...register("otc_flat_tax_amount", { required : true })} autoComplete="off" />

                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="form-group">
                        <small>Calculation : </small>
                        <select className="form-select" {...register("otc_tax_calculation", { required : true })}>
                            <option>Percentage</option>
                        </select>

                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="form-group">
                        <small>Base Price : </small>
                        <select className="form-select" {...register("otc_tax_base_price", { required : true })}>
                            <option>Ingredient Cost</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-12 ">
                    <div className="float-end">
                        {/* <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a> */}
                    </div>
                </div>
            </div>
        </>
    )
}