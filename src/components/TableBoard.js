import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import { useLocation, useHistory, withRouter, Link } from 'react-router-dom'
import parse from 'html-react-parser'
import TableItem from './TableItem'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 240px);
  padding-left: 50px;
  padding-right: 100px;
  padding-top: 50px;
  height: 500px;
`

const GridItem = styled.div`
  width: 180px;
`

const ItemTitle = styled.div`
  font-weight: bold;
`
const ItemImg = styled.img`
  width: 180px;
  height: 180px;
`

const ItemWrapper = styled.div`
  margin-right: 10px;
`

const TableBoard = () => {
  const [board, setBoard] = useState([])
  const location = useLocation()
  let history = useHistory()

  const textLengthOverCut = (txt, len, lastTxt) => {
    if (len == '' || len == null) {
      // 기본값
      len = 20
    }
    if (lastTxt == '' || lastTxt == null) {
      // 기본값
      lastTxt = '...'
    }
    if (txt.length > len) {
      txt = txt.substr(0, len) + lastTxt
    }
    return txt
  }

  const getBoard = async () => {
    const allBoard = await API.graphql(graphqlOperation(queries.listBoards))
    console.log(allBoard)
    if (allBoard.data.listBoards.items.length != 0) {
      for (var i = 0; i < allBoard.data.listBoards.items.length; i++) {
        //   console.log(allBoard.data.listBoards.items[i].content)
        const imagePattern = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g
        const extractTextPattern = /(<([^>]+)>)/gi
        const pattern = /&nbsp;/gi

        var imgfound = ''

        while (imagePattern.test(allBoard.data.listBoards.items[i].content)) {
          //     console.log(RegExp.$2.trim())
          imgfound = RegExp.$2.trim()
        }
        // console.log(imgfound)

        var found = allBoard.data.listBoards.items[i].content.replace(
          extractTextPattern,
          '',
        )
        //console.log(found)
        var found2 = found.replace(pattern, '')
        //   console.log(found2)
        found2 = textLengthOverCut(found2, 50, '...')

        var boardData = {
          categoryID: allBoard.data.listBoards.items[i].categoryID,
          content: allBoard.data.listBoards.items[i].content,
          id: allBoard.data.listBoards.items[i].id,
          title: allBoard.data.listBoards.items[i].title,
          smallContent: found2,
          smallImg: imgfound,
        }

        setBoard((board) => [...board, boardData])
      }
    }
  }

  const handleItemClick = (data) => {
    if (!location.pathname.includes(data.id)) history.push('/board/' + data.id)
  }
  useEffect(() => {
    getBoard()
  }, [])
  useEffect(() => {
    // console.log(...board)
  }, [board])

  return (
    <Wrapper>
      {board
        ? board.map((data, index) => (
            <TableItem
              key={index}
              data={data}
              handle={() => handleItemClick(data)}
            />
          ))
        : '게시물이 없습니다'}
    </Wrapper>
  )
}

export default TableBoard
