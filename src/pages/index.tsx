import { useEffect } from 'react'
import { menuController } from '@ionic/core'
import { menu, searchOutline } from 'ionicons/icons'
import { useRouter } from 'next/router'

import Menu from '../components/Menu'

import type { NextPage } from 'next'
import { getCurrentPosition } from '../utils/GeoLocation'
import { storeValue } from '../utils/Storage'
import { getCurrentUser } from '../api/Firebase/authentication'
import { useUserInfo } from '../context/User'
import { routes } from '../utils/Navigation/routes'

// Menu Component Parameters
const menuParameters = {
  menuId: "main-menu",
  contentId: "main"
}

const Home: NextPage = () => {
  const router = useRouter()
  const { data: userData } = useUserInfo()

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

  const getUserInfo = async () => {
    try {
      const user = await getCurrentUser()

      console.log("User Info:", user)
    } catch (error) {
      console.log(error)
    }
  }

  const redirectToProfilePage = () => {
    router.push(routes["PROFILE"])
  }

  useEffect(() => {
    // promptUserLocation()
    getUserInfo()

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <ion-avatar class="ion-padding" onClick={redirectToProfilePage}>
              <ion-img src={userData?.photoUrl || ""} alt={userData?.displayName || ""} />
            </ion-avatar>
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
