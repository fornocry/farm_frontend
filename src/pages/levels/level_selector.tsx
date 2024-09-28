import Level1 from "./level1.tsx";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useMemo} from "react";
import {useUserStore} from "../../features/store/userStore.ts";
import {TopBarFarm} from "../../shared/ui/topbars.tsx";
import NavBar from "../../shared/ui/navbar.tsx";
import {Loading} from "../loading.tsx";

export function LevelRedirect() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        user,
        apiLogin,
        userUpgrades,
        apiGetUpgrades
    } = useUserStore();

    useEffect(() => {
        const fetchData = async () => {
            if (user === null) {
                await apiLogin();
            }
            if (userUpgrades === null) {
                await apiGetUpgrades();
            }
        };
        const redirectToLvl = async () => {
            const searchParams = location.search;
            navigate(`/farm/${userUpgrades?.FarmLvl}${searchParams}`);
        }
        const process = async () => {
            await fetchData();
            await redirectToLvl();
        }
        process()
    }, []);

    // useEffect(() => {
    //     const searchParams = location.search;
    //     navigate(`/farm/${userUpgrades?.FarmLvl}${searchParams}`);
    // }, [navigate, location.search]);

    return (
        <></>
    )
}

export function LevelSelector() {
    const {lvl} = useParams();

    const {
        user,
        apiLogin,
        userUpgrades,
        apiGetUpgrades
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
    }, [user, apiGetUpgrades]);

    const isLoading = useMemo(() => {
        return user === null || userUpgrades === null;
    }, [user, userUpgrades]);

    if (isLoading) {
        return <Loading/>
    }

    let renderElement;

    if (typeof lvl === 'undefined' || Number(lvl) !== userUpgrades?.FarmLvl) {
        renderElement = <LevelRedirect/>;
        return renderElement
    }


    switch (lvl) {
        case null:
            renderElement = <LevelRedirect/>
            break
        case "1":
            renderElement = <Level1/>
            break
        case "undefined":
            renderElement = <p>Check internet</p>
            break
        default:
            renderElement = <p>pizda</p>
            break
    }

    const fullName = user?.LastName
        ? `${user.FirstName} ${user.LastName}`
        : user?.FirstName ?? "No name";


    return (<>
        <TopBarFarm username={fullName}/>
        {renderElement}
        <NavBar/>
    </>)
}