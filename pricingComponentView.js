export class PricingComponentView {
    _parentElement = document.getElementById('pricingComponent');

    render(data) {
        this._data = data;

        this._updateSlider();
        this._parentElement.innerHTML = this._generateMarkup();
    }

    _updateSlider() {
        document.querySelector(':root')
            .style.setProperty('--Slider-Position', `${this._data.percent}%`);
    }

    _generateMarkup() {
        const { pageviews, prize, yearly, discount } = this._data;
        return `
            <div class="pricing__header">
            <span class="pricing__pageviews">${ (pageviews / 1000).toFixed(2) }K Pageviews</span>
            <div class="pricing__prize">
                <span class="pricing__value">$${ prize.toFixed(2) }</span>
                <span class="pricing__month">/ ${ yearly ? 'year' : 'month'}</span>
            </div>
            <div class="pricing__slider"></div>
            </div>
            <div class="pricing__footer">
            <div class="switch">
                <div class="switch__label">Monthly Billing</div>
                <div class="switch__component switch__component--${yearly ? 'on' : 'off'}"></div>
                <div class="switch__label">Yearly Billing</div>
            </div>
            <div class="badge">${ discount }% discount</div>
            <div class="badge badge--mobile">-${ discount }%</div>
            </div>
        `;
    }

    addHandlerSwitch(handler) {
        this._parentElement.addEventListener('click', (ev) => {
            if(ev.target.closest('.switch')) {
                return handler();
            }
        });
    }

    addHandlerSlider(handler) {
        this._parentElement.addEventListener('mousemove', (ev) => {
            if(ev.target.closest('.pricing__slider') && ev.buttons) {
                const rect = ev.target.getBoundingClientRect();
                const x = ev.clientX - rect.left;
                return handler(x / rect.width);
            }
        });
    }

    addSubmitHandler(handler) {
        document.getElementById('submit')
            .addEventListener('click', handler);
    }
}