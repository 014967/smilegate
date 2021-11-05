import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
// src/index.js
import Parser from 'html-react-parser'

import Comment from './Comment'
import CommentInput from './CommentInput'

const Wrapper = styled.div`
  color: ${(props) => props.color};
  margin-top: 5px;
`

const BoardItem = ({ data }) => {
  const [content, setContent] = useState()
  const [commentList, setCommentList] = useState([])
  const [event, setEvent] = useState()

  const parseData = (data) => {
    if (typeof data.content !== 'undefined') {
      console.log(data)
      setContent(data.content)
    }
  }

  const getComment = async () => {
    const allComment = await API.graphql(
      graphqlOperation(queries.listComments, {
        filter: {
          boardID: {
            contains: data.id,
          },
        },
      }),
    )

    console.log(allComment)
    if (allComment.data.listComments.items.length != 0) {
      setCommentList([])
      for (var i = 0; i < allComment.data.listComments.items.length; i++) {
        var commentData = {
          id: allComment.data.listComments.items[i].id,
          name: allComment.data.listComments.items[i].name,
          text: allComment.data.listComments.items[i].text,
        }

        setCommentList((commentList) => [...commentList, commentData])
      }
    } else {
      setCommentList([]) ///여기까지 ㅎㅆ다
    }
  }

  useEffect(() => {
    parseData(data)
    //    getComment()
  }, [])

  useEffect(() => {
    //   getComment()
  }, [event])

  useEffect(() => {
    parseData(data)
  }, [data])
  return (
    <Wrapper>
      <div>{data.title}</div>
      {content && (
        <div>
          <div>{Parser(content)}</div>
          <div></div>
        </div>
      )}
    </Wrapper>
  )
}
export default BoardItem
