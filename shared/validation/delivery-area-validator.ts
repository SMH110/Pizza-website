const DELIVERY_OUTCODES = ['CR7', 'SE15', 'SE19', 'SE20', 'SE21', 'SE22', 'SE23', 'SE24', 'SE25', 'SE26', 'SE27', 'SE5', 'SW12', 'SW16', 'SW17', 'SW2', 'SW4', 'SW8', 'SW9'];

export function isPostcodeWithinDeliveryArea(postcode: string): boolean {
    if (typeof postcode !== 'string') {
        return false;
    }
    let outcode = getOutcodeFromPostcode(postcode);
    return DELIVERY_OUTCODES.indexOf(outcode) !== -1;
}

function getOutcodeFromPostcode(postcode: string) {
    postcode = postcode.toUpperCase().replace(/\s/, '');
    if (postcode.length >= 5) {
        return postcode.substr(0, postcode.length - 3);
    }
    return postcode;
}
