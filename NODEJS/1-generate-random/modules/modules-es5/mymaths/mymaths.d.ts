declare namespace mymaths {

}

declare const mymaths: {
    random(min: number, max: number): number;
    default: typeof mymaths;
}

export = mymaths;