import styled from "styled-components";

const COLORS = {
  'warning': 'orange',
  'error': 'red',
  'success': 'green',
  'info': 'blue',
  'default': 'white',
  'theme': '#6A31BE'
}

export const PaginationContainer = styled.div`
  flex: 1; 
  display: flex;
  
  gap: 5; 
  
  flex-direction: row;
  
  justify-content: space-between;
  align-items: center;
  
  padding: 0 10px;
  height: 30px;
  
  border-radius: 8px;
  
  color: #fff; 
  background-color: rgba(25,25,25,0.8);

  border: 1px solid ${COLORS['theme']};
  transition: all 0.325s ease-in-out;

  &:hover {
    box-shadow: 0 0 12px 2px ${COLORS['theme']};
  }

  button {
    transition: all 0.325s;
    text-align: center;

    &:hover {
      transform: scale(1.1);
    }
  }
`;