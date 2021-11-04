import React, { useState, useEffect } from 'react'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import styled from 'styled-components'
import { getComment } from '../graphql/queries'

const CommentWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-top: solid 1px gray;
`
const CommentTitle = styled.div`
  margin-top: 10px;
  font-weight: bold;
`
const CommentText = styled.div``
const CommentOutput = ({ data }) => {
  console.log(data)

  const title = data.name
  const text = data.text

  return (
    <CommentWrapper>
      <CommentTitle>{title}</CommentTitle>
      <CommentText>{text}</CommentText>
    </CommentWrapper>
  )
}

export default CommentOutput
