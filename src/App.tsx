import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import {
  USFlag,
  UKFlag,
  AUFlag,
  CHFlag,
  DKFlag,
  EUFlag,
  NOFlag,
  NZFlag,
  SEFlag,
} from "./assets/flags";

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

// const USAFlag = styled(Flag)`
//   width: 20px;
//   height: 20px;
// `;

const FLAGS: Record<string, any> = {
  USD: USFlag,
  GBP: UKFlag,
  AUD: AUFlag,
  CHF: CHFlag,
  DKK: DKFlag,
  EUR: EUFlag,
  NOK: NOFlag,
  NZD: NZFlag,
  SEK: SEFlag,
};

// Helpers
export function sanitizeInput(input: string): number {
  if (Number.isNaN(Number(input))) {
    return 0;
  }

  return Number(input);
}

interface ICalculateForeignAmount {
  rate: number;
  base_amount: number;
}

export function calculateForeignAmount({
  rate,
  base_amount,
}: ICalculateForeignAmount): string {
  return numeral(rate * base_amount).format("0,0.00");
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
  const [base_amount, setBaseAmount] = useState(1);

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
                {calculateForeignAmount({
                  rate: data.rates[foreign_denomination],
                  base_amount,
                })}
              </ForeignAmount>
              <ForeignDenomination>{foreign_denomination}</ForeignDenomination>
              {/* <USAFlag width="20px" /> */}
              {FLAGS[foreign_denomination]
                ? React.createElement(FLAGS[foreign_denomination], {
                    style: { width: "32px", "padding-left": "8px" },
                  })
                : null}
            </ResultWrapper>
          );
        }

        return null;
      })}
    </Wrapper>
  );
}

export default App;
