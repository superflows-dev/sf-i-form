declare function readCookie(key: string): string;
declare function callApi(url: string, data: string, authorization: any): Promise<unknown>;
declare const exportFunctions: {
    callApi: typeof callApi;
    validateName: (name: string) => boolean;
    readCookie: typeof readCookie;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map