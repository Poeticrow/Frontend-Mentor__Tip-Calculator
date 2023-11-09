import { useState } from "react";
import "./style.css";

export default function App() {
  return (
    <div>
      <p className="logo">Splitter</p>
      <TipCalculator />
      <div className="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Ebube Nwanze</a>.
      </div>
    </div>
  );
}

function TipCalculator() {
  const [tip, setTip] = useState(0);
  const [bill, setBill] = useState(0);
  const [person, setPerson] = useState(0);
  const tipPerPerson = Math.round(((bill * (tip / 100)) / person) * 100) / 100;
  const totalPerPerson = Math.round((bill / person + tipPerPerson) * 100) / 100;

  function handleReset() {
    setTip(0);
    setPerson(0);
    setPerson(0);
  }
  // console.log(tip, bill, person, tipPerPerson, totalPerPerson);
  return (
    <div className="app">
      <InputContainer
        tip={tip}
        setTip={setTip}
        bill={bill}
        setBill={setBill}
        person={person}
        setPerson={setPerson}
      />
      <Summary
        tipPerPerson={tipPerPerson}
        totalPerPerson={totalPerPerson}
        onReset={handleReset}
      />
    </div>
  );
}

function InputContainer({ tip, setTip, bill, setBill, person, setPerson }) {
  return (
    <section className="input">
      <InputField type="bill" value={bill} onChangeField={setBill}>
        Bill
      </InputField>
      <SelectTip tip={tip} setTip={setTip} />
      <InputField
        type={`person ${person === 0 && bill > 0 ? "hide-out" : ""}`}
        value={person}
        onChangeField={setPerson}
      >
        Number of People
        {person === 0 && bill > 0 ? (
          <p className="label-error">can't be zero</p>
        ) : null}
      </InputField>
    </section>
  );
}

function Summary({ tipPerPerson, totalPerPerson, onReset }) {
  return (
    <section className="display">
      <div className="summary">
        <PerPerson type="amount" value={tipPerPerson}>
          {" "}
          Tip Amount
        </PerPerson>
        <PerPerson type="total" value={totalPerPerson}>
          {" "}
          Total
        </PerPerson>
      </div>
      <Reset onReset={onReset} />
    </section>
  );
}

function InputField({ type, value, onChangeField, children }) {
  return (
    <div>
      <h3 className="label">{children}</h3>
      <input
        type="text"
        className={type}
        placeholder="0"
        value={value}
        onChange={(e) => onChangeField(+e.target.value)}
      />
    </div>
  );
}

function SelectTip({ tip, setTip }) {
  return (
    <>
      <h3 className="label">Select Tip %</h3>
      <div className="tip-select">
        <Tip percentage="5" tip={tip} onClickTip={setTip} />
        <Tip percentage="10" tip={tip} onClickTip={setTip} />
        <Tip percentage="15" tip={tip} onClickTip={setTip} />
        <Tip percentage="25" tip={tip} onClickTip={setTip} />
        <Tip percentage="50" tip={tip} onClickTip={setTip} />
        <input
          type="text"
          className="custom"
          placeholder="Custom"
          value={
            tip === 0 ||
            tip === 5 ||
            tip === 10 ||
            tip === 15 ||
            tip === 25 ||
            tip === 50
              ? ""
              : tip
          }
          onChange={(e) => {
            setTip(+e.target.value);
          }}
        />
      </div>
    </>
  );
}

function Tip({ percentage, onClickTip }) {
  return (
    <button
      className="tips"
      value={percentage}
      onClick={(e) => {
        onClickTip(+e.target.value);
      }}
    >
      {" "}
      {percentage}%
    </button>
  );
}

function PerPerson({ type, children, value }) {
  return (
    <div className="summary-data">
      <div className="sum-text">
        <h3>{children}</h3>
        <p>/ person</p>
      </div>
      <div className={`sum-num ${type}`}>${!value ? 0 : value}</div>
    </div>
  );
}

function Reset({ onReset }) {
  return (
    <button className="reset" onClick={onReset}>
      RESET
    </button>
  );
}
