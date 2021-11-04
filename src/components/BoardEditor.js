import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  useLocation,
  useHistory,
  withRouter,
  useParams,
} from 'react-router-dom'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import { v4 as uuidv4 } from 'uuid'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import Block from '../components/elements/Block'
import Wrapper from '../components/elements/Wrapper'

const Header = styled.div`
  display: flex;
`

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
`

const Submit = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`
const BoardEditor = (props) => {
  const location = useLocation()
  let history = useHistory()

  const [title, setTitle] = useState()
  const [boardState, setBoardState] = useState()
  const [category, setCategory] = useState([])
  const [selectCate, setSelectCate] = useState()

  const getCategory = async () => {
    const allCategory = await API.graphql(
      graphqlOperation(queries.listCategorys),
    )
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

  const handleOption = (e) => {
    console.log(e.target.value)
    setSelectCate(e.target.value)
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = async () => {
    const BoardDetail = {
      categoryID: selectCate,
      title: title,
      content: boardState,
    }

    if (typeof boardState == 'undefined') {
      alert('내용을 입력해주세요')
    } else if (typeof selectCate == 'undefined') {
      alert('카테고리를 정해주세요')
    } else if (typeof title == 'undefined') {
      alert('제목을 입력해주세요')
    } else {
      const newBoard = await API.graphql(
        graphqlOperation(mutations.createBoard, { input: BoardDetail }),
      )
      alert('저장되었습니다')
      history.push('/')
    }
  }

  useEffect(() => {
    getCategory()
    console.log(selectCate)
  }, [])

  return (
    <Wrapper width="100%">
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
      <Header>
        <h2>게시물 작성</h2>
        <Block width="80%" />
        <Submit onClick={handleSubmit}> 저장하기 </Submit>
      </Header>

      <Input
        type="text"
        placeholder="제목을 입력해주세요"
        onChange={handleTitle}
      />

      <CKEditor
        editor={ClassicEditor}
        // IMPORTANT - Pass in the AWS Storage object as a prop
        config={{
          language: 'ko',
          AmplifyUpload: {
            storage: Storage,
          },
          height: '300px',
          width: 'auto',
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          //setFormData(data);
          console.log({ event, editor, data })
          setBoardState(data)
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
      />
    </Wrapper>
  )
}

export default BoardEditor
