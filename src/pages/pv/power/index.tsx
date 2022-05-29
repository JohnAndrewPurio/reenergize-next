import { bookOutline } from "ionicons/icons"
import { GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import PVPower from "../../../components/PVPower/PVPower"
import Toolbar from "../../../components/Toolbar"
import { routes } from "../../../utils/Navigation/routes"

interface PowerProps {
    apiUrl: string
}

const Power: NextPage<PowerProps> = ({ apiUrl }) => {
    const router = useRouter()

    const redirectTo = (route: string) => {
        router.push(route)
    }

    return (
        <>
            <ion-header>
                <Toolbar name="PV Power" options={[
                    {
                        icon: bookOutline,
                        handler: () => redirectTo(routes["GLOSSARY"])
                    }
                ]} />
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