import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
// src/index.js
import Parser from 'html-react-parser'

const Wrapper = styled.div`
  color: ${(props) => props.color};
  margin-top: 5px;
`

const BoardItem = ({ data }) => {
  const [content, setContent] = useState()

  const parseData = (data) => {
    if (typeof data.content !== 'undefined') {
      console.log('ff')
      setContent(data.content)
    }
  }

  useEffect(() => {
    parseData(data)
  }, [])

  useEffect(() => {
    parseData(data)
  }, [data])
  return <Wrapper>{content && <div>{Parser(content)}</div>}</Wrapper>
}
export default BoardItem
