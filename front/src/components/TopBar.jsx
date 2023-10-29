import React from "react";
import styled from "styled-components";

const TopBar = ({ roomName }) => {
  return (
    <Container>
      <div className="topbar">{roomName}</div>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 0;
  background-color: #282563;
  .topbar {
    text-align: center;
    color: white;
  }
`;

export default TopBar;
