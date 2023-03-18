export interface TrendListDataResponse {
  page: number
  results: TrendListData[]
  total_pages: number
  total_results: number
}

export interface NowPlayingDataResponse {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: NowPlayingData[]
  total_pages: number
  total_results: number
}

export interface TopRatedDataResponse {
  page: number
  results: TopRatedData[]
  total_pages: number
  total_results: number
}

export interface SearchMultiDataResponse {
  page: number
  results: SearchMultiData[]
  total_pages: number
  total_results: number
}

export interface PopularMovieDataResponse {
  page: number
  results: PopularMovieData[]
  total_pages: number
  total_results: number
}

export interface TrendListData {
  poster_path: string | null
  adults: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  origin_country: string[] | null
  original_title: string
  original_language: string
  name: string | null
  title: string | null
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface NowPlayingData {
  poster_path: string | null
  adults: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  name: string | null
  title: string | null
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface TopRatedData {
  poster_path: string | null
  adults: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  name: string | null
  title: string | null
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface SearchMultiData {
  poster_path: string | null
  adults: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  name: string | null
  title: string | null
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface PopularMovieData {
  poster_path: string | null
  adults: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  name: string | null
  title: string | null
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}