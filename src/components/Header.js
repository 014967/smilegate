import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useHistory, withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  background: pink;
`

const Categories = styled.nav`
  display: flex;

  & > * + * {
    margin-left: 64px;
  }
`

const Category = styled.button`
  font-size: 64px;
  border: none;
  background: none;
  cursor: pointer;
  outline: 0;
`

const Header = () => {
  const location = useLocation()
  let history = useHistory()
  const [currentState, setCurrentState] = useState()
  const [category, setCategory] = useState()

  const handleCategory = (cate) => {
    setCategory(cate)
    if (!location.pathname.includes(`${cate}`)) history.push('/' + cate)
  }

  const handleGoHome = () => {
    history.replace('/')
  }

  //const handelColor = useCallback( (cate) => (currentState.category === cate ? 'primary' : 'secondary') , [currentState])

  return (
    <Container>
      {!location.pathname.includes('information') &&
        !location.pathname.includes('Editor') && (
          <Categories>
            <Category onClick={() => handleGoHome()}> Home </Category>
            <Category onClick={() => handleCategory('information')}>
              {' '}
              Info{' '}
            </Category>
          </Categories>
        )}
    </Container>
  )
}

export default withRouter(Header)
