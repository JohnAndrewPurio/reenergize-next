import { GetStaticProps, NextPage } from "next"
import PVPower from "../../../components/PVPower/PVPower"
import Toolbar from "../../../components/Toolbar"

interface PowerProps {
    apiUrl: string
}

const Power: NextPage<PowerProps> = ({ apiUrl }) => {
    return (
        <>
            <ion-header>
                <Toolbar name="PV Power" />
            </ion-header>
            <ion-content>
                <PVPower apiUrl={apiUrl} />
            </ion-content>
        </>
    )
}

export const getStaticProps: GetStaticProps<PowerProps> = async () => {
    return {
        props: {
            apiUrl: process.env.API_BASE_URL || "https://reenergize-server.herokuapp.com/"
        }
    }
}

export default Power