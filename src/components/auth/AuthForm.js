import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
/*
회원가입 또는 로그인 폼을 보여줍니다.
*/
const AuthFormBlock = styled.div`
    h3 {
      margin:0;
      color: ${palette.gray[8]};
      margin-bottom: 1rem;
    }
`;
/*
  스타일링된 input
*/
const StyledInput = styled.input`
  font-size:1rem;
  border:none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline:none;
  width:100%;
  &:focus{
    color: $oc-teal-7;
    border-bottom:1px solid ${palette.gray[7]};
  }
  & + &{
    margin-top: 1rem;
  }
`;
/* 폼 하단에 로그인 혹은 회원가입 링크를 보여줌*/
const Footer = styled.div`
    margin-top:2rem;
    text-align:right;
    a{
      color: ${palette.gray[6]};
      text-decoration:underline;
      &:hover {
        color:${palette.gray[9]};
      }
    }
`;
// 로그인 버튼 아래로 하나 내리기
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login:'로그인',
  register:'회원가입',
};

const AuthForm =({type, form , onChange , onSubmit})=>{
  const text = textMap[type];
  return(
      <AuthFormBlock>
        <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput onChange={onChange} value={form.username} autoComplate="username" name="username" placeholder="아이디" />
        <StyledInput onChange={onChange} value={form.password} autoComplate="new-password" name="password" placeholder="비밀번호" type="password" />
      {type ==='register' && (
            <StyledInput onChange={onChange} value={form.passwordConfirm}  autoComplate="new-password" name="passwordConfirm" placeholder="비밀번호 확인" type="password" />
      )}
        <ButtonWithMarginTop cyan fullWidth>{text}</ButtonWithMarginTop>
      </form>
        <Footer>
          {type === 'login' ?(
              <Link to="/register">회원가입</Link>
          ):(
              <Link to="/login">로그인</Link>
          )}

        </Footer>
      </AuthFormBlock>
  );
};
export default AuthForm;
