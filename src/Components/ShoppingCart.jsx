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
    console.log(arrayProducts);

    const test = arrayProducts.map((produto) => (arrayProducts.filter((produtoFilter) => produto.id === produtoFilter.id)));

    console.log(test);

    return (
      arrayProducts.map((produto) => (
        <div data-testid="product" key={ produto.id }>
          <p>{ produto.title }</p>
          <img src={ produto.thumbnail } alt="" />
          <p>{produto.price}</p>
        </div>
      ))
    );
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

// clickAddCart = (produto) => {
//   // localStorage.setItem('cartItens', JSON.stringify(produto));
//   if (!JSON.parse(localStorage.getItem('cartItens'))) {
//     localStorage.setItem('cartItens', JSON.stringify([]));
//   }
//   const tempCartItens = JSON.parse(localStorage.getItem('cartItens'));
//   const newCartItens = [...tempCartItens, produto];
//   localStorage.setItem('cartItens', JSON.stringify(newCartItens));
// }
