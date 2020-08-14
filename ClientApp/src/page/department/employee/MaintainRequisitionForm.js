import React, {useState, setState} from "react";
import ReactDOM from 'react-dom';

import { Button, Form, Radio, Row, Col, Select, Table, Modal } from "antd";
import SearchBar from "../../icon/SearchBar";

export default function MaintainRequisitionForm() {
    let state =
    {
        columns: [
          {
            title: 'No',
            dataIndex: 'no',
          },
          {
            title: 'Product Id',
            dataIndex: 'id',
            sorter: (a, b) => a.amount - b.amount,
          },
          {
            title: 'Product Name',
            dataIndex: 'name',
          },
          {
            title: 'Product Price',
            dataIndex: 'price',
          },
          {
            title: 'Action',
            key: 'action',
            render: () =>(
                            <div>
                                <a className="btn btn-warning mr-3">Edit</a>
                                <a className="btn btn-danger mr-3">Delete</a>
                            </div>
                        ),
          },
        ],
    };


    let showModal = () => {
        this.setState({
            modal2Visible: true,
        });
    };
    
    let handleOk = e => {
        console.log(e);
        this.setState({
            modal2Visible: false,
        });
    };
    
    let handleCancel = e => {
        console.log(e);
        this.setState({
            modal2Visible: false,
        });
    };
    
    let data = [
        {
            no : '0',
            id: 'A001',
            name: 'apple',
            price: '20',
        },
    ];
    
    const columns = state.columns.map((col, index) => ({
        ...col,
    }));

    return (
        
        <div className="col-lg-10 mt-3">
            <h4>Stationery Requistion Form</h4>
            <div className="m-4">
            <Button className="btn btn-primary mr-4">Stapler</Button>
            <Button className="btn btn-primary mr-4">Tray</Button>
            <Button className="btn btn-primary">Clip</Button>
                
            <Button className="btn btn-success float-right" onClick={showModal}>Add</Button> 

            <Modal
                title="Basic Modal"
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal> 
        </div>
            <Table bordered columns={columns} dataSource={data}/>     
        </div>
    );
}

