import React, { Component } from 'react';
import { getProductsFromQuery } from '../services/api';

export default class Home extends Component {
  state = {
    valorPesquisado: '',
    resultadoPesquisa: [],
  }

  clickSearch = async () => { // state resultado da pesquisa não está sendo atualizado na primeira vez
    const { valorPesquisado } = this.state;
    console.log(await getProductsFromQuery(valorPesquisado));
    this.setState({
      resultadoPesquisa: (await getProductsFromQuery(valorPesquisado)).results,
    });
  }

  onInputChange = ({ target }) => {
    this.setState({ valorPesquisado: target.value });
  }

  renderResults = () => {
    const { resultadoPesquisa } = this.state;
    return resultadoPesquisa.map((produto) => (
      <div data-testid="product" key={ produto.id }>
        <p>{ produto.title }</p>
        <img src={ produto.thumbnail } alt="" />
        <p>{produto.price}</p>
      </div>
    ));
  }

  render() {
    const { resultadoPesquisa } = this.state;
    return (
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
        { resultadoPesquisa.length > 0
          ? this.renderResults() : 'Nenhum produto foi encontrado'}

      </div>
    );
  }
}
