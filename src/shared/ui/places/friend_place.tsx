import {UserReferral} from "../../../entities/dto/user.ts";

export default function FriendPlace({referral}: { referral: UserReferral | null }) {

    const friendIcon: string = referral?.Icon ?? "/images/assets/friend.gif";
    const isIcon: boolean = referral?.Icon !== null


    const fullName = referral?.LastName
        ? `${referral.FirstName} ${referral.LastName}`
        : referral?.FirstName ?? "No name";



    return (
        <div
            className="w-full border-t border-b border-l border-[#6EA0AF] border-[0.75px] bg-white z-20 rounded-[10px] mb-1">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                    <div className="relative p-2">
                        <div
                            className="w-[6vh] aspect-square rounded-[10px] flex items-center justify-center overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(197, 197, 197, 0.26)',
                                border: `0.753px solid #D7D6D5`
                            }}
                        >
                            <img
                                src={friendIcon}
                                className="object-contain w-full h-full"
                                style={{height: isIcon ? "100%" : "70%"}}
                            />
                        </div>

                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <p className="font-NeueHaas font-semibold text-black">
                                {fullName}
                            </p>
                            {/*{referral?.Status !== null ?*/}
                            {/*    <p className="font-NeueHaas font-semibold ml-2 text-textGray">*/}
                            {/*        ({referral?.Status})*/}
                            {/*    </p> : <></>}*/}
                        </div>
                        <div className="flex items-center">
                            {/*<img*/}
                            {/*    src={taskInfo.task.reward.preview_icon}*/}
                            {/*    className="w-4 h-4 mr-1" // Adjust width and height to match text size*/}
                            {/*    alt="Reward Icon" // Add alt text for accessibility*/}
                            {/*/>*/}
                            <p className="font-NeueHaas text-textGray text-xs">{referral?.Username ? `@${referral.Username}` : ''}</p>
                        </div>
                    </div>

                </div>
                {/*<div className="pr-5">*/}
                {/*    <div className="h-6 aspect-square rounded-[6px] flex items-center justify-center"*/}
                {/*         style={{backgroundColor: true ? "#00B54A" : "#DCE1DE"}}>*/}
                {/*        <img*/}
                {/*            src="/svgs/check_icon.svg"*/}
                {/*            className="h-[80%]"*/}
                {/*            alt="Navigation arrow"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}


