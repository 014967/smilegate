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

const Submit = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`
const EditWrapper = styled.div``
const Header = styled.div`
  display: flex;
`

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
`
const Edit = () => {
  const [title, setTitle] = useState()
  const [board, setBoard] = useState([])
  const [boardState, setBoardState] = useState()
  const [category, setCategory] = useState([])
  const [selectCate, setSelectCate] = useState()

  const location = useLocation()
  let history = useHistory()

  const params = useParams()
  console.log(params)

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

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
  const submitData = async () => {
    const BoardDetail = {
      id: board[0].id,
      categoryID: selectCate,
      title: title,
      content: boardState,
    }

    if (typeof boardState == 'undefined') {
      alert('????????? ??????????????????')
    } else if (typeof selectCate == 'undefined') {
      alert('??????????????? ???????????????')
    } else if (typeof title == 'undefined') {
      alert('????????? ??????????????????')
    } else {
      const newBoard = await API.graphql(
        graphqlOperation(mutations.updateBoard, { input: BoardDetail }),
      )
      alert('?????????????????????')
      history.push('/')
    }
  }
  const getBoard = async (value) => {
    const allBoard = await API.graphql(
      graphqlOperation(queries.listBoards, {
        filter: {
          id: {
            contains: params.id,
          },
        },
      }),
    )

    if (allBoard.data.listBoards.items.length != 0) {
      setBoard([])

      setBoard(allBoard.data.listBoards.items)
    } else {
      setBoard([])
    }
  }

  useEffect(() => {
    getCategory()
    getBoard()
  }, [])

  return (
    <EditWrapper>
      <Header>
        <h2>????????? ??????</h2>
        <Block width="80%" />
        <Submit onClick={submitData}> ???????????? </Submit>
      </Header>

      <select value={selectCate} onChange={handleOption}>
        <option>????????????</option>
        {category
          ? category.map((data, index) => (
              <option key={index} value={data.id}>
                {data.name}
              </option>
            ))
          : '??????????????? ????????????'}
      </select>

      <Input
        type="text"
        placeholder="????????? ??????????????????"
        value={title}
        onChange={handleTitle}
      />

      {board.length !== 0 && typeof board !== 'undefined' && (
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
            editor.setData(board[0].content)
            setTitle(board[0].title)
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
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
      )}
    </EditWrapper>
  )
}
export default Edit
