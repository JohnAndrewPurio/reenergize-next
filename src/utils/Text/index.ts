/**
 * Converts camel case string to normal case (e.g. thisIsAText => This Is A Text)
 * 
 * @param text Text in camel case to convert
 */
export const camelCaseToNormalCase = (text: string) => {
    const capitalLettersRegex = /[A-Z]/g
    const withSpaces = text.replace(capitalLettersRegex, " $&")

    return withSpaces.replace(text[0], text[0].toUpperCase())
}