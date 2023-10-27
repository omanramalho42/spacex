'use client'

import { useCallback, useEffect, useRef, useState } from "react"

import { GlobalStyle } from "@/styles/global"

import BarChart from "@/components/BarChart"
import PieChart from "@/components/PieChart"

import { useSelector } from 'react-redux';

import { motion } from 'framer-motion'
import { toast, Toaster } from "react-hot-toast"
import axios from "axios"

import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';

import { 
  Funnel, 
  CaretDown, 
  CaretLeft, 
  TagChevron,
  VideoCamera,
  Check,
  ShieldCheck,
  ShieldWarning,
  ClosedCaptioning,
  XCircle
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
  BadgeStatus,
  ChartsBox,
  Button,
  Table,
  MetricCard,
  Card
} from "../../styles/home/styles"

import { Button as ButtonControl } from "@/components/Button"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Loading from "../../components/loading"
import PaginatinationControls from "@/components/PaginationControl"

import { LauncherProps } from "./@types/launcher-types"
import { RocketProps } from "./@types/rockets-types"

import { getLaunchers } from './services/get-all-launchers.service'
import { getRockets } from './services/get-all-rockets.service'

import { 
  hide, 
  item, 
  show, 
  variantItem,
  list 
} from "@/constants/animations"
import VideoScreen from "@/components/Video"
import { getStatsBar } from "./services/get-stats-bar.service"
import { getStatsPie } from "./services/get-stats-pie.service"

export const ContentComponent = (item: any, idx: number) => {
  return (
    <Content key={idx} variants={variantItem} custom={idx}>
      <div className="content-wrapper-info">
        <img src={item.links.wikipedia} alt="avatar" width={64} height={64} />
        <Typography>{item.flight_number }</Typography>
        <div className="wrapper-content-header">
          <div className="wrapper-info">
            <div className="content-wrapper-localization">
              <Typography>
                From: <Moment date={new Date(item.launch_date_local)} />
              </Typography>{','}
              <Typography>To: {item.launch_year}</Typography>
            </div>
          </div>
        </div>
        <BadgeStatus color={'red'}>
          <Check size={20} color={'red'} />
          { item.launch_success }
        </BadgeStatus>
        <div className="wrapper-other-infos">
          <Typography>
            <Moment date={new Date(item.launch_date_local)} />
          </Typography>
          <Typography>
            <Moment date={new Date(item.launch_date_unix)} />
          </Typography>
          <VideoCamera size={24} color="white" style={{ cursor: 'pointer' }} />
        </div>
      </div>
      <div className="wrapper-end-content">
        <Typography>{item.flight_number}</Typography>
        <Typography>{item.details}</Typography>
      </div>
    </Content>
  )
}

interface ActiveNavProps {
  nav: null | 'items' | 'Launchers'
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
  { title: '1', key: 'tag' },
  { title: '2', key: 'tag' },
  { title: '3', key: 'tag' },
  { title: '4', key: 'tag' },
  { title: '5', key: 'tag' },
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

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  console.log(searchParams,'searchParams');
  const [activeNav, setActiveNav] = 
    useState<ActiveNavProps>({ nav: 'Launchers' });
  const [activeFilter, setactiveFilter] = 
    useState<ActiveFilterProps>({ filter: null });
  const [selectedFilter, setSelectedFilter]
    = useState<SelectedFilterProps>({ key: '' });

  const filters: FiltersProps[] = [
    { title: 'Filters', key: 'filter', icon: <Funnel size={24} /> },
    { title: 'Event type', key: 'tag', icon: <TagChevron size={24} /> }
  ];

  useEffect(() => {
    // console.log(activeFilter,'active filter');
    const findLauncher = launchers.filter((item) => 
      item.mission_name.toLowerCase().trim().includes(activeFilter.filter?.toLowerCase() || '')
      || item.flight_number.toString().toLowerCase().includes(activeFilter.filter?.toLowerCase() || '')
    );
    // console.log(findLauncher, 'finded');
  },[activeFilter]);

