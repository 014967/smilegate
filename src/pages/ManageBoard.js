import React, { useEffect, useState } from 'react'
import { useLocation, useHistory, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import noImg from '../assets/images/noimage.gif'
import { API, Storage } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'
import { v4 as uuidv4 } from 'uuid'

const ManageWrapper = styled.div`
  width: 800px;
`
const Content_Title = styled.h1`
  border-bottom: 2px solid #353535;
`

const ManageBoard = () => {
  return (
    <ManageWrapper>
      <Content_Title>게시글 관리</Content_Title>
    </ManageWrapper>
  )
}
export default ManageBoard
