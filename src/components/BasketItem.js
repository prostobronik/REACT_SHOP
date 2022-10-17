function BasketItem(props) {
  const {
    id,
    name,
    price,
    quenty,
    removeToBasket = Function.prototype,
    decQuenty = Function.prototype,
    incQuenty = Function.prototype,
  } = props
  return (
    <li className="collection-item ">
      {name}{' '}
      <i className="material-icons basket-quenty" onClick={() => decQuenty(id)}>
        remove
      </i>{' '}
      x {quenty}{' '}
      <i className="material-icons basket-quenty" onClick={() => incQuenty(id)}>
        add
      </i>{' '}
      = {price * quenty} руб.
      <span className="secondary-content" onClick={() => removeToBasket(id)}>
        <i className="material-icons basket-delite">close</i>
      </span>
    </li>
  )
}

export default BasketItem
