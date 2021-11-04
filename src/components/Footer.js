import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  z-index: 9999;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  margin-top: 100%;
  bottom: 0;
  padding: 32px 64px;
  background: pink;
`
const Text = styled.div``

const Footer = () => {
  return (
    <Container>
      <Text color="background" size="14px">
        이 블로그는 smailgate 과제전형을 위한 블로그입니다. 제작자 : 김현국
        <br />
        <br />
        이 블로그는 React Framework를 이용하여 작성이 되었습니다. 관리자
        페이지는 /manager를 주소창에 입력하면 접속 할 수 있습니다.
        <br />
        <br />
      </Text>
    </Container>
  )
}

export default Footer
