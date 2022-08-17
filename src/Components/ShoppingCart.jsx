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
      if (!filteredProducts.some((product) => product.id
      === arrayProducts[i].id)) {
        filteredProducts.push(arrayProducts[i]);
      }
    }

    return (
      filteredProducts.map((product) => (
        <div data-testid="product" key={ product.id }>
          <p data-testid="shopping-cart-product-name">{ product.title }</p>
          <img src={ product.thumbnail } alt="" />
          <p>{product.price}</p>
          <button
            type="button"
            name="decrease-button"
            data-testid="product-decrease-quantity"
            onClick={ (event) => this.handleQuantityProductsChanges(event, product) }
          >
            -
          </button>
          <p id="quantity" data-testid="shopping-cart-product-quantity">
            { this.checkQuantityProductsTypeInCart(product) }
          </p>
          <button
            type="button"
            name="increase-button"
            data-testid="product-increase-quantity"
            onClick={ (event) => this.handleQuantityProductsChanges(event, product) }
          >
            +
          </button>
          <button
            type="button"
            name="remove-button"
            data-testid="remove-product"
            onClick={ (event) => this.handleQuantityProductsChanges(event, product) }
          >
            remover produto
          </button>
        </div>
      ))
    );
  }

  handleLocalStorageUpdates = (cartArrayToSave) => {
    localStorage.setItem('cartItens', JSON.stringify(cartArrayToSave));
  }

  handleQuantityProductsChanges = (event, productToCheck) => {
    const { arrayProducts } = this.state;
    if (event.target.name === 'remove-button') {
      const tempArrayProducts = arrayProducts
        .filter((product) => product.id !== productToCheck.id);
      this.setState({ arrayProducts: tempArrayProducts });
      this.handleLocalStorageUpdates(tempArrayProducts);
    }
    if (event.target.name === 'increase-button') {
      const tempArrayProducts = arrayProducts.map((product) => {
        if (product.id === productToCheck.id) {
          product.quantity += 1;
        }
        return product;
      });
      this.setState({ arrayProducts: tempArrayProducts });
      this.handleLocalStorageUpdates(tempArrayProducts);
    }
    if (event.target.name === 'decrease-button') {
      const tempArrayProducts = arrayProducts.map((product) => {
        if (product.id === productToCheck.id && product.quantity !== 1) {
          product.quantity -= 1;
        }
        return product;
      });
      this.setState({ arrayProducts: tempArrayProducts });
      this.handleLocalStorageUpdates(tempArrayProducts);
    }
  }

  checkQuantityProductsTypeInCart = (productToCheck) => {
    const { arrayProducts } = this.state;
    return arrayProducts.filter((product) => product.id
    === productToCheck.id)[0].quantity;
  }

  render() {
    const { arrayProducts } = this.state;
    return (
      <div>
        { arrayProducts === null
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : this.generateCartItens() }
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
