import { useEffect } from "react"
import { useState } from "react"
import {API_KEY, API_URL} from '../config'
import Alert from "./Alert"
import BasketList from "./BasketList"
import Cart from "./Cart"
import GoodList from "./Goodlist"
import Preloader from "./Preloader"


function Shop() {

   const [goods, setGoods] =  useState([])
   const [loading, setLoading] =  useState(true)
   const[order, setOrder]= useState([])
   const [isBascketShow,setIsBascketShow] = useState(false)
   const [alertName, setAlertName] = useState(' ')

   const addToBasket = (item) => {
      const itemIndex = order.findIndex(el => el.id === item.id)

      if(itemIndex < 0) {
         const newItem = {
         ...item, 
         quenty:1,
         }
         setOrder([...order, newItem])
      }else{
         const newOrder = order.map((orderItem,index)=> {
            if(index === itemIndex){
               return {
                  ...orderItem,
                  quenty: orderItem.quenty+1
               }
            }else{
               return orderItem
            }
         })
         setOrder(newOrder)
      }
      setAlertName(item.name)
   }

   const removeToBasket = (itemId) => {
      const newOrder = order.filter(el => el.id !==itemId)
      setOrder(newOrder)
   }

   const incQuenty = (itemId)=> {
      const neewOrder = order.map(el => {
         if(el.id === itemId) {
            const newQuenty = el.quenty + 1
            return {
               ...el,
               quenty:newQuenty
            }
         }else{
            return el
         }
      })
      setOrder(neewOrder)
   }

  const decQuenty = (itemId)=> {
      const neewOrder = order.map(el => {
         if(el.id === itemId) {
            const newQuenty = el.quenty - 1
            return {
               ...el,
               quenty:newQuenty >= 0 ? newQuenty : 0
            }
         }else{
            return el
         }
      })
      setOrder(neewOrder)
   }

   const HandleBasketShow=(item)=> {
      setIsBascketShow(!isBascketShow)
   }

   const closeAlert = () => {
      setAlertName('')
   }

   useEffect(function getGoods(){
         fetch(API_URL, {
            headers:{"Authorization": API_KEY}
         })
         .then(response => response.json())
         .then(data => {
            data.featured && setGoods(data.featured)
            setLoading(false)
         })
   },[])

   return (
      <main className="container content movies">
         <Cart quenty = {order.length} HandleBasketShow={HandleBasketShow}/>
         {
            loading ? <Preloader/> : <GoodList goods ={goods} addToBasket={addToBasket}/>
         }
         {
            isBascketShow && <BasketList order={order} 
            HandleBasketShow={HandleBasketShow} 
            removeToBasket={removeToBasket}
            decQuenty={decQuenty}
            incQuenty={incQuenty}/>
         }
         {
            alertName && <Alert name={alertName} closeAlert={closeAlert}/>
         }
      </main>
   )
}

export default Shop