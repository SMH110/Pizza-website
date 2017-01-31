export function isPostcodeStartWithValidValue(postcode: string): boolean {
    if (!postcode) return;
    postcode = postcode.toUpperCase().replace(/\s/g, '');
    let postcodes: string[] = ['CR7', 'SE15', 'SE19', 'SE21', 'SE22', 'SE23', 'SE24', 'SE26', 'SE27', 'SE5', 'SW12', 'SW16', 'SW17', 'SW2', 'SW4', 'SW8', 'SW9']
    return postcodes.some(x => postcode.startsWith(x));
}


