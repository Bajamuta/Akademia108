declare namespace mymaths {

}
declare const mymaths: {
    randomNumber(min: number, max: number): number;
    randomText(length: number): string;
    default: typeof mymaths;
}
export = mymaths;