import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {
  handleButton = () => {
    const { history } = this.props;
    history.push('/shopping-cart'); // verificar como validar a props history
  }

  render() {
    return (
      <div>
        <input type="text" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
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

Home.propTypes = {
  history: PropTypes.string.isRequired,
};