  const [launchers, setLaunchers] = useState<LauncherProps[]>([]);
  const [loadingLauncher, setLoadingLauncher] = useState<boolean>(false);
  const fetchLaunchersData = async () => {
    setLoadingLauncher(true);
    await axios.get(`http://localhost:3333/api/v1/launchers?search=${searchParams.search || ''}`)
      .then((res) => {
        // console.log(res, 'response launcher'),
        toast.success('Fetch realizado com sucesso!');
        setLaunchers(res.data.results);
      })
      .catch(err => {
        console.log(err);
        toast.error("Fetch mal sucessido");
      })
      .finally(() => {
        setLoadingLauncher(false);
      })
  }

  const [loadingRocket, setLoadingRocket] = useState<boolean>(false);
  const [rockets, setRockets] = useState<RocketProps[]>([]);
  const fetchRockets = async () => {
    setLoadingRocket(true);
    await axios.get("http://localhost:3333/api/v1/rockets")
    .then((res) => {
      // console.log(res,'rockets');
      toast.success("Fetch Rockets realizado com sucesso")
      setRockets(res.data);
    }).catch(err => {
      console.log(err);
      toast.error("Falaha ao fazer Fetch Rockets");
    }).finally(() => {
      setLoadingRocket(false);
    })
  }

  const fetchDataApi = async () => {
    setLoadingLauncher(true);
    setLoadingRocket(true);
    // toast.loading('Carregando dados...');
    
    const [launchers, rockets] = await Promise.all([
      getLaunchers().catch(err => { return err }),
      getRockets().catch(err => { return err })
    ]);

    if (launchers) {
      setLaunchers(launchers);
      setLoadingLauncher(false);
    }
    if (rockets) {
      setRockets(rockets);
      setLoadingRocket(false);
    }

    toast.success('Dados carregados com sucesso')
  }

  console.log(process.env.REACT_API_URL, 'react api url');

  useEffect(() => {
    fetchLaunchersData();
    fetchRockets();

    // fetchDataApi();
  },[]);

  const [barChart, setBarChart] = useState<any>()
  const [pieChart, setPieChart] = useState<any>()
  const [metricStats, setMetricStats] = useState<any>();

  const [loadingChart, setLoadingChart] = useState<boolean>(false);
  const getStatsChart = async () => {
    setLoadingChart(true);

    const [barData, pieData] = await Promise.all([
      getStatsBar(),
      getStatsPie()
    ]);

    setBarChart(barData);
    setPieChart(pieData);

    setLoadingChart(false);
  }
  
  useEffect(() => {
    if (launchers.length > 0) {
      const statsCardMetric: { success: number; errors: number; reused: number; amount: number; } = 
      launchers.reduce((acc, launcher) => {
        if (launcher.launch_success) {
          acc.success++;
        } else {
          acc.errors++;
        }
  
        if (launcher.rocket.first_stage.cores) {
          launcher.rocket.first_stage.cores.map(({ reused }) => {
            if(reused) {
              acc.reused++;
            }
          })
        }

        acc.amount++

        return acc;
      },{ success: 0, errors: 0, reused: 0, amount: 0 } );

      getStatsChart();
      setMetricStats(statsCardMetric);
    }
  },[launchers]);

  const searchValue = useSelector((state: any) => state.search.value);
  const filterSearchLaunchers = useCallback((dataLaunchers: any) => {
    const launchersFiltered: any[] = dataLaunchers?.filter((item: LauncherProps) => {
      if(
        item.mission_name.trim().toLowerCase().includes(searchValue.toLowerCase() || '')
        || item.flight_number.toString().trim().includes(searchValue.trim())
        || item.rocket.rocket_name.toString().trim().includes(searchValue.toLowerCase().trim())
      ) {
        return item
      } else {
        return null
      }
    })
    return launchersFiltered;
  },[searchValue]);

  // useEffect(() => {
  //   console.log(searchValue,'filter launchers');
  // },[searchValue])
  
  const [showCharts, setShowCharts] = useState<boolean>(false);
  
  const page = searchParams['page'] ?? '1';
  const itemsPerPage = searchParams['per_page'] ?? '5';

  const start = (Number(page) -1) * Number(itemsPerPage) //0 5 10...
  const end = start + Number(itemsPerPage)

  const entries = filterSearchLaunchers(launchers).slice(start, end);

  const getOptions = () => {
    let options = [{ title: 'Todos', key: '' }];

    if (entries) {
      entries.forEach((item) => {
          options.push({
            title: item.mission_name,
            key: 'filter'
          });
          options.push({
            title: item.flight_number.toString(),
            key: 'tag'
          });
        });
    }

    return options;
  };

