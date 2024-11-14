// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaHome,
//   FaUser,
//   FaQuestionCircle,
//   FaEnvelope,
//   FaSignInAlt,
//   FaUserAlt,
//   FaCheck,
//   FaPhoneSquareAlt,
//   FaFacebookF,
//   FaTwitter,
//   FaLinkedin,
//   FaLinkedinIn,
//   FaInstagram,
//   FaAngleUp,
// } from "react-icons/fa";
// import { FaGear } from "react-icons/fa6";

// import logo from "../../assets/images/logo.jpg";
// import vector from "../../assets/images/vector.png";
// import about from "../../assets/images/about.png";
// import work from "../../assets/images/work.png";
// import btc from "../../assets/images/BTC.png";
// import trx from "../../assets/images/TRX.png";
// import tether from "../../assets/images/TETHER.png";
// import doge from "../../assets/images/DOGE.png";
// import fey from "../../assets/images/FEY.png";
// import ltc from "../../assets/images/LTC.png";
// import dash from "../../assets/images/DASH.png";
// import eth from "../../assets/images/ETH.png";
// import icon3 from "../../assets/images/services-icon3.svg";
// import icon5 from "../../assets/images/services-icon5.svg";
// import icon1 from "../../assets/images/services-icon1.svg";
// import icon6 from "../../assets/images/services-icon6.svg";
// import icon2 from "../../assets/images/services-icon2.svg";
// import icon4 from "../../assets/images/services-icon4.svg";
// import coinbase from "../../assets/images/coinbase-commerce.png";
// import faucetpay from "../../assets/images/faucetpay.png";
// import express from "../../assets/images/express-crypto.png";
// import coinpayment from "../../assets/images/coinpayment.png";
// import coingecko from "../../assets/images/coingecko.png";

// import Wrapper from "../../assets/wrappers/Landing";

// const Landing = () => {
//   return (
//     <Wrapper>

// <div className="top-scroll transition">
// 			<a href="#banner" className="scrollTo"><FaCheck/></a>
// 		</div>

//       {/* header */}
//       <header className="transiion" style={{ background: "#000" }}>
//         <div className="container">
//           <div className="row flex-align">
//             <div className="col-lg-3 col-md-3 col-8">
//               <div className="logo">
//                 <a href="/">
//                   <img src={logo} alt="coinexpay" className="transition" />
//                 </a>
//               </div>
//             </div>
//             <div className="col-lg-9 col-md-9 col-4">
//               <div className="menu-toggle">
//                 <span></span>
//               </div>
//               <div className="menu">
//                 <ul className="d-inline-block">
//                   <li>
//                     <a href="#banner">
//                       <FaHome className="icons-navbar" />
//                       Home
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#about">
//                       <FaUser className="icons-navbar" />
//                       About US
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#work">
//                       <FaGear className="icons-navbar" />
//                       How to Start
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#faq">
//                       <FaQuestionCircle className="icons-navbar" />
//                       Faqs
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#contact-part">
//                       <FaEnvelope className="icons-navbar" />
//                       Contact
//                     </a>
//                   </li>
//                   <li className="sign-btn">
//                     <a href="/login">
//                       <FaSignInAlt className="icons-navbar" />
//                       Sign In
//                     </a>
//                   </li>
//                   <li className="sign-btn">
//                     <a href="/register">
//                       <FaUserAlt className="icons-navbar" />
//                       Sign Up
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Get Ready to Earn */}
//       <section className="home-banner parallax box white-to-gray" id="banner">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-6 col-md-6 position-u flex-align wow fadeInLeft animated">
//               <div className="banner-contain">
//                 <h3>Get Ready To Earn Free</h3>
//                 <h1 className="banner-heading">Crytocurrency</h1>
//                 <div className="word"></div>
//                 <p className="banner-des">
//                   By doing multiple tasks such as filling out surveys,
//                   offerwalls, watching ads, paid to click, shortlinks, manual
//                   faucet, autofaucet and much more!
//                 </p>
//                 <a href="/" className="btn">
//                   Sign In
//                 </a>
//                 <a href="/" className="btn">
//                   Sign Up
//                 </a>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 position-u wow fadeInRight animated">
//               <div className="banner-img">
//                 <img src={vector} alt="banner" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Coinexpay */}
//       <section className="about-part darkblue ptb-100" id="about">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-6 wow fadeInLeft animated animated">
//               <div className="about-img">
//                 <img src={about} alt="about" />
//               </div>
//             </div>
//             <div className="col-md-6 flex-align wow fadeInRight animated animated">
//               <div className="about-content">
//                 <div className="section-heading">
//                   <h2 className="heading-title-2 pb-20">
//                     About <span>COINEXPAY</span>
//                   </h2>
//                   <h6 className="sub-heading-2 pb-15">
//                     COINEXPAY is a Best Website to Get Crypto related services
//                     and a Cryptocurrency Earning platform.
//                   </h6>
//                   <p>
//                     We have founded our incorporated establishment with an
//                     exquisite idea that our user community would enjoy an
//                     interactive, acceptable, transparent, and user-friendly
//                     Crypto platform.
//                   </p>
//                   <p>
//                     Additionally, individuals from every continent in the world
//                     could sign up at our website and enjoy various Earning types
//                     and Features like Manual Faucet, Auto Faucet, Paid to Click,
//                     Shortlinks, Daily Tasks, Multiple Bonus, Multi Level
//                     Referral Commission, Games, Exchange, Instant Deposit and
//                     Withdrawal, Live chat and Priority Support etc.
//                   </p>
//                   <p>
//                     Our website support more than 8 cryptocurrency including
//                     Bitcoin and Ethereum.
//                   </p>
//                   <p>
//                     Our exceptional wallet feature allows any particular user to
//                     store, send and recieve bitcoin and other next-generation
//                     cryptocurrencies.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How to Start */}

