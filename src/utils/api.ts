import { NowPlayingDataResponse, TopRatedDataResponse, TrendListDataResponse } from 'src/models/api'
import { TREND_TIME_TYPE, TREND_TYPE } from 'src/models/common'

export const API_BASE_URL = process.env.API_BASE_URL ?? 'https://api.themoviedb.org/3'
export const API_KEY = process.env.API_KEY ?? 'a37241f847697db472f3c7f222a20931'

export const getTrendingList = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/trending/${TREND_TYPE.MOVIE}/${TREND_TIME_TYPE.WEEK}?api_key=${API_KEY}`,
      {
        method: 'GET',
      },
    )

    const rawResponse = (await response.json()) as TrendListDataResponse

    if (rawResponse) {
      return rawResponse
    }

    return
  } catch (error) {
    console.log(error)
  }
}

export const getNowPlayingList = async (input: { page: number }) => {
  try {
    const { page } = input

    let startPage = page ?? 1

    const response = await fetch(`${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${startPage}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as NowPlayingDataResponse

    if (rawResponse) {
      return rawResponse
    }

    return
  } catch (error) {
    console.log(error)
  }
}

export const getTopRatedList = async (input: { page: number }) => {
  try {
    const { page } = input

    let startPage = page ?? 1

    const response = await fetch(`${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${startPage}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as TopRatedDataResponse

    if (rawResponse) {
      return rawResponse
    }

    return
  } catch (error) {
    console.log(error)
  }
}

export const getTVShowList = async (input: { page: number }) => {
  try {
    const { page } = input

    let startPage = page ?? 1

    const response = await fetch(`${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${startPage}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as TrendListDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getSearchMulti = async (input: { query: string; page: number }) => {
  try {
    const { page, query } = input

    let startPage = page ?? 1

    const response = await fetch(`${API_BASE_URL}/search/multi?api_key=${API_KEY}&page=${startPage}&query=${query}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as TrendListDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getPopularMovieList = async (input: { page: number }) => {
  try {
    const { page } = input

    let startPage = page ?? 1

    const response = await fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${startPage}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as TrendListDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}