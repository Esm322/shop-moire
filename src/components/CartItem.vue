<template>
  <ul class="cart__list">
    <li class="cart__item product">
      <div class="product__pic">
        <img src="img/product-square-4.jpg" width="120"
        height="120" srcset="img/product-square-4@2x.jpg 2x" alt="Название товара">
      </div>
      <h3 class="product__title">
        Базовая хлопковая футболка
      </h3>
      <p class="product__info product__info--color">
        Цвет:
        <span>
          <i style="background-color: #FF9B78"></i>
          Персиковый
        </span>
      </p>
      <span class="product__code">
        Артикул: 1501230
      </span>

      <div class="product__counter form__counter">
        <button type="button" aria-label="Убрать один товар">
          <svg width="10" height="10" fill="currentColor">
            <use xlink:href="#icon-minus"></use>
          </svg>
        </button>

        <label>
          <input type="text" value="1" name="count">
        </label>

        <button type="button" aria-label="Добавить один товар">
          <svg width="10" height="10" fill="currentColor">
            <use xlink:href="#icon-plus"></use>
          </svg>
        </button>
      </div>

      <b class="product__price">
        990 ₽
      </b>

      <button class="product__del button-del" type="button"
      aria-label="Удалить товар из корзины">
        <svg width="20" height="20" fill="currentColor">
          <use xlink:href="#icon-close"></use>
        </svg>
      </button>
    </li>
  </ul>
</template>
