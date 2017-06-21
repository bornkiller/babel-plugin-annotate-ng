export function find(fruit) {
  const inventory = [
    { name: 'apples', quantity: 2 },
    { name: 'bananas', quantity: 0 },
    { name: 'cherries', quantity: 5 }
  ];

  return inventory.find((inventory) => inventory.name === fruit);
}