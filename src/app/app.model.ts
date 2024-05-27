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
    towHitch: boolean;
    yoke: boolean;
}

export interface ITeslaConfig{
    id: number;
    description: string;
    range: number;
    speed: number;
    price: number;
}

export interface ITeslaInfo{
    modelName: string;
    range: number;
    speed: number;
    config: string;
    configPrice: number;
    towhitch: boolean;
    yoke: boolean;
    color: string;
    colorPrice: number;
}