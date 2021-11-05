import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import Block from '../components/elements/Block'
import parse from 'html-react-parser'
import BoardItem from './BoardItem'
import Comment from './Comment'
import CommentInput from './CommentInput'

const BoardItemWrapper = styled.div`
  position: absolute;
  margin-left: 900px;
  margin-top: 200px;
  width: 1000px;
  height: 3000px;
  z-index: 2;
`

const BoardHeader = styled.div``

const HeaderBord = styled.div`
  font-weight: bold;
  font-size: 50px;
`
const HeaderNormal = styled.div``

const DirectBoard = () => {
  const params = useParams({})

  const [directBoard, setDirectBoard] = useState({})
  const [cateName, setCateName] = useState()
  const [boardTitle, setBoardTitle] = useState()
  const [commentList, setCommentList] = useState([])
  const [event, setEvent] = useState()
  console.log(params)

  const getComment = async () => {
    try {
      const allComment = await API.graphql(
        graphqlOperation(queries.listComments, {
          filter: {
            boardID: {
              contains: params.id,
            },
          },
        }),
      )

      if (allComment.data.listComments.items.length !== 0) {
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
    } catch (Exception) {
      console.log(Exception)
    }
  }

  const getDirectBoard = async () => {
    if (typeof params.id !== 'undefined') {
      const getBoard = await API.graphql(
        graphqlOperation(queries.listBoards, {
          filter: {
            id: {
              contains: params.id,
            },
          },
        }),
      )
      console.log(getBoard)
      if (getBoard.data.listBoards.items.length != 0) {
        for (var i = 0; i < getBoard.data.listBoards.items.length; i++) {
          var boardData = {
            categoryID: getBoard.data.listBoards.items[i].categoryID,
            content: getBoard.data.listBoards.items[i].content,
            id: getBoard.data.listBoards.items[i].id,
            title: getBoard.data.listBoards.items[i].title,
          }
          setDirectBoard(boardData)
        }
      } else {
        setDirectBoard('')
      }
    }
  }

  useEffect(() => {
    getDirectBoard()
    getComment()
  }, [, params])

  useEffect(() => {
    getComment()
  }, [event])

  return (
    <BoardItemWrapper>
      <BoardHeader>
        <HeaderBord>{directBoard.title}</HeaderBord>
      </BoardHeader>
      {directBoard && <BoardItem data={directBoard} />}
      <Block width="100%" height="3px" color="gray" />

      {directBoard && <CommentInput setEvent={setEvent} data={directBoard} />}

      {commentList.length !== 0 && typeof commentList !== 'undefined' && (
        <Comment data={commentList} />
      )}
    </BoardItemWrapper>
  )
}
export default DirectBoard
