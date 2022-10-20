import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
export default function NDC()
{
    return(
        <>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Exception List</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">NDC Exception</a></li>
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
                <ShowSearch />
        </>
    )
}

function ShowSearch()
{
    const{register, handleSubmit, watch, formState : { errors }} = useForm();
    const[ndcData, setNDCId] = useState([]);
    const searchNDCId = (e) => {
        var arr = [
            {ndc_id : '101', name : 'mac description 1'},
            {ndc_id : '102', name : 'mac description 2'},
            {ndc_id : '103', name : 'mac description 3'},
        ];
        setNDCId(arr);
    }
    useEffect(() => {}, [ndcData]);
    return(
        <>
           <form onSubmit={handleSubmit(searchNDCId)}>
             <div className="card mt-3 mb-3">
                <div className="card-body">                    
                        <div className="row mb-2">
                            <div className="col-md-4 mb-3"> 
                                <div className="form-group">
                                    <small>ID</small>
                                <input type="text" className="form-control" placeholder='Enter NDC ID to search' {...register("ndc_id", {required : true})}/>
                                {errors.ndc_id && <span><p className='notvalid'>This field is required</p></span>}                                
                                </div>
                            </div>
                            <div className="col-md-2 mb-2">
                                    <div className="form-group">
                                        <small>&nbsp;</small><br/>
                                        <button type="submit" className="btn m-0 p-2 btn-theme" style={{width: "100%", fontSize: "12px"}} 
                                        onClick={e => searchNDCId()}>Search</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
          </form>
          <NDCExceptionList ndcSearchData={ndcData} />
    </>
    )
}

function NDCExceptionList(props)
{
    console.log(props.ndcSearchData);
    return(
        <>
        {props.ndcSearchData.length>0 ? "show data" : null}
        </>
    )
}