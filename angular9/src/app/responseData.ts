export function getApiData(id: string, timestamp: string, peopleInFrame: number, noOfViolations: number, locality: string, latitude: string,
    longitude: string, localityType: string, zoneCategory: string, containmentZoneDistance: number, callback?: (data: IResponseData) => void): IApplication {
    let data = {
        id: id,
        timestamp: timestamp,
        peopleInFrame: peopleInFrame,
        noOfViolations: noOfViolations,
        locality: locality,
        latitude: latitude,
        longitude: longitude,
        localityType: localityType,
        zoneCategory: zoneCategory,
        containmentZoneDistance: containmentZoneDistance
    }
    if (callback) {
        callback(data);
    }

    return data;
}