window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values = {amount: 20000, years: 5, rate: 3.5};
  const amountInput = document.getElementById("loan-amount");
  amountInput = values.amount;
  const yearsInput = document.getElementById("loan-years");
  yearsInput = values.years;
  const rateInput = document.getElementById("loan-rate");
  rateInput = values.rate;
  update();


}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentInputValues = getCurrentUIValues;
  updateMonthly(calculateMonthlyPayment(currentInputValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const perMonthRate = (values.rate / 100) / 12;
  const n = Math.floor (values.years * 12);
  return ( 
    (perMonthRate * values.amount) / ( 1 - Math.pow((1 + perMonthRate), -n))
  ).toFixed(2); 
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyInput = document.getElementById("monthy-payment");
  monthlyInput.innerText = "$" + monthly;
}
