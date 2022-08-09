import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromQuery,
  getCategories, getProductsFromCategory } from '../services/api';

export default class Home extends Component {
  state = {
    searchResult: [],
    inputSearch: '',
    categories: [],
    categoryId: '',
    categoryArray: [],
  }

  filterCategory = ({ target }) => {
    this.setState({ categoryId: target.id }, async () => {
      const { categoryId } = this.state;
      this.setState({
        categoryArray: (await getProductsFromCategory(categoryId)).results });
    });
  }

  clickSearch = async () => {
    const { inputSearch } = this.state;
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
        <input
          key={ category.id }
          type="radio"
          id={ category.id }
          name="categorySelect"
          onClick={ this.filterCategory }
        />
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

  clickAddCart = (produto) => {
    // localStorage.setItem('cartItens', JSON.stringify(produto));
    if (!JSON.parse(localStorage.getItem('cartItens'))) {
      localStorage.setItem('cartItens', JSON.stringify([]));
    }
    const tempCartItens = JSON.parse(localStorage.getItem('cartItens'));
    const newCartItens = [...tempCartItens, produto];
    localStorage.setItem('cartItens', JSON.stringify(newCartItens));
  }

  handleButtonDescription = (id) => {
    const { history } = this.props;
    history.push(`/shopping-cart/${id}`);
  }

  renderResults = (param) => (param.map((produto) => (
    <div key={ produto.id }>
      <div
        key={ produto.id }
        data-testid="product-detail-link"
        onClick={ () => { this.handleButtonDescription(produto.id); } }
        onKeyPress={ () => {} }
        role="button"
        tabIndex="0"
      >
        <div data-testid="product">
          <p>{ produto.title }</p>
          <img src={ produto.thumbnail } alt="" />
          <p>{produto.price}</p>
        </div>
      </div>
      <button
        type="submit"
        data-testid="product-add-to-cart"
        onClick={ () => this.clickAddCart(produto) }
      >
        Adicionar ao carrinho
      </button>
    </div>
  )))

  render() {
    const { searchResult, categories, categoryArray } = this.state;
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
            ? this.renderResults(searchResult) : 'Nenhum produto foi encontrado'}
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
          <div>{ categoryArray && this.renderResults(categoryArray)}</div>
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
