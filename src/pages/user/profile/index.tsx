import ProfileCard from "../../../components/ProfileCard"
import Toolbar from "../../../components/Toolbar"

const ProfilePage = () => {
  return (
    <>
        <ion-header>
            <Toolbar name="User Profile" />
        </ion-header>
        <ion-content>
            <ProfileCard />
        </ion-content>
    </>
  )
}

export default ProfilePage