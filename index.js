import { PricingComponent } from "./pricingComponent.js";
import { PricingComponentView } from "./pricingComponentView.js";

const pricingView = new PricingComponentView();
const pricing = new PricingComponent(200_000, 384, 50, false);

function onSwitchClick() {
    pricing.yearly = !pricing.yearly;
    renderPricingView();
}

function onMousedownSlider(position) {
    pricing.percent = position * 100;
    renderPricingView();
}

function renderPricingView() {
    pricingView.render({
        percent: pricing.percent,
        yearly: pricing.yearly,
        prize: pricing.prize,
        pageviews: pricing.pageviews,
        discount: pricing.discount
    });
}

function init() {
    renderPricingView();
    pricingView.addHandlerSwitch(onSwitchClick);
    pricingView.addHandlerSlider(onMousedownSlider);
    pricingView.addSubmitHandler(() => alert('Start'));
}
init();