//       <section
//         className="work-part darkblue ptb-100"
//         style={{ background: "#000000" }}
//         id="work"
//       >
//         <div className="container">
//           <div className="row">
//             <div
//               className="col-md-12 wow fadeInUp animated"
//               style={{ visibility: "visible" }}
//             >
//               <div className="section-heading text-center pb-65">
//                 <h2 className="heading-title" style={{ color: "#fff" }}>
//                   How to <span style={{ color: "#8d56f3" }}>Starts</span>
//                 </h2>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div
//               className="col-md-6 text-center flex-align justify-center wow fadeInLeft animated"
//               style={{ visibility: "visible" }}
//             >
//               <div className="work-box">
//                 <div className="work-box-bg"></div>
//                 <img src={work} alt="Work Process" />
//               </div>
//             </div>
//             <div
//               className="col-md-6 flex-align wow fadeInRight animated"
//               style={{ visibility: "visible" }}
//             >
//               <div className="work-box">
//                 <h3
//                   className="work-process-title pb-25"
//                   style={{ color: "#fff" }}
//                 >
//                   Here's the steps of how to starts
//                 </h3>
//                 <p className="work-des pb-20" style={{ color: "#fff" }}>
//                   Join us to level up your chances of earning Cryptocurrency by
//                   merely accomplishing simple tasks. Visit our website for
//                   further updates.
//                 </p>

