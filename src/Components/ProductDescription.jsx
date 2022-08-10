import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class ProductDescription extends Component {
  state = {
    productDetails: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productDetailsFromApi = await getProductById(id);
    this.setState({
      productDetails: productDetailsFromApi,
    });
  }

  handleButton = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  }

  clickAddCart = () => {
    const { productDetails } = this.state;
    console.log('teste');
    // localStorage.setItem('cartItens', JSON.stringify(produto));
    if (!JSON.parse(localStorage.getItem('cartItens'))) {
      localStorage.setItem('cartItens', JSON.stringify([]));
    }
    const tempCartItens = JSON.parse(localStorage.getItem('cartItens'));
    const newCartItens = [...tempCartItens, productDetails];
    localStorage.setItem('cartItens', JSON.stringify(newCartItens));
  }

  render() {
    const { productDetails: { title, thumbnail, price } } = this.state;

    return (
      <div>
        PAGINA DO PRODUTO
        <p data-testid="product-detail-name">{ title }</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt="" />
        <p data-testid="product-detail-price">{ price }</p>

        <button
          type="submit"
          // data-testid="product-add-to-cart"
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
