import {FieldInfo, InventoryInfo} from "../../../entities/plant.tsx";
import {initHapticFeedback} from "@telegram-apps/sdk-react";
import {useUserStore} from "../../../features/store/userStore.ts";
import {useEffect, useMemo, useState} from "react";
import UpAnim from "../../animations/upAnimation.tsx";

function PlantSelectorItem({invInfo, isSelected, onSelect}: {
    invInfo: InventoryInfo,
    isSelected: boolean;
    onSelect: () => void
}) {
    const {plant, quantity} = invInfo;
    const {place_color, border, icon, name, text_color} = plant;

    return (
        <div
            className="w-full bg-white z-20 rounded-[10px] mb-1"
            onClick={quantity > 0 ? onSelect : () => {}}>
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                    <div className="relative p-2">
                        <div className="w-[6vh] aspect-square rounded-[10px] flex items-center justify-center"
                             style={{backgroundColor: place_color, border: `0.753px solid ${border}`}}>
                            <img src={icon} className="h-[70%] object-contain" alt={name}/>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <p className="font-NeueHaas font-semibold" style={{color: text_color}}>{name}</p>
                            <p className="font-NeueHaas font-semibold ml-2 text-textGray">(x{quantity})</p>
                        </div>
                        <div className="flex items-center">
                            <p className="font-NeueHaas text-center text-sm">1</p>
                            <img src={icon} className="object-contain ml-1" style={{width: '1em', height: '1em'}}
                                 alt={name}/>
                            <p className="font-NeueHaas text-center ml-1 text-sm">{"->"} 1</p>
                            <img src={icon} className="object-contain ml-1" style={{width: '1em', height: '1em'}}
                                 alt={name}/>
                        </div>
                    </div>
                </div>
                {quantity > 0 && <div className="flex-shrink-0 ml-2 pr-5">
                    <div className="w-[6.5vw] max-w-[30px] aspect-square relative">
                        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="6" fill={isSelected ? "#4CAF50" : "#E0E0E0"}/>
                            <circle cx="12" cy="12" r="6" fill="white"/>
                        </svg>
                    </div>
                </div>}
            </div>
        </div>
    );
}

function FarmPlantSelector({fieldID, closeHandle}: { fieldID: number, closeHandle: () => void }) {
    const {userInventory, apiPlantField, apiGetInventory} = useUserStore();
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const filteredInventory = userInventory?.filter(item => item.plant.key !== "MONEY");

    const handleSelect = (itemId: string) => {
        setSelectedItem(itemId === selectedItem ? null : itemId);
    };

    const handlePlant = async () => {
        await apiPlantField({fieldID: fieldID, plant: selectedItem as string});
        await apiGetInventory();
        closeHandle();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 backdrop-blur-sm"
             onClick={() => {
                 closeHandle()
             }}>
            <UpAnim>
                <div className="w-full h-[80%] bg-white flex flex-col rounded-t-[10px] overflow-hidden"
                     onClick={(event) => event.stopPropagation()}>
                    <div className="p-4 font-NeueHaas">
                        <h2 className="text-xl font-bold text-center">Choose to plant</h2>
                    </div>
                    <div className="w-full h-full flex flex-col">
                        <div className="h-4 w-full flex-shrink-0"/>
                        <div className="flex-grow overflow-y-auto px-[2%]">
                            {filteredInventory?.map((item, index) => (
                                <PlantSelectorItem key={index} invInfo={item}
                                                   isSelected={selectedItem === item.plant.key}
                                                   onSelect={() => handleSelect(item.plant.key)}/>
                            ))}
                        </div>
                    </div>
                    <div className="p-6">
                        <button
                            className="w-full py-3 text-white font-NeueHaas font-semibold rounded-lg flex items-center justify-center"
                            style={{background: selectedItem ? "#4CAF50" : "#E0E0E0"}}
                            onClick={() => {
                                handlePlant()
                            }}
                            disabled={!selectedItem}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                            Plant
                        </button>
                    </div>
                </div>
            </UpAnim>
        </div>
    );
}

export default function FarmPlace({fieldInfo, id}: { fieldInfo: FieldInfo | null; id: number }) {
    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false)
    const defaultStyles = {
        textColor: '#B0B0B0',
        bgColor: 'rgba(5, 5, 5, 0.15)',
        iconSrc: '/svgs/tabler_plus.svg',
        progress: '0',
        progressBarColor: 'rgb(229, 231, 235)',
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(Math.floor(Date.now() / 1000));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    const countProgress = useMemo(() => {
        if (!fieldInfo || fieldInfo.PlantTime === undefined || fieldInfo.progress?.growTime === undefined) {
            return 0;
        }
        const alreadyGrowingTime = currentTime - fieldInfo?.PlantTime;
        const progress = Math.min(alreadyGrowingTime / fieldInfo.progress.growTime, 1);
        const minProgress = Math.max(progress, 0.07);
        return Math.floor(minProgress * 100);
    }, [currentTime, fieldInfo])

    const styles = fieldInfo ? {
        textColor: fieldInfo.plant.text_color,
        bgColor: fieldInfo.plant.place_color,
        iconSrc: fieldInfo.plant.icon,
        progress: countProgress,
        progressBarColor: '#CDEDDA',
    } : defaultStyles;

    const onPress = () => {
        try {
            console.log(fieldInfo)
            setIsMenuOpened(true)
            initHapticFeedback().impactOccurred('medium');
        } catch (e) {
        }
    };
    const closeHandle = () => {
        setIsMenuOpened(false)
    }

    return (
        <>
            {isMenuOpened && <FarmPlantSelector fieldID={id} closeHandle={closeHandle}/>}
            <div onClick={() => {
                onPress()
            }}>
                <div
                    className="w-[45%] h-[15%] animate-float absolute border-b border-l border-[#6EA0AF] border-[0.75px] bg-white z-20 rounded-[10px]">
                    <div className="flex w-full h-full items-end">
                        <div className="relative h-full p-2">
                            <div className="h-full rounded-[10px] aspect-square flex items-center justify-center"
                                 style={{backgroundColor: styles.bgColor}}>
                                <img src={styles.iconSrc} className="h-[70%]"/>
                            </div>
                        </div>
                        <div className="w-full h-full flex flex-col justify-between">
                            <div className="flex h-full flex-col justify-center">
                                <p className="font-NeueHaas font-semibold leading-5 mt-1"
                                   style={{color: styles.textColor}}>
                                    {fieldInfo?.plant?.name || "Tap to plant"}
                                </p>
                            </div>
                            <div className="rounded-full h-2 mb-3 mr-2" style={{background: styles.progressBarColor}}>
                                <div className="bg-green-500 h-2 rounded-full"
                                     style={{width: `${styles.progress}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
