export default function convertToTree(items) {
  if (items && items.length > 0) {
    const data = [];
    const map = {};
    items.forEach(item => {
      const name = item[0];
      // eslint-disable-next-line
      if (!map.hasOwnProperty(name)) {
        // in case of duplicates
        map[name] = {
          name,
          description: item[1],
          parent: item[2],
          children: [],
        };
      }
    });
    // eslint-disable-next-line
    for (const name in map) {
      // eslint-disable-next-line
      if (map.hasOwnProperty(name)) {
        let mappedElem = [];
        mappedElem = map[name];
        if (mappedElem.parent && map[mappedElem.parent] !== '') {
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
