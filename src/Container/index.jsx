import SliderPrice from '../Slider/index.jsx';
import * as S from './style.js';
import { useState } from 'react';

function Container() {
  const [inputValue, setInputValue] = useState('R$1.000,00');

  function handleOnSubmit(event) {
    event.preventDefault();
    const numericValue = (inputValue.replace(/\D/g, ''))/100; // Remove todos os caracteres que não sejam dígitos
    console.log(numericValue);
  }

  function handleOnChange(event) {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  }

  return (
      <S.MainContainer onSubmit={handleOnSubmit}>
        <S.Title>Calcule a economia da sua empresa</S.Title>
        <S.Description>O valor médio mensal da minha conta de energia é:</S.Description>
        <S.Input value={inputValue} onChange={handleOnChange} />
        <S.InputDescription>Digite o valor ou mover a barra abaixo. Mínimo de R$1.000,00</S.InputDescription>
        <SliderPrice></SliderPrice>
        <S.CalculateButton type="submit">Calcular Ofertas!</S.CalculateButton>
      </S.MainContainer>
  );
}

export default Container;
