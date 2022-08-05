export default function formattedPrice (price) {
  let formattedPrice = ''
  for (let index in price) {
    if (parseInt(price[index])) {
      formattedPrice += price[index];
    }
  }
  return Number(formattedPrice)
}
