import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Evaluation from './Evaluation';

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

  render() {
    const { productDetails: { title, thumbnail, price } } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        PAGINA DO PRODUTO
        <p data-testid="product-detail-name">{ title }</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt="" />
        <p data-testid="product-detail-price">{ price }</p>

        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.handleButton }
        >
          Carrinho de compras
        </button>
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
