import Level1 from "./level1.tsx";
import {useEffect, useMemo} from "react";
import {useUserStore} from "../../features/store/userStore.ts";
import {TopBarFarm} from "../../shared/ui/topbars.tsx";
import NavBar from "../../shared/ui/navbar.tsx";
import {Loading} from "../loading.tsx";

export function LevelSelector() {

    const {
        user,
        userInventory,
        userUpgrades,
        apiLogin,
        apiGetUpgrades,
        apiGetInventory,
    } = useUserStore();

    useEffect(() => {
        if (user === null) {
            apiLogin();
        }
    }, []);
    useEffect(() => {
        if (userUpgrades === null && user !== null) {
            apiGetUpgrades();
        }
    }, [user]);
    useEffect(() => {
        if (userInventory === null && user !== null) {
            apiGetInventory();
        }
    }, [user]);


    const isLoading = useMemo(() => {
        return user === null || userUpgrades === null;
    }, [user, userUpgrades]);

    if (isLoading) return <Loading/>

    let renderElement;
    switch (userUpgrades?.FarmLvl) {
        case null:
            renderElement = <Level1/>
            break
        case 1:
            renderElement = <Level1/>
            break
        default:
            renderElement = <p></p>
            break
    }

    const moneyItem = userInventory?.find(item => item.plant.key === "MONEY");
    const fullName = `${user?.FirstName || "No name"} ${user?.LastName || ""}`.trim();

    return (<>
        <TopBarFarm username={fullName} balance={moneyItem?.quantity ?? 0}/>
        {renderElement}
        <NavBar/>
    </>)
}