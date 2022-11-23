import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function SuperBenefitList() {
    const [superBenefitNames, setSuperBenefitNames] = useState([]);
    const [superBenefitList, setSuperBenefitLists] = useState([]);
    const [superBenefitForm, setSuperBenefitForm] = useState([]);
    const searchSBen = (fdata) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/super-benefit-list/get?search=${fdata.target.value}`, requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                setSuperBenefitNames(data.data);
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

    const getSBNameList = (id) => {
            const requestOptions = {
                method: 'GET',
                headers: { 'content-type': 'application/json' }
            }
            fetch(process.env.REACT_APP_API_BASEURL + `/api/super-benefit-list/get-super-benefit-code?search=${id.super_benefit_list_id}`, requestOptions).then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setSuperBenefitLists(data.data);
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

    const getSBList = (id) => {
        console.log(id);
        setSuperBenefitForm(id);
    }
        useEffect(() => { }, [superBenefitNames, superBenefitList, superBenefitForm]);
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
                                    <li><a href="">Super Benefit List</a></li>
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
                        <SearchSuperBenefit search={searchSBen} />
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <ShowSuperBenefitNames superBenefitNames={superBenefitNames} getSBNameList={getSBNameList} />

                                    <ShowSuperBenefitList showListData={superBenefitList} getSBList={getSBList}/>
                                </div>
                            </div>
                        </div>

                        <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <div className="col-md-12">
                                {/* <h5 className="mb-2">Procedure Code List</h5> */}
                            </div>
                            <div className="row">                                
                                <SuperBenefitForm  formData={superBenefitForm}/>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </>
        )
    }

    function SearchSuperBenefit(props) {
        return (
            <>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>Super Benefit List </small>
                                    <input type="text" onKeyUp={(e) => props.search(e)} className="form-control" placeholder='Start typing super benefit ID/ name to search'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    function ShowSuperBenefitNames(props) {
        const namesArray = [];
        for (let i = 0; i < props.superBenefitNames.length; i++) {
            namesArray.push(<SBenefitNameRow bsNameRow={props.superBenefitNames[i]} singleSBName={props.getSBNameList} />);
        }
        return (
            <>
                <div className="col-md-6">
                    <h5 className="mb-2">Super Benefit Names </h5>
                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                        <table className="table  table-bordered">
                            <thead className='stickt-thead'>
                                <tr>
                                    <th>Super Benefit ID</th>
                                    <th>Super Benefit Name </th>
                                </tr>
                            </thead>
                            <tbody>
                                {namesArray}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }

    function ShowSuperBenefitList(props) {
        const listsArray = [];
        for(let i=0; i < props.showListData.length; i++)
        {
            listsArray.push(<SBListRow listRow={props.showListData[i]} singleSBList={props.getSBList}/>);
        }
        return (
            <>
                <div className="col-md-6">
                    <h5 className="mb-2">Super Benefit Lists </h5>
                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                        <table className="table  table-bordered">
                            <thead className='stickt-thead'>
                                <tr>
                                    <th>Effective Date</th>
                                    <th>Benefit List </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listsArray}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }

    function SBenefitNameRow(props) {
        return (
            <>
                <tr onClick={() => props.singleSBName(props.bsNameRow)}
                    className={(props.selected && props.bsNameRow.super_benefit_list_id == props.selected.super_benefit_list_id ? ' tblactiverow ' : '')}>
                    <td>{props.bsNameRow.super_benefit_list_id}</td>
                    <td>{props.bsNameRow.description}</td>
                </tr>
            </>
        )
    }

    function SBListRow(props)
    {
        return (
            <>
                <tr onClick={() => props.singleSBList(props.listRow)}
                    className={(props.selected && props.listRow.super_benefit_list_id == props.selected.super_benefit_list_id ? ' tblactiverow ' : '')}>
                    <td>{props.listRow.effective_date}</td>
                    <td>{props.listRow.benefit_list_id}</td>
                </tr>
            </>
        )
    }


    function SuperBenefitForm(props) {
        const{register, handleSubmit, watch, reset, formState : {error} } = useForm();
        useEffect(() => { reset(props.formData) }, [props.formData]);
        return (
            <>
                <div className="card mt-3 mb-3 data" >
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-md-12 mb-2">
                                <h5>Super Benefit Lists</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>ID</small>
                                    <input type="text" className="form-control"  id="" {...register("super_benefit_list_id",{required:true})}/>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Description</small>
                                    <input type="text" className="form-control"  id="" {...register("description",{required:true})}/>
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <h5>Codes</h5>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Benefit List ID</small>
                                    <input type="text" className="form-control" id="" {...register("benefit_list_id",{required:true})}/>
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Accume Benefit Strategy ID</small>
                                    <input type="text" className="form-control" id="" {...register("accum_benefit_strategy_id",{required:true})}/>
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Effective Date</small>
                                    <input type="date" className="form-control"  id="" {...register("effective_date",{required:true})}/>
                                </div>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Termination Date</small>
                                    <input type="date" className="form-control"  id="" {...register("termination_date",{required:true})}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }