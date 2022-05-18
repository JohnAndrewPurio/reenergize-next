import { homeOutline, partlySunny, partlySunnyOutline, sunnyOutline } from "ionicons/icons";
import { routes } from "../../utils/Navigation/routes";

export const menuContent = {
    home: {
        icon: homeOutline,
        href: routes["DEFAULT"]
    },
    forecasts: {
        icon: partlySunnyOutline,
        href: routes["FORECASTS"]
    },
    pvPower: {
        icon: sunnyOutline,
        href: routes["PV_POWER"]
    }
}