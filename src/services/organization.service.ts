export const organizationService = {
    getCurrentOrganizationId,
};

function getCurrentOrganizationId() : number {
    let idString = process.env.REACT_APP_ORGANIZATION_ID!;
    return parseInt(idString);
}