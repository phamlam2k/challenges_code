import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { NowPlayingData, TopRatedDataResponse } from 'src/models/api'
import { IMAGE_URL, IMAGE_WIDTH } from 'src/models/common'
import { Pagination } from 'src/common/Pagination'
import { getTopRatedList } from 'src/utils/api'
import { QUERY_KEYS } from 'src/utils/keys'
import { LoadingScreen } from 'src/common/LoadingScreen'

export const TopRatedScreen = () => {
  const [page, setPage] = useState(1)

  const { data: topRatedList, isLoading: isTopRatedLoading } = useQuery(
    [QUERY_KEYS.TOP_RATED_LIST, page],
    async () => {
      const response = (await getTopRatedList({ page })) as TopRatedDataResponse

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

  if (isTopRatedLoading) {
    return (
      <div className="w-screen h-screen">
        <LoadingScreen />
      </div>
    )
  }

  return (
    <Layout>
      <div className="conteiner lg:w-[1100px] mx-auto grid grid-cols-4 gap-[20px] mt-[20px]">
        {topRatedList &&
          topRatedList.results?.map((item: NowPlayingData, index: number) => (
            <div key={index}>
              <img
                src={`${IMAGE_URL}/${IMAGE_WIDTH.W342}/${item.poster_path}`}
                className=""
                alt={item.title ?? item.name ?? 'Image'}
              />
            </div>
          ))}
      </div>
      {topRatedList && (
        <div className="w-fit mx-auto mt-[20px]">
          <Pagination
            currentPage={topRatedList.page}
            pageSize={topRatedList.total_pages}
            totalPages={topRatedList.total_pages}
            totalRecord={topRatedList.total_results}
            onChange={onChangePage}
          />
        </div>
      )}
    </Layout>
  )
}
