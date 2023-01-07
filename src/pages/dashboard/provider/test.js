import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function ProviderType() {
    const [ProvidertypeData, setProviderTypedata] = useState([]);

    const fillProviderData = (e) => {
        // API  
        // var staticProviderType =; 
        var arr = [
            { code: '1120', discription: 'LOLOHY' },
            { code: '1121', discription: 'LOLOHY1' },
        ];

        setProviderTypedata(arr);
    }

    useEffect(() => {
    }, [ProvidertypeData]);

    return (
        <>
            <div className='dashboard-content clearfix'>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Codes</a></li>
                                <li><i className="fas fa-angle-
right"></i></li>
                                <li><a href="">Provider Types</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum ">
                            <ul>
                                <li className="float-end m-0"><a href="">Page
                                    Hint <i className="fa-solid fa-lightbulb"></i></a></li>
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
                                    <input type="text" name="" id=""
                                        className="form-control" required />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Discription</small>
                                    <input type="text" name="" id=""
                                        className="form-control" required />
                                </div>
                            </div>

                            <div className="col-md-6 ms-auto text-end mb-3 mt-
3">
                                <a href="" className="btn btn-
secondary">Cancel</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-
danger">Select</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-warning 
">Clear</a>&nbsp;&nbsp;
                                <button className="btn btn-info" onClick={e =>
                                    fillProviderData()}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                {ProvidertypeData.length > 0 ?
                    <Results typedata={ProvidertypeData} />
                    : ''}

            </div>
        </>
    );
}

function Results(props) {
    var ProvidertypeData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        ProvidertypeData.push(<ProviderTypeRow datar={props.typedata[index]}
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
            <div className="card mt-3 mb-3 data" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-
bordered">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Discription</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ProvidertypeData
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-3 ms-auto text-end">
                            {/* <button className="btn  btn-info" data-bs-
toggle="modal" data-bs-target="#exampleModal"> 
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}
                            <button className="btn  btn-info" onClick={e =>
                                handleShow()}>
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Add show={show} handleClose={handleClose()}/> */}
            <Add props={modalData} />
        </>
    )
}

function ProviderTypeRow(props) {
    return (
        <>
            <tr>
                <td>{props.datar.code}</td>
                <td>{props.datar.discription}</td>
            </tr>
        </>
    )
}

function Add(props) {
    console.log(props)
    return (
        <>
            <Modal show={props.modalData.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a
                    modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
} 
