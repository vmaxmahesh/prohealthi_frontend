import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function MacList() {
    return(
        <>
           <div className='dashboard-content clearfix'>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href=""> Third Party Pricing </a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">MAC List</a></li>
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
                <ShowMacList />
            </div>
                
                {/* <ShowMACListTable /> */}
                {/* <MACListForm /> */}
        </>
    )
}

function ShowMacList()
{
    const{register, handleSubmit, watch, formState : { errors }} = useForm();
    const[macId, setMacId] = useState([]);
    const searchMacId = (e) => {
        var arr = [
            {mac_id : '101', description : 'mac description 1'},
            {mac_id : '102', description : 'mac description 2'},
            {mac_id : '103', description : 'mac description 3'},
        ];
        setMacId(arr);
    }
    useEffect(() => {}, [macId]);
    return(
        <>
           <form onSubmit={handleSubmit(searchMacId)}>
             <div className="card mt-3 mb-3">
                <div className="card-body">                    
                        <div className="row mb-2">
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>ID</small>
                                <input type="text" className="form-control" placeholder='Enter MAC ID to search' {...register("mac_id", {required : true})}/>
                                {errors.mac_id && <span><p className='notvalid'>This field is required</p></span>}                                
                                </div>
                            </div>
                            <div className="col-md-2 mb-2">
                                    <div className="form-group">
                                        <small>&nbsp;</small><br/>
                                        <button type="submit" className="btn m-0 p-2 btn-theme" style={{width: "100%", fontSize: "12px"}} onClick={e => searchMacId()}>Search</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
          </form>
        <MacIdList macIdListData={macId}/>
    </>
    )
}

function MacIdList(props)
{
    const macIdArray = [];
    for(let i=0; i<props.macIdListData.length; i++)
    {
        macIdArray.push(<MacIdRow macIdData={props.macIdListData[i]} />);
    }

    const[macListTable, setmacListTable] = useState([]);
    const searchMacId = (e) => {
        var arr = [
            {effective_date : '101', gpi : 'mac description 1'},
            {effective_date : '102', gpi : 'mac description 2'},
        ];
        setmacListTable(arr);
    }
    useEffect(() => {}, [macListTable]);
    return(
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">MAC ID</h5>
                        </div>
                        <table className= "table  table-bordered">
                            <thead>
                                <tr>
                                    <th>MAC ID</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {macIdArray}
                            </tbody>
                        </table>                        
                </div>
            </div>
            <ShowMACListTableData showMacListTableData={macListTable} />
            <MACListForm />
         </div>    
        </>
    )
}

function MacIdRow(props)
{
    const[macListTable, setMacListTable] = useState();
    const showMacListTableData = (e) => {
    }
    const showMacListTable = (e) => {
        var arr = [
            {effective_date : 'effective date 1', GPI : 'gpi 1'},
            {effective_date : 'effective date 2', GPI : 'gpi 2'},
            {effective_date : 'effective date 3', GPI : 'gpi 3'},
        ];
        setMacListTable(arr);
    }
    useEffect(() => {}, [macListTable]);
    return(
        <>
            <tr>
                <td>{props.macIdData.mac_id}</td>
                <td>{props.macIdData.description}</td>
                <td><button type="button" className="btn btn-sm btn-info" value={props.macIdData.mac_id} onClick={e => showMacListTable(e)}><i className="fa fa-eye"></i> View </button></td>
            </tr>
            {/* <ShowMACListTableData showMacListTableData={macListTable} />             */}
        </>
    )
}

function ShowMACListTableData(props)
{
    console.log(props.showMacListTableData);
    return(
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">MAC List table</h5>
                        </div>
                        <table className= "table  table-bordered">
                            <thead>
                                <tr>
                                    <th>Effective Date</th>
                                    <th>GPI</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>{props.showMacListTableData.effective_date}</td>
                                    <td>{props.showMacListTableData.gpi}</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
         </div>   
        </>
    )
}


function ShowMACListTable()
{
    return(
        <>
             <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">MAC List table</h5>
                        </div>
                        <table className= "table  table-bordered">
                            <thead>
                                <tr>
                                    <th>Effective Date</th>
                                    <th>GPI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2021-10-23</td>
                                    <td>100010</td>
                                    
                                </tr>
                                <tr>
                                    <td>2021-10-10</td>
                                    <td>200120</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
         </div>    
        </>
    )
}

function MACListForm()
{
    return(
        <>
        <div className="card mt-3 mb-3">
            <div className="card-body">        
                    <div className="row mb-2">
                        <div className="col-md-12">
                        <h5 className="mb-2">MCA List: fr44,GPI:21700090000310, Eff. Date:20-10-2022</h5>
                    </div>
                        <p><b>MAC List : </b></p>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <small>MAC List</small>
                                <input type="text" className="form-control" placeholder="Surgical" name="" id="" required="" autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-md-10 mb-3">
                            <div className="form-group">
                                <small>MAC Description</small>
                            <textarea rows="3" cols="2" className="form-control" placeholder="Surgical Test"></textarea>
                            </div>
                        </div>
                    </div>
                
                    <div className="row mb-2 ">
                        <p><b>Generic Product ID: </b></p>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <small>Generic Product ID: </small>
                                <input type="text" className="form-control" placeholder="30000" name="" id="" required="" autoComplete="off" />
                            
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="form-group">
                                <small>Effective Date: </small>
                                <input type="date" className="form-control" placeholder="0" name="" id="" required="" autoComplete="off" />
                            
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="form-group">
                                <small>Termination Date: </small>
                                <input type="text" className="form-control" placeholder="83" name="" id="" required="" autoComplete="off" />
                            
                            </div>
                        </div>


                        <div className="col-md-3 mb-4">
                            <div className="form-group">
                                <small>Price Source: </small>
                                <select className="form-select">
                                    <option>Predifined Calculation</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="form-group">
                                <small>Price Type: </small>
                                <select className="form-select">
                                    <option>Usual and Customary charge</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="form-group">
                                <small>Maximum Available Cost: </small>
                                    <input type="text" className="form-control" placeholder="83" name="" id="" required="" autoComplete="off" />
                            </div>
                        </div>
                        <div className="col-md-3 mb-4 mt-4">
                            <div className="form-group">
                                <input type="checkbox" id="ReturnMaxQ" className="d-none" />
                                <label htmlFor="ReturnMaxQ"> Allow Fee (Rx/OTC) </label>
                        </div>
                        </div>
                        <div className="col-md-12 ">
                            <div className="float-end">
                        <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                    </div> 
                    </div>
                    </div>
            </div>
   </div>
   </>
    )
}