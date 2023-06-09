import React from 'react';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import styles from './CartItem.module.css';
import useCart from '../../hooks/useCart';
export default function CartItem({
  product,
  product: { id, title, image, options, price, quantity },
}) {
  const { updateCart, removeCart } = useCart();
  const handleMinus = () => {
    if (quantity < 2) return;
    updateCart.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    updateCart.mutate({ ...product, quantity: quantity + 1 });
  };
  const handleDelete = () => {
    const isDelete = window.confirm(
      `장바구니에서 ${title} 정말 삭제하시겠습니까?`
    );
    if (!isDelete) return;
    removeCart.mutate(id);
  };
  return (
    <li className={styles.cart_list}>
      <div className={styles.cart_img}>
        <img src={image} alt='' width='100%' />
      </div>
      <div className={styles.cart_info}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.option}>
            Option : <span>{options}</span>
          </p>
          <p>{(price * quantity).toLocaleString()}원</p>
        </div>
        <div className={styles.cart_quantity}>
          <AiOutlineMinusSquare onClick={handleMinus} />
          {quantity}
          <AiOutlinePlusSquare onClick={handlePlus} />
          <BsTrashFill onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
