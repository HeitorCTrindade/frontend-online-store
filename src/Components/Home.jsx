import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    inputSearch: '',
    categories: [],
  };

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

  render() {
    const { inputSearch, categories } = this.state;
    return (
      <main>
        <div>
          <p>Categorias</p>
          { categories.length === 0 ? <> </> : this.createRadiosElements() }
        </div>
        <div>
          <input
            name={ inputSearch }
            type="text"
            value={ inputSearch }
            onChange={ this.handleChange }
          />
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>

        </div>
      </main>
    );
  }
}
