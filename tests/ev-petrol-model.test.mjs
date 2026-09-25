import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { calculate } = require("../ev-petrol-model.js");
const base = {
  annualKm: 15000, years: 5, petrolKml: 12, petrolPrice: 2.8,
  evKwhPer100: 18, chargingLossPct: 10, elecPrice: 0.35,
  evUpfront: 15000, evRoadTaxDelta: 200, evMaintDelta: -300,
  evInsuranceDelta: 0, evAccessAnnual: 0, evSetup: 0, resaleDelta: 0
};
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-7, `${actual} != ${expected}`);

test("defaults reconcile delivered electricity, fuel, fixed deltas and exit", () => {
  const x = calculate(base);
  assert.equal(x.ok, true);
  near(x.evDeliveredKwhPer100, 19.8);
  near(x.electricity, 5197.5);
  near(x.fuel, 17500);
  near(x.roadTax + x.maintenance, -500);
  near(x.netExtraEvCost, 2197.5);
  near(x.netSavings, -2197.5);
  assert.equal(x.threshold.kind, "above");
  near(x.threshold.km, 14500 / (5 * (2.8 / 12 - 19.8 * .35 / 100)));
});

test("a lower EV exit value worsens ownership cost exactly once", () => {
  const a = calculate(base);
  const b = calculate({ ...base, resaleDelta: -8000 });
  near(b.netSavings - a.netSavings, -8000);
  assert.ok(b.threshold.km > a.threshold.km);
});

test("higher metered charging cost can reverse the mileage direction", () => {
  const x = calculate({ ...base, evUpfront: -3000, evRoadTaxDelta: 0, evMaintDelta: 0, elecPrice: 1.5 });
  assert.equal(x.threshold.kind, "below");
  assert.ok(x.threshold.km > 0);
  assert.ok(calculate({ ...base, evUpfront: -3000, evRoadTaxDelta: 0, evMaintDelta: 0, elecPrice: 1.5, annualKm: 0 }).netSavings > 0);
});

test("zero distance and zero energy prices stay finite", () => {
  const x = calculate({ ...base, annualKm: 0, petrolPrice: 0, elecPrice: 0 });
  assert.equal(x.ok, true);
  assert.equal(x.fuel, 0);
  assert.equal(x.electricity, 0);
  assert.ok(Number.isFinite(x.netSavings));
});

test("blank, impossible and non-finite inputs fail instead of becoming savings", () => {
  for (const change of [
    { years: "" }, { petrolKml: 0 }, { chargingLossPct: 100 },
    { annualKm: -1 }, { evSetup: -100 }, { elecPrice: Infinity }
  ]) assert.equal(calculate({ ...base, ...change }).ok, false);
});
