declare function isJsonString(str: string): boolean;
declare function readCookie(key: string): string;
declare function callApi(url: string, data: string, authorization: any): Promise<unknown>;
declare function replaceElement(element: any): Promise<any>;
declare function getDayMonthYear(d: Date): (string | number)[];
declare function timeSince(date: number): string;
declare const exportFunctions: {
    callApi: typeof callApi;
    validateName: (name: string) => boolean;
    readCookie: typeof readCookie;
    replaceElement: typeof replaceElement;
    getDayMonthYear: typeof getDayMonthYear;
    isJsonString: typeof isJsonString;
    timeSince: typeof timeSince;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map