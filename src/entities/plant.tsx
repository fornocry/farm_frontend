export interface Plant {
    key: string;
    name: string;// Optional property
    text_color: string;
    place_color: string;
    icon: string;
    preview_icon: string;
    border: string;
}

export interface PlantProgress {
    growTime: number;
    rewards: number;
}

export interface FieldInfo {
    FieldID: number;
    PlantTime: number;
    plant: Plant;
    progress: PlantProgress;
}

export interface InventoryInfo {
    plant: Plant;
    quantity: number;
}