//                 <ul className="check-list">
//                   <li>
//                     <span>
//                       <FaCheck className="icon-how" />
//                     </span>
//                     <p>Sign Up &amp; Create an Account with Us</p>
//                   </li>
//                   <li>
//                     <span>
//                       <FaCheck className="icon-how" />
//                     </span>
//                     <p>Be an active member of our Community.</p>
//                   </li>
//                   <li>
//                     <span>
//                       <FaCheck className="icon-how" />
//                     </span>
//                     <p>
//                       Enjoy your Crypto earnings withdrawal through various
//                       payment partners such as Faucetpay, Expresscrypto,
//                       Coinbase Etc.
//                     </p>
//                   </li>
//                 </ul>
//                 <p className="work-des pb-20" style={{ color: "#fff" }}>
//                   Sign Up Or Register with Us and start growing your crypto
//                   assets today!
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* currency section  */}
//       <section id="currency">
//         <div className="box white-to-gray ptb-100">
//           <div className="container">
//             <div className="row justify-content-between ">
//               <div className="col-12 col-lg-5">
//                 <div className="text-holder">
//                   <p className="overline-title text-left sub-heading">
//                     we provide
//                   </p>
//                   <h2 className="title text-left">Currencies</h2>
//                   <p className="desc on-white">
//                     COINEXPAY is a Best Website to Get Crypto related services
//                     and a Cryptocurrency Earning platform. Coinexpay is
//                     currently supporting 8 cryptocurrencies. Hence, with
//                     multiple payment options, you can easily transfer your
//                     crypto coins to Wallet. We support withdrawals to FaucetPay
//                     Microwallet or Directly to your wallet. We will be uploading
//                     new types of cryptocurrencies to our website in the near
//                     future. So just create your account on Coinexpay and start
//                     growing your favourite crypto coins.
//                   </p>
//                 </div>
//               </div>
//               <div className="col-12 col-lg-7">
//                 <div
//                   className="row currencies animate expandOpen"
//                   id="expandOpen"
//                 >
//                   <div className="col-3 col-md-2 col-lg-3 item text-center">
//                     <img
//                       src={btc}
//                       width="50"
//                       height="50"
//                       alt="BTC"
//                       title="BTC"
//                     />
//                     <p>Bitcoin</p>
//                   </div>
//                   <div className="col-3 col-md-2 col-lg-3 item text-center">
//                     <img
//                       src={eth}
//                       width="50"
//                       height="50"
//                       alt="ETH"
//                       title="ETH"
//                     />
//                     <p>Ethereum</p>
//                   </div>
//                   <div className="col-3 col-md-2 col-lg-3 item text-center">
//                     <img
//                       src={dash}
//                       width="50"
//                       height="50"
//                       alt="ETC"
//                       title="ETC"
//                     />
//                     <p>Dash</p>
//                   </div>
//                   <div className="col-3 col-md-2 col-lg-3 item text-center">
//                     <img
//                       src={ltc}
//                       width="50"
//                       height="50"
//                       alt="LTC"
//                       title="LTC"
//                     />
//                     <p>Litecoin</p>
//                   </div>
//                   <div className="col-3 col-md-2 col-lg-3 item text-center">
//                     <img
//                       src={fey}
//                       width="50"
//                       height="50"
//                       alt="fey"
//                       title="fey"
//                     />
//                     <p>Feyorra </p>
//                   </div>
//                   <div className="col-3 col-md-2 col-lg-3 item text-center">
//                     <img
//                       src={doge}
//                       width="50"
//                       height="50"
//                       alt="DOGE"
//                       title="DOGE"
//                     />
//                     <p>Dogecoin</p>
//                   </div>
//                   <div className="col-3 col-md-2 col-lg-3 item text-center">
//                     <img
//                       src={tether}
//                       width="50"
//                       height="50"
//                       alt="BCH"
//                       title="BCH"
//                     />
//                     <p>Tether Usdt</p>
//                   </div>
//                   <div className="col-3 col-md-2 col-lg-3 item text-center">
//                     <img
//                       src={trx}
//                       width="50"
//                       height="50"
//                       alt="ZEC"
//                       title="TRX"
//                     />
//                     <p>TRON</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* feature section */}

