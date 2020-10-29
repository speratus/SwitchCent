let converter = new Vue({
    el: '#converter',
    data: {
        rates: {},
        base: '',
        date: '',
        amountValue: null,
    },
    methods: {
        calculateValue: function() {
            let amountElement = document.getElementById('amount');
            if (amountElement.value !== '') {
                let amount = amountElement.value;
                let base = getBaseRate();
                let target = getTargetRate();
                this.amountValue = convertToTarget(base, target, amount).toFixed(2);
            }
        }
    }
});

function convertToTarget(baseRate, targetRate, amount) {
    return (amount / baseRate) * targetRate;
}

function getBaseRate() {
    let base = document.getElementById("base-currency");
    let baseName = base.value;
    return converter.rates[baseName];
}

function getTargetRate() {
    let target = document.getElementById('target-currency');
    let targetName = target.value;
    return converter.rates[targetName];
}

fetch('https://api.exchangeratesapi.io/latest').then(res => res.json()).then(json => {
    converter.rates = json.rates;
    converter.base = json.base;
    converter.date = json.date;
});