import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { NowPlayingData, NowPlayingDataResponse } from 'src/models/api'
import { IMAGE_URL, IMAGE_WIDTH } from 'src/models/common'
import { Pagination } from 'src/common/Pagination'
import { getNowPlayingList } from 'src/utils/api'
import { QUERY_KEYS } from 'src/utils/keys'

export const NowPlayingScreen = () => {
  const [page, setPage] = useState(1)

  const { data: nowPlayingList, isLoading: isNowPlayingLoading } = useQuery(
    [QUERY_KEYS.NOWPLAYING_LIST, page],
    async () => {
      const response = (await getNowPlayingList({ page })) as NowPlayingDataResponse

      if (response) {
        return response
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  )

  const onChangePage = (page: number) => {
    setPage(page)
  }

  return (
    <Layout>
      <div className="conteiner lg:w-[1100px] mx-auto grid grid-cols-4 gap-[20px] mt-[20px]">
        {nowPlayingList &&
          nowPlayingList.results?.map((item: NowPlayingData, index: number) => (
            <div key={index}>
              <img
                src={`${IMAGE_URL}/${IMAGE_WIDTH.W342}/${item.poster_path}`}
                className=""
                alt={item.title ?? item.name ?? 'Image'}
              />
            </div>
          ))}
      </div>
      {nowPlayingList && (
        <div className="w-fit mx-auto mt-[20px]">
          <Pagination
            currentPage={nowPlayingList.page}
            pageSize={nowPlayingList.total_pages}
            totalPages={nowPlayingList.total_pages}
            totalRecord={nowPlayingList.total_results}
            onChange={onChangePage}
          />
        </div>
      )}
    </Layout>
  )
}
