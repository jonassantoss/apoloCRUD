module.exports = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR");
}