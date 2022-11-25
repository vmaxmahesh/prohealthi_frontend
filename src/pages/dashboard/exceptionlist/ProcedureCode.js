import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ProcedureCode() {

    const [ProcCodeList, setProcedureCodeList] = useState([]);
    const [procCodeData, setProcCodeData] = useState(false);
    const [procListData, setProcListData] = useState([]);

    const onSearchProcCode = (fdata) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/procedure-code-list/get?search=${fdata.target.value}`, requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                setProcedureCodeList(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    

   
    const getSelectedProcCodeData = (id) => {
        //setProcCodeData(id);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/procedure-code-list/get-code-list?search=${id.proc_code_list_id}`, requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                setProcListData(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const getLinkOnclick = (e) => {
        setProcCodeData(e);
    }
    useEffect(() => { }, [ProcCodeList, procCodeData, procListData]);
    return (
        <>
            <div className="dashboard-content clearfix">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Exception List</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Procedure Code List</a></li>
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
                    <SearchProcedureCodes onSearchProcCode={onSearchProcCode} />
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            {/* <div className="col-md-12">
                                <h5 className="mb-2">Procedure Code List</h5>
                            </div> */}
                            <div className="row">
                                <ProcedureCodeName showProcCodeList={ProcCodeList} procCodeData={getSelectedProcCodeData} />
                                {/* <ProcedureCodeList showProcCodeList={ProcCodeList} procCodeData={getSelectedProcCodeData} /> */}
                                <ProcedureCodeList procListData={procListData} showListData={getLinkOnclick}/>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <div className="col-md-12">
                                {/* <h5 className="mb-2">Procedure Code List</h5> */}
                            </div>
                            <div className="row">                                
                                <ProcedureCodeForm  procCodeData={procCodeData}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

function SearchProcedureCodes(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Procedure Codes List </small>
                                <input type="text" className="form-control" onKeyUp={(e) => props.onSearchProcCode(e)} placeholder='Start typing procedure code ID/ code to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProcedureCodeName(props)
{
    const pCodeArray = [];
    for (let i = 0; i < props.showProcCodeList.length; i++) {
        pCodeArray.push(<ProcCodeRow rowData={props.showProcCodeList[i]} getDataOnclick={props.procCodeData}/>);
    }
    return (
        <>
            <div className="col-md-6">
            <h5 className="mb-2">Procedure Code Name</h5>
                <div style={{ height: '400px', overflowY: 'scroll' }}>
                    <table className="table  table-bordered" style={{ position: 'relative' }}>
                        <thead className='stickt-thead'>
                            <tr>
                                <th>Procedure Code ID</th>
                                <th>Procedure Code Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pCodeArray}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

// function ProcedureCodeList(props) {
    // const pCodeArray = [];
    // for (let i = 0; i < props.showProcCodeList.length; i++) {
    //     pCodeArray.push(<ProcCodeRow rowData={props.showProcCodeList[i]} getDataOnclick={props.procCodeData}/>);
    // }
//     return (
//         <>
//             <div className="col-md-6">
//             <h5 className="mb-2">Procedure Code List</h5>
//                 <div style={{ height: '400px', overflowY: 'scroll' }}>
//                     <table className="table  table-bordered" style={{ position: 'relative' }}>
//                         <thead className='stickt-thead'>
//                             <tr>
//                                 <th>Effective Date</th>
//                                 <th>Procedure Code</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {pCodeArray}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     )
// }

function ProcedureCodeList(props) {
    const pListArray = [];
    for (let i = 0; i < props.procListData.length; i++) {
        pListArray.push(<ProcListRow rowListData={props.procListData[i]} getListData={props.showListData}/>);
    }
    return (
        <>
            <div className="col-md-6">
            <h5 className="mb-2">Procedure Code List</h5>
                <div style={{ height: '400px', overflowY: 'scroll' }}>
                    <table className="table  table-bordered" style={{ position: 'relative' }}>
                        <thead className='stickt-thead'>
                            <tr>
                                <th>Effective Date</th>
                                <th>Procedure Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pListArray}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


function ProcCodeRow(props) {
    
    return (
        <>
            <tr  onClick={() => props.getDataOnclick(props.rowData)}
                className={(props.selected && props.rowData.proc_code_list_id == props.selected.proc_code_list_id ? ' tblactiverow ' : '')}>
                <td>{props.rowData.proc_code_list_id}</td>
                <td>{props.rowData.description}</td>
            </tr>
        </>
    )
}

function ProcListRow(props) {
    return (
        <>
            <tr  onClick={() => props.getListData(props.rowListData)}
                className={(props.selected && props.rowListData.effective_date == props.selected.effective_date ? ' tblactiverow ' : '')}>
                <td>{props.rowListData.effective_date}</td>
                <td>{props.rowListData.procedure_code}</td>
            </tr>
        </>
    )
}

function ProcedureCodeForm(props) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    useEffect(() => { reset(props.procCodeData) }, [props.procCodeData]);
    // useEffect(() => { reset(props.procListData) }, [props.procListData]);
    return (
        <>
            {/* <div className="card mt-3 mb-3 data" >
                <div className="card-body"> */}
                 <div className="col-md-8 mb-2">
                 <h5>Procedure Code Form</h5>
                    <div className="row mb-2">
                        <div className="col-md-6 mb-2">  
                            <div className="form-group">
                                <small>List ID</small>
                                <input type="text" className="form-control" id="" {...register("proc_code_list_id",{required:true})}/>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <small>Description</small>
                                <input type="text" className="form-control" id="" {...register("description",{required:true})}/>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <h5>Codes</h5>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <small>Procedure Code</small>
                                <input type="text" className="form-control" id="" {...register("procedure_code",{required:true})}/>
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                <p className="input-hint">Dispence Rx</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <small>Effective Date</small>
                                <input type="date" className="form-control"  id=""  {...register("effective_date",{required:true})}/>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <small>Termination Date</small>
                                <input type="date" className="form-control" id="" {...register("termination_date",{required:true})}/>
                            </div>
                        </div>
                    </div>
                    </div>
                {/* </div>
            </div> */}
        </>
    )
}