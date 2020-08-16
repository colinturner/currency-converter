import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import {
  CAFlag,
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
  align-items: center;
`;

const InputField = styled.input``;

const BaseAmount = styled.div`
  font-size: 24px;
`;

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

const FLAGS: Record<string, any> = {
  CAD: CAFlag,
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
export function sanitizeInput(input: string): string {
  if (Number.isNaN(Number(input))) {
    return "0";
  }

  return input;
}

interface ICalculateForeignAmount {
  rate: number;
  base_amount: string;
}

export function calculateForeignAmount({
  rate,
  base_amount,
}: ICalculateForeignAmount): string {
  return numeral(rate * Number(base_amount)).format("0,0.00");
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
  const input_ref = useRef<HTMLInputElement | null>(null);

  const [data, setData] = useState<IData>({ rates: {}, date: "" });
  const [base_amount, setBaseAmount] = useState<string>("1");
  const [is_editing, setIsEditing] = useState(true);

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

  useEffect((): void => {
    input_ref && input_ref.current && input_ref.current.focus();
  }, [is_editing]);

  function handleClick(): void {
    setIsEditing(true);
  }

  return (
    <Wrapper>
      <CurrencyInput>
        {is_editing ? (
          <InputField
            ref={input_ref}
            value={base_amount}
            onChange={(e): void => setBaseAmount(sanitizeInput(e.target.value))}
            onBlur={(): void => setIsEditing(false)}
          />
        ) : (
          <BaseAmount onClick={handleClick}>
            {numeral(base_amount).format("0,0.00")}
          </BaseAmount>
        )}
        <BaseCurrency>CAD</BaseCurrency>
        <CAFlag style={{ paddingLeft: "8px", width: "32px" }} />
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
