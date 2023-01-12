declare namespace mymaths {

}
declare const mymaths: {
    randomNumber(min: number, max: number): number;
    randomText(length: number): string;
    randomArray(min: number, max: number, length: number): Array<number>;
    default: typeof mymaths;
}
export = mymaths;