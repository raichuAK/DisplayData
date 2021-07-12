
export function convertToTree(items) {
  if (items && items.length > 0) {
    const data = [];
    const map = {};
    items.map((item) => {
      const name = item[0];
      if (!map.hasOwnProperty(name)) {
        // in case of duplicates
        map[name] = {
          name: name,
          description: item[1],
          parent: item[2],
          children: [],
        };
      }
    });
    for (const name in map) {
      if (map.hasOwnProperty(name)) {
        let mappedElem = [];
        mappedElem = map[name];
        if (
          mappedElem.parent &&
          map[mappedElem.parent] !== ""
        ) {
          map[mappedElem.parent].children.push(mappedElem);
        } else {
          data.push(mappedElem);
        }
      }
    }
    return data;
  }
  return [];
}
