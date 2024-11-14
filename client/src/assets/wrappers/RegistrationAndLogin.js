import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh; /* Adjust height as needed */

  .form {
    max-width: 455px;
    background:black;
    border-radius:20px;
    // box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    box-shadow: rgb(38, 57, 77) 0px 10px 35px -5px;
  }
.logo img {
    width: 250px;
    margin: 0 40px;
}

  .form-image {
    flex: 1;
  }
  .form-form {
    flex: 1;
  }
  .image {
    width: 100%;
    height: auto;
    animation: bounce 1s infinite alternate;
  }

  .form h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
    color: rgb(141, 86, 243);
    
  }
  .form h3 {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 35px;
    color: #364a63;
    
  }
   .form label {
    margin-top: 1rem;
    color: #364a63;
    font-weight: 500;
    font-family: 'poppins', sans-serif;
    font-size: 14px;
}

.form-control {
    background: #f2f1f5;
    border: none;
    height: 50px;
    color: #3c4d62;
    padding-left: 15px;
  }
  p {
    color:white;
  }
// .form-control:focus{background: #5d19db; color: #fff; border:none;}
.form-control::-webkit-input-placeholder {color: #9ea1a3;}

.checkbox-container {
    display:flex;
    justify-content:space-between;
    align-items:center;
}

  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50px);
    }
  }

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

`;
export default Wrapper;
