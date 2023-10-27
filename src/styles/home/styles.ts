import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { css } from 'styled-components';

const TYPOGRAPHY_SIZES = {
  'small': 1,
  'medium': 1.5,
  'large': 2
}

const COLORS = {
  'warning': 'orange',
  'error': 'red',
  'success': 'green',
  'info': 'blue',
  'default': 'white',
  'theme': '#6A31BE'
}

export const Container = styled.main`
  margin: 60px 100px;

  @media screen and (max-width: 1000px) {
    margin: 60px 20px;
  }

  @media screen and (max-width: 600px) {
    margin: 0px;
  }

  div.content-nav {
    display: flex;
    gap: 20px;

    justify-content: center;
    align-items: center;

    border-radius: 8px;
    background-color: rgba(25,25,25, .5);
  }
`

interface ChartsBoxProps {
  show: boolean;
}

export const Button = styled(motion.button)`
  display: flex;
  
  padding: 10px;

  text-align: center;
  
  color: white;
  background-color: #6A31BE;
  border-radius: 8px;

  margin: 15px 0;
  
  cursor: pointer;
`;

export const MetricCard = styled(motion.div)`
  display: flex;
  flex-direction: row;
  
  margin: 20px 0;

  justify-content: space-around;
  align-items: center;
`;

export const Card = styled(motion.div)`
  display: flex;

  cursor: default;
  
  padding: 15px;

  justify-content: center;
  align-items: center;

  background-color: rgba(25, 25, 25, .9);
  box-shadow: 0 0 8px 2px rgba(0,0,0, 0.5);
  border: 1px solid #333;

  border-radius: 5px;
  color: '#FFF'
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled(motion.div)`
  flex: 1;
  width: 100%;
  height: 100vh;

  justify-content: center;
  align-items: center;

  div.infinite-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;

    justify-content: center;
    align-items: center;
    margin: auto;

    font-size: 16px;

    border: 5px solid #f3f3f3; /* light grey */
    border-top: 5px solid green; /* blue */
    
    border-radius: 50%;
    animation: ${rotation} 2s linear infinite;
  }
`

export const ChartsBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  margin: 20px 10px;
  
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`

interface NavProps {
  active?: boolean;
}

export const Nav = styled(motion.nav)<NavProps>`
  padding: 20px 0;
  border-bottom: 2px solid ${({ active }) => 
    active 
    ? '#6A31BE' 
    : 'transparent'
  };

  cursor: pointer;

  transition: all 0.225s ease-in-out;
  p {
    font-size: 1em;
    font-weight: 700;
    color: ${({ active }) => 
      active 
      ? '#6A31BE' 
      : 'lightgray'
    };
  }

  &:hover {
    border-bottom: 2px solid ${({ active }) => active ? '#6A31BE' : 'transparent'};
    border-radius: 2px;
    box-shadow: 0 2px 0 ${({ active }) => active ? '#6A31BE' : 'transparent'};;

    p {
      font-size: 1em;
      /* color: #6A31BE; */
    }
  }
`;

export const HomeContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  border-top: 1px solid #333;

  transition: all 0.225s;

  height: 70vh;

  @media screen and (max-width: 1500px) {
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 10px;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-column-gap: 10px;
  }

  div.content-filter {
    border-radius: 8px;
    background-color: rgba(25,25,25, .9);

    border: 1px solid ${COLORS['theme']};
    transition: all 0.325s ease-in-out;

    &:hover {
      box-shadow: 0 0 12px 2px ${COLORS['theme']};
    }
  }

  div.content-filter > section > div {
    display: flex;

    padding: 15px;

    cursor: pointer;
    
    justify-content: space-around;
    align-items: center;

    border-bottom: 1px solid #333;
  }
  
  div.content-info {
    flex: 1;
    
    display: flex;
    flex-direction: column;

    gap: 20px;

    padding: 10px;
    
    border-radius: 8px;
    background-color: rgba(25,25,25, .9);
  }
`;

export const FilterBox = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  
  justify-content: flex-start;
  align-items: flex-start;

  transition: all 0.325s ease-in-out;
  gap: 10px;
`

interface FilterProps {
  active?: boolean;
}

export const Filter = styled(motion.div)<FilterProps>`
  display: flex;
  justify-content: center;

  cursor: pointer;

  width: 45%;
  
  border-radius: 8px;
  transition: border 0.5s all;
  transition: box-shadow .3s ease-in-out;
  border: 1px solid ${({ active }) => active ? '#6A31BE' : '#20221E'};
  
  ${({ active }) => {
    if(active) {
      return (
        css`box-shadow: 0px 0px 12px 6px rgba(106,49,90, .6);`
      )
    }
  }}

  &:hover {
    border: 1px solid #6A31BE;
  }
  padding: 10px;

  background-color: #171811;
`

interface TypographyProps {
  size?: keyof typeof TYPOGRAPHY_SIZES;
  color?: keyof typeof COLORS;
}

export const Typography = styled.p<TypographyProps>`
  transition: color 0.225s ease-in-out;
  color: ${({ color }) => 
    COLORS[color ? color :'default']};
  font-size: ${({ size }) => 
    TYPOGRAPHY_SIZES[size ? size : 'small']}em;

  @media screen and (max-width: 1000px) {
    font-size: 0.8em;
  }
`;

interface IconWrapperProps {
  color?: keyof typeof COLORS;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  color: ${({ color }) => 
    COLORS[color ?? 'default']};
`;

export const Content = styled(motion.table)`
  display: flex;
  
  justify-content: space-between;
  align-items: flex-end;
  
  /* flex-wrap: wrap-reverse; */

  padding-bottom: 8px;
  border-bottom: 1.5px solid #333;

  div.wrapper-end-content {
    display: flex;
    flex-direction: column;

    gap: 20px;

    justify-content: space-between;
    align-items: flex-start;
  }

  div.content-wrapper-info {
    display: flex;
    gap: 10px;
    
    @media screen and (max-width: 1000px) {
      gap: 5px;
    }

    align-items: flex-end;

    div.wrapper-content-header {
      display: flex;
      flex-direction: column;
      
      gap: 20px;

      align-items: flex-start;
      justify-content: space-between;
    }

    div.wrapper-other-infos {
      display: flex;

      gap: 20px;
      
      @media screen and (max-width: 1000px) {
        gap: 10px;
      }

      justify-content: flex-end;
      align-items: center;
    }
    
    div.wrapper-info {
      display: flex;
      flex-direction: column;

      justify-content: space-between;
    }

    div.content-wrapper-localization {
      display: flex; 
      gap: 8px;

      color: white;
    }

    img {
      border-radius: 8px;
    }
  }
`;

interface BadgeStatusProps {
  color: string;
}

export const BadgeStatus = styled.span<BadgeStatusProps>`
  display: flex;
  width: 50%;

  background-color: black;

  justify-content: center;
  align-items: center;

  color: ${({ color }) => color};

  border-radius: 12px;
  font-size: .9em;
  border: 2px solid ${({ color }) => color};
`;

export const Table = styled(motion.table)`
  border-radius: 8px;
  padding: 5px;

  border: 1px solid ${COLORS['theme']};
  transition: all 0.325s ease-in-out;

  &:hover {
    box-shadow: 0 0 12px 2px ${COLORS['theme']};
  }
  background-color: rgba(25,25,25,0.6);
`;