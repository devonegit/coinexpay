import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const Wrapper = styled.div`


`;

const ProgressCard = ({ heading, description, percentage }) => {
  return (
    <Wrapper>
      <div className="bg-white p-6 rounded-lg mt-4 mb-10">
        <div className="max-w-full mx-auto rounded-lg shadow-md p-4 flex items-center main-card">
          <div className="w-4/5">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-500 to-gray-700 text-transparent bg-clip-text mt-0 mb-4">
              {heading}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="w-1/5 flex justify-end">
            <div style={{ position: "relative" }}>
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-gray-200">
                <span className="text-center text-gray-500 font-bold text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  {percentage}%
                </span>
              </div>
              <div
                style={{ width: 150, height: 150, padding: "23px" }}
                className="hover:scale-105 transition duration-300"
              >
                <CircularProgressbar
                  value={percentage}
                  styles={buildStyles({
                    pathColor: `#3b82f6`, // Blue-gray color for the progress bar
                    trailColor: "#fff", // White color for the outside of the progress bar
                    textColor: "#fff", // White color for the font
                    strokeWidth: 15,
                    textSize: "16px", // Adjust the font size if needed
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProgressCard;
