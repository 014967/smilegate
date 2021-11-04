import styled from 'styled-components'

const Wrapper = styled.div`
  width: ${(props) => props.width};
  height: 100%; // 100% view height
  margin-left : 50px;
  margin-right : 2000px;

  justify-content: center; // centers in the flex direction and the default flex-direction is row
  align-items: center; // centers perpendicular to the flex direction
 
  position: absolute; // so it goes behind the current content
`

export default Wrapper
