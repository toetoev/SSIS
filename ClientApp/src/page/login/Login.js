import { Button, Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import Bootbox from "bootbox-react";
import DeptRole from "../../constant/DeptRole";
import StoreRole from "../../constant/StoreRole";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login() {
    let history = useHistory();

    const [nameOrEmail, setNameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (event) => {
        axios
            .post("https://localhost:5001/api/auth/login", {
                name: nameOrEmail,
                password: password,
                role: role,
            })
            .then((res) => {
                const result = res.data;
                if (result.success) {
                    localStorage.setItem("ACCESS_TOKEN", result.data.accessToken);
                    localStorage.setItem("ROLE", result.data.role);
                    directToHomePageBasedOnRole();
                } else {
                    setAlertMsg(result.message);
                    setShowAlert(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
    };

    const directToHomePageBasedOnRole = () => {
        const isAuthenticated = localStorage.getItem("ACCESS_TOKEN") !== null;
        const currentRole = localStorage.getItem("ROLE");
        if (isAuthenticated) {
            if (Object.values(DeptRole).includes(currentRole)) {
                switch (currentRole) {
                    case DeptRole.DeptHead:
                        history.push("/dept/dept-head");
                        break;
                    case DeptRole.DeptRep:
                        history.push("/dept/dept-rep");
                        break;
                    case DeptRole.Employee:
                        history.push("/dept/employee");
                        break;
                    default:
                        break;
                }
            } else if (Object.values(StoreRole).includes(currentRole)) {
                switch (currentRole) {
                    case StoreRole.Manager:
                        history.push("/store/manager");
                        break;
                    case StoreRole.Supervisor:
                        history.push("/store/supervisor");
                        break;
                    case StoreRole.Clerk:
                        history.push("/store/clerk");
                        break;
                    default:
                        break;
                }
            }
        }
    };
    directToHomePageBasedOnRole();

    return (
        <div className="login-box-body login-box">
            <p className="login-box-msg">Sign in - Logic University</p>
            <Form>
                <Form.Group as={Row} controlId="nameOrEmail">
                    <Col sm={12}>
                        <Form.Label className="formLabel">Name / Email : </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name or email"
                            onChange={(e) => setNameOrEmail(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="password">
                    <Col sm={12}>
                        <Form.Label className="formLabel">Password : </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Form.Label as="legend" className="formLabel">Role : </Form.Label>
                    </Col>
                    <Col
                        sm={12}
                        className="m-auto d-flex justify-content-start"
                        onChange={(e) => setRole(e.target.value)}
                    >

                        <Form.Check
                            inline
                            type="radio"
                            label="Store"
                            value="STORE"
                            name="role"
                            id="role1"
                            className="radioLabel"
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Department"
                            value="DEPARTMENT"
                            name="role"
                            id="role2"
                            className="radioLabel"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="justify-content-center">
                    <Col sm={12}>
                        <Button type="button" className="btn btn-dark btn-block btn-flat" onClick={handleSubmit}>
                            Sign in
                            </Button>
                    </Col>
                </Form.Group>
            </Form>
            <Bootbox
                show={showAlert}
                type={"alert"}
                message={alertMsg}
                onClose={(e) => setShowAlert(false)}
            />
        </div>
    );
}
