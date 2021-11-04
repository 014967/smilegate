import React, { useEffect, useState, useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table'
import styled from 'styled-components'
import {
  useLocation,
  useHistory,
  withRouter,
  useParams,
} from 'react-router-dom'
import '../components/table.css'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'

import { Checkbox } from './elements/CheckBox'

const DelButton = styled.button``

const BoardTable = ({ data, cateId }) => {
  const location = useLocation()
  let history = useHistory()
  console.log(data)
  const COLUMNS = [
    {
      Header: 'id',
      accessor: 'id',
    },
    {
      Header: 'categoryID',
      accessor: 'categoryID',
    },
    {
      Header: 'title',
      accessor: 'title',
    },
    {
      Header: 'createdAt',
      accessor: 'createdAt',
    },
  ]

  const columns = useMemo(() => COLUMNS, [])
  const board = useMemo(() => data, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ])
    },
  )
  const onFF = (e, v) => {
    console.log(v)
    //console.log(e)

    console.log(e.target.value)

    if (e.target.value == 'on') {
    } else {
      if (!location.pathname.includes(v.id)) history.push('/Edit/' + v.id)
    }
  }

  const deleteBoard = async () => {
    const electedFlatRows = selectedFlatRows.map((row) => row.original)
    console.log(electedFlatRows)

    for (var i = 0; i < electedFlatRows.length; i++) {
      const cateDetail = {
        id: electedFlatRows[i].id,
      }
      const removeCate = await API.graphql(
        graphqlOperation(mutations.deleteBoard, {
          input: cateDetail,
        }),
      )
    }
    alert('게시물을 삭제했습니다')
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

  return (
    <>
      <DelButton onClick={deleteBoard}>선택 삭제</DelButton>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((columns) => (
                <th {...columns.getHeaderProps()}>
                  {columns.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            {
              console.log(row)
            }
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      onClick={(e) => onFF(e, row.original)}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
export default BoardTable
