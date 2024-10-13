export interface User {
    ID: string;
    FirstName: string;
    LastName: string;
    ReferralLink: string;
}

export interface UserUpgrades {
    FarmLvl: number;
    MaxFields: number;
}

export interface UserField {
    FieldID: number;
    Plant: string;
    PlantTime: number;
}

export interface UserReferral {
    ID: string;
    FirstName: string;
    LastName: string;
    Username: string | null;
    Icon: string | null;
    Status: string | null;
}