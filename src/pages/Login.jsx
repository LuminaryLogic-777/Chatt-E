import React, { useContext } from 'react';
import {Alert, Button, Form, Row, Col, Stack} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const {loginUser,loginUserDetails,updateLoginUser,loginError,loginLoading}=useContext(AuthContext);
  return (
    <>
    <Form onSubmit={loginUserDetails}>
      <Row style={{justifyContent: 'center', hegiht: '100vh', paddingTop:'10%'}}>
        <Col xs={6}>
        <Stack gap={3}>
          <h2>Login</h2>
          <Form.Control type='text' placeholder='Email' onChange={(e)=>updateLoginUser({...loginUser,email:e.target.value})}/>
          <Form.Control type='password' placeholder='Password' onChange={(e)=>updateLoginUser({...loginUser,password:e.target.value})}/>
          <Button variant='success' type='submit'>{loginLoading?"Getting you in...":"Login  "}</Button>
          {loginError?.error && <Alert variant='danger'><p>{registerError?.message}</p></Alert>}
        </Stack>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Login;