import SliderPrice from '../Slider/index.jsx';
import * as S from './style.js';
import { useState } from 'react';

function Container() {
  const [inputValue, setInputValue] = useState('R$1.000,00');
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  function handleOnChange(event) {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  }

  function getAvailableOffers(value) {
    const numericValue = parseFloat(value.replace(/\D/g, '')) / 100;

    const availableOffers = [
      {
        nome: 'EnerFácil',
        valorMinimoMensal: 1000,
        valorMaximoMensal: 40000,
        desconto: 0.2,
      },
      {
        nome: 'EnerLimpa',
        valorMinimoMensal: 10000,
        valorMaximoMensal: 80000,
        desconto: 0.25,
      },
      {
        nome: 'EnerGrande',
        valorMinimoMensal: 40000,
        valorMaximoMensal: 100000,
        desconto: 0.3,
      },
    ];

    const filteredOffers = availableOffers.filter(
      offer =>
        numericValue >= offer.valorMinimoMensal &&
        numericValue <= offer.valorMaximoMensal
    );

    return filteredOffers;
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    const availableOffers = getAvailableOffers(inputValue);
    setOffers(availableOffers);
  }

  function handleCalculateEconomy() {
    if (selectedOffer) {
      const numericValue = parseFloat(inputValue.replace(/\D/g, '')) / 100;
      const economy = numericValue * selectedOffer.desconto;
      console.log('Economia:', economy);
    }
  }


  return (
    <S.MainContainer onSubmit={handleOnSubmit}>
      <S.Title>Calcule a economia da sua empresa</S.Title>
      <S.Description>O valor médio mensal da minha conta de energia é:</S.Description>
      <S.Input value={inputValue} onChange={handleOnChange} />
      <S.InputDescription>Digite o valor. Mínimo de R$1.000,00</S.InputDescription>
      <SliderPrice></SliderPrice>
      <S.CalculateButton type="submit">Calcular Ofertas!</S.CalculateButton>
      {offers.length > 0 && (
        <div>
          <h2>Ofertas Disponíveis:</h2>
          <ul>
            {offers.map((offer, index) => (
              <li key={index}>
                {offer.nome} - Desconto: {offer.desconto * 100}%
                <button onClick={() => setSelectedOffer(offer)}>
                  Selecionar Oferta
                </button>
              </li>
            ))}
          </ul>
          {selectedOffer && (
            <div>
              <h3>Oferta Selecionada:</h3>
              <p>{selectedOffer.nome}</p>
              <button onClick={handleCalculateEconomy}>
                Calcular Economia
              </button>
            </div>
          )}
        </div>
      )}
    </S.MainContainer>
  );
}

export default Container;
