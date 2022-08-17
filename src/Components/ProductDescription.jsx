import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Evaluation from './Evaluation';

export default class ProductDescription extends Component {
  state = {
    productDetails: {},
    quantityProducts: 4,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productDetailsFromApi = await getProductById(id);
    this.setState({
      productDetails: productDetailsFromApi,
    });
    this.acctualQuantityOfProducts(productDetailsFromApi);
  }

  handleButton = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  }

  clickAddCart = () => {
    const { productDetails: productToCart } = this.state;
    // localStorage.setItem('cartItens', JSON.stringify(produto));
    if (!JSON.parse(localStorage.getItem('cartItens'))) {
      localStorage.setItem('cartItens', JSON.stringify([]));
    }
    const tempCartItens = JSON.parse(localStorage.getItem('cartItens'));

    if (tempCartItens.some((product) => product.id === productToCart.id)) {
      const arrayToSave = tempCartItens.map((product) => {
        if (product.id === productToCart.id) {
          product.quantity += 1;
        }
        return product;
      });
      localStorage.setItem('cartItens', JSON.stringify(arrayToSave));
      this.acctualQuantityOfProducts(productToCart);
    } else {
      productToCart.quantity = 1;
      const newCartItens = [...tempCartItens, productToCart];
      localStorage.setItem('cartItens', JSON.stringify(newCartItens));
      this.acctualQuantityOfProducts(productToCart);
    }
  }

  acctualQuantityOfProducts = (productDetails) => {
    const acctualCartItens = JSON.parse(localStorage.getItem('cartItens'));
    console.log(productDetails);
    let contQuantityProduct = 0;
    if (acctualCartItens === null) return contQuantityProducts;
    acctualCartItens.forEach((product) => {
      if (product.id === productDetails.id) {
        contQuantityProduct = product.quantity;
      }
    });
    this.setState({ quantityProducts: contQuantityProduct });
  }

  render() {
    const { quantityProducts, productDetails: { title, thumbnail, price } } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        PAGINA DO PRODUTO
        <p data-testid="product-detail-name">{ title }</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt="" />
        <p data-testid="product-detail-price">{ price }</p>

        <button
          type="submit"
          // data-testid="product-add-to-c art"
          onClick={ this.clickAddCart }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.handleButton }
        >
          Carrinho de compras
        </button>
        <p data-testid="shopping-cart-size">
          { quantityProducts }
        </p>
        <Evaluation id={ id } />
      </div>
    );
  }
}

ProductDescription.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
