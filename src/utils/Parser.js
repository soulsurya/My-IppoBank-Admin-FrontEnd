export const queryStringToObject = (queryString) => {
    try {
        if (!queryString && queryString !== false) {
            return {}
        }
        var search = queryString.substring(1);
        return JSON.parse(
            '{"' +
            decodeURIComponent(search)
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"') +
            '"}'
        );
    } catch (error) {
        return "Enter valid query string.";
    }
};