//       <section
//         id="services-part"
//         style={{ background: "#000" }}
//         className="menu-section services-part position-r ptb-100"
//       >
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className="heading-part text-center mb-50 mb-sm-30 mb-xs-20">
//                 <h2 className="main_title" style={{ color: "#fff" }}>
//                   Features and Services
//                 </h2>
//               </div>
//             </div>
//           </div>
//           <div className="ser-feature-block mb_-30 center-sm">
//             <div className="row">
//               <div className="col-lg-4 col-12 col-md-3 fadeInUpMedium delay3 visible animated">
//                 <div className="services-box mb-30">
//                   <div className="frontend text-center">
//                     <div className="services-icon services3">
//                       <img src={icon3} alt="cryptoz" />
//                     </div>
//                     <div className="services-detail">
//                       <h3 className="ser-title">Safe and Secure</h3>
//                       <div className="ser-subtitle">
//                         We protect your personal and financial information and
//                         manage it securely.
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div className="backend">
// 			            		<div className="services-detail">
// 					                <div className="ser-subtitle">The Coinexpay website is safe to use platform and your safety is our priority. We protect your personal and financial information and manage it securely.</div>
// 					            </div>
// 			            	</div> */}
//                 </div>
//               </div>
//               <div className="col-lg-4 col-12 col-md-3 fadeInUpMedium delay5 visible animated full-visible">
//                 <div className="services-box mb-30">
//                   <div className="frontend text-center">
//                     <div className="services-icon services1">
//                       <img src={icon5} alt="cryptoz" />
//                     </div>
//                     <div className="services-detail">
//                       <h3 className="ser-title">Higher Referral Earning</h3>
//                       <div className="ser-subtitle">
//                         Invite Your Friends to Coinexpay by sharing your
//                         Referral link.
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div className="backend">
// 			            		<div className="services-detail">
// 					                <div className="ser-subtitle">Invite Your Friends to Coinexpay by sharing your Referral link, Promo codes and get a higher Referral Commission.</div>
// 					            </div>
// 			            	</div> */}
//                 </div>
//               </div>
//               <div className="col-lg-4 col-12 col-md-3 fadeInUpMedium delay1 visible animated">
//                 <div className="services-box mb-30">
//                   <div className="frontend text-center">
//                     <div className="services-icon services1">
//                       <img src={icon1} alt="cryptoz" />
//                     </div>
//                     <div className="services-detail">
//                       <h3 className="ser-title">Instant Exchange</h3>
//                       <div className="ser-subtitle">
//                         Exchange your Coinexpay wallet balance to more than 8
//                         types of Cryptocurrencies
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div className="backend">
// 			            		<div className="services-detail">
// 					                <div className="ser-subtitle">On Coinexpay you Can Exchange your Coinexpay wallet balance to more than 8 types of Cryptocurrencies Easily and Instantly.</div>
// 					            </div>
// 			            	</div> */}
//                 </div>
//               </div>
//               <div className="col-lg-4 col-12 col-md-3 fadeInUpMedium delay4 visible animated full-visible">
//                 <div className="services-box mb-30">
//                   <div className="frontend text-center">
//                     <div className="services-icon services3">
//                       <img src={icon4} alt="cryptoz" />
//                     </div>
//                     <div className="services-detail">
//                       <h3 className="ser-title">
//                         Instant Deposit &amp; Withdrawal
//                       </h3>
//                       <div className="ser-subtitle">
//                         Easily Deposit and Withdraw your money 24×7.
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div className="backend">
// 			            		<div className="services-detail">
// 					                <div className="ser-subtitle">At Connexpay You can Easily Deposit and Withdraw your money through various payment gateways. You Can Easily Withdraw your money 24×7.</div>
// 					            </div>
// 			            	</div> */}
//                 </div>
//               </div>
//               <div className="col-lg-4 col-12 col-md-3 fadeInUpMedium delay2 visible animated">
//                 <div className="services-box mb-30">
//                   <div className="frontend text-center">
//                     <div className="services-icon services2">
//                       <img src={icon2} alt="cryptoz" />
//                     </div>
//                     <div className="services-detail">
//                       <h3 className="ser-title">Various Earning Type</h3>
//                       <div className="ser-subtitle">
//                         There are multiple ways to earn money on Coinexpay.
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div className="backend">
// 			            		<div className="services-detail">
// 					                <div className="ser-subtitle">There are multiple ways to earn money on Coinexpay and we are regularly working to add more options. Currently, you can earn money by the following methods like Auto Faucet, Manual Faucet, Shortlink, PTC, Tasks, Referrals Etc.</div>
// 					            </div>
// 			            	</div> */}
//                 </div>
//               </div>

