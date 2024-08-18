let languages;
const from = document.querySelector("#from");
const to = document.querySelector("#toer");

async function getLangs() {
  const options = {
    method: "GET",
    headers: {
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "20771a108amshf1290a1e4b624fep1949f8jsnbd7c40a2f5b1",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
  };

  await fetch(
    "https://translation.googleapis.com/language/translate/v2/languages",
    options
  )
    .then((response) => response.json())
    .then((response) => (languages = response))
    .catch((err) => console.error(err));
  console.log(languages);
  if (languages.message) return;

  return languages;
}

async function appender() {
  const lags = await getLangs();

  document.querySelector(".loading").hidden = "false";
  lags.data.languages.forEach((lang, i) => {
    let a = lang.language;
    if (a === "tr") {
      from[i] = new Option(a, a, true, true);
      to[i] = new Option(a, a, false, false);
    } else {
      from[i] = new Option(a, a, false, false);
      to[i] = new Option(a, a, false, false);
    }
  });
  document.querySelector(".loading").hidden = "true";
}

async function translate(text, from, to) {
  let translated;
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", text);
  encodedParams.append("target", to);
  encodedParams.append("source", from);
  console.log(encodedParams);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "20771a108amshf1290a1e4b624fep1949f8jsnbd7c40a2f5b1",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: encodedParams,
  };

  await fetch(
    "https://google-translate1.p.rapidapi.com/language/translate/v2",
    options
  )
    .then((response) => response.json())
    .then((response) => (translated = response))
    .catch((err) => console.error(err));
  return translated;
}
