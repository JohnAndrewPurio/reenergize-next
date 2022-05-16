import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { sampleForecastData, worldRadiationForecasts } from '../api/Solcast/constants'
import DataChart from '../components/DataChart'
import DataSummary from '../components/DataSummary'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push("/summary")

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <></>
  )
}

export default Home
