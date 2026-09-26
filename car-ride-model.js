/* Car versus ride-hailing comparison. Costs are economic cost over the entered hold. */
(function (root) {
  "use strict";
  const fields = [
    "holdingYears", "monthlySpend", "monthlyOtherAccess", "monthlyOwnerRide",
    "carPurchase", "carExit", "annualInsurance", "annualRoadTax",
    "annualMaintenance", "annualFuel", "annualParkingErp", "financeInterest"
  ];
  function calculate(raw) {
    const v = {};
    const errors = [];
    for (const key of fields) {
      if (raw[key] === "" || raw[key] === null || raw[key] === undefined) {
        errors.push(key + " is required");
        continue;
      }
      v[key] = Number(raw[key]);
      if (!Number.isFinite(v[key])) errors.push(key + " must be a number");
    }
    if (errors.length) return { ok: false, errors };
    if (v.holdingYears <= 0 || v.holdingYears > 10) errors.push("Holding period must be above 0 and at most 10 years");
    for (const key of fields.filter((key) => key !== "holdingYears")) {
      if (v[key] < 0) errors.push(key + " cannot be negative");
    }
    if (errors.length) return { ok: false, errors };

    const months = v.holdingYears * 12;
    const valueLoss = v.carPurchase - v.carExit;
    const insuranceRoadTax = v.holdingYears * (v.annualInsurance + v.annualRoadTax);
    const maintenance = v.holdingYears * v.annualMaintenance;
    const fuel = v.holdingYears * v.annualFuel;
    const parkingErp = v.holdingYears * v.annualParkingErp;
    const ownerRide = months * v.monthlyOwnerRide;
    const carCost = valueLoss + insuranceRoadTax + maintenance + fuel + parkingErp + v.financeInterest + ownerRide;
    const noCarCost = months * (v.monthlySpend + v.monthlyOtherAccess);
    const monthlyRideThreshold = (carCost / months) - v.monthlyOtherAccess;
    const difference = noCarCost - carCost;
    return {
      ok: true, inputs: v, months, valueLoss, insuranceRoadTax, maintenance,
      fuel, parkingErp, financeInterest: v.financeInterest, ownerRide,
      carCost, noCarCost, difference, monthlyRideThreshold,
      winner: Math.abs(difference) < 1e-7 ? "tie" : difference > 0 ? "car" : "ride"
    };
  }
  function init() {
    const form = document.getElementById("rideForm");
    if (!form) return;
    const byId = (id) => document.getElementById(id);
    const money = (n) => "S$" + Math.abs(n).toLocaleString("en-SG", { maximumFractionDigits: 0 });
    const signed = (n) => (n < 0 ? "−" : "+") + money(n);
    const costMoney = (n) => (n < 0 ? "−" : "") + money(n);
    const labels = {
      holdingYears: "Holding period", monthlySpend: "Monthly ride-hailing spend",
      monthlyOtherAccess: "Other no-car access", monthlyOwnerRide: "Rides with a car",
      carPurchase: "Car purchase price", carExit: "Net car exit value",
      annualInsurance: "Insurance", annualRoadTax: "Road tax",
      annualMaintenance: "Maintenance", annualFuel: "Fuel or electricity",
      annualParkingErp: "Parking and ERP", financeInterest: "Finance interest and exit fees"
    };
    const outputIds = [
      "rideCost", "benchmarkCost", "diff", "breakeven", "bDep", "bIns",
      "bMaint", "bFuel", "bPark", "bOpp", "bRide", "bTotal"
    ];
    const presets = {
      compact: {
        carPurchase: 95000, carExit: 42000, annualInsurance: 1500,
        annualRoadTax: 700, annualMaintenance: 1300, annualFuel: 2200,
        annualParkingErp: 1800, financeInterest: 3500
      },
      higher: {
        carPurchase: 175000, carExit: 65000, annualInsurance: 2600,
        annualRoadTax: 1200, annualMaintenance: 2500, annualFuel: 3800,
        annualParkingErp: 3600, financeInterest: 10000
      }
    };
    function clear(message) {
      outputIds.forEach((id) => { byId(id).textContent = "—"; });
      byId("verdictBadge").textContent = "—";
      byId("verdict").textContent = message;
      byId("calcError").textContent = message;
    }
    function run() {
      const raw = Object.fromEntries(fields.map((key) => [key, byId(key).value]));
      const x = calculate(raw);
      if (!x.ok) {
        const error = x.errors[0];
        clear(error.replace(/^([A-Za-z]+)\b/, (key) => labels[key] || key));
        return;
      }
      byId("calcError").textContent = "";
      byId("rideCost").textContent = money(x.noCarCost);
      byId("benchmarkCost").textContent = money(x.carCost);
      byId("diff").textContent = signed(x.difference);
      byId("breakeven").textContent = x.monthlyRideThreshold < 0
        ? "Car cheaper at S$0 rides"
        : money(x.monthlyRideThreshold) + "/month";
      byId("bDep").textContent = costMoney(x.valueLoss);
      byId("bIns").textContent = money(x.insuranceRoadTax);
      byId("bMaint").textContent = money(x.maintenance);
      byId("bFuel").textContent = money(x.fuel);
      byId("bPark").textContent = money(x.parkingErp);
      byId("bOpp").textContent = money(x.financeInterest);
      byId("bRide").textContent = money(x.ownerRide);
      byId("bTotal").textContent = costMoney(x.carCost);
      byId("verdictBadge").textContent = x.winner === "tie" ? "TIE" : x.winner === "car" ? "CAR" : "RIDE-HAILING";
      byId("verdict").textContent = x.winner === "tie"
        ? "The two routes tie on these inputs. Test a lower car exit and a busier ride-hailing month."
        : x.winner === "car"
          ? "Car ownership costs " + money(x.difference) + " less over this hold on these inputs."
          : "Ride-hailing and other access cost " + money(-x.difference) + " less over this hold on these inputs.";
    }
    form.addEventListener("submit", (event) => { event.preventDefault(); run(); });
    for (const input of form.querySelectorAll("input")) input.addEventListener("input", () => clear("Inputs changed. Calculate again."));
    byId("benchmarkSelect").addEventListener("change", () => {
      const preset = presets[byId("benchmarkSelect").value];
      if (preset) {
        for (const [key, value] of Object.entries(preset)) byId(key).value = String(value);
        run();
      }
    });
    byId("resetBtn").addEventListener("click", () => {
      form.reset();
      byId("benchmarkSelect").value = "custom";
      run();
    });
    run();
  }
  const api = { calculate };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.CarRideModel = api;
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }
})(typeof window !== "undefined" ? window : globalThis);
