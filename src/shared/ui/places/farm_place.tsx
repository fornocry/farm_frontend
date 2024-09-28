import {FieldInfo} from "../../../entities/plant.tsx";
import Pressable from "../../components/pressable_button.tsx";
import {initHapticFeedback} from "@telegram-apps/sdk-react";

export default function FarmPlace({plantInfo}: { plantInfo: FieldInfo | null }) {


    const textColor = plantInfo === null ? '#B0B0B0' : plantInfo?.plant.text_color;
    const bgColor = plantInfo === null ? 'rgba(5, 5, 5, 0.15)' : plantInfo?.plant.place_color;
    const iconSrc = plantInfo === null ? '/svgs/tabler_plus.svg' : plantInfo?.plant.icon;
    const progress = plantInfo === null ? '0' : plantInfo.progress;
    const progressBarColor = plantInfo === null ? 'rgb(229, 231, 235)' : '#CDEDDA'

    const onPress = () => {
        try {
            const hapticFeedback = initHapticFeedback();
            hapticFeedback.impactOccurred('medium');
        } catch (e) {

        }
    }


    return (
        <Pressable onPress={onPress}>
            <div
                // ${isPressed ? "w-[51.75%] h-[17.25%]" : "w-[45%] h-[15%]"} like an apple animation
                className={`w-[45%] h-[15%] animate-float absolute border- border-b border-l border-[#6EA0AF] border-[0.75px] bg-white z-20 rounded-[10px]`}>
                <div className="flex w-full h-full items-end">
                    <div className="relative h-full p-2">
                        <div className="h-full rounded-[10px] aspect-square flex items-center justify-center"
                             style={{backgroundColor: bgColor}}>
                            <img src={iconSrc} className="h-[70%]"/>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col justify-between">
                        <div className="flex h-full flex-col justify-center">
                            <p className="font-NeueHaas font-semibold leading-5 mt-1"
                               style={{color: textColor}}> {plantInfo?.plant?.name ? plantInfo.plant.name : "Tap to plant"} </p>
                        </div>
                        <div className="rounded-full h-2 mb-3 mr-2" style={{background: progressBarColor}}>
                            <div className="bg-green-500 h-2 rounded-full" style={{width: `${progress}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Pressable>
    )
}


