import { capitalize } from '../utils.js';

export function selectTemplate(options) {
  return options.map((option) => {
    return `<option value="${option.value}">${option.name}</option>`;
  });
}

export function groupSelectTemplate(options) {
  return Object.keys(options).map((key) => {
    return `
      <optgroup label="${capitalize(key)}">
        ${ selectTemplate(options[key]) }
      </optgroup>
    `;
  });
}
