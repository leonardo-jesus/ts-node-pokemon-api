export interface IPokemon {
    abilities: IAbility[];
}

export interface IAbility {
    ability: IAbilityApiResource;
    is_hidden: boolean;
    slot: number;
}

interface IAbilityApiResource {
    name: string;
    url: string;
}
