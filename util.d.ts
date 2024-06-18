declare function readCookie(key: string): string;
declare function callApi(url: string, data: string, authorization: any): Promise<unknown>;
declare function replaceElement(element: any): Promise<any>;
declare const exportFunctions: {
    callApi: typeof callApi;
    validateName: (name: string) => boolean;
    readCookie: typeof readCookie;
    replaceElement: typeof replaceElement;
};
export default exportFunctions;
//# sourceMappingURL=util.d.ts.map