import BasketItem from './BasketItem'

function BasketList(props) {
  const {
    order = [],
    HandleBasketShow = Function.prototype,
    removeToBasket = Function.prototype,
    decQuenty,
    incQuenty,
  } = props

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quenty
  }, 0)

  return (
    <ul className="collection basket-list">
      <li className="collection-item active">Корзина</li>
      {order.length ? (
        order.map((item) => (
          <BasketItem
            key={item.id}
            removeToBasket={removeToBasket}
            {...item}
            incQuenty={incQuenty}
            decQuenty={decQuenty}
          />
        ))
      ) : (
        <li className="collection-item "> Корзина пуста</li>
      )}
      <li className="collection-item active">Общая стоимость:{totalPrice}</li>
      <li className="collection-item active">
        <button className="btn"> Оформить</button>
      </li>

      <i className="material-icons basket-close" onClick={HandleBasketShow}>
        close
      </i>
    </ul>
  )
}
export default BasketList
