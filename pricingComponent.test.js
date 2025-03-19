import { test, expect } from "vitest";
import { PricingComponent } from "./pricingComponent";

test("PricingComponent inits, sets and gets prize", () => {
    const maxPrize = 1000; 
    const pricingComponent = new PricingComponent(200_000, maxPrize, 50, true);

    expect(pricingComponent.prize).toBe(maxPrize*.5*.5);

    pricingComponent.percent = 45;

    expect(pricingComponent.prize).toBe(maxPrize*.45*.5);
})

test("PricingComponent gets pageviews", () => {
    const maxPageviews = 200_000;
    const pricingComponent = new PricingComponent(maxPageviews, 1000, 50, true);

    expect(pricingComponent.pageviews).toBe(maxPageviews*.5);

    pricingComponent.percent = 45;

    expect(pricingComponent.pageviews).toBe(maxPageviews*.45);
})


test("PricingComponent sets yearly", () => {
    const maxPrize = 1000; 
    const pricingComponent = new PricingComponent(200_000, maxPrize, 50, false);

    expect(pricingComponent.prize).toBe(maxPrize*.5*.75/12);

    pricingComponent.percent = 45;

    expect(pricingComponent.prize).toBe(maxPrize*.45*.75/12);

    pricingComponent.yearly = true;

    expect(pricingComponent.prize).toBe(maxPrize*.45*.5);

    pricingComponent.percent = 90;

    expect(pricingComponent.prize).toBe(maxPrize*.9*.5);
})