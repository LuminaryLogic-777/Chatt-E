import React from 'react';
import {Alert, Button, Form, Row, Col, Stack} from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const {register,updateRegister,registerUser,registerError,registerLoading} = useContext(AuthContext);
  return (
    <>
    <Form onSubmit={registerUser}>
      <Row style={{justifyContent: 'center', hegiht: '100vh', paddingTop:'10%'}}>
        <Col xs={6}>
        <Stack gap={3}>
          <h2>Register</h2>
          <Form.Control type='text' placeholder='Name' onChange={(e)=>updateRegister({...register,name:e.target.value})}/>
          <Form.Control type='text' placeholder='Email' onChange={(e)=>updateRegister({...register,email:e.target.value})}/>
          <Form.Control type='password' placeholder='Password' onChange={(e)=>updateRegister({...register,password:e.target.value})}/>
          <Button variant='success' type='submit'>{registerLoading?"creating...":"Register"}</Button>
          {registerError?.error && <Alert variant='danger'><p>{registerError?.message}</p></Alert>}
        </Stack>
        </Col>
      </Row>
    </Form>
    </>
  )
}

export default Register;