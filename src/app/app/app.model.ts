export interface ITeslaModel {
    code: string;
    description: string;
    colors: ITeslaColor[];
}

export interface ITeslaColor {
    code: string;
    description: string;
    price: number; 
}

export interface ITeslaModelOption{
    configs: ITeslaConfig[];
    towhitch: boolean;
    yoke: boolean;
}

export interface ITeslaConfig{
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}