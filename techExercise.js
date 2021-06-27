//node version used v14.15.4

module.exports = function sortCategoriesForInsert(inputJson) {
  const part1 = [...inputJson],
    properJsonOutput = [];

  part1.map((val, index) => {
    if (val.parent_id === null) {
      part1[index].parent_id = -1;
    }
  });

  part1.push({
    name: "root",
    id: -1,
    parent_id: null,
  });

  const idMapping = part1.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});
  let root;
  part1.forEach((el) => {
    if (el.parent_id === null) {
      root = el;
      return;
    }
    const parentEl = part1[idMapping[el.parent_id]];
    parentEl.children = [...(parentEl.children || []), el];
  });

  const traverse = (callback) => {
    function goThrough(node) {
      callback(node);
      node.children
        ? node.children.forEach((child) => {
            goThrough(child);
          })
        : null;
    }
    goThrough(root);
  };

  traverse(({ name, id, parent_id }) => {
    if (name !== "root")
      properJsonOutput.push({
        name,
        id,
        parent_id: parent_id == -1 ? null : parent_id,
      });
  });

  return properJsonOutput;
}
