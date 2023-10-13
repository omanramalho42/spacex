'use client'

import { useEffect, useState } from "react"
import { GlobalStyle } from "@/styles/global"
import BarChart from "@/components/BarChart"
import { motion } from 'framer-motion'
import { 
  Funnel, 
  CaretDown, 
  CaretLeft, 
  TagChevron,
  VideoCamera,
  Check
} from 'phosphor-react'

import { 
  HomeContainer, 
  Typography, 
  Container, 
  Nav,
  FilterBox,
  Filter,
  IconWrapper,
  Content,
  BadgeStatus
} from "./home/styles"
import PieChart from "@/components/PieChart"

interface ActiveNavProps {
  nav: null | 'items' | 'activity'
}

interface ActiveFilterProps {
  filter: null | string;
}

interface SelectedFilterProps {
  key: '' | 'filter' | 'tag'
}

interface OptionsProps {
  title: string;
  key: 'filter' | 'tag'
}

const options: OptionsProps[] = [
  { title: 'Rocket', key: 'filter' },
  { title: 'Laucher', key: 'filter' },
  { title: 'Space', key: 'filter' },
  { title: 'Timer', key: 'filter' },
  { title: 'Tag #1', key: 'tag' },
  { title: 'Tag #2', key: 'tag' },
  { title: 'Tag #3', key: 'tag' },
  { title: 'Tag #4', key: 'tag' },
  { title: 'Tag #5', key: 'tag' },
];

interface ContentProps {
  avatar: string;
  title: string;
  from: string;
  to?: string;
  status: 'Confirmed' | 'Canceled' | 'Pending' | 'warning';
  color: string;
  created_at: String;
  expired_at: String;
  code: string;
  description: string;
  video?: string;
}

const content: ContentProps[] = [
  { 
    avatar: '../assets/image.jpg', 
    title: 'Aplha Rocket #2321', 
    from: 'México Tulum',
    to: 'Moon', 
    status: 'Pending',
    color: 'gray',
    created_at: '4 minutes ago', 
    expired_at: 'in 4 months', 
    code: '#4212321', 
    description: 'Foguete da nasa', 
    video: '' 
  },
  { 
    avatar: '../assets/image2.jpg', 
    title: 'Aplha Rocket #2321', 
    from: 'México Tulum',
    to: 'Moon', 
    status: 'Canceled',
    color: 'red',
    created_at: '4 minutes ago', 
    expired_at: 'in 4 months', 
    code: '#4212321', 
    description: 'Foguete da nasa', 
    video: '' 
  },
  { 
    avatar: '../assets/image3.jpg', 
    title: 'Aplha Rocket #2321', 
    from: 'México Tulum',
    to: 'Moon', 
    status: 'Confirmed',
    color: 'green', 
    created_at: '4 minutes ago', 
    expired_at: 'in 4 months', 
    code: '#4212321', 
    description: 'Foguete da nasa', 
    video: '' 
  },
  { 
    avatar: '../assets/image4.jpg', 
    title: 'Aplha Rocket #2321', 
    from: 'México Tulum',
    to: 'Moon', 
    status: 'warning',
    color: 'orange',
    created_at: '4 minutes ago', 
    expired_at: 'in 4 months', 
    code: '#4212321', 
    description: 'Foguete da nasa', 
    video: '' 
  },
]

interface FiltersProps {
  title: string;
  key: '' | 'filter' | 'tag';
  icon: React.ReactNode;
}

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const variantItem = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
    },
  }),
  hidden: { opacity: 0, y: -100 },
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

