
function Cart(props){
   const {quenty = 0,HandleBasketShow = Function.prototype} = props
   return(
      <div className="cart deep-purple darken-2 white-text" onClick={HandleBasketShow}>
         <i className="material-icons">shopping_cart</i>
         {quenty ? <span className="cart-quenty">{quenty}</span> : null}
      </div>
   )
}

export default Cart