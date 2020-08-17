import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import "antd/dist/antd.css";
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
import { Select } from "antd";
const { Option } = Select;

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
  padding-right: 8px;
  font-size: 32px;
  &: hover {
    cursor: pointer;
  }
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

// Constants
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

const DESIRED_DENOMINATIONS = [
  "AUD",
  "CAD",
  "CHF",
  "DKK",
  "EUR",
  "GBP",
  "NOK",
  "NZD",
  "SEK",
  "USD",
];

// Interfaces
interface ISanitizeInput {
  input: string;
  base_amount: string;
}

interface ICalculateForeignAmount {
  rate: number;
  base_amount: string;
}

interface IData {
  rates: Record<string, any>;
  date: string;
}

interface ICache {
  [base: string]: Record<string, any>;
}

// Helpers
export function sanitizeInput({ input, base_amount }: ISanitizeInput): string {
  if (Number.isNaN(Number(input))) {
    return base_amount;
  }

  if (input.includes(".") && input.length - input.indexOf(".") > 3) {
    return base_amount;
  }

  return input;
}

export function calculateForeignAmount({
  rate,
  base_amount,
}: ICalculateForeignAmount): string {
  return numeral(rate * Number(base_amount)).format("0,0.00");
}

// Default component
function App() {
  const input_ref = useRef<HTMLInputElement | null>(null);

  const [data, setData] = useState<IData>({ rates: {}, date: "" });
  const [cache, setCache] = useState<ICache>({});
  const [base, setBase] = useState<string>("CAD");
  const [is_loading_data, setIsLoadingData] = useState<boolean>(false);
  const [base_amount, setBaseAmount] = useState<string>("1");
  const [is_editing, setIsEditing] = useState(true);

  useEffect((): void => {
    const fetchData = async () => {
      const proxy_url = "https://cors-anywhere.herokuapp.com/";
      const api_url = `http://api.openrates.io/latest?base=${base}`;
      setIsLoadingData(true);
      const result = await axios(proxy_url + api_url);
      setIsLoadingData(false);
      setData(result.data);
      setCache({ ...cache, [base]: result.data });
      console.log("result!!! ", result.data);
    };

    fetchData();
  }, [base]);

  useEffect((): void => {
    input_ref && input_ref.current && input_ref.current.focus();
  }, [is_editing]);

  return (
    <Wrapper>
      <CurrencyInput>
        {is_editing ? (
          <InputField
            ref={input_ref}
            value={base_amount}
            onChange={(e): void =>
              setBaseAmount(
                sanitizeInput({ input: e.target.value, base_amount })
              )
            }
            onBlur={(): void => setIsEditing(false)}
          />
        ) : (
          <BaseAmount onClick={(): void => setIsEditing(true)}>
            {numeral(base_amount).format("0,0.00")}
          </BaseAmount>
        )}
        <Select
          defaultValue={base}
          style={{ width: 120 }}
          loading={is_loading_data}
          onChange={(value): void => setBase(value)}
        >
          {DESIRED_DENOMINATIONS.filter((currency) => currency !== base).map(
            (currency) => (
              <Option value={currency}>{currency}</Option>
            )
          )}
        </Select>
        {React.createElement(FLAGS[base], {
          style: { width: "48px", paddingLeft: "8px" },
        })}
      </CurrencyInput>
      <AccuracyDisclaimer>
        Exchange rates auto-updated on:{" "}
        {data.date ? moment(data.date).format("LL") : "Loading..."}
      </AccuracyDisclaimer>
      {Object.keys(data.rates)
        .sort()
        .map((foreign_denomination) => {
          if (
            DESIRED_DENOMINATIONS.includes(foreign_denomination) &&
            foreign_denomination !== base
          ) {
            return (
              <ResultWrapper>
                <ForeignAmount>
                  {calculateForeignAmount({
                    rate: data.rates[foreign_denomination],
                    base_amount,
                  })}
                </ForeignAmount>
                <ForeignDenomination>
                  {foreign_denomination}
                </ForeignDenomination>
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
