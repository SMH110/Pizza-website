export function isPostcodeValid(postcode: string): boolean {
    if (!postcode) return;
    postcode = postcode.toUpperCase().replace(/\s/g, '');
    let postcodes: string[] = ['CR7', 'SE15', 'SE19', 'SE21', 'SE22', 'SE23', 'SE24', 'SE26', 'SE27', 'SE5', 'SW12', 'SW16', 'SW17', 'SW2', 'SW4', 'SW8', 'SW9']
    let isPostCodeStartWithValidValue: boolean = postcodes.some(x => postcode.startsWith(x));
    let ukPostCodeRegex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;

    if (isPostCodeStartWithValidValue && ukPostCodeRegex.test(postcode)) {
        return true;
    }
    return false
}


