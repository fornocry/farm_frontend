import { UserReferral } from "../../../entities/dto/user.ts";

export default function FriendPlace({ referral }: { referral: UserReferral | null }) {
    const friendIcon = referral?.Icon || "/images/assets/friend.gif";
    const fullName = referral?.LastName
        ? `${referral.FirstName} ${referral.LastName}`
        : referral?.FirstName || "No name";

    return (
        <div className="w-full border-t border-b border-l border-[#6EA0AF] border-[0.75px] bg-white z-20 rounded-[10px] mb-1">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                    <div className="relative p-2">
                        <div className="w-[6vh] aspect-square rounded-[10px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'rgba(197, 197, 197, 0.26)', border: `0.753px solid #D7D6D5` }}>
                            <img src={friendIcon} className="object-contain w-full h-full" style={{ height: referral?.Icon ? "100%" : "70%" }} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-NeueHaas font-semibold text-black">{fullName}</p>
                        {referral?.Username && (
                            <p className="font-NeueHaas text-textGray text-xs">@{referral.Username}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function InviteFriend({ referralLink }: { referralLink: string }) {
    const hrefRef = `https://t.me/share/url?url=${referralLink}&text=🌟 Start farming`;

    return (
        <div onClick={() => window.open(hrefRef)} className="w-[90%] h-[6vh] border-t border-b border-l border-[0.75px] bg-white z-20 rounded-[10px] mb-2">
            <div className="flex w-full h-full items-center justify-center p-2">
                <p className="font-NeueHaas font-normal text-black text-center text-xl">Invite friends</p>
            </div>
        </div>
    );
}
