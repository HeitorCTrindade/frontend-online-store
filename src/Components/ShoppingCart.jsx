import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    arrayProducts: [],
  };

  componentDidMount = () => {
    const tempCartItens = JSON.parse(localStorage.getItem('cartItens'));
    this.setState({ arrayProducts: tempCartItens });
  }

  generateCartItens = () => {
    const { arrayProducts } = this.state;
    const filteredProducts = [];

    for (let i = 0; i < arrayProducts.length; i += 1) {
      if (!filteredProducts.some((product) => JSON.stringify(product)
      === JSON.stringify(arrayProducts[i]))) {
        filteredProducts.push(arrayProducts[i]);
      }
    }

    return (
      filteredProducts.map((product) => (
        <div data-testid="product" key={ product.id }>
          <p data-testid="shopping-cart-product-name">{ product.title }</p>
          <img src={ product.thumbnail } alt="" />
          <p>{product.price}</p>
          <p data-testid="shopping-cart-product-quantity">
            { this.checkQuantityProductsTypeInCart(product) }
          </p>
        </div>
      ))
    );
  }

  checkQuantityProductsTypeInCart = (productToCheck) => {
    const { arrayProducts } = this.state;
    return arrayProducts.filter((product) => JSON.stringify(product)
    === JSON.stringify(productToCheck)).length;
  }

  render() {
    return (
      <div>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        { this.generateCartItens() }
      </div>
    );
  }
}

// clickAddCart = (product) => {
//   // localStorage.setItem('cartItens', JSON.stringify(product));
//   if (!JSON.parse(localStorage.getItem('cartItens'))) {
//     localStorage.setItem('cartItens', JSON.stringify([]));
//   }
//   const tempCartItens = JSON.parse(localStorage.getItem('cartItens'));
//   const newCartItens = [...tempCartItens, product];
//   localStorage.setItem('cartItens', JSON.stringify(newCartItens));
// }
