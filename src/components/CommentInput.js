import React, { useState, useEffect } from 'react'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

const CommentInputWrapper = styled.div``

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
const CommentSubmit = styled.button``

const CommentInput = ({ data, setEvent }) => {
  const [open, setOpen] = useState(false)
  const [commentName, setCommentName] = useState()
  const [commentText, setCommentText] = useState()

  //console.log(data)

  const submitComment = async () => {
    const CommentDetail = {
      name: commentName,
      text: commentText,
      boardID: data.id,
    }
    if (typeof commentName == 'undefined') {
    } else if (typeof commentText == 'undefined') {
    } else {
      const newComment = await API.graphql(
        graphqlOperation(mutations.createComment, { input: CommentDetail }),
      )
      alert('저장되었습니다')
      setEvent(uuidv4())
    }
  }

  const saveComment = (e) => {
    console.log(commentName)
    console.log(commentText)
    submitComment()
  }
  const handleOpen = (e) => {
    setOpen((open) => !open)
  }
  const handleName = (e) => {
    setCommentName(e.target.value)
  }
  const handleText = (e) => {
    setCommentText(e.target.value)
  }

  return (
    <CommentInputWrapper>
      <CheckButton onClick={handleOpen}>댓글 달기</CheckButton>
      {open && (
        <InputWrapper>
          <InputCommentName
            type="text"
            onChange={handleName}
            placeholder="이름"
          />
          <InputComment type="text" onChange={handleText} placeholder="내용" />
          <CommentSubmit onClick={saveComment}>댓글 저장</CommentSubmit>
        </InputWrapper>
      )}
    </CommentInputWrapper>
  )
}
export default CommentInput