export default function Home() {
  const [activeNav, setActiveNav] = 
    useState<ActiveNavProps>({ nav: null });
  const [activeFilter, setactiveFilter] = 
    useState<ActiveFilterProps>({ filter: null });
  const [selectedFilter, setSelectedFilter]
    = useState<SelectedFilterProps>({ key: '' });

  const filters: FiltersProps[] = [
    { title: 'Filters', key: 'filter', icon: <Funnel size={24} /> },
    { title: 'Event type', key: 'tag', icon: <TagChevron size={24} /> }
  ];

  useEffect(() => {
    console.log(activeFilter,'active filter');
  },[activeFilter])
    
  return (
    <Container>
      <GlobalStyle />
      <div className="charts-content">
        <BarChart />
        <PieChart />
      </div>
      <motion.div 
        className="content-nav"
        variants={container}
        initial="hidden"
        animate="show"  
      >
        <Nav 
          variants={item}
          active={activeNav.nav === 'items'} 
          onClick={() => {
            if(activeNav.nav === 'items') {
              return setActiveNav({ nav: null });
            }
            setActiveNav({ nav: 'items' })
          }}
        >
          <p>
            Items
          </p>
        </Nav>
        <Nav 
          active={activeNav.nav === 'activity'} 
          onClick={() => {
            if(activeNav.nav === 'activity') {
              return setActiveNav({ nav: null });
            }
            setActiveNav({ nav: 'activity' })
          }}
        >
          <p>
            Activity
          </p>
        </Nav>
      </motion.div>
      <HomeContainer>
        <div className="content-filter">
          
          {filters.map(({ icon, key: id, title }, idx) => {
            return (
              <section key={idx}>
                <div 
                  onClick={() => {
                    if (selectedFilter.key === id) {
                      setSelectedFilter({ key: '' })
                    } else {
                      setSelectedFilter({ key: id })
                    }
                  }}
                >
                  <IconWrapper
                    color={
                      selectedFilter.key === id 
                      ? 'theme' 
                      : 'default'
                    }
                  >
                    { icon }
                  </IconWrapper>
                  <Typography 
                    color={
                      selectedFilter.key === id 
                      ? 'theme' 
                      : 'default'
                    }
                    >
                    { title }
                  </Typography>
                  {selectedFilter.key === id ? (
                    <CaretLeft size={24} color={'#6A31BE'} />
                  ) : (
                    <CaretDown size={24} color={'white'} />
                  )}
                </div>
                {selectedFilter.key === id && (
                <FilterBox 
                  initial="hidden"
                  animate="visible"
                  variants={list}
                >
                  {options.map(({ title, key }, idx: number) => {
                    if (key.includes(selectedFilter.key)) {
                      return (
                        <Filter 
                          key={idx} 
                          active={activeFilter.filter === title ? true : false} 
                          custom={idx}
                          variants={variantItem}
                          onClick={() => {
                            if (activeFilter.filter === title) {
                              setactiveFilter({ filter: '' })
                            } else {
                              setactiveFilter({ filter: title })
                            }
                          }}
                        >
                          <Typography color={activeFilter.filter === title ? 'theme' : 'default'}>
                            { title }
                          </Typography>
                        </Filter>
                      )
                    }
                  })}
                </FilterBox>
              )}
              </section>
            )
          })}
        </div>
        
        <motion.div 
          className="content-info"
          initial="hidden"
          animate="visible"
          variants={list}  
        >
          {content.map((item, idx: number) => {
            if (item.title.toLowerCase().trim().includes(activeFilter.filter?.toLowerCase() || '')) {
              return (
                <Content key={idx} variants={variantItem} custom={idx}>
                  <div className="content-wrapper-info">
                    <img src={item.avatar} alt="avatar" width={64} height={64} />
                    <div className="wrapper-content-header">
                      <Typography>{item.title}</Typography>
                      <div className="wrapper-info">
                        <div className="content-wrapper-localization">
                          <Typography>
                            From: {item.from}
                          </Typography>{','}
                          <Typography>To: {item.to}</Typography>
                        </div>
                      </div>
                    </div>
                    <BadgeStatus color={item.color}>
                      <Check size={20} color={item.color} />
                      { item.status }
                    </BadgeStatus>
                    <div className="wrapper-other-infos">
                      <Typography>{item.created_at}</Typography>
                      <Typography>{item.expired_at}</Typography>
                      <VideoCamera size={24} color="white" style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                  <div className="wrapper-end-content">
                    <Typography>{item.code}</Typography>
                    <Typography>{item.description}</Typography>
                  </div>
                </Content>
              )
            }
          })}
        </motion.div>
      </HomeContainer>
    </Container>
  )
}
