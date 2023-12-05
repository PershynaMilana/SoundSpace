import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: white;
  background-color: transparent;
  border: 1px solid white;
  border-radius: 50px;
  padding: 10px 20px;
  transition: transform 0.2s ease-in-out;
  font-weight: 600;
  &:hover {
    transform: scale(1.05);
  }
`;

const CustomButton = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default CustomButton;