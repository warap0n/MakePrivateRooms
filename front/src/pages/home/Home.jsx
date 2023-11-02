import React, { useState } from "react";
import styled from "styled-components";
import CreateRoom from "../../components/CreateRoom";

const Home = () => {
  const [clicked, setClicked] = useState(false);
  const [created, setCreated] = useState(false);
  const clickHandler = () => {
    setClicked(true);
  };
  return (
    <Container>
      {clicked ? (
        <CreateRoom created={created} setCreated={setCreated} />
      ) : (
        <>
          <h1>Private Meeting Room</h1>
          <ul>
            <li>・No installation required</li>
            <li>・Quick access via URL or QR code</li>
            {/* <li>
          ・Example: Event organizers can easily distribute QR codes for event
          participants
        </li> */}
          </ul>
          <button onClick={clickHandler}>Get started</button>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
    font-size: 60px;
    margin-top: 50px;
  }
  ul {
    margin-top: 20px;
    padding: 40px;
    list-style: none;
    li {
      margin-top: 10px;
    }
  }
  button {
    margin-top: 30px;
    width: 150px;
    height: 50px;
    background-color: #0077ff;
    color: white;
    border: none;
    font-size: 22px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #0055cc;
      color: #a2a2a2;
    }
  }
  @media screen and (min-height: 600px) and (min-width: 720px) {
    h1 {
      font-size: 80px;
    }
    ul {
      li {
        font-size: 25px;
      }
    }
    margin-top: 100px;
  }
`;

export default Home;
