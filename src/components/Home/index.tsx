import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import Slider from 'react-slick'
import { QUERY_KEYS } from 'src/utils/keys'
import { getNowPlayingList, getTrendingList } from 'src/utils/api'
import { NowPlayingData, NowPlayingDataResponse, TrendListData, TrendListDataResponse } from 'src/models/api'
import { Geners, IMAGE_URL, IMAGE_WIDTH } from 'src/models/common'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadingScreen } from 'src/common/LoadingScreen'

dayjs.extend(utc)

const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (dots: any) => (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        translate: '-50%',
        bottom: '10px',
      }}
    >
      <ul style={{ margin: '0px' }}> {dots} </ul>
    </div>
  ),
}

const settingSlideList = {
  dots: true,
  infinite: true,
  speed: 500,
  swipeToSlide: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  appendDots: (dots: any) => (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        translate: '-50%',
        bottom: '10px',
      }}
    >
      <ul style={{ margin: '0px' }}> {dots} </ul>
    </div>
  ),
}
export const HomeScreen = () => {
  const [page] = useState(1)

  const { data: trend_list, isLoading: isTrendListLoading } = useQuery(
    [QUERY_KEYS.TREND_LIST],
    async () => {
      const response = (await getTrendingList()) as TrendListDataResponse

      if (response) {
        return response.results
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
    },
  )

  const { data: nowPlayingList, isLoading: isNowPlayingLoading } = useQuery(
    [QUERY_KEYS.NOWPLAYING_LIST],
    async () => {
      const response = (await getNowPlayingList({ page })) as NowPlayingDataResponse

      if (response) {
        return response.results
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  )

  if (isNowPlayingLoading || isTrendListLoading) {
    return (
      <div className="w-screen h-screen">
        <LoadingScreen />
      </div>
    )
  }

  return (
    <Layout>
      <div className="container lg:w-[1100px] mt-[30px] mx-auto h-[400px]">
        {trend_list && (
          <Slider {...settings} className="h-[400px] relative">
            {trend_list?.map((item: TrendListData, index: number) => (
              <div className={`w-full h-[400px]`} key={index}>
                <div className="absolute w-full h-full bg-[#00000074] z-10" />

                <LazyLoadImage
                  src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}/${item.poster_path}`}
                  height={400}
                  effect="blur"
                  wrapperClassName="object-cover w-full absolute top-0 left-0 z-1"
                  alt={item.title ?? item.name ?? 'Image'}
                />

                <div className="text-[#FFFFFF] absolute bottom-[40px] left-[20px] z-100">
                  <p className="text-[42px] font-semibold">{item.title ?? item.name}</p>
                  <div className="flex gap-[10px] items-center">
                    <p>{dayjs(item.release_date).utc().local().format('YYYY')}</p>
                    <div className="w-[5px] h-[5px] rounded-full bg-[#FFFFFF]" />
                    <div className="flex gap-[10px]">
                      {item.genre_ids.map((gener: number) => (
                        <div key={gener}>{gener}</div>
                      ))}
                    </div>
                    <div className="w-[5px] h-[5px] rounded-full bg-[#FFFFFF]" />
                    {item.origin_country?.map((country: string, index: number) => (
                      <p key={index}>{country}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}

        {nowPlayingList && (
          <div className="w-full mt-[30px]">
            <div className="flex justify-between items-center">
              <p className="text-[22px]">Now Playing</p>
              <Link to={'/now_playing'}>See all</Link>
            </div>
            <Slider {...settingSlideList} className="h-[200px] mt-[10px] relative">
              {nowPlayingList?.map((item: NowPlayingData, index: number) => (
                <div className={`w-full h-[200px] relative`} key={index}>
                  {/* <div className="absolute w-full h-full bg-[#00000074] z-10" /> */}
                  <LazyLoadImage
                    src={`${IMAGE_URL}/${IMAGE_WIDTH.W342}/${item.poster_path}`}
                    height={150}
                    effect="blur"
                    alt={item.title ?? item.name ?? 'Image'}
                  />
                  <div className="text-[#000] w-full">
                    <p className="text-[12px] font-semibold text-center mt-[5px]">{item.title ?? item.name}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </Layout>
  )
}
