
export const stripHtml = (value: string | undefined): string | undefined => 
    value?.replace(/(<([^>]+)>)/ig, '')
