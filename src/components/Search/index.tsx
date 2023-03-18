import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import debounce from 'lodash.debounce'
import { Layout } from '..'
import { NowPlayingData, PopularMovieData, PopularMovieDataResponse, SearchMultiDataResponse } from 'src/models/api'
import { IMAGE_URL, IMAGE_WIDTH } from 'src/models/common'
import { Pagination } from 'src/common/Pagination'
import { getPopularMovieList, getSearchMulti } from 'src/utils/api'
import { SearchIcon } from 'src/common/CustomIcons'
import { QUERY_KEYS } from 'src/utils/keys'

export const SearchMultiScreen = () => {
  const [page, setPage] = useState<number>(1)
  const [pagePopular, setPagePopular] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')

  const { data: searchMulti, isLoading: isSearchMultiLoading } = useQuery(
    [QUERY_KEYS.TOP_RATED_LIST, page, keyword],
    async () => {
      const response = (await getSearchMulti({ page, query: keyword })) as SearchMultiDataResponse

      if (response) {
        return response
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: keyword !== '',
    },
  )

  const { data: popularMovie, isLoading: isPopularMovieData } = useQuery(
    [QUERY_KEYS.POPULAR_MOVIES_LIST, pagePopular],
    async () => {
      const response = (await getPopularMovieList({ page: pagePopular })) as PopularMovieDataResponse

      if (response) {
        return response
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: keyword === '',
    },
  )

  const debounceKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  const debounceInput = useCallback(
    debounce((keyword: string) => debounceKeyword(keyword), 1000),
    [],
  )

  const onChangePage = (page: number) => {
    setPage(page)
  }

  const onChangePagePopular = (page: number) => {
    setPagePopular(page)
  }

  const onChangeKeyword = (event: { target: { value: string } }) => {
    debounceInput(event.target.value)
  }

  return (
    <Layout>
      <div className="container lg:w-[1100px] mx-auto ">
        <div className="w-full flex justify-between bg-[#808080] mt-[20px] py-[10px] px-[10px] rounded-md">
          <input
            className="w-[90%] bg-transparent text-[#FFFFFF] outline-none"
            placeholder="Search keyword"
            onChange={onChangeKeyword}
          />
          <SearchIcon width={20} height={20} color="#FFF" />
        </div>
        {keyword === '' && <div className="mt-[20px] text-[22px]">Popular Movies</div>}
        <div className="w-full grid grid-cols-4 gap-[20px] mt-[20px]">
          {searchMulti &&
            searchMulti.results?.map((item: NowPlayingData, index: number) => (
              <div key={index}>
                <img
                  src={`${IMAGE_URL}/${IMAGE_WIDTH.W342}/${item.poster_path}`}
                  className=""
                  alt={item.title ?? item.name ?? 'Image'}
                />
              </div>
            ))}
          {popularMovie &&
            popularMovie.results?.map((item: PopularMovieData, index: number) => (
              <div key={index}>
                <img
                  src={`${IMAGE_URL}/${IMAGE_WIDTH.W342}/${item.poster_path}`}
                  className=""
                  alt={item.title ?? item.name ?? 'Image'}
                />
              </div>
            ))}
        </div>
        {searchMulti && keyword !== '' && (
          <div className="w-fit mx-auto mt-[20px]">
            <Pagination
              currentPage={searchMulti.page}
              pageSize={searchMulti.total_pages}
              totalPages={searchMulti.total_pages}
              totalRecord={searchMulti.total_results}
              onChange={onChangePage}
            />
          </div>
        )}
        {popularMovie && keyword === '' && (
          <div className="w-fit mx-auto mt-[20px]">
            <Pagination
              currentPage={popularMovie.page}
              pageSize={popularMovie.total_pages}
              totalPages={popularMovie.total_pages}
              totalRecord={popularMovie.total_results}
              onChange={onChangePagePopular}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}
