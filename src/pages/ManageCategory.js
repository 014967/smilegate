import React, { Component, useState, useEffect } from 'react'
import styled from 'styled-components'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import btn_addCategory from '../assets/images/btn_add_category.gif'
import btn_delCategory from '../assets/images/btn_del_category.gif'

const ManageWrapper = styled.div`
  width: 800px;
`
const Content_Title = styled.h1`
  border-bottom: 2px solid #353535;
`

const CategoryWrapper = styled.div`
  display: flex;
`
const CategoryList = styled.div`
  width: 135px;
  height: 500px;
  border: 2px solid gray;
`
const Row = styled.li`
  display: flex;
`

const Category_button = styled.img`
  width: ${(props) => props.width || '80px'};
  height: 20px;
`

const Category_Title = styled.div``

const Category_table = styled.table`
  display: flex;
`

const Category_Detail = styled.div`
  margin-left: 20px;
`

const Category_Name = styled.textarea`
  resize: none;
`

const ManageCategory = () => {
  const [board, setBoard] = useState()
  const [category, setCategory] = useState([])
  const [categoryName, setCategoryName] = useState()
  const [categoryIndex, setCategoryIndex] = useState()
  const [categoryId, setCategoryId] = useState()
  const addCategory = (e) => {
    console.log('click!')
    setCategory((current) => [
      ...current,
      { id: ' ', name: '임시제목 수정 후 저장' },
    ])
  }
  const pushCategory = async () => {
    for (var i = 0; i < category.length; i++) {
      var categoryDetail = {
        name: category[i].name,
      }
      const newCategory = await API.graphql(
        graphqlOperation(mutations.createCategory, { input: categoryDetail }),
      )
    }
    alert('저장되었습니다')
    getCategory()
  }

  const getBoard = async ({ cateId }) => {
    const allBoard = await API.graphql(
      graphqlOperation(queries.listBoards, {
        filter: {
          categoryID: cateId,
        },
      }),
    )
    if (allBoard.data.listBoards.items.length != 0) {
      for (var i = 0; i < allBoard.data.listBoards.items.length; i++) {}
    }
  }

  const delCategory = async () => {
    const categoryDetail = {
      id: categoryId,
    }
    const removeCate = await API.graphql(
      graphqlOperation(mutations.deleteCategory, { input: categoryDetail }),
    )
    console.log(removeCate)
    if (removeCate.data.deleteCategory.board.items.length != 0) {
      for (
        var i = 0;
        i < removeCate.data.deleteCategory.board.items.length;
        i++
      ) {
        const boardDetail = {
          id: removeCate.data.deleteCategory.board.items[i].id,
        }
        const removeBoard = await API.graphql(
          graphqlOperation(mutations.deleteBoard, {
            input: boardDetail,
          }),
        )
      }
      alert('카테고리와 게시물을 삭제했습니다')
    }
  }
  const getCategory = async () => {
    const allCategory = await API.graphql(
      graphqlOperation(queries.listCategorys),
    )
    console.log(allCategory)

    if (allCategory.data.listCategorys.items.length != 0) {
      setCategory([])
      for (var i = 0; i < allCategory.data.listCategorys.items.length; i++) {
        var cate = {
          id: allCategory.data.listCategorys.items[i].id,
          name: allCategory.data.listCategorys.items[i].name,
        }
        setCategory((oldArray) => [...oldArray, cate])
      }
    }
  }

  const handleChange = (e) => {
    setCategoryName(e.target.value)
    category[categoryIndex].name = e.target.value
  }

  const handleClick = (data, index) => {
    console.log(data)
    console.log(index)
    setCategoryId(data.id)
    setCategoryName(data.name)
    setCategoryIndex(index)
  }
  const handleDelClick = (e) => {
    const temp = [...category]

    temp.splice(categoryIndex, 1)
    setCategoryName('')
    setCategory(temp)
    delCategory()
  }

  useEffect(() => {
    getCategory()
    console.log(...category)
  }, [])

  return (
    <ManageWrapper>
      <Content_Title>카테고리 등록</Content_Title>
      <div>
        <Category_button src={btn_addCategory} onClick={() => addCategory()} />
        <Category_button
          width="50px"
          src={btn_delCategory}
          onClick={handleDelClick}
        />
      </div>
      <Category_table>
        <div>
          <CategoryList>
            {console.log(category)}
            <ul>
              {category
                ? category.map((data, index) => (
                    <Row key={index} onClick={() => handleClick(data, index)}>
                      <Category_Title>{data.name}</Category_Title>
                    </Row>
                  ))
                : '카테고리가 없습니다'}
            </ul>
          </CategoryList>
        </div>
        <tbody>
          <tr>
            <td>
              <Category_Detail>카테고리명</Category_Detail>
            </td>
            <td>
              <Category_Name
                cols="20"
                rows="1"
                value={categoryName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
        </tbody>
      </Category_table>

      <button onClick={pushCategory}>저장</button>
    </ManageWrapper>
  )
}

export default ManageCategory
