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

  const addCategory = (e) => {
    setCategory((current) => [...current, '게시글'])
  }
  const pushCategory = async () => {
    for (var i = 0; i < category.length; i++) {
      var categoryDetail = {
        name: category[i],
      }
      const newCategory = await API.graphql(
        graphqlOperation(mutations.createCategory, { input: categoryDetail }),
      )
    }
  }

  const getCategory = async () => {
    const allCategory = await API.graphql(
      graphqlOperation(queries.listCategorys),
    )
    if (allCategory.data.listCategorys.items.length != 0) {
        for(var i=0; i < allCategory.data.listCategorys.items.length; i++)
        {
            setCategory(oldArray => [...oldArray, allCategory.data.listCategorys.items[i].name]);
        }
      
    }
  }

  const handleChange = (e) => {
    const temp = [...category]
    temp[categoryIndex] = e.target.value
    setCategory(temp)
    setCategoryName(e.target.value)
  }

  const handleClick = (data, index) => {
    console.log(data)
    console.log(index)

    setCategoryName(data)
    setCategoryIndex(index)
  }
  const handleDelClick = (e) => {
    const temp = [...category]

    temp.splice(categoryIndex, 1)
    setCategoryName('')
    setCategory(temp)
  }

  useEffect(() => {
    getCategory()
  }, [])

  /* useEffect(()=>
  {
      if(category != {})
      console.log(category)
  },[category])*/
  return (
    <ManageWrapper>
      <Content_Title>카테고리 등록</Content_Title>
      <div>
        <Category_button src={btn_addCategory} onClick={addCategory} />
        <Category_button
          width="50px"
          src={btn_delCategory}
          onClick={handleDelClick}
        />
      </div>
      <Category_table>
        <div>
          <CategoryList>
            <ul>
              {category
                ? category.map((data, index) => (
                    <Row key={index} onClick={() => handleClick(data, index)}>
                      <Category_Title>{data}</Category_Title>
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
