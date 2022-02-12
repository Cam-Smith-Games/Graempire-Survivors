/** rounds x to nearest multiple of mult */
export function roundTo(x:number, mult:number) {
    return Math.ceil(x / mult) * mult;
}