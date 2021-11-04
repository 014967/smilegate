import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useHistory, withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  background-image : url("${props => props.url}");
`

const BackgroundImg = styled.img``
const TopBackground = ({url}) => {
  return <Wrapper url={url}></Wrapper>
}
export default TopBackground
