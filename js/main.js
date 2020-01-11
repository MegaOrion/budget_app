const btnStart = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],    
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    
    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],    
    countBtn = document.getElementsByTagName('button')[2],
    optionalexpensesItems = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

btnStart.addEventListener('click', function() {    
    time = prompt('Введите дату в формате YYYY-MM-DD');
    money = +prompt('Ваш бюджет на месяц?');

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();


    let sum = 0;
    expensesBtn.addEventListener('click', function() {
        
    
        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
        
            if ( (typeof a) === 'string' && (typeof a) != null && (typeof b) != null 
                && a != '' && b != '' && a.length < 50) {
                console.log('done')
                appData.expenses[a] = b;
                sum += +b;
            } else {
                i -= 1;
            }
        }
        expensesValue.textContent = sum;
    });
    
    
    optionalExpensesBtn.addEventListener('click', function() {
        for (let i = 0; i < optionalexpensesItems.length; i++) {
            let optExp = optionalexpensesItems[i].value;
            appData.optionalExpenses[i] = optExp;
            optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';        
        }    
    });
    
    countBtn.addEventListener('click', function() {
    
        if (appData.budget != undefined) {
            appData.moneyPerDay = ((appData.budget - sum) / 30).toFixed();
            daybudgetValue.textContent = appData.moneyPerDay;
    
            if (appData.moneyPerDay < 100) {
                levelValue.textContent = "Минимум";
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Средний";
            } else if (appData.moneyPerDay > 2000) {
                leveltValue.textContent = "Высокий";
            } else {
                levelValue.textContent = 'Произошла ошибка';
            }
        } else {
            daybudgetValue.textContent = 'Нет дохода';
        }    
    });
});



chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.income = items.split(',');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

choosePercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

const appData = {
    budget : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false,
};