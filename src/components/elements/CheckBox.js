import React, { useEffect } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  width: 50px;
  height: 50px;
`
export const Checkbox = React.forwardRef(({ interminate, ...rest }, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    resolvedRef.current.interminate = interminate
  }, [resolvedRef, interminate])

  return (
    <>
      <Input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  )
})
