import {useMemo} from "react";
import {NavLink, useLocation} from 'react-router-dom';
import {initHapticFeedback} from "@telegram-apps/sdk-react";

const useHapticFeedback = () => {
    return () => {
        try {
            const hapticFeedback = initHapticFeedback();
            hapticFeedback.impactOccurred('medium');
        } catch (e) {
        }
    };
};

const NavItem = ({src, text, link}: { src: string, text: string, link: string }) => {
    const location = useLocation();
    const isActive = useMemo(() => location.pathname === (link), [location.pathname, link]);
    const triggerHaptic = useHapticFeedback();

    return (
        <NavLink
            to={link}
            onClick={triggerHaptic}
            className={`flex flex-col items-center ${isActive ? 'opacity-100' : 'opacity-40'}`}
        >
            <img src={src} className="w-8 h-10 mb-1" alt={text}/>
            <p className="text-white text-center font-semibold text-xs leading-3 tracking-tight font-neueMontreal">{text}</p>
        </NavLink>
    );
};

const NavBar = () => {
    const navItems = [
        {src: "/svgs/earn_icon.svg", text: "Earn", link: "/tasks"},
        {src: "/svgs/farm_icon.svg", text: "My farm", link: "/"},
        {src: "/svgs/inv_icon.svg", text: "Inventory", link: "/inv"},
        {src: "/svgs/friends_icon.svg", text: "Friends", link: "/friends"}
    ];

    return (
        <div
            className="bg-navbar absolute bottom-0 left-0 z-10 h-24 w-full flex items-center border-t border-separator-color backdrop-blur-md">
            <div className="flex justify-around w-full h-20">
                {navItems.map(item => (
                    <NavItem key={item.link} {...item} />
                ))}
            </div>
        </div>
    );
};

export default NavBar;