//               <div className="col-lg-4 col-12 col-md-3 fadeInUpMedium delay6 visible animated full-visible">
//                 <div className="services-box mb-30">
//                   <div className="frontend text-center">
//                     <div className="services-icon services2">
//                       <img src={icon6} alt="cryptoz" />
//                     </div>
//                     <div className="services-detail">
//                       <h3 className="ser-title">Priority Support</h3>
//                       <div className="ser-subtitle">
//                         we provide 24×7 support / You Can also email us on
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div className="backend">
// 			            		<div className="services-detail">
// 					                <div className="ser-subtitle">If You're Facing any problem with CoinxPay or have any Questions our Support team is always ready to help You 24×7. You can create a support ticket we provide live chat support or You Can also send email us on</div>
// 					            </div>
// 			            	</div> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* statistics part */}

//       <section
//         className="feature-part skyblue bg-pattern pt-100 pb-100 box white-to-gray"
//         id="statistics"
//       >
//         <div className="container">
//           <div className="row">
//             <div
//               className="col-md-12 wow fadeInUp animated"
//               style={{ visibility: "visible" }}
//             >
//               <div className="section-heading text-center pb-65">
//                 <label className="sub-heading">Live</label>
//                 <h2 className="heading-title" style={{ color: "#000" }}>
//                   Statistics
//                 </h2>
//                 <p className="heading-des" style={{ color: "#000" }}>
//                   Here are our current figures for you. Just join the Coinexpay
//                   family and become our satisfied user.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="loader col-md-12 text-center">
//               <div className="row">
//                 <div className="col-md-3">
//                   <span
//                     className="count text-center"
//                     style={{ fontSize: "34px", color: "#000" }}
//                   >
//                     1218
//                   </span>
//                   <br />
//                   <span className="text-center" style={{ color: "#000" }}>
//                     DAYS ONLINE
//                   </span>
//                 </div>
//                 <div className="col-md-3">
//                   <span
//                     className="count text-center"
//                     style={{ fontSize: "34px", color: "#000" }}
//                   >
//                     450000
//                   </span>
//                   <br />
//                   <span
//                     className="col-md-3 text-center"
//                     style={{ color: "#000" }}
//                   >
//                     REGISTERED USERS
//                   </span>
//                 </div>
//                 <div className="col-md-3">
//                   <span
//                     className="count text-center"
//                     style={{ fontSize: "34px", color: "#000" }}
//                   >
//                     90000000
//                   </span>
//                   <br />
//                   <span
//                     className="col-md-3 text-center"
//                     style={{ color: "#000" }}
//                   >
//                     FAUCET CLAIMS
//                   </span>
//                 </div>
//                 <div className="col-md-3">
//                   <span
//                     className="count text-center"
//                     style={{ fontSize: "34px", color: "#000" }}
//                   >
//                     90
//                   </span>
//                   <br />
//                   <span
//                     className="col-md-3 text-center"
//                     style={{ color: "#000" }}
//                   >
//                     NUMBER OF WITHDRAWAL
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* are you ready section  */}

//       <section className="ready-box" style={{ background: "#000" }}>
//         <div className="box light-yellow">
//           <div className="container ready">
//             <div className="row">
//               <div className="text col-md-10">
//                 <h3
//                   className="title white text-left animate slideUp"
//                   id="slideUp"
//                   style={{ color: "#fff" }}
//                 >
//                   Are you ready to earn <strong>free crypto coins</strong>?
//                 </h3>
//                 <p className="desc" style={{ color: "#fff" }}>
//                   Simply create your account and start growing your crypto
//                   coins!
//                 </p>
//               </div>
//               <div className="col-md-3">
//                 <button
//                   className="text-left text-md-right"
//                   style={{ background: "#fff", color: "#000" }}
//                 >
//                   <a
//                     href="#"
//                     className="btn-getstarted pulse"
//                     style={{ color: "#000" }}
//                   >
//                     <span className="mdi mdi-cursor-default-click"></span> Get
//                     Started
//                   </a>
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="clearfix"></div>
//         </div>
//       </section>

//       {/* FAQ Section */}

