import API from '@aws-amplify/api'
import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: ${(props) => props.color};
  margin-top: 5px;
`

const GridItem = styled.div`
  width: 180px;
`

const ItemTitle = styled.div`
  font-weight: bold;
`
const ItemImg = styled.img`
  width: 180px;
  height: 180px;
`

const TableItem = ({ handle, data }) => {
  

  return (
    <Wrapper onClick={handle}>
      <ItemTitle>{data.title}</ItemTitle>
      {data.smallImg && <ItemImg src={data.smallImg} />}
      <GridItem>{data.smallContent}</GridItem>
    </Wrapper>
  )
}

export default TableItem
