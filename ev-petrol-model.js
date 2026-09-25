/* EV versus petrol difference model. Positive netSavings means the EV costs less. */
(function (root) {
  "use strict";

  const fields = [
    "annualKm", "years", "petrolKml", "petrolPrice", "evKwhPer100",
    "chargingLossPct", "elecPrice", "evUpfront", "evRoadTaxDelta",
    "evMaintDelta", "evInsuranceDelta", "evAccessAnnual", "evSetup", "resaleDelta"
  ];

  function calculate(raw) {
    const v = {};
    const errors = [];
    for (const key of fields) {
      const value = raw[key];
      if (value === "" || value === null || value === undefined) {
        errors.push(key + " is required");
        continue;
      }
      v[key] = Number(value);
      if (!Number.isFinite(v[key])) errors.push(key + " must be a number");
    }
    if (errors.length) return { ok: false, errors };
    if (v.annualKm < 0 || v.annualKm > 100000) errors.push("Annual mileage must be between 0 and 100,000 km");
    if (v.years <= 0 || v.years > 10) errors.push("Holding period must be above 0 and at most 10 years");
    if (v.petrolKml <= 0) errors.push("Petrol efficiency must be above 0");
    if (v.evKwhPer100 <= 0) errors.push("EV consumption must be above 0");
    if (v.chargingLossPct < 0 || v.chargingLossPct >= 100) errors.push("Charging loss must be from 0% to below 100%");
    for (const key of ["petrolPrice", "elecPrice", "evSetup", "evAccessAnnual"]) {
      if (v[key] < 0) errors.push(key + " cannot be negative");
    }
    if (errors.length) return { ok: false, errors };

    const petrolPerKm = v.petrolPrice / v.petrolKml;
    const evDeliveredKwhPer100 = v.evKwhPer100 * (1 + v.chargingLossPct / 100);
    const evPerKm = evDeliveredKwhPer100 * v.elecPrice / 100;
    const fuel = v.annualKm * petrolPerKm * v.years;
    const electricity = v.annualKm * evPerKm * v.years;
    const roadTax = v.evRoadTaxDelta * v.years;
    const maintenance = v.evMaintDelta * v.years;
    const insurance = v.evInsuranceDelta * v.years;
    const access = v.evAccessAnnual * v.years;
    const purchase = v.evUpfront;
    const setup = v.evSetup;
    const resale = -v.resaleDelta;
    const netExtraEvCost = electricity - fuel + roadTax + maintenance + insurance + access + purchase + setup + resale;
    const annualFixedDelta = v.evRoadTaxDelta + v.evMaintDelta + v.evInsuranceDelta + v.evAccessAnnual;
    const intercept = -purchase - setup - resale - v.years * annualFixedDelta;
    const slope = v.years * (petrolPerKm - evPerKm);
    let threshold;
    if (Math.abs(slope) < 1e-10) {
      threshold = { kind: Math.abs(intercept) < 1e-8 ? "tie" : intercept > 0 ? "all" : "none" };
    } else if (slope > 0) {
      threshold = intercept >= 0 ? { kind: "all" } : { kind: "above", km: -intercept / slope };
    } else {
      threshold = intercept <= 0 ? { kind: "none" } : { kind: "below", km: intercept / -slope };
    }
    return {
      ok: true,
      inputs: v,
      petrolPerKm, evPerKm, evDeliveredKwhPer100,
      fuel, electricity, roadTax, maintenance, insurance, access, purchase, setup, resale,
      netExtraEvCost, netSavings: -netExtraEvCost, threshold
    };
  }

  function init() {
    const form = document.getElementById("evPetrolForm");
    if (!form) return;
    const byId = (id) => document.getElementById(id);
    const resultIds = ["evRunMonthly", "petrolRunMonthly", "breakeven", "netDiff"];
    const money = (n) => "S$" + Math.abs(n).toLocaleString("en-SG", { maximumFractionDigits: 0 });
    const signed = (n) => (n < 0 ? "−" : "") + money(n);
    function clear(message) {
      for (const id of resultIds) byId(id).textContent = "—";
      byId("tbody").textContent = "";
      byId("calcError").textContent = message;
    }
    function run() {
      const raw = Object.fromEntries(fields.map((key) => [key, byId(key).value]));
      const x = calculate(raw);
      if (!x.ok) {
        clear(x.errors[0]);
        return;
      }
      byId("calcError").textContent = "";
      byId("evRunMonthly").textContent = money(x.electricity / (x.inputs.years * 12));
      byId("petrolRunMonthly").textContent = money(x.fuel / (x.inputs.years * 12));
      byId("netDiff").textContent = signed(x.netSavings);
      const t = x.threshold;
      byId("breakeven").textContent = t.kind === "above" || t.kind === "below"
        ? (t.kind === "above" ? "Above " : "Below ") + Math.round(t.km).toLocaleString("en-SG") + " km/year"
        : ({ all: "EV at all positive mileage", none: "No EV mileage win", tie: "Equal at all mileage" })[t.kind];
      const rows = [
        ["Electricity delivered to charger", x.electricity, "Vehicle kWh/100 km × charging-loss factor × tariff × distance"],
        ["Petrol fuel", -x.fuel, "Distance ÷ km/L × petrol price"],
        ["Road tax difference", x.roadTax, "EV minus petrol, over hold"],
        ["Maintenance difference", x.maintenance, "EV minus petrol, over hold"],
        ["Insurance difference", x.insurance, "EV minus petrol, over hold"],
        ["Charging access", x.access, "Annual access/parking charges × years"],
        ["Purchase premium", x.purchase, "EV purchase price minus petrol purchase price"],
        ["Charging setup", x.setup, "One-time owner-paid cost"],
        ["Resale difference", x.resale, "Petrol sale value minus EV sale value"],
        ["Net extra EV cost", x.netExtraEvCost, "Negative means EV is cheaper"]
      ];
      byId("tbody").innerHTML = rows.map(([label, value, basis]) =>
        "<tr><td>" + label + "</td><td class='right'>" + signed(value) + "</td><td>" + basis + "</td></tr>"
      ).join("");
    }
    form.addEventListener("submit", (event) => { event.preventDefault(); run(); });
    byId("btnReset").addEventListener("click", () => { form.reset(); run(); });
    for (const input of form.querySelectorAll("input")) {
      input.addEventListener("input", () => clear("Inputs changed. Calculate again."));
    }
    run();
  }

  const api = { calculate };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.EVPetrolModel = api;
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})(typeof window !== "undefined" ? window : globalThis);
