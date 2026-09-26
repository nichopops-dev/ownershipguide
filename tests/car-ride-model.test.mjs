import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { calculate } = require("../car-ride-model.js");
const base = {
  holdingYears: 5, monthlySpend: 1200, monthlyOtherAccess: 150,
  monthlyOwnerRide: 100, carPurchase: 120000, carExit: 50000,
  annualInsurance: 2000, annualRoadTax: 800, annualMaintenance: 1500,
  annualFuel: 2800, annualParkingErp: 2400, financeInterest: 5000
};
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);

test("defaults reconcile ownership, no-car route and monthly ride threshold", () => {
  const x = calculate(base);
  assert.equal(x.ok, true);
  near(x.valueLoss, 70000);
  near(x.insuranceRoadTax + x.maintenance + x.fuel + x.parkingErp, 47500);
  near(x.ownerRide, 6000);
  near(x.carCost, 128500);
  near(x.noCarCost, 81000);
  near(x.difference, -47500);
  near(x.monthlyRideThreshold, 128500 / 60 - 150);
  assert.equal(x.winner, "ride");
});

test("a lower car exit changes the result once and raises break-even", () => {
  const a = calculate(base);
  const b = calculate({ ...base, carExit: 40000 });
  near(b.carCost - a.carCost, 10000);
  near(b.difference - a.difference, -10000);
  near(b.monthlyRideThreshold - a.monthlyRideThreshold, 10000 / 60);
});

test("transport still needed with a car is included only on the car route", () => {
  const a = calculate(base);
  const b = calculate({ ...base, monthlyOwnerRide: 200 });
  near(b.carCost - a.carCost, 6000);
  near(b.noCarCost, a.noCarCost);
});

test("extra no-car access lowers the ride-hailing threshold", () => {
  const a = calculate(base);
  const b = calculate({ ...base, monthlyOtherAccess: 250 });
  near(b.noCarCost - a.noCarCost, 6000);
  near(b.monthlyRideThreshold - a.monthlyRideThreshold, -100);
});

test("zero rides and an exact tie are meaningful", () => {
  const zero = calculate({ ...base, monthlySpend: 0, monthlyOtherAccess: 0 });
  assert.equal(zero.ok, true);
  assert.equal(zero.noCarCost, 0);
  const tie = calculate({ ...base, monthlySpend: base.monthlySpend + 47500 / 60 });
  assert.equal(tie.winner, "tie");
});

test("blank, negative and impossible inputs do not become valid results", () => {
  for (const change of [
    { monthlySpend: "" }, { holdingYears: 0 }, { annualFuel: -1 },
    { financeInterest: -1 }, { carPurchase: Infinity }
  ]) assert.equal(calculate({ ...base, ...change }).ok, false);
});
