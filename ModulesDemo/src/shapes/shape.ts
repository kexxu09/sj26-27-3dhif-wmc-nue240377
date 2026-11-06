/** A circle, described by its radius. */
export interface Circle {
    kind: "circle";
    radius: number;
}

/** A rectangle, described by its width and height. */
export interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

/** A triangle, described by its base and perpendicular height. */
export interface Triangle {
    kind: "triangle";
    base: number;
    height: number;
}

/** Every shape the calculator knows. The property kind tells them apart. */
export type Shape = Circle | Rectangle | Triangle;
