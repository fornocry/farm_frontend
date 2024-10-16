import {Plant, PlantProgress} from "./plant.tsx";

const millisecondsInAnHour = 60 * 60; // 60 minutes * 60 seconds * 1000 milliseconds

export type PlantKey = 'ROSE' | 'SUNFLOWER' | 'STRAWBERRY' | 'CHRISTMAS_TREE' | 'MONEY';

export function isPlantKey(key: string): key is PlantKey {
    return ['ROSE', 'SUNFLOWER', 'STRAWBERRY', 'CHRISTMAS_TREE', 'MONEY'].includes(key);
}

export const plants: Record<PlantKey, Plant> = {
    ROSE: {
        key: "ROSE",
        name: "Rose",
        text_color: '#ed4069',
        place_color: '#f5d4d3',
        icon: "/images/assets/rose.gif",
        preview_icon: "/images/assets/rose.gif",
        border: "var(--rose-gradient, #BBF250)"
    },
    SUNFLOWER: {
        key: "SUNFLOWER",
        name: "Sunflower",
        text_color: '#A78B09',
        place_color: 'rgba(189, 84, 0, 0.17)',
        icon: "/images/assets/sunflower.gif",
        preview_icon: "/images/assets/sunflower.gif",
        border: "yellow"
    },
    STRAWBERRY: {
        key: "STRAWBERRY",
        name: "Strawberry",
        text_color: '#9D2323',
        place_color: 'rgba(218, 88, 87, 0.26)',
        icon: "/images/assets/strawberry.gif",
        preview_icon: "/images/assets/strawberry.gif",
        border: "red"
    },
    CHRISTMAS_TREE: {
        key: "CHRISTMAS_TREE",
        name: "Christmas tree",
        text_color: '#006C2E',
        place_color: 'rgba(0, 108, 46, 0.24)',
        icon: "/images/assets/christmas_tree.gif",
        preview_icon: "/images/assets/christmas_tree.gif",
        border: "green"
    },
    MONEY: {
        key: "MONEY",
        name: "Money",
        text_color: '#000000',
        place_color: 'rgba(197, 197, 197, 0.26)',
        icon: "/images/assets/money.gif",
        preview_icon: "/svgs/money_preview.svg",
        border: "#09CE3B"
    }
};

export const plantProgressInfo: Record<PlantKey, PlantProgress> = {
    ROSE: {
        growTime: millisecondsInAnHour * 5,
        rewards: 1,
    },
    SUNFLOWER: {
        growTime: millisecondsInAnHour * 5,
        rewards: 2,
    },
    STRAWBERRY: {
        growTime: millisecondsInAnHour * 5,
        rewards: 1,
    },
    CHRISTMAS_TREE: {
        growTime: millisecondsInAnHour * 5,
        rewards: 1,
    },
    MONEY: {
        growTime: millisecondsInAnHour * 5,
        rewards: 1,
    }
}