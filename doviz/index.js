const fromex = document.querySelector("#fromex");
const toex = document.querySelector("#toex");
const API_KEY = "45qF0P2bh9FypnZPXrpgAFtGhHEvzGrX";
const NAMES_URL = "https://api.apilayer.com/exchangerates_data/symbols";
const RATES_URL = `https://api.apilayer.com/exchangerates_data/latest?symbols=&base=`;

var requestOptions = {
  method: "GET",
  headers: { apikey: API_KEY },
};

let data;
let ratesGlob;

function populateOptions(data) {
  console.log("works");

  let newData = Object.entries(data);
  let i = 0;
  for (const [a, b] of newData) {
    if (a === "TRY") {
      fromex[i] = new Option(b, a, true, true);
      toex[i] = new Option(b, a, false, false);
      i++;
    } else {
      fromex[i] = new Option(b, a, false, false);
      toex[i] = new Option(b, a, false, false);
      i++;
    }
  }
  console.log(fromex.value);
}

async function test(url, options) {
  try {
    let res = await fetch(url, options);
    let a = await res.json();
    const { symbols: data } = a;

    populateOptions(data);
  } catch (error) {
    console.log(error);
  }
}

async function getRates(url, option) {
  console.log("works");
  try {
    console.log(url);
    let res = await fetch(url, option);
    let a = await res.json();
    console.log(a);
    const { rates: ratesGlob } = a;
    console.log(ratesGlob);
    return ratesGlob;
  } catch (error) {
    console.log("Unexpected error", error);
  }
}
