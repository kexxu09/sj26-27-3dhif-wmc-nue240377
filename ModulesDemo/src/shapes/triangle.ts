import type { Triangle } from "./shape.js";

/**
 * Creates a triangle. Negative dimensions are not allowed.
 * @param base The base of the triangle, must be 0 or greater.
 * @param height The perpendicular height, must be 0 or greater.
 */
export function createTriangle(base: number, height: number): Triangle {
    if (base < 0 || height < 0) {
        throw new Error(`Invalid triangle dimensions: base ${base}, height ${height}`);
    }
    return { kind: "triangle", base, height };
}

/** Calculates the area of a triangle: base * height / 2. */
export function triangleArea(triangle: Triangle): number {
    return triangle.base * triangle.height / 2;
}
