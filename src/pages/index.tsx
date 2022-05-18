import { useEffect } from 'react'
import { menuController } from '@ionic/core'
import { menu, searchOutline } from 'ionicons/icons'
import { useRouter } from 'next/router'

import Menu from '../components/Menu'

import type { NextPage } from 'next'
import { getCurrentPosition } from '../utils/GeoLocation'
import { storeValue } from '../utils/Storage'

// Menu Component Parameters
const menuParameters = {
  menuId: "main-menu",
  contentId: "main"
}

const Home: NextPage = () => {
  const openMenu = async () => {
    await menuController.open(menuParameters.menuId)
  }

  const promptUserLocation = async () => {
    try {
      const location = await getCurrentPosition()

      await storeValue("location", location)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    promptUserLocation()
  }, [])

  return (
    <Menu {...menuParameters}>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot='start'>
            <ion-button onClick={openMenu}>
              <ion-icon icon={menu} slot='icon-only' />
            </ion-button>
          </ion-buttons>

          <ion-title>ReEnergize</ion-title>

          <ion-buttons slot='end'>
            <ion-button>
              <ion-icon icon={searchOutline} slot="icon-only" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Home Page</ion-card-title>
          </ion-card-header>
        </ion-card>
      </ion-content>
    </Menu>
  )
}

export default Home
