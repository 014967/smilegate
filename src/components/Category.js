import API from '@aws-amplify/api';
import React , { useState, useEffect ,useCallback} from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    color : ${(props) => props.color};
    margin-top : 5px;

   

`
const Category = ({handle, data }) =>
{
    
   
    
    return (

        <Wrapper  onClick={handle}>{data.name}</Wrapper>
    )
}

export default Category