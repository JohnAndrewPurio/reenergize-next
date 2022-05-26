export const roundAccurately = (number: number, decimalPlaces: number) => {
    return Number(
        Math.round(
            Number(
                String(number) + "e" + String(decimalPlaces)
            )
        ) + "e-" + decimalPlaces
    )
}