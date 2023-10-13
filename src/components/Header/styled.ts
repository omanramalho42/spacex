import styled from "styled-components";
import Image from "next/image";

export const HeaderContainer = styled.header`
  display: flex;
  flex-wrap: wrap-reverse;

  justify-content: space-around;
  align-items: center;

  margin: 10px 0;

  div {
    display: flex;
    
    align-items: center; 
    
    gap: 10px;
  }
`;

export const ContentLogo = styled.div`
    visibility: visible;
  /* @media screen and (max-width: 1000px) {
    position: absolute;
    visibility: hidden;
  } */
`;

const TYPOGRAPHY_SIZES = {
  'small': 1,
  'medium': 1.5,
  'large': 2
}

const TYPOGRAPHY_COLORS = {
  'warning': 'orange',
  'error': 'red',
  'success': 'green',
  'info': 'blue',
  'default': 'white',
  'theme': '#6A31BE'
}

interface TypographyProps {
  size?: keyof typeof TYPOGRAPHY_SIZES;
  color?: keyof typeof TYPOGRAPHY_COLORS;
}

export const Typography = styled.p<TypographyProps>`
  color: ${({ color }) => TYPOGRAPHY_COLORS[color ? color : 'default']};
  font-size: ${({ size }) => TYPOGRAPHY_SIZES[size ? size : 'small']}em;
`;

export const Logo = styled(Image)`
  border-radius: 50%;
  object-fit: cover;

  width: 64px;
  height: 64px;
`;

export const InputBox = styled.div`
  width: 40%;
  display: flex;

  justify-content: flex-start;
  align-items: center;
  
  padding: 10px;
  
  gap: 10px;
  
  background-color: rgba(25,25,25,0.6);
  border-radius: 8px;

  button.input-box {
    cursor: pointer;
    margin-left: 10px;
  }
`

export const Input = styled.input`
  width: 100%;
  color: #FFF;

  &::placeholder {
    color: #FFF;
    font-size: 1em;
  }

  transition: border 0.225s;
  &:focus {
    border: none;
    outline: none;
  }
`;

export const Profile = styled.div``;

export const Avatar = styled(Image)`
  border-radius: 50%;
  width: 44px;
  height: 44px;
`;

export const BoxFlag = styled.div`
  display: flex;
  flex-direction: row;

  gap: 10px;

  justify-content: center;
  align-items: center;

  select {
    cursor: pointer;
    color: white;

    option {
      padding: 10px;
    }
  }
`;

export const LanguageFlag = styled.i``;