//       <section
//         className="faq-part skyblue pt-100"
//         style={{ background: "#fff" }}
//         id="faq"
//       >
//         <div className="container">
//           <div className="row">
//             <div
//               className="col-md-12 wow fadeInUp animated"
//               style={{ visibility: "visible" }}
//             >
//               <div className="section-heading text-center pb-65">
//                 <label className="sub-heading">Faqs</label>
//                 <h2 className="heading-title">
//                   Frequently Asked{" "}
//                   <span style={{ color: "#8d56f3" }}> Questions</span>
//                 </h2>
//                 <p className="heading-des" style={{ color: "#000" }}>
//                   Our user's can check out their most common questions about
//                   Coinexpay. Here are Some most popular questions Coinexpay
//                   receives.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <div
//                 className="accordion-faq-box mb-20 wow fadeInLeft animated animated"
//                 style={{ visibility: "visible" }}
//               >
//                 <a href="javascript:void(0)" className="accordion-faq-title">
//                   What is Faucet?
//                 </a>
//                 <div
//                   className="accordion-faq-content"
//                   style={{ display: "none" }}
//                 >
//                   <p style={{ color: "#fff" }}>
//                     It's an exponentially trending reward scenario in the crypto
//                     world where free bitcoin and other cryptocurrencies are
//                     offered to the user of a website or mobile application. The
//                     concept is beneficial and extraordinary. Sign up at our
//                     COINEXPAY platform and get to earn cryptocurrencies by
//                     completing simple tasks.
//                   </p>
//                 </div>
//               </div>
//               <div
//                 className="accordion-faq-box mb-20 wow fadeInLeft animated animated"
//                 style={{ visibility: "visible" }}
//               >
//                 <a href="javascript:void(0)" className="accordion-faq-title">
//                   What is COINEXPAY?
//                 </a>
//                 <div className="accordion-faq-content">
//                   <p style={{ color: "#fff" }}>
//                     COINEXPAY is a user-friendly and interactive free
//                     cryptocurrency reward earning platform. The platform allows
//                     its user community wallet feature where you can store your
//                     crypto-coins and moreover earn free Bitcoin and other
//                     cryptocurrencies by completing simple tasks and engaging in
//                     our affiliate programs.
//                   </p>
//                 </div>
//               </div>
//               <div
//                 className="accordion-faq-box mb-20 wow fadeInLeft animated animated"
//                 style={{ visibility: "visible" }}
//               >
//                 <a href="javascript:void(0)" className="accordion-faq-title">
//                   What Currencies Do You Work With?
//                 </a>
//                 <div className="accordion-faq-content">
//                   <p style={{ color: "#fff" }}>
//                     Our platform supports and works with more than 8
//                     cryptocurrencies such as Bitcoin (BTC), Ethereum (ETH),
//                     Dogecoin (DOGE), Litecoin (LTC), Tron(TRX), Dash (Dash),
//                     Digibyte (DGB), etc.
//                   </p>
//                 </div>
//               </div>
//               <div
//                 className="accordion-faq-box mb-20 wow fadeInLeft animated animated"
//                 style={{ visibility: "visible" }}
//               >
//                 <a href="javascript:void(0)" className="accordion-faq-title">
//                   What is Instant Exchange?
//                 </a>
//                 <div className="accordion-faq-content">
//                   <p style={{ color: "#fff" }}>
//                     On Coinexpay you Can Exchange your Coinexpay wallet balance
//                     to more than 8 types of Cryptocurrencies Easily and
//                     Instantly.
//                   </p>
//                 </div>
//               </div>
//               <div
//                 className="accordion-faq-box mb-20 wow fadeInLeft animated"
//                 style={{ visibility: "visible" }}
//               >
//                 <a href="javascript:void(0)" className="accordion-faq-title">
//                   How to claim your rewards on faucets?{" "}
//                 </a>
//                 <div className="accordion-faq-content">
//                   <p style={{ color: "#fff" }}>
//                     Our website has two types of faucet manual faucet and auto
//                     faucet Once you've made an account on Coinexpay. Now, all
//                     you need to do is complete various tasks like solve captcha
//                     or PTC and start claiming your rewards earned in time.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div
//                 className="accordion-faq-box mb-20 wow fadeInRight animated animated"
//                 style={{ visibility: "visible" }}
//               >
//                 <a href="javascript:void(0)" className="accordion-faq-title">
//                   How to invest in a particular cryptocurrency?
//                 </a>
//                 <div className="accordion-faq-content">
//                   <p style={{ color: "#fff" }}>
//                     To buy or invest in a particular cryptocurrency. All you
//                     have to do is simply download a crypto trading app or go on
//                     a crypto website. Register with your required details, being
//                     done with your KYC completion process, and start investing
//                     in your favorite cryptocurrency from your Crypto-Wallet.
//                   </p>
//                 </div>
//               </div>
//               <div
//                 className="accordion-faq-box mb-20 wow fadeInRight animated animated"
//                 style={{ visibility: "visible" }}
//               >
//                 <a href="javascript:void(0)" className="accordion-faq-title">
//                   How do I withdraw/deposit?
//                 </a>
//                 <div className="accordion-faq-content">
//                   <p style={{ color: "#fff" }}>
//                     Head over to our user dashboard and simply click on the
//                     button where you can see the withdraw/deposit option.
//                   </p>
//                 </div>
//               </div>
//               <div
//                 className="accordion-faq-box mb-20 wow fadeInRight animated animated"
//                 style={{ visibility: "visible" }}
//               >
//                 <a href="javascript:void(0)" className="accordion-faq-title">
//                   What is Bitcoin?
//                 </a>
//                 <div className="accordion-faq-content">
//                   <p style={{ color: "#fff" }}>
//                     Bitcoin is a trending and an encrypted digital currency
//                     backed by advanced blockchain technology which is
//                     responsible for ensuring its anonymity and tracing of
//                     transactions through a network of secured online servers and
//                     computers.
//                   </p>
//                 </div>
//               </div>
//               <div
//                 className="accordion-faq-box mb-20 wow fadeInRight animated animated"
//                 style={{ visibility: "visible" }}
//               >
//                 <a href="javascript:void(0)" className="accordion-faq-title">
//                   Is investing in cryptocurrency legal?
//                 </a>
//                 <div className="accordion-faq-content">
//                   <p style={{ color: "#fff" }}>
//                     In some countries, their government sees the act of
//                     investing bitcoin and other sorts of cryptocurrencies as
//                     ways to launder money and tax evasion. Also, all sorts of
//                     technologies pose potential risks. But when the benefits
//                     overpass the risks. Who is to say that it's not worth a
//                     shot?
//                   </p>
//                 </div>
//               </div>
//               <div
//                 className="accordion-faq-box mb-20 wow fadeInRight animated animated"
//                 style={{ visibility: "visible" }}
//               >
//                 <a href="javascript:void(0)" className="accordion-faq-title">
//                   How To Make Money with Coinexpay?
//                 </a>
//                 <div className="accordion-faq-content">
//                   <p style={{ color: "#fff" }}>
//                     There are various ways to earn money on Coinexpay.
//                     Currently, you can earn money by the following methods like
//                     Auto Faucet, Manual Faucet, Shortlink, PTC, Tasks, Referrals
//                     Etc.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* contact us section */}
//       <section
//         id="contact-part"
//         className="menu-section contact-part position-r"
//       >
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//               <div className="heading-part text-center mb-50 mb-sm-30 mb-xs-20">
//                 <h2 className="main_title" style={{ color: "#fff" }}>
//                   Get In <span style={{ color: "#8d56f3" }}>Touch</span>
//                 </h2>
//                 <span style={{ color: "#fff" }}>
//                   If you have any question,feel free to send our support team a
//                   message via the form below and we'll be happy to help you out.
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-4">
//               <div className="contact-box">
//                 <ul>
//                   <li>
//                     <div className="contact-thumb">
//                       <FaPhoneSquareAlt className="icon-contact" />
//                     </div>
//                     <div className="contact-box-detail">
//                       <h3 className="contact-title">Call Us On</h3>
//                       <p>+91 123 456 789 0</p>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="contact-thumb">
//                       <FaEnvelope className="icon-contact" />
//                     </div>
//                     <div className="contact-box-detail">
//                       <h3 className="contact-title">Email</h3>
//                       <p>support@coinexpay.com</p>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="col-md-8">
//               <div className="form-detail">
//                 <form>
//                   <div className="row">
//                     <div className="col-xs-12 col-md">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Name"
//                         required=""
//                       />
//                     </div>
//                     <div className="col-xs-12 col-md">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Email"
//                         required=""
//                       />
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Subject"
//                       required=""
//                     />
//                   </div>
//                   <div className="form-group">
//                     <textarea
//                       className="form-control"
//                       rows="3"
//                       placeholder="Message"
//                       required=""
//                     ></textarea>
//                   </div>
//                   <button
//                     type="submit"
//                     className="btn-white"
//                     style={{ background: "#5d19db", color: "#fff" }}
//                   >
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* carousal */}
//       <section
//         id="supportCurrency"
//         className="supportCurrency"
//         style={{ background: "#fff" }}
//       >
//         <div className="container-fluid">
//           <h2 style={{ textAlign: "center" }}>
//             Our Payment Partner
//             <span style={{ color: "#8d56f3" }}>and Services</span>
//             <p>
//               Our user's can check out their most common questions about
//               Coinexpay. Here are Some most popular questions Coinexpay
//               receives.
//             </p>
//           </h2>