  useEffect(() => {
    setactiveFilter({ filter: '' });
    console.log(page, 'page');
    console.log(itemsPerPage, 'per page');
  },[page, itemsPerPage])

  const [videoShow, setVideoShow] = useState<string>('');
  const constraintsRef = useRef(null);

  if (loadingLauncher || loadingRocket) {
    return (
      <Loading />
    )
  }

  if(launchers instanceof Error) {
    return (
      <div>
        <Typography color="error">
          Failed fetch launchers data
        </Typography>
      </div>
    )
  }

  if(rockets instanceof Error) {
    return (
      <div>
        <Typography color="error">
          Failed fetch rockets data
        </Typography>
      </div>
    )
  }

  return (
    <Container>
      
      <GlobalStyle />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <div style={{ display: 'flex', gap: 10 }}>
        <Button 
          onClick={() => 
            setShowCharts((value) => !value)
          }
          whileTap={{ scale: 0.95 }}
        >
          {showCharts ? "Hide Charts" : "Show Charts"}
        </Button>

        
        <Button 
          onClick={() => {
            // fetchLaunchersData()
            // fetchRockets()
            fetchDataApi()
          }}
          whileTap={{ scale: 0.95 }}
        >
          refetch data
        </Button>
      </div>
          
      <motion.div 
        animate={showCharts ? show : hide} 
      >
        {metricStats ? (
          <>
            <MetricCard >
              <Card>
                <Typography color="success">
                  <strong>
                    success: {metricStats.success}
                  </strong>
                </Typography>
              </Card>
              <Card>
                <Typography color="error">
                  <strong>
                    errors: {metricStats.errors}
                  </strong>
                </Typography>
              </Card>
              <Card>
                <Typography color="warning">
                  <strong>
                    reused: {metricStats.reused}
                  </strong>
                </Typography>
              </Card>
              <Card>
                <Typography color="info">
                  <strong> 
                    total: {metricStats.amount}
                  </strong>
                </Typography>
              </Card>
            </MetricCard>
          </>
        ) : (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-around',
              width: '100%'
            }}
          >
            <Skeleton style={{ flex: 1, width: 100, height: 80 }} />
            <Skeleton style={{ flex: 1, width: 100, height: 80 }} />
            <Skeleton style={{ flex: 1, width: 100, height: 80 }} />
            <Skeleton style={{ flex: 1, width: 100, height: 80 }} />
          </div>
        )}
        <ChartsBox>
          {barChart ? (
            <BarChart 
              data={barChart}
            />
          ) : (
            <Skeleton width={400} height={400} />
          )}
          {pieChart ? (
            <PieChart
              data={pieChart}
            />
          ) : (
            <Skeleton circle width={400} height={400} />
          )}
        </ChartsBox>
      </motion.div>

      <motion.div 
        className="content-nav"
        variants={item}
        initial="hidden"
        animate="show"  
      >
        <button disabled>
          <Nav 
            variants={item}
            active={false}
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
        </button>
        <Nav 
          active={activeNav.nav === 'Launchers'} 
          onClick={() => {
            if(activeNav.nav === 'Launchers') {
              return setActiveNav({ nav: null });
            }
            setActiveNav({ nav: 'Launchers' })
          }}
        >
          <p>
            Launchers
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
                  {getOptions().map(({ title, key }, idx: number) => {
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
        
        {activeNav.nav === 'Launchers' && (
          <>
            <Table 
              className="content-info"
              initial="hidden"
              animate="visible"
              variants={list}
            >
              <thead>
                <tr>
                  <td>
                    <Typography>
                      Flight Number
                    </Typography>
                  </td>
                  <td>
                    <Typography>
                      Logo
                    </Typography>
                  </td>
                  <td>
                    <Typography>
                      Mission name  
                    </Typography>
                  </td>
                  <td>
                    <Typography>
                      Date launcher
                    </Typography>
                  </td>
                  <td>
                    <Typography>
                      Rocket
                    </Typography>
                  </td>
                  <td>
                    <Typography>
                      Result
                    </Typography>
                  </td>
                  <td>
                    <Typography>
                      video
                    </Typography>
                  </td>
                </tr>
              </thead>
              
              {entries?.map((item: LauncherProps, idx: number) => {
                if (
                  item.mission_name.toLowerCase().trim().includes(activeFilter.filter?.toLowerCase() || '') 
                  || item.flight_number.toString().trim().toLowerCase().includes(activeFilter.filter?.toLowerCase() || '')
                ) {
                  return (
                    <tbody key={idx}>
                      <tr>
                        <td>
                          <Typography>
                            #{ item.flight_number }
                          </Typography>
                        </td>
                        <td>
                          {item.links.mission_patch ? (
                            <img 
                              src={item.links.mission_patch} 
                              alt="Image" 
                              width={64} 
                              height={64} 
                            />
                          ) : (
                            <Skeleton circle width={64} height={64} />
                          )}
                        </td>
                        <td>
                          <Typography>
                            { item.mission_name }
                          </Typography>
                        </td>
                        <td>
                          <Typography>
                            <Moment 
                              date={item.launch_date_local} 
                              format="YYYY/MM/DD HH:mm"
                            />
                          </Typography>
                        </td>
                        <td>
                          <Typography>
                            { item.rocket.rocket_name}
                          </Typography>
                        </td>
                        <td>
                          { item.launch_success ? (
                            <ShieldCheck size={24} color="green" weight="fill" />
                          ) : (
                            <ShieldWarning size={24} color="red" weight="fill" />
                          ) }
                        </td>
                        <td>
                          <motion.div
                            animate={videoShow === item.links.video_link ? show : hide}
                            style={{ width: '100%' }}
                            ref={constraintsRef}
                            // onMouseLeave={(() => {
                            //   console.log("on mouse leave");
                            // })}
                          >
                            <div
                              style={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                                width: '400px', 
                                height: '300px', 
                                position: 'absolute',
                                right: '10%',
                              }}
                            >
                              <XCircle 
                                size={40} 
                                color="#030303"
                                weight="fill" 
                                style={{ 
                                  display: 'flex',
                                  justifyContent: 'flex-start', 
                                  alignItems: 'flex-start', 
                                  cursor: 'pointer'
                                }}
                                onClick={() => {
                                  setVideoShow('')
                                }}
                              />
                              <VideoScreen 
                                showVideo={videoShow === item.links.video_link}
                                url={item.links.youtube_id || ''}
                              />
                            </div>
                          </motion.div>
                          <ButtonControl
                            onMouseOver={() => {
                              console.log("mouse over")
                              setVideoShow(item.links.video_link || '')
                            }}
                          >
                            {/* <a 
                              href={item.links.video_link}
                              target="__blank" 
                              style={{ cursor: 'pointer', all: 'unset' }}
                            > */}
                              <VideoCamera size={34} color="white" />
                            {/* </a> */}
                          </ButtonControl>
                        </td>
                      </tr>
                    </tbody>
                  )
                }
              })}
            </Table>

            <PaginatinationControls 
              hasNextPage={end < filterSearchLaunchers(launchers).length}
              hasPrevPage={start > 0}
            />

            <Typography style={{ textAlign: 'center' }}>
              Page {Number(page)} {" "}
              of {Math.ceil(filterSearchLaunchers(launchers).length / Number(itemsPerPage))}
            </Typography>
          </>
        )}
        {/* <div 
          style={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px',
            borderRadius: '8px',
            height: '30px',
            color: '#fff', 
            gap: 5, 
            flex: 1, 
            background: 'rgba(25,25,25,0.8)' 
          }}
        >
          <button 
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (page+1 >= Math.ceil(launchers.length/itemsPerPage)) {
                return setPage(0);
              }
              setPage((prevPage) =>  ++prevPage);
            }}
          >
            next page
          </button>
          <select 
            name="itemsPerPage" 
            id="itemsPerPage"
            disabled
            defaultValue={itemsPerPage}
            onChange={(event: any) => {
              setItemsPerPage(event.target.value)
            }}
          >
            <option value="5">5</option>
          </select>
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (page === 0) {
                return setPage(Math.ceil(launchers.length/itemsPerPage - 1));
              }
              setPage((prevPage) => --prevPage);
            }}
          >
            prev page
          </button>
        </div> */}
        
      </HomeContainer>
    </Container>
  )
}
