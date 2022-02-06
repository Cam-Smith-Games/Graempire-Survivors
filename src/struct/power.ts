export interface IPower {
    current?: number;
    maximum?: number;
}
export class Power {
    current: number;
    maximum: number;

    constructor(current?:number, maximum?:number) {
        this.maximum = Math.max(0, maximum || 100);
        this.current = Math.min(this.maximum, current ?? this.maximum);
    }

    /** ratio of current health to maximum(note: 0 to 1) */
    get ratio() {
        return Math.min(1, Math.max(0, this.current / this.maximum));
    }
}