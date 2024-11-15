import styled from "styled-components";
import { FaDollarSign } from "react-icons/fa";

const Wrapper = styled.div`
 .bg-gradient-to-r {
    background: ${(props) => `linear-gradient(to right, ${props.startColor}, ${props.endColor})`};
  }
  .circle-icon {
    background: ${(props) => props.iconBgColor || "#f6b9ff"};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -15px; /* Adjust the position to be slightly above */
    right: 10px;
  }
`;

const Card = ({ balance, text, icon, iconBgColor, startColor, endColor }) => {
  return (
    <>
      <Wrapper iconBgColor={iconBgColor} startColor={startColor} endColor={endColor}>
        <div className={`bg-gradient-to-r p-4 rounded-lg shadow-lg text-white relative w-75`}>
          <div className="text-2xl font-bold">{balance}</div>
          <div className="text-md">{text}</div>
          <div className="circle-icon">
            {icon}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Card;
