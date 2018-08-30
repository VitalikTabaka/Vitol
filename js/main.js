const carBrand = document.getElementById("brand");
const carModel = document.getElementById("model");
const carYear = document.getElementById("year");
const carVariant = document.getElementById("variant");
const carMileage = document.getElementById("mileage");
const calcButton = document.getElementById("calc");
const resultPage = document.getElementById("result-page");
const info = document.getElementById("car-info");
const price = document.getElementById("price");
const howWorks = document.getElementById("how-works");
const mainForm = document.getElementById("main-form-page");
const changeCarLink = document.getElementById("change-car-link");
const finalPageButton = document.getElementById("show-final-page");
const finalPage = document.getElementById("final-page");
const formImg = document.getElementById("form-img");
const howTo = document.getElementById("how-to");

function getOptions(arr) {
    return arr.map(el => `<option value="${el}">${el}</option>`).join(' ');
}

function resetSelects() {
    for (let i = 0; i < arguments.length; i++) {
        const name = arguments[i].id.charAt(0).toUpperCase() + arguments[i].id.slice(1);

        arguments[i].disabled = true;
        arguments[i].classList.remove("selected");
        arguments[i].innerHTML = `<option value="${name}">${name}</option>`;
    }
}

carBrand.innerHTML += getOptions(Object.keys(data));

carBrand.addEventListener("change", () => {
    const layerName = 'Model';

    if (carBrand.value !== 'Brand') {
        carBrand.classList.add("selected");
        resetSelects(carModel, carYear, carVariant, carMileage);
        carModel.disabled = false;
        carModel.innerHTML = `<option value="${layerName}">${layerName}</option>`;
        carModel.innerHTML += getOptions(Object.keys(data[carBrand.value]));
    } else {
        resetSelects(carModel, carYear, carVariant, carMileage);
        carBrand.classList.remove("selected");
    }
});

carModel.addEventListener("change", () => {
    const layerName = 'Year';

    if (carModel.value !== 'Model') {
        carModel.classList.add("selected");
        resetSelects(carYear, carVariant, carMileage);
        carYear.disabled = false;
        carYear.innerHTML = `<option value="${layerName}">${layerName}</option>`;
        carYear.innerHTML += getOptions(Object.keys(data[carBrand.value][carModel.value]));
    } else {
        resetSelects(carYear, carVariant, carMileage);
        carModel.classList.remove("selected");
    }
});

carYear.addEventListener("change", () => {
    const layerName = 'Variant';

    if (carYear.value !== 'Year') {
        carYear.classList.add("selected");
        resetSelects(carVariant, carMileage);
        carVariant.disabled = false;
        carVariant.innerHTML = `<option value="${layerName}">${layerName}</option>`;
        carVariant.innerHTML += getOptions(Object.keys(data[carBrand.value][carModel.value][carYear.value]));
    } else {
        resetSelects(carVariant, carMileage);
        carYear.classList.remove("selected");
    }
});

carVariant.addEventListener("change", () => {
    const layerName = 'Mileage';

    if (carVariant.value !== 'Variant') {
        carVariant.classList.add("selected");
        resetSelects(carMileage);
        carMileage.disabled = false;
        carMileage.innerHTML = `<option value="${layerName}">${layerName}</option>`;
        carMileage.innerHTML += getOptions(Object.keys(data[carBrand.value][carModel.value][carYear.value][carVariant.value]));
    } else {
        resetSelects(carMileage);
        carVariant.classList.remove("selected");
    }
});

carMileage.addEventListener("change", () => {
    const layerName = 'Mileage';

    if (carMileage.value !== 'Mileage') {
        carMileage.classList.add("selected");
        calcButton.disabled = false;
    } else {
        carMileage.classList.remove("selected");
        calcButton.disabled = true;
        price.innerHTML = '';
    }
});

calcButton.addEventListener("click", () => {
    const prices = data[carBrand.value][carModel.value][carYear.value][carVariant.value][carMileage.value];
    const carInfo = `${carYear.value} ${carBrand.value} ${carVariant.value}`;
    const carPrice = `<div class="from">${prices[0]} TL <span class="condition">*</span></div><span>to </span><span class="to">${prices[1]} TL</span>`;

    info.innerHTML = carInfo.toLowerCase();
    price.innerHTML = carPrice;

    howWorks.classList.add('d-none');
    mainForm.classList.add('d-none');

    resultPage.classList.add('visible');
    howTo.classList.add('visible');
});

changeCarLink.addEventListener("click", () => {
    howWorks.classList.remove('d-none');
    mainForm.classList.remove('d-none');

    resultPage.classList.remove('visible');
    howTo.classList.remove('visible');
});

formImg.addEventListener("click", () => {
    finalPageButton.disabled = false;
    formImg.classList.add("checked");
});

finalPageButton.addEventListener("click", () => {
    finalPage.classList.add('visible');
    resultPage.classList.remove('visible');
    howTo.classList.remove('visible');
});