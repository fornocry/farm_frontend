import FarmPlace from "../../shared/ui/places/farm_place.tsx";
import {isPlantKey, plants} from "../../entities/plants.tsx";
import {useUserStore} from "../../features/store/userStore.ts";
import {useEffect, useMemo} from "react";
import {Loading} from "../loading.tsx";


const placesPositions = {
    0: "mt-[15%] ml-[55%]",
    1: "mt-[35%] ml-[50%]",
    2: "mt-[55%] ml-[25%]",
    3: "mt-[-17%] ml-[0%]"
}

export default function Level1() {

    const {
        user,
        apiLogin,
        userFields,
        apiGetFields,
    } = useUserStore();

    useEffect(() => {
        if (user === null) {
            apiLogin();
        }
    }, []);
    useEffect(() => {
        if (userFields === null && user !== null) {
            apiGetFields();
        }
    }, [user, apiGetFields]);

    const isLoading = useMemo(() => {
        return user === null || userFields === null;
    }, [user, userFields]);

    if (isLoading) {
        return <Loading/>
    }

    const filterById = (id: number) => {
        const foundItem = (userFields || []).find(item => item.FieldID === id);
        if (foundItem && isPlantKey(foundItem.Plant)) {
            return {
                plant: plants[foundItem.Plant],
                progress: 10
            }
        }
        return null; // Return the found item or null if not found
    };


    return (
        <>
            <div className="absolute top-16 right-0 transform translate-x-1/2 -z-10">
                <img src='/images/lands/cloud_1.png' alt="cloud" className="blur-[2px] w-[90%]"/>
            </div>
            <div className="absolute top-[20%] left-2 transform -z-10">
                <img src='/images/lands/cloud_2.png' alt="cloud" className="blur-[2px] w-full"/>
            </div>
            <div className="flex flex-wrap items-center justify-center h-screen">
                <div className="absolute w-[90%] h-auto">
                    <img className="animate-float" src='/images/lands/land_level_1.png' alt="land_lvl_1"/>
                </div>
                <div className="absolute w-[90%] aspect-square">
                    <div className={placesPositions[0]}>
                        <FarmPlace plantInfo={filterById(0)}/>
                    </div>
                    <div className={placesPositions[1]}>
                        <FarmPlace plantInfo={filterById(1)}/>
                    </div>
                    <div className={placesPositions[2]}>
                        <FarmPlace plantInfo={filterById(2)}/>
                    </div>
                    <div className={placesPositions[3]}>
                        <FarmPlace plantInfo={filterById(3)}/>
                    </div>
                </div>
            </div>
        </>
    )
}