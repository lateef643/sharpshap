const formatToCurrency = (value) => {
  return `₦${Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}

export default formatToCurrency;