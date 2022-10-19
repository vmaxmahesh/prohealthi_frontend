import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState, useEffect} from 'react';
export default function ServiceModifiers()
{
    const [serviceModifireData, setServiceModifiersData] = useState([]);
    var fillServiceModifiersData = (e) => {
        var arr = [
            {code : '1234', discription : 'description'},
            {code : '4321', discription : 'description 1'}
        ];
        setServiceModifiersData(arr);
    }

    useEffect(() => {        
    },[serviceModifireData]);
    
    return(
        <>
            <div className='dashboard-content clearfix'>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="breadcrum">
                                <ul>
                                    <li><a href="">Home</a></li>
                                    <li><i className="fas fa-angle-right"></i></li>
                                    <li><a href="">Codes</a></li>
                                    <li><i className="fas fa-angle-right"></i></li>
                                    <li><a href="">Service Modifiers</a></li>
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

                            <div className="row">

                                <div className="col-md-12 mb-2">
                                    <h5>Criteria</h5>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Code</small>
                                        <input type="text" name="" id="" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Discription</small>
                                        <input type="text" name="" id="" className="form-control" required />
                                    </div>
                                </div>

                                <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                                    <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                                    <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                                    <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                                    <button href="provider-search.html" className="btn btn-info" onClick={e => fillServiceModifiersData()}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {serviceModifireData.length > 0 ?
                    <Results serviceModifierData={serviceModifireData} />
                    : ''
                 }
            </div>
        </>
    );
}

function Results(props)
{
    let s_modifire_data = [];
    for(let i = 0; i < props.serviceModifierData.length; i++)
    {
        s_modifire_data.push(<ServiceModifierRow s_row={props.serviceModifierData[i]} />);
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>        
            <div className="card mt-3 mb-3 data">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Code</th>
                                                <th>Discription</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {s_modifire_data}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-3 ms-auto text-end">
                                    <button className="btn  btn-info" onClick={e => handleShow()}   >
                                        Add Service Modifiers <i className="fa fa-plus-circle"></i></button>
                                </div>
                            </div>
                        </div>
                        <Add show={show} handleClose={handleClose}/>
                    </div>
                </>
    )
}

function ServiceModifierRow(props)
{
    return(
        <>
            <tr>
                <td>{props.s_row.code}</td>
                <td>{props.s_row.discription}</td>
            </tr>
        </>
    );
}

function Add(props)
{
    return(
        <>
        <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Service Types </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 mb-2">
                            <div class="form-group">
                                <small>Service Modifier Code</small>
                                <input type="text" class="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div class="col-md-12 mb-2">
                            <div class="form-group">
                                <small>Discription</small>
                                <textarea class="form-control" rows="3" name="" id="" required></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    
                <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <button type="button" class="btn btn-info">Add Provider Types</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}