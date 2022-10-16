import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import { IoIosArrowDown } from "react-icons/io";

import logo from "../asset/main/logo.png";

function Main() {
  return (
    <>
      <ReactFullpage
        scrollOverflow={true}
        render={({ fullpageApi }) => (
          <div id="fullpage-wrapper">
            <div className="section">
              <div className="div-main-section-01">
                <img className="img-main" src={logo} alt="" />
              </div>
              <IoIosArrowDown
                className="icon-main-arrow-down"
                size="20"
                onClick={() => fullpageApi.moveSectionDown()}
              />
            </div>
            <div className="section">
              <div className="div-main-section-01">홍보페이지1</div>
              <IoIosArrowDown
                className="icon-main-arrow-down"
                size="20"
                onClick={() => fullpageApi.moveSectionDown()}
              />
            </div>
            <div className="section">
              <div className="div-main-section-01">홍보페이지2</div>
            </div>
          </div>
        )}
      />
    </>
  );
}

export default Main;
