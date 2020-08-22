const sorter = (a, b) => (isNaN(a) && isNaN(b) ? (a || "").localeCompare(b || "") : a - b);
export default sorter;
