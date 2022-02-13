/** simple class for storing a lazy-instantiated value */
export class Lazy {
    constructor(create) {
        this.create = create;
    }
    /** returns value. if value hasn't been set yet, it get instantiated */
    get value() {
        return this._value || (this._value = this.create());
    }
    /** clears cached value so it can be re-calculated on next access */
    reset() {
        this._value = null;
    }
}
//# sourceMappingURL=lazy.js.map