//           <br />
//           <section className="customer-logos slider">
//             <div className="slide">
//               <img src={coinbase} alt="coinbase" style={{ width: "250px" }} />
//             </div>
//             <div className="slide">
//               <img src={faucetpay} alt="faucetpay" />
//             </div>
//             <div className="slide">
//               <img src={express} alt="express" />
//             </div>
//             <div className="slide">
//               <img src={coinpayment} alt="coinpayment" />
//             </div>
//             <div className="slide">
//               <img src={coingecko} alt="coingecko" />
//             </div>
//           </section>
//         </div>
//       </section>

//       {/* footer section */}
//       <footer
//         className="bg-pattern darkblue ptb-100"
//         style={{ background: "#000000" }}
//       >
//         <div className="container">
//           <div className="footer">
//             <div className="row">
//               <div className="col-lg-4 col-md-6">
//                 <div className="footer-logo pb-25">
//                   <a href="index.html">
//                     <img
//                       src={logo}
//                       alt="Coinexpay "
//                       style={{ maxWidth: "60%" }}
//                     />
//                   </a>
//                 </div>
//                 <div className="footer-icon">
//                   <ul>
//                     <li>
//                       <a href="#">
//                         <FaFacebookF />
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#">
//                         <FaTwitter />
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#">
//                         <FaLinkedinIn />
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#">
//                         <FaInstagram />
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6">
//                 <div className="footer-link">
//                   <ul>
//                     <li>
//                       <a href="#banner">Home</a>
//                     </li>
//                     <li>
//                       <a href="#about">About Us</a>
//                     </li>
//                     <li>
//                       <a href="#work">How to start</a>
//                     </li>
//                     <li>
//                       <a href="#services-part">Key Features</a>
//                     </li>
//                     <li>
//                       <a href="#statistics">Statistics</a>
//                     </li>
//                     <li>
//                       <a href="#supportCurrency">Our Partners</a>
//                     </li>
//                     <li>
//                       <a href="#faq">Faq</a>
//                     </li>
//                     <li>
//                       <a href="#contact-part">Contact</a>
//                     </li>
//                     <li>
//                       <a href="#currency">Supported Coins</a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6">
//                 <div className="subscribe">
//                   <div className="form-group">
//                     <label style={{ color: "#fff" }}>
//                       Subscribe to our Newsleter
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Enter your email Address"
//                     />
//                     <input
//                       type="submit"
//                       name="submit"
//                       value="Subscribe"
//                       className="submit"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="copyright">
//             <div className="row">
//               <div className="col-lg-6">
//                 <p style={{ color: "#fff" }}>
//                   © Coinexpay all Rights Reserved.
//                 </p>
//               </div>
//               <div className="col-lg-6">
//                 <ul>
//                   <li>
//                     <a href="/terms">Terms &amp; Condition</a>
//                   </li>
//                   <li>
//                     <a href="/privacy">Privacy Policy</a>
//                   </li>
//                   <li>
//                     <a href="#contact-part">Contact Us</a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </Wrapper>
//   );
// };

// export default Landing;



import React from 'react'

const Landing = () => {
  return (
    <div>Landing</div>
  )
}

export default Landing
