import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../style/LoginPage.css"
import Input from "../ui/Input";
import Button from "../ui/Button";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth.service";

const Wrapper = styled.div`
    height: 92vh;
`

const Container = styled.div`
    padding-top: 8%;
    text-align: center;
`

const SubTitle = styled.div`
  color: #838383;
  font-size: 25px;
  font-weight: bold;
`

const MainTitle = styled.p`
  font-size: 30px;
  padding: 0px 15px;
  margin-block-start: 10px;
  margin-block-end: 0.5em;
  margin-inline-start: 10px;
  margin-inline-end: 0px;
  font-weight: 800;
  margin-bottom: 35px;
`

//const Form = styled.form`

//`

const Text = styled.div`
  width: 100px;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 10px;
  justify-content: center;
`

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledInputForm = styled.div`
  margin-top: 20px;
  display: flex;
  >Input{
    justify-content: center;
  }
`

const StyledButtonContainer = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  padding-left: 30%;
  padding-right: 30%;
  justify-content: center;
  align-items: center;
  
  >Button{
    width: 10vw;
    justify-content: center;
  }
`

const Under_text = styled.div`
  text-decoration: underline;
  cursor: pointer;
`

const required = (value) => {
    if (!value) {
        return (
        <div className="invalid-feedback d-block">
            This field is required!
        </div>
        );
    }
};

const Loginpage = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) { //rewrite
            AuthService.login(username, password).then(
            () => {
                window.location.assign('/main');
            },
            (error) => {
                const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
            );
        } else {
            setLoading(false);
        }
    };

    return(
        <Wrapper>
            <Container>
                <SubTitle>추억 저장 서비스 Wemory</SubTitle>
                <MainTitle>로그인</MainTitle>
                <Form method="post" action="./login" onSubmit={handleLogin} ref={form}>
                    <StyledInputContainer>
                        <StyledInputForm><Text>아이디</Text><Input type="text" name="id" value={username} onChange={onChangeUsername} validations={[required]}/><br /></StyledInputForm>
                        <StyledInputForm><Text>비밀번호</Text><Input type="password" name="pw1" id="pw1" value={password} onChange={onChangePassword} validations={[required]}/><br /></StyledInputForm>
                    </StyledInputContainer>
                    
                    <StyledButtonContainer>
                      <Button
                        disabled={loading}
                        title="로그인"
                        />
                      <Under_text onClick={() => {navigate("/signup")}}>
                        계정이 없나요?
                      </Under_text>
                    </StyledButtonContainer>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
                {/*
                <div class="button-container">
                    <div class="button-div">
                        <Button
                            title="로그인"
                            onClick={() => {
                                navigate("/main");
                            }}
                        /> 
                    </div>

                    <div class="under_text" onClick={() => {navigate("/signup")}}>
                        계정이 없나요?
                    </div> 
                </div>
                        */}
            </Container>
        </Wrapper>
    )
}

export default Loginpage;