export type BoxJustify = {
    toCssClass: () => string
}

export function boxJustifyOf(cssClass: string): BoxJustify {
    return {
        toCssClass: () => cssClass
    };
}

export const FlexJustify = {
    Start: boxJustifyOf("BoxJustify_Start"),
    End: boxJustifyOf("BoxJustify_End"),
    Center: boxJustifyOf("BoxJustify_Center"),
    Between: boxJustifyOf("BoxJustify_Between"),
    Around: boxJustifyOf("BoxJustify_Around"),
    Evenly: boxJustifyOf("BoxJustify_Evenly")
}
