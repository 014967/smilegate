import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import Block from '../components/elements/Block'

import BoardItem from './BoardItem'

const BoardItemWrapper = styled.div`
  position: absolute;
  z-index: 999;

  width: 1000px;
  height: 3000px;

  margin-left: 900px;
  margin-top: 200px;
  pointer-events: none;
  padding-top: 50px;
`

const BoardHeader = styled.div`
  display: flex;
`

const HeaderBord = styled.div`
  font-weight: bold;
`
const HeaderNormal = styled.div``
const Board = () => {
  const params = useParams()

  const [board, setBoard] = useState([])
  const [cateName, setCateName] = useState()

  const categoryName = async () => {
    const getName = await API.graphql(
      graphqlOperation(queries.listCategorys, {
        filter: {
          id: {
            contains: params.id,
          },
        },
      }),
    )
    console.log(getName)
    setCateName(getName.data.listCategorys.items[0].name)
  }
  const getBoard = async () => {
    const allBoard = await API.graphql(
      graphqlOperation(queries.listBoards, {
        filter: {
          categoryID: {
            contains: params.id,
          },
        },
      }),
    )
    console.log(allBoard)
    if (allBoard.data.listBoards.items.length != 0) {
      setBoard([])
      for (var i = 0; i < allBoard.data.listBoards.items.length; i++) {
        var boardData = {
          title: allBoard.data.listBoards.items[i].title,
          categoryID: allBoard.data.listBoards.items[i].categoryID,
          content: allBoard.data.listBoards.items[i].content,
          id: allBoard.data.listBoards.items[i].id,
        }

        setBoard((board) => [...board, boardData])
      }
    } else {
      setBoard([])
    }
  }

  useEffect(() => {
    categoryName()
    getBoard()
    console.log(...board)
  }, [, params])

  return (
    <BoardItemWrapper>
      <BoardHeader>
        <HeaderBord>{cateName + ' '}</HeaderBord>
        <Block width="10px" />
        <HeaderNormal>{board.length + '개의 글'}</HeaderNormal>
      </BoardHeader>
      <Block width="100%" height="1px" color="gray" />
      <Block width="100%" height="100px" color="white" />
      {board && board.length !== 0 ? (
        board.map((data, index) => (
          <div>
            <BoardItem key={index} data={data} />
            <Block width="100%" height="3px" color="gray" />
          </div>
        ))
      ) : (
        <div>아직 데이터가 없습니다</div>
      )}
    </BoardItemWrapper>
  )
}
export default Board
