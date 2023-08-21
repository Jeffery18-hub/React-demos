import React from 'react'
import styled from 'styled-components';


const Home = () => {
  return (
    <div>
      <StyledHome src='../assets/cat.png' alt='this is home'/>
    </div>
  )
}

const StyledHome = styled.img`
  width: 100%;
  height: 100%;
`

export default Home
