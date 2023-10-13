'use client'
import React from 'react'
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

const Header = () => {
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
        />
      </InputBox>

      <div>   
        <BoxFlag>
          <LanguageFlag />
          <CaretDown size={24} color='white' />
          <select>
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