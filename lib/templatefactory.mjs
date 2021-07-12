export function createDOM(htmlText) {
  return new DOMParser().parseFromString(htmlText, 'text/html');
}

export function createTemplate(templateText) {
  const dom = createDOM(templateText);
  const template = dom.querySelector('template');
  return template;
}
