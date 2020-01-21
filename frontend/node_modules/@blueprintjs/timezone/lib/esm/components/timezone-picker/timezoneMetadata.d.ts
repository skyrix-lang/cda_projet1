export interface ITimezoneMetadata {
    timezone: string;
    abbreviation: string | undefined;
    offset: number;
    offsetAsString: string;
    population: number | undefined;
}
export declare function getTimezoneMetadata(timezone: string, date?: Date): ITimezoneMetadata;
