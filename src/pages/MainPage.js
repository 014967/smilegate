import React, { useState, useEffect } from 'react'
import { useLocation, useHistory, withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import Profile from '../components/Profile'
import Amplify from 'aws-amplify'
import awsExports from '../aws-exports'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import Board from '../components/Board.js'
import Category from '../components/Category.js'
import VerticalBlock from '../components/elements/VerticalBlock'
import TableBoard from '../components/TableBoard'
Amplify.configure(awsExports)

const WholeBody = styled.div`
  background-color: white;
  position: absolute;
  margin-left: 500px;
  margin-top: 100px;
  width: 1500px;
  height: 3000px;
  z-index: 2;
  border: 10px solid #faebd7;
`

const Wrapper = styled.div`
  display: flex;
  padding-left: 20px;
  padding-top: 50px;
`

const VisibleContainer = styled.div``

const MainContent = styled.div`
  width: 100px;
  height: 80%;
`
const CategoryTitle = styled.div`
  font-weight: bold;
`
const CategoryWrapper = styled.div``
const SideContent = styled.div``

const WriteBoard = styled.button``
const VerticalWrapper = styled.div``

const MainPage = () => {
  const location = useLocation()
  let history = useHistory()
  const moveEditor = () => {
    if (!location.pathname.includes('Editor')) history.push('/' + 'Editor')
  }

  const [category, setCategory] = useState([])
  const [board, setBoard] = useState([])
  const [title, setTitle] = useState()
  const [currentState, setCurrentState] = useState()
  const [open, setOpen] = useState(true)

  const getCategory = async () => {
    const allCategory = await API.graphql(
      graphqlOperation(queries.listCategorys),
    )
    if (allCategory.data.listCategorys.items.length != 0) {
      for (var i = 0; i < allCategory.data.listCategorys.items.length; i++) {
        var categoryData = {
          id: allCategory.data.listCategorys.items[i].id,
          name: allCategory.data.listCategorys.items[i].name,
        }
        setCategory((category) => [...category, categoryData])
      }
    }
  }
  const getBoard = async () => {
    const allBoard = await API.graphql(graphqlOperation(queries.listBoards))
    console.log(allBoard)
    if (allBoard.data.listBoards.items.length != 0) {
      for (var i = 0; i < allBoard.data.listBoards.items.length; i++) {
        var boardData = {
          categoryID: allBoard.data.listBoards.items[i].categoryID,
          content: allBoard.data.listBoards.items[i].content,
          id: allBoard.data.listBoards.items[i].id,
        }
        //   console.log(boardData.content)
        //setBoard(board => board.concat(boardData))
        setBoard((board) => [...board, boardData])
      }
    }
  }

  const handleCategoryClick = (data) => {
    console.log(data)
    console.log(data.id)
    setCurrentState(data.id)
    if (!location.pathname.includes(data.id))
      history.push('/category/' + data.id)
  }

  const handleOpen = () => {
    if (
      location.pathname.includes('manager') ||
      location.pathname.includes('Editor') ||
      location.pathname.includes('Edit')
    ) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }
  useEffect(() => {
    getCategory()
    getBoard()
  }, [])

  useEffect(() => {
    handleOpen()
  }, [location])

  if (open == false) return null

  return (
    <WholeBody open={open}>
      {!location.pathname.includes('manager') &&
        !location.pathname.includes('Editor') && (
          <Wrapper>
            <VisibleContainer>
              <Profile />
              <VerticalBlock height="20px" width="20px" />
              <SideContent>
                <WriteBoard onClick={moveEditor}>글쓰기</WriteBoard>
              </SideContent>
              <CategoryWrapper>
                <CategoryTitle>카테고리</CategoryTitle>
                <MainContent>
                  {category
                    ? category.map((data, index) => (
                        <Category
                          key={index}
                          data={data}
                          handle={() => handleCategoryClick(data)}
                        />
                      ))
                    : '카테고리가 없습니다'}
                </MainContent>
              </CategoryWrapper>
            </VisibleContainer>
            {!location.pathname.includes('category') &&
              !location.pathname.includes('board') && <TableBoard />}
          </Wrapper>
        )}
    </WholeBody>
  )
}
//
export default MainPage
