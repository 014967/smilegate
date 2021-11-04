import styled from 'styled-components'

const Block = styled.div`
width: ${(props) => props.width};
height: ${(props) => props.height};
background-color : ${(props) => props.color};
`


export default Block;