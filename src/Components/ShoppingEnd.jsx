import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShoppingEnd extends Component {
  state = {
    arrayProducts: [],
    name: '',
    email: '',
    cpf: '',
    tel: '',
    cep: '',
    address: '',
    payment: '',
    errorMessage: false,
  }

  componentDidMount = () => {
    const tempCartItens = JSON.parse(localStorage.getItem('cartItens'));
    this.setState({ arrayProducts: tempCartItens });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    const keyState = target.type === 'radio' ? 'payment' : name;

    this.setState({
      [keyState]: value,
    });
  }

  generateCartItens = () => {
    const { arrayProducts } = this.state;
    return (
      arrayProducts.map((product) => (
        <div data-testid="product" key={ product.id }>
          { product.title }
        </div>
      ))
    );
  }

  submitButton = (event) => {
    event.preventDefault();
    const {
      name,
      email,
      cpf,
      tel,
      cep,
      address,
      payment,
    } = this.state;
    const { history } = this.props;

    const isfilledAllInputs = name.length > 0
     && email.length > 0
     && cpf.length > 0
     && tel.length > 0
     && cep.length > 0
     && address.length > 0
     && payment.length > 0;
    if (!isfilledAllInputs) {
      return this.setState({
        errorMessage: true,
      });
    }
    localStorage.setItem('cartItens', null);
    history.push('/');
  }

  render() {
    const {
      name,
      email,
      cpf,
      tel,
      cep,
      address,
      payment,
      errorMessage,
    } = this.state;
    return (
      <main>
        <section>
          { this.generateCartItens() }
        </section>
        <section>
          <form>
            <p>Nome Completo:</p>
            <input
              type="text"
              name="name"
              id=""
              data-testid="checkout-fullname"
              value={ name }
              onChange={ this.handleChange }
            />
            <p>Email:</p>
            <input
              type="email"
              name="email"
              id=""
              data-testid="checkout-email"
              value={ email }
              onChange={ this.handleChange }
            />
            <p>CPF:</p>
            <input
              type="text"
              name="cpf"
              id=""
              data-testid="checkout-cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
            <p>Telefone:</p>
            <input
              type="text"
              name="tel"
              id=""
              data-testid="checkout-phone"
              value={ tel }
              onChange={ this.handleChange }
            />
            <p>Cep:</p>
            <input
              type="text"
              name="cep"
              id=""
              data-testid="checkout-cep"
              value={ cep }
              onChange={ this.handleChange }
            />
            <p>Endereço:</p>
            <input
              type="text"
              name="address"
              id=""
              data-testid="checkout-address"
              value={ address }
              onChange={ this.handleChange }
            />
            <label htmlFor="boleto">
              boleto
              <input
                name="radio"
                id="boleto"
                type="radio"
                data-testid="ticket-payment"
                value={ payment }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="visa">
              visa
              <input
                name="radio"
                id="visa"
                type="radio"
                data-testid="visa-payment"
                value={ payment }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="master">
              master
              <input
                name="radio"
                id="master"
                type="radio"
                data-testid="master-payment"
                value={ payment }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="elo">
              elo
              <input
                name="radio"
                id="elo"
                type="radio"
                data-testid="elo-payment"
                value={ payment }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="checkout-btn"
              onClick={ this.submitButton }
            >
              Comprar
            </button>
            { errorMessage && <span data-testid="error-msg">Campos inválidos</span> }
          </form>
        </section>
      </main>
    );
  }
}

ShoppingEnd.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
