import {PlantKey} from "../plants.tsx";

export interface InventoryItem {
    Plant: PlantKey;
    Quantity: number;
}

export interface InventoryResponse {
    items: InventoryItem[];
}