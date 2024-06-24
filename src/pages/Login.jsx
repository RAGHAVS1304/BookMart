import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
// import {getAuth} from 'firebase/auth'
// import
// const auth=getAuth();
import { useFirebase } from "../context/Firebase";
const LoginPage = () => {
  const firebase = useFirebase();
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  console.log(firebase);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signin up a user...");
    const result = await firebase.singinUserWithEmailAndPass(email, password);
    console.log("Successfull", result);
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          {/* <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group> */}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <h1 className="mt-5 mb-5">OR</h1>
      <Button variant="danger" onClick={firebase.signinWithGoogle}>
        Sigin with Google
      </Button>
    </div>
  );
};

export default LoginPage;
