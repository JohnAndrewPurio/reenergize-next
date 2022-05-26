import PVPower from "../../../components/PVPower/PVPower"
import Toolbar from "../../../components/Toolbar"

const Power = () => {
    return (
        <>
            <ion-header>
                <Toolbar name="PV Power" />
            </ion-header>
            <ion-content>
                <PVPower />
            </ion-content>
        </>
    )
}

export default Power