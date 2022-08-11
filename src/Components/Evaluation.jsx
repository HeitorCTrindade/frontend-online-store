import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Evaluation extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      radio: '',
      textarea: '',
      evaluations: [],
      errorMessage: false,
    };
  }

  componentDidMount = () => {
    const { id } = this.props;
    const getItens = JSON.parse(localStorage.getItem(id));
    this.setState({
      evaluations: getItens || [],
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;

    this.setState({
      [name]: value,
    });
  }

  validateEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  submitButton = () => {
    const { id } = this.props;
    const { email, radio, textarea } = this.state;
    const isEmailValid = this.validateEmail(email);
    if (!isEmailValid || !radio) {
      return this.setState({
        errorMessage: true,
      });
    }
    this.setState((prevState) => ({
      evaluations: [...prevState.evaluations, { email, radio, textarea }],
      errorMessage: false,
    }));
    if (!JSON.parse(localStorage.getItem(id))) {
      localStorage.setItem(id, JSON.stringify([]));
    }
    const tempCartItens = JSON.parse(localStorage.getItem(id));
    const newCartItens = [...tempCartItens, { email, radio, textarea }];
    localStorage.setItem(id, JSON.stringify(newCartItens));
    this.setState({
      email: '',
      radio: '',
      textarea: '',
    });
  }

  render() {
    const { email, radio, textarea, evaluations, errorMessage } = this.state;
    const array5 = ['1', '2', '3', '4', '5'];
    return (
      <section>
        <h3>Avaliações</h3>
        <form>
          <input
            name="email"
            type="email"
            placeholder="Email"
            data-testid="product-detail-email"
            value={ email }
            onChange={ this.handleChange }
          />

          { array5.map((index) => (
            <label key={ index } htmlFor="first">
              <input
                name="radio"
                id={ index }
                type="radio"
                data-testid={ `${index}-rating` }
                value={ radio }
                onChange={ this.handleChange }
              />
            </label>
          ))}

          <br />
          <textarea
            name="textarea"
            value={ textarea }
            onChange={ this.handleChange }
            cols="30"
            rows="10"
            placeholder="Mensagem (opcional)"
            data-testid="product-detail-evaluation"
          />
          <br />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.submitButton }
          >
            Avaliar
          </button>
          { errorMessage && <span data-testid="error-msg">Campos inválidos</span> }
        </form>
        <section>
          { evaluations.length > 0 && evaluations.map((comment, index) => (
            <div key={ index }>
              <span data-testid="review-card-email">
                { comment.email }
              </span>
              <br />
              <span data-testid="review-card-rating">
                { comment.radio }
              </span>
              <br />
              <span data-testid="review-card-evaluation">
                { comment.textarea }
              </span>
            </div>
          ))}
        </section>
      </section>
    );
  }
}

Evaluation.propTypes = {
  id: PropTypes.string.isRequired,
};
