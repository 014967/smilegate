import React, { useState, useEffect } from 'react'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import styled from 'styled-components'
import { getComment } from '../graphql/queries'
import CommentOutput from './CommentOutput'
const CheckButton = styled.button`
  background-color: white;
  width: 100px;
  height: 50px;
`
const InputWrapper = styled.div``
const InputCommentName = styled.input`
  width: 100px;
`
const InputComment = styled.input`
  width: 100%;
  height: 200px;
`
const CommentWrapper = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
`
const CommentSubmit = styled.button``

const CommentListWrapper = styled.div``

const CommentItemName = styled.div``
const CommentItemText = styled.div``

const Comment = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [commentName, setCommentName] = useState()
  const [commentText, setCommentText] = useState()

  const [commentListName, setCommentListName] = useState([])
  const [commentListText, setCommentListText] = useState()
  const [commentList, setCommentList] = useState([])

  console.log(data)

  return (
    <CommentWrapper>
      <CommentListWrapper>
        {data && data.length !== 0
          ? data.map((data, index) => <CommentOutput key={index} data={data} />)
          : null}
      </CommentListWrapper>
    </CommentWrapper>
  )
}
export default Comment
