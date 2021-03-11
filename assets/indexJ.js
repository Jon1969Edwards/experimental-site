// get the form element from dom
const formElement = document.querySelector('form#forms')

// convert the form to JSON
const getFormJSON = (form) => {
  const data = new FormData(form);
  return Array.from(data.keys()).reduce((result, key) => {
    if (result[key]) {
      result[key] = data.getAll(key)
      return result
    }
    result[key] = data.get(key);
    return result;
  }, {});
};

// handle the form submission event, prevent default form behaviour, check validity, convert form to JSON
const handler = (event) => {
  event.preventDefault();
  const valid = formElement.reportValidity();
  if (valid) {
    const result = getFormJSON(formElement);
    // handle one, multiple or no files uploaded
    const images = [result.images].flat().filter((file) => !!file.name)
    // handle one, multiple or no languages selected
    const languages = [result.languages || []].flat();
    // convert the checkbox to a boolean
    const isHappyReader = !!(result.isHappyReader && result.isHappyReader === 'on')

    // use spread function, but override the keys we've made changes to
    const output = {
      ...result,
      images,
      languages,
      isHappyReader
    }
    console.log(output)
  }
}

formElement.addEventListener("submit", handler)
