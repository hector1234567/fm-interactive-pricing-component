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
                <span class="pricing__pageviews">${ Math.floor(pageviews / 1000) }K Pageviews</span>
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
        let isGrabbing = false;

        ['mousedown'].forEach(eventName => {
            this._parentElement.addEventListener(eventName, (ev) => {
                if(ev.target.closest('.pricing__slider')) {
                    isGrabbing = true;
                }
            });
        });

        ['mouseup'].forEach(eventName => {
            document.addEventListener(eventName, () => {
                isGrabbing = false;
            });
        });

        ['mousemove'].forEach(eventName => {
            this._parentElement.addEventListener(eventName, (ev) => {
                if(isGrabbing === true) {
                    const rect = this._parentElement.querySelector('.pricing__slider')
                        .getBoundingClientRect();
                    const x = ev.clientX - rect.left;
                    return handler(x / rect.width);
                }
            });
        });

        ['touchmove','touchstart', 'touchend'].forEach(eventName => {
            this._parentElement.addEventListener(eventName, (ev) => {
                if(ev.target.closest('.pricing__footer')) return;
                const rect = this._parentElement.querySelector('.pricing__slider')
                    .getBoundingClientRect();
                const x = ev.changedTouches[0].clientX - rect.left;
                return handler(x / rect.width);
            })
        });
    }

    addSubmitHandler(handler) {
        document.getElementById('submit')
            .addEventListener('click', handler);
    }
}