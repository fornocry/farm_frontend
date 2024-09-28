'use client'

import {useMemo} from "react";
import {NavLink, useLocation} from 'react-router-dom';
import {initHapticFeedback} from "@telegram-apps/sdk-react";

const onClickHaptic = () => {
    try {
        const hapticFeedback = initHapticFeedback();
        hapticFeedback.impactOccurred('medium');
    } catch (e) {

    }
}

function NavItem({src, text, link}: { src: string, text: string, link: string }): JSX.Element {
    let location = useLocation();
    const isActivated = useMemo(() => {
        return location.pathname.startsWith(link);
    }, [location.pathname, link]);
    return (
        <NavLink onClick={() => {onClickHaptic()}} to={link}
                 className={`flex flex-col items-center ${isActivated ? 'opacity-100' : 'opacity-40'}`}>
            <img src={src} className="w-8 h-10 mb-1"/>
            <p className="text-white text-center font-semibold text-xs leading-3 tracking-tight font-neueMontreal">{text}</p>
        </NavLink>
    )
}

export default function NavBar() {
    return (
        <>
            {/*<div*/}
            {/*    className="fixed w-[135vw] h-24 bottom-12 rounded-[527px] bg-black opacity-100 z-0"*/}
            {/*></div>*/}
            {/* add here elipse*/}
            <div
                className="bg-navbar absolute bottom-0 left-0 z-10 h-24 w-full flex items-center border-t border-separator-color backdrop-blur-md">
                <div className="flex justify-around w-full h-20">
                    <NavItem src={"/svgs/earn_icon.svg"} text={"Earn"} link={"/tasks"}/>
                    <NavItem src={"/svgs/farm_icon.svg"} text={"My farm"} link={"/farm"}/>
                    <NavItem src={"/svgs/inv_icon.svg"} text={"Inventory"} link={"/inv"}/>
                    <NavItem src={"/svgs/friends_icon.svg"} text={"Friends"} link={"/friends"}/>
                </div>
            </div>
        </>
    )
}