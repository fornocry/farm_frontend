import NavBar from "../shared/ui/navbar.tsx";
import {TopBarFriends} from "../shared/ui/topbars.tsx";
import FriendPlace, {InviteFriend} from "../shared/ui/places/friendPlace.tsx";
import {useUserStore} from "../features/store/userStore.ts";
import {useEffect, useMemo} from "react";
import {Loading} from "./loading.tsx";


export default function FriendsPage() {

    const {
        user,
        userReferrals,
        apiLogin,
        apiGetReferrals,
    } = useUserStore();

    useEffect(() => {
        if (user === null) {
            apiLogin();
        }
    }, []);

    useEffect(() => {
        if (userReferrals === null && user !== null) {
            apiGetReferrals();
        }
    }, [user]);


    const isLoading = useMemo(() => {
        return user === null || userReferrals === null;
    }, [user, userReferrals]);


    if (isLoading) {
        return <Loading/>
    }

    return (
        <>
            <TopBarFriends total={userReferrals?.length ?? 0}/>
            <div className="relative h-20 z-30"/>
            <div
                className="relative w-full flex flex-col items-center h-[100vh] sm:h-fit">
                {/*<div className="absolute h-4 w-[100%] z-30 backdrop-blur-sm"/>*/}
                <div className="w-[90%] flex-1 overflow-y-auto">
                    <div className="relative h-4 w-full"/>
                    {userReferrals?.map((item) => <FriendPlace referral={item}/>)}
                </div>
                <InviteFriend referralLink={user?.ReferralLink || ""}/>
                <div className="relative h-44 -z-20"/>
            </div>
            <NavBar/>
        </>
    )
}