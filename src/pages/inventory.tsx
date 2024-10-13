import NavBar from "../shared/ui/navbar.tsx";
import {TopBarInv} from "../shared/ui/topbars.tsx";
import {InvPlace} from "../shared/ui/places/invPlace.tsx";
import {useEffect, useMemo} from "react";
import {useUserStore} from "../features/store/userStore.ts";
import {Loading} from "./loading.tsx";


export default function InventoryPage() {

    const {
        user,
        userInventory,
        apiLogin,
        apiGetInventory
    } = useUserStore();

    useEffect(() => {
        if (user === null) {
            apiLogin();
        }
    }, []);

    useEffect(() => {
        if (userInventory === null && user !== null) {
            apiGetInventory();
        }
    }, [user]);

    const isLoading = useMemo(() => {
        return user === null || userInventory === null;
    }, [user, userInventory]);

    if (isLoading) return <Loading/>

    const filteredInventory = userInventory?.filter(item => item.plant.key !== "MONEY");
    const totalQuantity = filteredInventory?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return (
        <>
            <TopBarInv total={totalQuantity}/>
            <div className="relative h-20 z-30"/>
            <div
                className="relative w-full flex flex-col items-center h-[100vh] sm:h-fit">
                <div className="w-[90%] flex-1 overflow-y-auto">
                    <div className="relative h-4 w-full"/>
                    {filteredInventory?.map((item) => <InvPlace invInfo={item}/>)}
                </div>
                <div className="relative h-44 -z-20"/>
            </div>
            <NavBar/>
        </>
    )
}