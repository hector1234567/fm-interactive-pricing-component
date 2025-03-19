export class PricingComponent {
    constructor(maxPageviews, maxPrize, initPercent, yearly){
        this.maxPageviews = maxPageviews;
        this.maxPrize = maxPrize;

        this.percent = initPercent;
        this.yearly = yearly;
    }

    // SETTERS

    set percent(percent) {
        if(percent < 0) {
            this._percent = 0;
        } else if(percent > 100) {
            this._percent = 100;
        } else {
            this._percent = percent;
        }

        if(this.yearly) {
            this._prize = (this.maxPrize * this._percent / 100) * (1 - this.discount / 100);
            this._pageviews = this.maxPageviews * this._percent / 100;
        } else {
            this._prize = (this.maxPrize * this._percent / 1200) * (1 - this.discount / 100);
            this._pageviews = this.maxPageviews * this._percent / 1200;
        }
    }

    set yearly(yearly) {
        this._yearly = yearly;
        this.percent = this.percent;
        this._discount = yearly ? 50 : 25;
    }

    // GETTERS

    get percent() { return this._percent; }

    get yearly() { return this._yearly; }

    get prize() { return this._prize; }

    get pageviews() { return this._pageviews; }

    get discount() { return this._yearly ? 50 : 25; }
}