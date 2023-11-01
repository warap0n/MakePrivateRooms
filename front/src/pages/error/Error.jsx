import React from "react";
import styled from "styled-components";

const Error = () => {
  return (
    <Container>
      <h2>Oops!</h2>
      <div className="sentences">
        <p>Trying to access a non-existent URL, huh?</p>
        <p>If you want to create a new room, click the button below!</p>
      </div>
      <button>Get started</button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #393939;
  color: white;

  h2 {
    padding-top: 80px;
    font-size: 80px;
    text-align: center;
  }
  p {
    padding: 30px;
    font-size: 20px;
  }
  .sentences {
    margin-top: 30px;
  }
  button {
    display: block;
    margin: 30px auto;
    width: 150px;
    height: 50px;
    background-color: #0077ff;
    color: white;
    border: none;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #0055cc;
      color: #a2a2a2;
    }
  }

  @media screen and (min-width: 720px) {
    .sentences {
      text-align: center;
      margin-top: 80px;
    }
    p {
      font-size: 25px;
    }
  }
`;

export default Error;
