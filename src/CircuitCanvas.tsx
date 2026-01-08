import React, { useRef, useEffect } from 'react';
import type { GateType } from './logic';

interface CircuitCanvasProps {
    gate: GateType;
    inputA: boolean;
    inputB: boolean;
    output: boolean;
}

const CircuitCanvas: React.FC<CircuitCanvasProps> = ({ gate, inputA, inputB, output }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Constants
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const gateWidth = 120;
        const gateHeight = 80;
        const gateX = centerX - gateWidth / 2;
        const gateY = centerY - gateHeight / 2;

        const trueColor = '#4ade80'; // Green
        const falseColor = '#f87171'; // Red
        const strokeColor = '#e5e7eb'; // Light gray for neutral lines
        const textColor = '#ffffff';

        // Helper to set color based on value
        const getColor = (val: boolean) => (val ? trueColor : falseColor);

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Draw Inputs
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        // Input A
        ctx.strokeStyle = getColor(inputA);
        ctx.fillStyle = getColor(inputA); // Text color matches signal
        ctx.beginPath();
        // If NOT gate, draw clearly. If others, draw two inputs
        if (gate === 'NOT') {
            // Single center input
            ctx.moveTo(50, centerY);
            ctx.lineTo(gateX, centerY);
            ctx.stroke();
            ctx.fillText(inputA ? '1' : '0', 40, centerY);
            ctx.fillStyle = textColor;
            ctx.fillText('A', 20, centerY);
        } else {
            // Input A (Available for all)
            const inputAy = centerY - 20;
            ctx.beginPath();
            ctx.moveTo(50, inputAy);
            ctx.lineTo(gateX, inputAy);
            ctx.stroke();
            ctx.fillText(inputA ? '1' : '0', 40, inputAy);
            ctx.fillStyle = textColor;
            ctx.fillText('A', 20, inputAy);

            // Input B
            const inputBy = centerY + 20;
            ctx.strokeStyle = getColor(inputB);
            ctx.fillStyle = getColor(inputB);
            ctx.beginPath();
            ctx.moveTo(50, inputBy);
            ctx.lineTo(gateX, inputBy);
            ctx.stroke();
            ctx.fillText(inputB ? '1' : '0', 40, inputBy);
            ctx.fillStyle = textColor;
            ctx.fillText('B', 20, inputBy);
        }

        // Draw Gate Body
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = '#1f2937'; // Dark gray bg for gate
        ctx.fillRect(gateX, gateY, gateWidth, gateHeight);
        ctx.strokeRect(gateX, gateY, gateWidth, gateHeight);

        // Gate Label
        ctx.fillStyle = textColor;
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(gate, centerX, centerY);

        // Draw Output
        ctx.strokeStyle = getColor(output);
        ctx.fillStyle = getColor(output);
        ctx.beginPath();
        ctx.moveTo(gateX + gateWidth, centerY);
        ctx.lineTo(width - 50, centerY);
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillText(output ? '1' : '0', width - 40, centerY);
        ctx.fillStyle = textColor;
        ctx.fillText('OUT', width - 20, centerY);

    }, [gate, inputA, inputB, output]);

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={300}
            className="circuit-canvas"
        />
    );
};

export default CircuitCanvas;
