'use client'
import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../context/searchSlice';

import { CaretDown, MagnifyingGlass } from 'phosphor-react'
import { 
  HeaderContainer, 
  Input, 
  Profile,
  Avatar,
  ContentLogo,
  Typography, 
  LanguageFlag,
  BoxFlag,
  InputBox,
  Logo
} from './styled'

import { useRouter, useSearchParams } from 'next/navigation'

const Header = () => {
  const dispatch = useDispatch();
  // const searchValue = useSelector((state: any) => state.search.value);
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams?.get('search') ?? ''
  
  const handleInputChange = (event: any) => {
    dispatch(setSearchValue(event.target.value)); 
    router.push(`?search=${event.target.value}`);
  };

  const handleInputChangeDebounce = useDebounce(handleInputChange, 500);

  function useDebounce(fn: any, delay: number) {
    const timeOutRef = useRef(0);

    function handleDebounced(...args: any) {
      window.clearTimeout(timeOutRef.current);
      timeOutRef.current = window.setTimeout(() => {
        fn(...args);
      }, delay);
    }

    return handleDebounced;
  }
  return (
    <HeaderContainer>
      <ContentLogo>
        <Logo src='/../../assets/logo.jpg' alt='Foguete' width={64} height={64} />
        <Typography size='large'>
          SPACE
        </Typography>
        <Typography size='large' color='theme'>
          X 
        </Typography>
      </ContentLogo>

      <InputBox>
        <button className='input-box'>
          <MagnifyingGlass 
            size={24} 
            color='white' 
          />
        </button>
        <Input 
          type="text"
          placeholder='Pesquise aqui'
          role='search'
          onChange={handleInputChangeDebounce}
        />
      </InputBox>

      <div>   
        <BoxFlag>
          <LanguageFlag />
          <CaretDown size={24} color='white' />
          <select disabled>
            <option value="EN">
              EN
            </option>
            <option value="EN">
              PT
            </option>
          </select>
        </BoxFlag>

        <Profile>
          <Avatar src='/../../assets/logo.jpg' alt='' width={64} height={64} />
        </Profile>
      </div>

    </HeaderContainer>
  )
}

export default Header