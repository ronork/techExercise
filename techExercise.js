//node version used v14.15.4

module.exports = function sortCategoriesForInsert(inputJson) {
  const part1 = []; //contains  category  with parent_id null
  const part2 = []; //conatins  category with parent_id not null
  const part3 = []; //stores the correct order of categories in part2

  inputJson.map((val) => {
    if (val.parent_id === null) part1.push(val);
    else part2.push(val);
  });

  part2.map((val) => {
    const parentId = val.parent_id;

    const inPart1 = part1.some((val) => val.id === parentId);

    if (inPart1) part3.push(val);
    else {
      const inPart3 = part3.some((val) => val.id === parentId);

      if (inPart3) part3.push(val);
      else {
        const inPart2Index = part2.findIndex((val) => val.id === parentId);
        if (inPart2Index > 0) part3.push(part2[inPart2Index]);

        part3.push(val);
      }
    }
  });

  return [...part1, ...part3];
};
