import { FC } from "react"
import { worldRadiationForecasts } from "../../api/Solcast/constants"

const DataSummary: FC = () => {
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

export default DataSummary