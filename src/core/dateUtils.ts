const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
})

export function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const dayAndMonth = shortDateFormatter.format(date).toLocaleLowerCase("en-GB")
  const year = String(date.getFullYear()).slice(-2).padStart(2, "0")
  return `${dayAndMonth} (${year})`
}
