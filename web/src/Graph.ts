import { ws } from "./Websocket";

const drawBase = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const drawFrame = () => {
        ctx.beginPath();
        ctx.moveTo(height, width);
        ctx.lineTo(0, width);

        ctx.moveTo(0, width);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.stroke();
    };

    const plotScale = (
        text: string,
        x: number,
        y: number
    ) => {
        ctx.font = "12px serif";
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText(text, x, y);
    };

    const drawScale = () => {
        for (let i = 0; i < width; i += width / 10) {
            plotScale(`${i}`, 5, width - i * 2);
        }
        for (let i = height; i >= 0; i -= height / 10) {
            plotScale(`${i}`, i * 2, height - 5);
        }
    };

    drawFrame();
    drawScale();
};

const drawInitialize = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const center = height / 2;
    ctx.beginPath();
    ctx.moveTo(0, center);
    ctx.lineTo(width, center);
    ctx.closePath();
    ctx.stroke();
}

const drawInterval = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    freq: number,
    amp: number,
    timer: number,
    currentPoint: number,
) => {
    const drawGraph = () => {
        ctx.beginPath();
        ctx.moveTo(timer, height / 2);
        ctx.lineTo(timer, currentPoint);
        ctx.closePath();
        ctx.stroke();
        // ctx.translate(timer, 0);
    }

    drawGraph();
};

export { drawBase, drawInterval, drawInitialize };
