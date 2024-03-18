<template>
    <div class="modal-form">
      <div class="modal">
        <div class="cart-con">
          <button class="btn-close" @click="closeCart">x</button>
          <div class="cart-widget-con" v-if="cart.length > 0">
            <div class="cart-widget" v-for="(item, index) in cart" :key="index">
              <img :src="item.img" alt="Image" />
              <div class="cart-prod-details-con">
                <h4>{{ item.title }}</h4>
                <p>x{{ item.quantity }}</p>
                <div class="quantity-con">
                  <button class="minus" @click="decrementQuantity(index)">
                    -
                  </button>
                  <input
                    type="number"
                    v-model="item.quantity"
                    @blur="checkQuantity(item)"
                  />
                  <button class="add" @click="incrementQuantity(index)">+</button>
                </div>
              </div>
              <div class="left-widget-con">
                <button class="btn-remove" @click="removeProduct(index)">
                  Remove
                </button>
                <p>
                  Total Price: <span>₱{{ item.price }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="cart-widget-con" v-else>
            <div class="no-data">No product in shopping cart.</div>
          </div>
          <div v-if="cart.length > 0" class="cart-check-out">
            <h6>-- RECEIPT --</h6>
            <div class="check-out">
              <span v-for="(item, index) in cart" :key="index"
                >{{ item.title }} x {{ item.quantity }} = ₱{{
                  calculateItemPrice(item)
                }}</span
              >
            </div>
            <p>
              Total: <span>₱{{ calculateProduct }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["cart"],
    methods: {
      removeProduct(index) {
        this.cart.splice(index, 1);
      },
      incrementQuantity(index) {
        this.cart[index].quantity += 1;
      },
      decrementQuantity(index) {
        let item = this.cart[index];
  
        if (item.quantity > 1) item.quantity -= 1;
      },
      calculateItemPrice(item) {
        return item.price * item.quantity;
      },
      closeCart() {
        this.$emit("close-cart");
      },
      checkQuantity(item) {
        if (item.quantity < 0 || item.quantity == 0) item.quantity = 1;
      },
    },
    computed: {
      calculateProduct() {
        return this.cart.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    padding: 20px;
    background: #ffffff;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 50px;
    border-bottom: 1px solid #222222;
  }
  
  .cart-check-out {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .check-out {
    display: flex;
    font-size: 13px;
    text-align: left;
    flex-direction: column;
  }
  
  .check-out span {
    margin-bottom: 3px;
  }
  
  .cart-check-out h6 {
    width: 100%;
    font-size: 20px;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #0000004d;
    margin-bottom: 20px;
  }
  
  .modal-form {
    position: relative;
    background: #ffffff;
    margin: 40px auto;
    width: 800px;
    z-index: 2;
    padding: 40px;
    filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
      drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  }
  
  .cart-prod-details-con {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }
  
  .cart-widget {
    display: flex;
    gap: 20px;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #0000004d;
  }
  
  .cart-widget-con {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .cart-widget h4 {
    font-weight: 400;
    font-size: 18px;
  }
  
  .cart-prod-details-con p:nth-child(2) {
    font-size: 12px;
  }
  
  .cart-check-out {
    text-align: right;
    margin: 10px 0;
  }
  
  .cart-prod-details-con .quantity-con p {
    font-size: 12px;
  }
  
  .cart-prod-details-con .quantity-con {
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .cart-prod-details-con input {
    border-right: 0;
    font-size: 13px;
    padding: 4px;
    border-left: 0;
    border-top: 1px solid #0000004d;
    border-bottom: 1px solid #0000004d;
  }
  
  .left-widget-con {
    gap: 20px;
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .left-widget-con p {
    text-align: right;
    font-size: 13px;
  }
  
  .cart-check-out p {
    font-size: 13px;
  }
  
  p span {
    color: #15803d;
    font-weight: 500;
  }
  
  .btn-close {
    border: none;
    font-size: 20px;
    clip-path: circle();
    padding: 20px;
    position: absolute;
    line-height: 1em;
    top: -25px;
    right: -25px;
    color: #ffffff;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
      drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    cursor: pointer;
    background: #f43f5e;
    transition: 0.2s;
  }
  
  .btn-close:hover,
  .btn-remove:hover {
    background: #e11d48;
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  
  .btn-remove {
    background: #f43f5e;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 5px;
  }
  
  .cart-prod-details-con .quantity-con button {
    border: none;
    font-size: 20px;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid #0000004d;
    transition: 0.2s;
  }
  
  .cart-prod-details-con .quantity-con button:hover {
    background: rgb(210, 210, 210);
  }
  
  .cart-prod-details-con .quantity-con .quantity-btn {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .cart-widget img {
    width: 150px;
    display: block;
  }
  </style>