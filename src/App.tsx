import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

// Styled Components

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  font-size: 18px;
  font-family: Arial;
`;

const CurrencyInput = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 8px;
`;

const InputField = styled.input``;

const BaseCurrency = styled.span`
  padding-left: 8px;
`;

const AccuracyDisclaimer = styled.div`
  padding-bottom: 16px;
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    padding-bottom: 8px;
  }
`;

const ForeignAmount = styled.div`
  padding-right: 8px;
`;

const ForeignDenomination = styled.div``;

// Helpers
function sanitizeInput(input: string): number {
  if (Number.isNaN(Number(input))) {
    return 0;
  }

  return Number(input);
}

interface IData {
  rates: Record<string, any>;
  date: string;
}

const DESIRED_DENOMINATIONS = [
  "USD",
  "AUD",
  "NZD",
  "EUR",
  "GBP",
  "NOK",
  "SEK",
  "DKK",
  "CHF",
];

function App() {
  const [data, setData] = useState<IData>({ rates: {}, date: "" });
  const [base_amount, setBaseAmount] = useState(0);

  useEffect((): void => {
    const fetchData = async () => {
      const proxy_url = "https://cors-anywhere.herokuapp.com/";
      const api_url = "http://api.openrates.io/latest?base=CAD";
      const result = await axios(proxy_url + api_url);
      setData(result.data);
      console.log("result!!! ", result.data);
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <CurrencyInput>
        <InputField
          value={base_amount}
          onChange={(e): void => setBaseAmount(sanitizeInput(e.target.value))}
        />
        <BaseCurrency>CAD</BaseCurrency>
      </CurrencyInput>
      <AccuracyDisclaimer>
        Information accurate as of: {moment(data.date).format("LL")}
      </AccuracyDisclaimer>
      {Object.keys(data.rates).map((foreign_denomination) => {
        if (DESIRED_DENOMINATIONS.includes(foreign_denomination)) {
          return (
            <ResultWrapper>
              <ForeignAmount>
                {(data.rates[foreign_denomination] * base_amount).toFixed(2)}
              </ForeignAmount>
              <ForeignDenomination>{foreign_denomination}</ForeignDenomination>
            </ResultWrapper>
          );
        }

        return null;
      })}
    </Wrapper>
  );
}

export default App;
