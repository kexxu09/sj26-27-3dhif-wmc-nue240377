import assert from "node:assert/strict";
import { test } from "node:test";
import { area, createCircle, createRectangle, createTriangle } from "../dist/shapes/index.js";
import createReport from "../dist/report.js";

test("the public shapes module creates a triangle with area 12", () => {
    const triangle = createTriangle(6, 4);
    assert.deepEqual(triangle, { kind: "triangle", base: 6, height: 4 });
    assert.equal(area(triangle), 12);
});

test("triangle areas support fractional and zero dimensions", () => {
    assert.equal(area(createTriangle(2.5, 1.2)), 1.5);
    assert.equal(area(createTriangle(0, 4)), 0);
    assert.equal(area(createTriangle(6, 0)), 0);
});

test("negative triangle dimensions are rejected", () => {
    assert.throws(() => createTriangle(-6, 4), /Invalid triangle dimensions/);
    assert.throws(() => createTriangle(6, -4), /Invalid triangle dimensions/);
    assert.throws(() => createTriangle(-6, -4), /Invalid triangle dimensions/);
});

test("existing shapes keep their area calculations", () => {
    assert.equal(area(createCircle(1)), Math.PI);
    assert.equal(area(createRectangle(-4, 2.5)), 10);
});

test("the report includes triangles in its lines and total", () => {
    assert.deepEqual(createReport([createRectangle(4, 2.5), createTriangle(6, 4)]), [
        "1. rectangle: 10",
        "2. triangle: 12",
        "Total area: 22"
    ]);
});
