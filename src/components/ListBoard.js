import React, { useEffect, useState, useMemo } from 'react'
import { useLocation, useHistory, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import noImg from '../assets/images/noimage.gif'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import { v4 as uuidv4 } from 'uuid'
import BoardTable from '../components/BoardTable'
const CategoryWrapper = styled.div``
const TableWrapper = styled.div``
const ListBoardWrapper = styled.div`
  margin-top: 30px;
  width: 70%;
`
const Content_Title = styled.h1`
  border-bottom: 2px solid #353535;
`
const ListBoard = () => {
  const [board, setBoard] = useState([])
  const [category, setCategory] = useState([])
  const [selectCate, setSelectCate] = useState()
  const [cateId, setCateId] = useState()

  const getCategory = async () => {
    const allCategory = await API.graphql(
      graphqlOperation(queries.listCategorys),
    )
    //   console.log(allCategory)
    if (allCategory.data.listCategorys.items.length != 0) {
      for (var i = 0; i < allCategory.data.listCategorys.items.length; i++) {
        var cate = {
          id: allCategory.data.listCategorys.items[i].id,
          name: allCategory.data.listCategorys.items[i].name,
        }
        setCategory((oldArray) => [...oldArray, cate])
      }
    }
  }
  const getBoard = async (value) => {
    const allBoard = await API.graphql(
      graphqlOperation(queries.listBoards, {
        filter: {
          categoryID: {
            contains: value,
          },
        },
      }),
    )
    console.log(allBoard)
    if (allBoard.data.listBoards.items.length != 0) {
      setBoard([])

      setBoard(allBoard.data.listBoards.items)
    } else {
      setBoard([])
    }
  }
  const handleOption = (e) => {
    // console.log(e.target.value)
    setSelectCate(e.target.value)
    getBoard(e.target.value)
    setCateId(e.target.value)
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <ListBoardWrapper>
      <Content_Title>게시글 관리</Content_Title>

      <CategoryWrapper>
        <select value={selectCate} onChange={handleOption}>
          <option>카테고리</option>
          {category
            ? category.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.name}
                </option>
              ))
            : '카테고리가 없습니다'}
        </select>
      </CategoryWrapper>
      <TableWrapper>
        {board && board.length !== 0 && (
          <BoardTable cateId={cateId} data={board} />
        )}
      </TableWrapper>
    </ListBoardWrapper>
  )
}

export default ListBoard
