<template>
  <section id="header">
    <div class="wrapper">
      <div class="header-con">
        <h2><i class="bi bi-bag-heart-fill"></i> Shopping Cart</h2>
        <button @click="showCart"><i class="bi bi-cart-check"></i> Cart</button>
      </div>
    </div>
  </section>
  <section id="homepage">
    <div class="wrapper">
      <div class="homepage-con">
        <h2>Product List</h2>
        <div class="product-widget-con">
          <div
            class="product-widget"
            v-for="(product, index) in productList"
            :key="index"
          >
            <img :src="product.thumbnail" alt="" />
            <div class="product-details">
              <div class="product-header">
                <h4>{{ product.title }}</h4>
                <p>
                  <span>₱{{ product.price }}</span>
                </p>
              </div>
              <div class="product-desc-con">
                <p>Description:</p>
                <p>{{ product.description }}</p>
              </div>
              <button @click="addToCart(index)">
                <i class="bi bi-cart-plus"></i>
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="backdrop" v-if="showCartSection">
    <Cart :cart="cart" @close-cart="closeCart" />
  </div>
</template>

<script>
import Cart from "./Cart.vue";

export default {
  data() {
    return {
      productList: [],
      cart: [],
      showCartSection: false,
    };
  },
  components: {
    Cart,
  },
  async created() {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=15`);
      if (!response.ok) throw new Error("Failed to fetch products");
      this.productList = (await response.json()).products.reverse();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  methods: {
    showCart() {
      this.showCartSection = true;
    },
    closeCart() {
      this.showCartSection = false;
    },
    addToCart(index) {
      let existingItem = this.cart.find(
          (item) => item.title == this.productList[index].title
        ),
        item = this.productList[index];

      existingItem
        ? existingItem.quantity++
        : this.cart.push({
            img: item.thumbnail,
            title: item.title,
            description: item.description,
            price: item.price,
            quantity: 1,
          });

      successOrder("Product Successfuly Added.");
    },
  },
};
</script>

<style scoped>
body {
  background: #fff;
}

button i {
  font-size: 20px;
}

.backdrop {
  overflow: auto;
  top: 69px;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

p span {
  color: #ee4d2d;
  font-weight: 500;
}

#header {
  z-index: 9;
  position: fixed;
  width: 100%;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  background: rgb(238, 77, 45);
}

#header .wrapper {
  max-width: 1440px;
  width: 100%;
}

#header h2 {
  color: #ffffff;
  font-weight: 700;
}

#header .header-con {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
}

#header .header-con button {
  border: none;
  border-radius: 4px;
  padding: 10px 30px;
  background: #ffffff;
  font-size: 15px;
  font-weight: 600;
  transition: 0.6s;
  cursor: pointer;
}

#header .header-con button:hover {
  color: rgb(238, 77, 45);
}

#homepage .homepage-con {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 150px 0;
}

#homepage .homepage-con h2 {
  text-align: center;
  font-size: 28px;
  padding-bottom: 10px;
  border-bottom: 1px solid #222222;
}

#homepage .homepage-con .product-widget-con {
  display: flex;
  flex-wrap: wrap;
  column-gap: 25px;
  justify-content: center;
  row-gap: 40px;
}

#homepage .wrapper {
  max-width: 1440px;
  width: 100%;
}

#homepage .product-widget {
  background: #ffffff;
  border-radius: 10px;
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
}

#homepage .product-widget img {
  width: 300px;
  height: 300px;
  display: block;
  border-radius: 10px 10px 0 0;
  object-fit: cover;
}

#homepage .product-desc-con p:first-child {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}

#homepage .product-details .product-header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;
}

#homepage .product-details p {
  font-size: 14px;
}

#homepage .product-details h4 {
  font-size: 20px;
  font-weight: 400;
  height: 50px;
  line-height: 1em;
}

#homepage .product-desc-con p:last-child {
  font-size: 12px;
  height: 50px;
  overflow: auto;
}

p::-webkit-scrollbar {
  width: 0;
}

#homepage .product-details {
  word-wrap: break-word;
  max-width: 300px;
  padding: 20px;
}

#homepage .product-details button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 600;
  background: rgb(238, 77, 45);
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  font-size: 14px;
  padding: 20px 40px;
  width: 100%;
  transition: 0.2s;
  cursor: pointer;
}

#homepage .product-details button:hover {
  background: rgb(238, 77, 45);
}
</style>
