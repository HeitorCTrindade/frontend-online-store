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

  clickAddCart = (productToCart) => {
    // localStorage.setItem('cartItens', JSON.stringify(productToCart));
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
    } else {
      productToCart.quantity = 1;
      const newCartItens = [...tempCartItens, productToCart];
      localStorage.setItem('cartItens', JSON.stringify(newCartItens));
    }
  }

  handleButtonDescription = (id) => {
    const { history } = this.props;
    history.push(`/shopping-cart/${id}`);
  }

  renderResults = (param) => (param.map((productToCart) => (
    <div key={ productToCart.id }>
      <div
        key={ productToCart.id }
        data-testid="product-detail-link"
        onClick={ () => { this.handleButtonDescription(productToCart.id); } }
        onKeyPress={ () => {} }
        role="button"
        tabIndex="0"
      >
        <div data-testid="product">
          <p>{ productToCart.title }</p>
          <img src={ productToCart.thumbnail } alt="" />
          <p>{productToCart.price}</p>
        </div>
      </div>
      <button
        type="submit"
        data-testid="product-add-to-cart"
        onClick={ () => this.clickAddCart(productToCart) }
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
