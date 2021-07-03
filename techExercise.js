//node version used v14.15.4
module.exports = function sortCategoriesForInsert(inputJson) {
  const inputJSONCopy = [...inputJson],
    sortedCategories = [];

  //pushing an imaginary root to which all categories with no parents can point to
  inputJSONCopy.push({
    name: "-1",
    id: -1,
    parent_id: null,
  });

  //creating an id mapping for each element
  const idMapping = inputJSONCopy.reduce((acc, el, i) => {
    if (el.parent_id === null && el.name !== "-1") {
      inputJSONCopy[i].parent_id = -1;
    }
    acc[el.id] = i;
    return acc;
  }, {});

  //constructing the tree
  let root;
  inputJSONCopy.forEach((el) => {
    if (el.parent_id === null) {
      root = el;
      return;
    }
    const parentEl = inputJSONCopy[idMapping[el.parent_id]];
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
    if (name !== "-1")
      sortedCategories.push({
        name,
        id,
        parent_id: parent_id == -1 ? null : parent_id,
      });
  });

  return sortedCategories;
};
