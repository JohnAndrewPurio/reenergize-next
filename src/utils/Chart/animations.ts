export const progressiveAnimation = (duration: number, delayBetweenPoints: number) => {
    const previousY = (ctx: any) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation: any = {
        x: {
            type: 'number',
            easing: 'easeInQuad',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx: any) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'easeInQuad',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx: any) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    };

    return animation
}
