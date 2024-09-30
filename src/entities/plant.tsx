export interface Plant {
    key: string;
    name: string;// Optional property
    text_color: string;
    place_color: string;
    icon: string;
    preview_icon: string;
    border: string;
}

export interface FieldInfo {
    plant: Plant;
    progress: number;
}

export interface InventoryInfo {
    plant: Plant;
    quantity: number;
}
