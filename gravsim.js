const tableEle = document.createElement("table");
for (var i=0;i<=490;i++) {
  let tableRow = document.createElement("tr");
  tableRow.className = `row${i}`;
  tableEle.appendChild(tableRow);
  for (var k=0;k<=490;k++) {
    let tableEntry = document.createElement("td");
    tableEntry.classname = `col${k}`;
    tableRow.appendChild(tableEntry);
  }
}
document.body.appendChild(tableEle);
