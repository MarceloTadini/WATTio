import * as S from './style.js';
import { useState } from 'react';
import { OfferContext, useOfferContext } from '../Context/index.jsx';

function Container() {
  const [inputValue, setInputValue] = useState('R$1.000,00');
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [economy, setEconomy] = useState(null);

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

  function handleOfferChange(event) {
    const selectedOfferName = event.target.value;
    const selectedOffer = offers.find(offer => offer.nome === selectedOfferName);
    setSelectedOffer(selectedOffer);
    setEconomy(null);
  }

  function handleCalculateEconomy() {
    if (selectedOffer) {
      const numericValue = parseFloat(inputValue.replace(/\D/g, '')) / 100;
      const calculatedEconomy = numericValue * selectedOffer.desconto;
      setEconomy(calculatedEconomy);
    }
  }

  function OfferSection() {
    const { offers, selectedOffer, economy, handleOfferChange, handleCalculateEconomy } = useOfferContext();
  
    return (
      <div>
        <h2>Ofertas Disponíveis:</h2>
        <ul>
          {offers.map((offer, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  value={offer.nome}
                  checked={selectedOffer && selectedOffer.nome === offer.nome}
                  onChange={handleOfferChange}
                />
                {offer.nome} - Desconto: {offer.desconto * 100}%
              </label>
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
            {economy !== null && (
              <p>Economia: R${economy.toFixed(2)},00</p>
            )}
          </div>
        )}
      </div>
    );
  }
  

  return (
    <OfferContext.Provider
    value={{
      offers,
      selectedOffer,
      economy,
      handleOfferChange,
      handleCalculateEconomy
    }}
    >
      <S.MainContainer onSubmit={handleOnSubmit}>
      <S.Title>Calcule a economia da sua empresa</S.Title>
      <S.Description>
        O valor médio mensal da minha conta de energia é:
      </S.Description>
      <S.Input value={inputValue} onChange={handleOnChange} />
      <S.InputDescription>Digite o valor. Mínimo de R$1.000,00</S.InputDescription>
      <S.CalculateButton type="submit">Calcular Ofertas!</S.CalculateButton>
      {offers.length > 0 && <OfferSection />}
    </S.MainContainer>
    </OfferContext.Provider>
  );
}

export default Container;
