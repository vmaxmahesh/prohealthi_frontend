import React from 'react';
import DraggableList from 'react-draggable-lists';

export default function PrioritizeNetwork()
{
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
                    <SearchPrioritize />
                    <PrioritizeList />
                </div>
            </div>
        </>
    )
}

function SearchPrioritize()
{
    return(
        <>
            <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>Prioritize NetWork </small>
                                    <input type="text" className="form-control" placeholder='Start typing prioritize network id/ name to search'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

function PrioritizeList()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Prioritize Network List </h5>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-9">
                            <PrioritizeForm />
                        </div>
                    </div>

                        

                </div>
            </div>
        </>
    )
}

function PrioritizeForm()
{
    return(
        <>
         <div className="data col-md-12" >
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-2">Prioritize Networks</h5>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small>Super Network ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small>Super Network Name</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small>Network ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small>Effective Date</small>
                                        <input type="date" className="form-control" name="" id="" placeholder="" required />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <div className="form-group">
                                        <small>Priority</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <p>Click on Network and Drag to New Position to Assign New Priority</p>
                            </div>
                        </div>
                    </div>
                </div>
                <DiagPrioritizeDragable />
        </>
    )
}

function DiagPrioritizeDragable() {

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
    return (
        <>
            <DraggableList width={300} height={50} rowSize={1} className="draggablelist">
                {listItems.map((item, index) => (
                    <li key={index}>{`${index + 1}.  ${item}`}</li>
                ))}
            </DraggableList>
        </>     
    )
}