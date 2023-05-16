// parses data from the reqeust and only returns fields that are not null or empty

export default function requestParser (data) {
    const parsed = {};
    for (const [key, value] of Object.entries(data)) {
        if (value !== null && value !== '' && value !== undefined) {
            parsed[key] = value;
        }
        if(value === 'none'){
            parsed[key] = null;
        }
    }
    return parsed;
}