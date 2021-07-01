import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { login } from "../../remote/login-register-service";
import { LoginModel } from "../../models/login-model";
import {  useDispatch } from 'react-redux';

import { useHistory } from "react-router-dom";
import { loginUserReducer } from "../../state-slices/auth/auth-slice";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginUser, setLoginUser] = useState({username: "", password: ""} as LoginModel)

  let onChange = (e: any) => {
    const {name, value} = e.target;
    setLoginUser({
      ...loginUser, [name]: value
    });
  }

/*
  Perfection looks like this (what all axios calls should look like):
*/
  let logUserIn = async (e: any) => {
    e.preventDefault();
    await login(loginUser).then(response => {
        localStorage.setItem("Authorization", response.headers.authorization);
        setLoginUser({username: "", password: ""} as LoginModel);
        dispatch(loginUserReducer({username: response.data.username, token: response.headers.authorization}));
        history.push("/study");
      }).catch(error => {
        if (error.response.status == 401) {
          alert("Invalid credentials!\nPlease try again...")
        }
      }
    );
  }

    return (
        <>
        <Form>
        <h2>Login</h2>
          <Form.Group>
            <Form.Label id="lbl-username">Username: </Form.Label>
            <Form.Control name="username" value={loginUser.username} onChange={onChange} type="text" placeholder="username"  />
          </Form.Group>
          <Form.Group>
            <Form.Label id="lbl-password">Password: </Form.Label>
            <Form.Control name="password" value={loginUser.password} onChange={onChange} type="password" placeholder="*******"/>
          </Form.Group>
          <Form.Group className="text-center">
            <Button data-testid="login-btn" onClick={logUserIn} type="submit" >Login</Button>
          </Form.Group>
        </Form>
      </>
    )
}

export default Login;
