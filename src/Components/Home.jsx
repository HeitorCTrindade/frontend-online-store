import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromQuery, getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    searchResult: [],
    inputSearch: '',
    categories: [],
  }

  clickSearch = async () => { // state resultado da pesquisa não está sendo atualizado na primeira vez
    const { inputSearch } = this.state;
    console.log(await getProductsFromQuery(inputSearch));
    this.setState({
      searchResult: (await getProductsFromQuery(inputSearch)).results,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount = async () => {
    const result = await getCategories();
    this.setState({ categories: result });
  }

  createRadiosElements = () => {
    const { categories } = this.state;
    return (categories.map((category) => (
      <label key={ category.id } htmlFor={ category.id } data-testid="category">
        <input key={ category.id } type="radio" id={ category.id } />
        { category.name }
      </label>
    )));
  }

  handleButton = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  }

  onInputChange = ({ target }) => {
    this.setState({ inputSearch: target.value });
  }

  renderResults = () => {
    const { searchResult } = this.state;
    return searchResult.map((produto) => (
      <div data-testid="product" key={ produto.id }>
        <p>{ produto.title }</p>
        <img src={ produto.thumbnail } alt="" />
        <p>{produto.price}</p>
      </div>
    ));
  }

  render() {
    const { searchResult, categories } = this.state;
    return (
      <main>
        <div>
          <input type="text" data-testid="query-input" onChange={ this.onInputChange } />
          <button
            data-testid="query-button"
            type="submit"
            onClick={ this.clickSearch }
          >
            Pesquisar
          </button>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          { searchResult.length > 0
            ? this.renderResults() : 'Nenhum produto foi encontrado'}
        </div>
        <div>
          <p>Categorias</p>
          { categories.length === 0 ? <> </> : this.createRadiosElements() }
        </div>
        <div>
          <button
            type="button"
            data-testid="shopping-cart-button"
            onClick={ this.handleButton }
          >
            Carrinho de compras
          </button>

        </div>
      </main>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
