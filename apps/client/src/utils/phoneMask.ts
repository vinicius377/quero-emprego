function apply(value: string) {
  const x = value.replace(/\D/g, '').match(/(\d{2})(\d{4})(\d{4})/) || ""
  return `(${x[1]}) ${x[2]}-${x[3]}`;
}

export { apply }
