export class Power {
    constructor(current, maximum) {
        this.maximum = Math.max(0, maximum || 100);
        this.current = Math.min(this.maximum, current !== null && current !== void 0 ? current : this.maximum);
    }
    /** ratio of current health to maximum(note: 0 to 1) */
    get ratio() {
        return Math.min(1, Math.max(0, this.current / this.maximum));
    }
}
//# sourceMappingURL=power.js.map