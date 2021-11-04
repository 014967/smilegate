import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components'
import MenuButton from '../components/elements/ManagerMenuButton'
import Profile from '../pages/ManageProfile'
import Category from '../pages/ManageCategory'
import Board from '../pages/ManageBoard'
import ListBoard from '../components/ListBoard'
const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  margin: 64px 64px 64px 0;
  min-width: 232px;
  & > * + * {
    margin-top: 16px;
  }
`
const ManagerPage = (props) => {
  const [state, setState] = useState('profile')

  const handleItemClick = (e) => {
    setState(e.target.value)
  }

  return (
    <Wrapper>
      <Menu>
        <MenuButton value="profile" onClick={handleItemClick}>
          프로필관리
        </MenuButton>
        <MenuButton value="Category" onClick={handleItemClick}>
          카테고리 관리
        </MenuButton>
        <MenuButton value="Board" onClick={handleItemClick}>
          게시글 관리
        </MenuButton>
      </Menu>
      {state === 'profile' && <Profile />}
      {state === 'Category' && <Category />}
      {state === 'Board' && <ListBoard />}
    </Wrapper>
  )
}

export default ManagerPage
