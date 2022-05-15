import type { NextPage } from 'next'
import { worldRadiationForecasts } from '../api/Solcast/constants'

const Home: NextPage = () => {
  return (
    <ion-list>
      <ion-list-header>Data Summary</ion-list-header>
      {
        Object.values(worldRadiationForecasts).map((title) => (
          <ion-row key={title}>
            <ion-item>
              {title}: 100 kW
            </ion-item>
          </ion-row>
        ))
      }
    </ion-list>
  )
}

export default Home
