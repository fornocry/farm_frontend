export function TopBarFarm({username}: { username: string }): JSX.Element {
    return (
        <>
            <div
                className="fixed top-0 left-0 z-10 h-24 w-full topbarblur">
            </div>
            <div
                className="fixed top-0 left-0 z-10 h-20 w-full">
                <div className="relative h-full p-3.5 pl-6 flex items-center">
                    <div
                        className="h-full rounded-[10px] aspect-square flex items-center justify-center bg-userImageBg">
                        <img src="/images/assets/user.gif" className="h-[90%] mt-1" alt="User"/>
                    </div>
                    <div className="ml-4 flex flex-col font-NeueHaas w-1/2">
                        <p className="text-white text-base font-medium leading-normal">{username}</p>
                        <p className="text-tribeText text-sm font-medium leading-normal">$$$camers tribe</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export function TopBarInv({balance}: { balance: number }) {
    return (
        <>
            <div
                className="absolute top-0 left-0 z-10 h-24 w-full topbarblur">
            </div>
            <div
                className="fixed top-0 left-0 z-10 h-20 w-full">
                <div className="relative h-full p-3.5 pl-6 flex items-center">
                    <div
                        className="h-full rounded-[10px] aspect-square flex items-center justify-center bg-userImageBg">
                        <img src="/svgs/inv_icon.svg" className="h-[60%]" alt="User"/>
                    </div>
                    <div className="ml-4 flex flex-col font-NeueHaas">
                        <p className="text-white text-base font-medium leading-normal">Your inventory</p>
                        <p className="text-tribeText text-sm font-medium leading-normal">Balance: {balance}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export function TopBarTasks({total}: {total: number}) {
    return (
        <>
            <div
                className="absolute top-0 left-0 z-10 h-24 w-full topbarblur">
            </div>
            <div
                className="fixed top-0 left-0 z-10 h-20 w-full">
                <div className="relative h-full p-3.5 pl-6 flex items-center">
                    <div
                        className="h-full rounded-[10px] aspect-square flex items-center justify-center bg-userImageBg">
                        <img src="/svgs/earn_icon.svg" className="h-[60%]" alt="User"/>
                    </div>
                    <div className="ml-4 flex flex-col font-NeueHaas">
                        <p className="text-white text-base font-medium leading-normal">Your tasks</p>
                        <p className="text-tribeText text-sm font-medium leading-normal">Total: {total}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export function TopBarFriends({total}: { total: number }) {
    return (
        <>
            <div
                className="absolute top-0 left-0 z-10 h-24 w-full topbarblur">
            </div>
            <div
                className="fixed top-0 left-0 z-10 h-20 w-full">
                <div className="relative h-full p-3.5 pl-6 flex items-center">
                    <div
                        className="h-full rounded-[10px] aspect-square flex items-center justify-center bg-userImageBg">
                        <img src="/svgs/earn_icon.svg" className="h-[60%]" alt="User"/>
                    </div>
                    <div className="ml-4 flex flex-col font-NeueHaas">
                        <p className="text-white text-base font-medium leading-normal">Your friends</p>
                        <p className="text-tribeText text-sm font-medium leading-normal">Total: {total}</p>
                    </div>
                </div>
            </div>
        </>
    )
}