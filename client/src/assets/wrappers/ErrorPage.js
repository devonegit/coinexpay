import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }
  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }

  // --------------------------

  .page {
    padding: 50px;
  }

  .invoiceContainer {
    padding: 20px;
    border: 1px solid gray;
  }

  .invoiceHeader {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo img {
    margin: 0;
  }

  .logoLeft,
  .logoRight {
    width: 200px;
    height: auto;
  }
  
  .companyDetails {
    margin:0 100px
  }

  .companyName h2 {
    font-size: 24px;
    font-weight:bold;
  }

  .companyAddress p {
    width: 10px;
  }

  // -----------------------------
`;

export default Wrapper;
