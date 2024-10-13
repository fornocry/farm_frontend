import FarmPlace from "../../shared/ui/places/farmPlace.tsx";
import {isPlantKey, plantProgressInfo, plants} from "../../entities/plants.tsx";
import {useUserStore} from "../../features/store/userStore.ts";
import {useEffect, useMemo} from "react";
import {Loading} from "../loading.tsx";

const placesPositions = [
    "mt-[15%] ml-[55%]",
    "mt-[35%] ml-[50%]",
    "mt-[55%] ml-[25%]",
    "mt-[-17%] ml-[0%]",
];

export default function Level1() {
    const {user, apiLogin, userFields, apiGetFields} = useUserStore();

    useEffect(() => {
        if (!user) apiLogin();
    }, [user, apiLogin]);

    useEffect(() => {
        if (!userFields && user) apiGetFields();
    }, [user, userFields, apiGetFields]);

    const isLoading = useMemo(() => !user || !userFields, [user, userFields]);

    if (isLoading) return <Loading/>;

    const filterById = (id: number) => {
        const foundItem = userFields?.find(item => item.FieldID === id);
        if (foundItem && isPlantKey(foundItem.Plant)) {
            return {
                FieldID: foundItem.FieldID,
                PlantTime: foundItem.PlantTime,
                plant: plants[foundItem.Plant],
                progress: plantProgressInfo[foundItem.Plant],
            };
        }
        return null;
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
                    {placesPositions.map((position, index) => (
                        <div className={position} key={index}>
                            <FarmPlace fieldInfo={filterById(index)} id={index}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
