import {IInterval} from "../interfaces/IInterval";

export class Random {

    static nextInteger(value: IInterval): number {
        return Math.round(Math.random() * (value.max - value.min) + value.min)
    }

    static nextFloat(value: IInterval): number {
        return Math.random() * (value.max - value.min) + value.min
    }

}