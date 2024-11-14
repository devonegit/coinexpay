import styled from "styled-components";

const Wrapper = styled.header`


body, html {color: #fff; background: #490fb4;}
a, a:focus { color: #fff; }
a:hover {color: #8d56f3; }
a.active {color: #8d56f3; }

.btn {color: #fff;  background: #8d56f3; border: 1px solid #8d56f3; border-color: #8d56f3;}
.btn:hover {color: #fff;}
.btn:before{background: -webkit-radial-gradient(center, ellipse, rgba(39, 3, 106, 0.5) 0%, rgba(0, 0, 0, 0) 80%); background: radial-gradient(ellipse at center, rgba(39, 3, 106, 0.5) 0%, rgba(0, 0, 0, 0) 80%);}
.owl-dot{background: #fff !important;}
.owl-dot.active {background: #8d56f3 !important;}

#preloader{background: url(/web/20220327144855im_/https://coinexpay.com/public/front/images/loader.svg) center no-repeat #470fac;}

.form-control, .form-control:focus{background: #5d19db; color: #fff;}
// .form-control::-webkit-input-placeholder {color: #8d56f3;}
.form-control::-moz-placeholder {color: #8d56f3;}
.form-control:-ms-input-placeholder {color: #8d56f3;}
.form-control:-moz-placeholder {color: #8d56f3;}
.heading-title-2 span, .sub-heading {color: #8d56f3;}
.sub-page-banner{background-color: #410ca3;}
.skyblue{background-color: #490fb4;}
.darkblue{background-color: #fff;}
.top-scroll {background: #8d56f3; color: #fff;}
.top-scroll:hover {opacity: 0.6;}
.top-scroll a{color: #fff;}

/*----- Menu -----*/
.menu ul li a:before{background: #8d56f3;}
header.fixed{background:#000;
    
}
.opener:before, .opener:after{background: #fff;}
.menu-toggle span, .menu-toggle span:before, .menu-toggle span:after{background: #fff;}
header.fixed .menu-toggle span, header.fixed .menu-toggle span:before, header.fixed .menu-toggle span:after{background: #fff;}
.menu-toggle.active span{background: transparent;}

/*----- Home Banner -----*/
.home-banner{background-color: #fff;}

/*----- Work Section -----*/
ul.check-list li span{background: #fff; color: #470fac;}

/*----- Feature Section -----*/
.feature-title:hover {color: #8d56f3;}
.feature-box:hover path.hover {fill: #8d56f3;}

/*----- Timeline Section -----*/
.h-border, .v-row{border-color: #8d56f3;}
.small-round{border-color: #fff;}
.v-row:before, .small-round span{background: #8d56f3;}


/*----- FAQ Section -----*/
.Frequently-tabs li a{color: #fff;}
.Frequently-tabs li a.active{color: #fff;}
.Frequently-tabs li a:before{background: #8d56f3;}
.qus-des {color: #b690fa;}


/*----- Feature tow -----*/
.feature-box-2 .frontend, .feature-box-2 .backend  {background: #5d19db;}
.feature-des {color: #dadada;}


/*----- FAQ tow Section -----*/
.faq-part-2 .Frequently-tabs li a, .faq-part-2 .faq-tab, .accordion-faq-title {color: #fff; background: #5d19db;}
.faq-part-2 .Frequently-tabs li a.active{background: #8d56f3;}
.faq-part-2 .qus-des{color: #fff;}
.accordion-faq-title.active, .accordion-faq-title:hover{ color: #fff;}
.accordion-faq-content{background: #5d19db;}
.accordion-faq-title:before, .accordion-faq-title:after{background: #fff;}

/*----- About Page -----*/
.sub-page-banner ul li:before{background: #fff;}
.play-icon span{border-color: #470fac; background: #fff; color: #470fac;}
.play-icon:hover span{border-color: #fff; background: #8d56f3; color: #fff;}
.work-part button.close{color: #fff;}
button.close{color: #fff;}

/*----- blog List Page -----*/
.blog-search input{border-color: #8d56f3; color: #fff;}
.blog-search-btn{background: #8d56f3; color: #fff;}
.blog-search input::-webkit-input-placeholder {color: #8d56f3;}
.blog-search input::-moz-placeholder {color: #8d56f3;}
.blog-search input:-ms-input-placeholder {color: #8d56f3;}
.blog-search input:-moz-placeholder {color: #8d56f3;}
.blog-search-btn:hover {background: #5d19db;}
.blog-category{background: #5d19db;}
.blog-category ul li:before{background: #8d56f3;}
.trending-news-date{color: #8d56f3;}
.blog-tags ul li a{background: #5d19db; color: #8d56f3;}
.blog-tags ul li a:hover{background: #8d56f3; color: #fff;}
.archives ul li{border-color: #5d19db;}
.blog-list-content ul li:before{background: #fff;}
.blog-list-pagination ul li a{background: #5d19db;}
.blog-list-pagination ul li a:hover, .blog-list-pagination ul li a.active{color: #fff; background: #8d56f3;}

/*----- blog Detail Page -----*/
.blog-detail-content ul li:before{background: #fff;}
.blog-detail-content blockquote{background: #5d19db; border-color: #8d56f3;}
.blog-detail-tag ul li a, .blog-detail-social ul li a{background: #5d19db;}
.blog-detail-tag ul li a:hover{background: #8d56f3; color: #fff;}
.blog-detail-social ul li a:hover{background: #8d56f3; color: #fff;}
.blog-detail-tag-social, .blog-comment-post-singel{border-color: #5d19db;}
.comment-date{color: #bebebe;}
.comment-reply{background: #8d56f3;}
.comment-reply:hover{color: #fff; background: #5d19db;}

/*----- Roadmap Page -----*/
.roadmap-center-line{border-color: #8d56f3;}
.roadmap-center-line:before, .roadmap-center-line:after{background: #fff;}
.roadmap-animated{background: #5d19db;}
.roadmap-main-content:before{border-color: #8d56f3;}
.roadmap-small-round{border-color: #fff; background: #490fb4;}
.roadmap-small-round:before{background: #8d56f3;}
.roadmap-main .roadmap-detail-box{background: #5d19db;}
.roadmap-main .roadmap-des{color: #fff; padding: 0;}

/*----- Token Sale Page -----*/
.information-token-head{color: #8d56f3;}
.token-sale-counter{background: #5d19db;}
.token-sale-counter .coins-counter-loop li span{background: transparent;}
.token-sale-counter .coins-counter-loop li .coin-day{color: #8d56f3;}
.token-sale-counter .coins-progress span{background: rgb(218,75,253); background: -moz-linear-gradient(left,  rgba(218,75,253,1) 0%, rgba(73,15,180,1) 100%); background: -webkit-linear-gradient(left,  rgba(218,75,253,1) 0%,rgba(73,15,180,1) 100%); background: linear-gradient(to right,  rgba(218,75,253,1) 0%,rgba(73,15,180,1) 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8d56f3', endColorstr='#490fb4',GradientType=1 );}
.token-slide-info:before{background: #490fb4;}
.token-sale-counter .coins-progress{background: #fff;}
.distribution-title { color: #8d56f3;}

/*----- Contact Page -----*/
.contact-detail li i{background: #5d19db;}

/*----- Footer Section -----*/
.footer-icon ul li a{background: #8d56f3;}
.footer-icon ul li a:hover{color: #fff;}
.footer-icon ul li a:hover{background: #8d56f3;}
.footer-link ul li a:hover{color: #8d56f3;}
.subscribe .form-control{
/*background: #5d19db;*/
color: #fff;}
.subscribe .submit{color: #fff; background: #8d56f3;}
.subscribe .form-control::-webkit-input-placeholder {color: #8d56f3;}
.subscribe .form-control::-moz-placeholder {color: #8d56f3;}
.subscribe .form-control:-ms-input-placeholder {color: #8d56f3;}
.subscribe .form-control:-moz-placeholder {color: #8d56f3;} 
.subscribe .submit:hover {color: #8d56f3; background: #3b0799;}
.copyright p a{color: #8d56f3;}
.copyright p a:hover {color: #fff;}
.copyright ul li:before{background: #5d19db;}
.footer{border-color: #8d56f3;}

@media(min-width: 992px){
	.menu ul li:hover a{color: #8d56f3;}
	.mega-menu:hover:before{color: #8d56f3;}
	.menu ul ul li a{border-color: #491aa0 !important; color: #fff !important;}
	.menu ul ul li.mega-menu:before{color: #8d56f3;}
	.menu ul ul li:hover > a{color: #8d56f3;}
	.menu ul ul{background: rgb(58, 7, 152, .95);}
	.menu ul ul li a:before{background: #491aa0;}
}
@media(max-width: 991px){
	.menu{background: #000000;}
	.signin .btn{background: transparent;}
	header.fixed .menu-toggle.active span{background: transparent;}
}




























*{box-sizing: border-box;}
body, html {height: 100%; margin: 0; padding: 0;}
body{line-height: 24px; font-size: 14px; font-family: 'Lato', sans-serif; font-weight: 400; letter-spacing: 0px;}
img {height: auto; max-width: 100%;}
a, a:focus, button:focus {outline: none !important;  text-decoration: none; box-shadow: unset !important;}
a:hover { text-decoration: none;}
ul, li, label, span {list-style: none; padding: 0; margin: 0;}
p{padding: 0; margin: 0;}
input:focus {outline: unset; box-shadow: 0px 0px 10px 1px rgb(0, 0, 0, 0.5);}
.transition, .btn, .form-control, a, input, button{transition: all 0.4s ease 0s; -moz-transition: all 0.4s ease 0s; -webkit-transition: all 0.4s ease 0s; -o-transition: all 0.4s ease 0s;}
.container{max-width: 1140px;}
.position-u{position: unset;}
.position-r{position: relative;}
.flex-align{display: flex; align-items: center;}
.flex-bottom{display: flex; align-items: flex-end;}
.justify-center{justify-content: center; display: flex;}
.sub-heading {text-transform: uppercase; font-family: 'Poppins', sans-serif; padding-bottom: 3px;}
.heading-title {font-size: 40px; font-weight: 600; padding-bottom: 18px;}
.heading-des {max-width: 580px; margin: 0 auto;}
.heading-title-2 {font-size: 45px; font-weight: 600;}
.sub-heading-2 {font-size: 20px; font-weight: 500;}
.z-index-2{z-index: 2;}
.white-space{white-space: nowrap;}
.clear{clear: both;}
.top-scroll {position: fixed; visibility: hidden; border-radius: 5px; z-index: 999; opacity: 0; bottom: 15px; right: 15px; width: 35px; height: 35px; text-align: center; line-height: 32px; font-size: 26px;}
.top-scroll.fixed{visibility: visible; opacity: 1;}

.ptb-100{padding-top: 100px; padding-bottom: 100px;}

.pt-10{padding-top: 10px;}
.pt-15{padding-top: 15px;}
.pt-25{padding-top: 25px;}
.pt-100{padding-top: 100px;}
.pb-100{padding-bottom: 100px;}

.pr-75{padding-right: 75px;}

.pb-10{padding-bottom: 10px;}
.pb-15{padding-bottom: 15px;}
.pb-20{padding-bottom: 20px;}
.pb-25{padding-bottom: 25px;}
.pb-40{padding-bottom: 40px;}
.pb-45{padding-bottom: 45px;}
.pb-55{padding-bottom: 55px;}
.pb-65{padding-bottom: 65px;}
.pb-80{padding-bottom: 80px;}
.pb-100{padding-bottom: 100px;}

.mb-15{margin-bottom: 15px;}
.mb-20{margin-bottom: 20px;}
.mb-30{margin-bottom: 30px;}
.mb-45{margin-bottom: 45px;}

/* - Headings Style   //---------------- */
h1, h2, h3, h4, h5, h6 {margin: 0; padding: 0; font-family: 'Poppins', sans-serif; font-weight: 500}

/*----- Button Style -----*/
.btn { font-family: 'Poppins', sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 1px solid; padding: 14px 22px; border-radius: 5px; position: relative; -webkit-transform: translateY(0px); transform: translateY(0px);}
.btn:hover{-webkit-transform: translateY(-5px); transform: translateY(-5px);}
.btn:before { content: ""; pointer-events: none; position: absolute; z-index: -1; top: 100%; left: 5%; height: 10px; width: 90%; opacity: 0; -webkit-transition-property: transform, opacity; transition-property: transform, opacity; transition: all 400ms ease;}
.btn.btn-2 {border-radius: 50px;}
.btn:hover:before {opacity: 1; -webkit-transform: translateY(5px); transform: translateY(5px);}
.owl-dots {padding-top: 50px; text-align: center;}
.owl-dot {width: 12px; height: 12px; margin: 0px 5px; border-radius: 100%;}

/*----- Form Style -----*/
.form-group {margin-bottom: 20px;}
.form-control { border-radius: 5px; border: 0; height: unset; padding: 13px 30px;}
textarea.form-control {min-height: 170px;}
.form-control:focus{ outline: none; box-shadow: 0px 0px 10px 1px rgb(58, 7, 152, .95);}

/* preloader */
#preloader {position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999; background-size: 80px;}

/*----- Header -----*/
header {padding: 25px 0px; position: fixed; width: 100%; top: 0; left: 0; z-index: 999;}
.logo img:hover {opacity: 0.5;}
.menu {display: flex; align-items: center; justify-content: flex-end;}
.menu ul li{display: inline-block; padding: 0px 14px; position: relative;}    
.menu ul li a{font-weight: 700; text-transform: uppercase; font-size: 16px; position: relative; padding: 10px 0px 30px 0px; color:white; }
.signin {margin-left: 30px;}
.signin .btn{padding: 9px 30px;}
.menu > ul > li > a:before { content: ""; position: absolute; bottom: 20px; left: 0; width: 0; height: 2px; transition: all 400ms ease;}
.opener{display: none; position: absolute; top: 20px; right: 15px; width: 18px; height: 18px; transform: translateY(-50%); z-index: 1;}
.opener:before{content: ""; position: absolute; top: 50%; right: 1px; width: 16px; height: 2px; transform: translateY(-50%);}
.opener:after{content: ""; position: absolute; top: 50%; right: 8px; width: 2px; height: 16px; transform: translateY(-50%); transition: all 400ms ease;}
.menu-toggle{display: none; width: 26px; height: 18px; position: absolute; top: 50%; right: 0; transform: translateY(-50%);}
.menu-toggle span, .menu-toggle span:before, .menu-toggle span:after{position: absolute; left: 50%; width: 100%; height: 2px; content: ""; transition: all 400ms ease;}
.menu-toggle span{top: 50%; transform: translate(-50%, -50%);}
.menu-toggle span:before{top: -8px; transform: translate(-50%);}
.menu-toggle span:after{top: 8px; transform: translate(-50%);}
.menu-toggle.active span:before{top: 0px; transform: translate(-50%) rotate(-45deg)}
.menu-toggle.active span:after{top: 0px; transform: translate(-50%) rotate(45deg);}
.opener.active:after {transform: rotate(90deg); top: 1px;}
.logo img {
    max-width: 60%;
    
  }
  .logo img:hover {
    opacity: 0.5;
    
  }
  .icons-navbar {
    margin-right:5px;
    margin-bottom:1px;
  }

/*----- Sticky Header -----*/
header.fixed {padding: 15px 0px;}
/*----- Sticky Header End -----*/
/*----- Header End -----*/

/*_______________________________________________________
// Home Page Style  //----------------------------
_______________________________________________________*/
/*----- Home Banner -----*/
.home-banner {padding: 180px 0px 60px 0px; overflow: hidden; background: url(/web/20220402085821im_/https://coinexpay.com/public/front/images/banner-bg.svg) no-repeat center / cover; background-attachment: fixed;}
.banner-contain h3 {margin-bottom:8px;}
.banner-heading {font-size: 50px; padding-bottom: 10px; margin-bottom:8px;}
.banner-des {font-size: 16px; margin-bottom: 30px;}
.banner-img {animation: MoveUpDown 2s linear infinite;}
.banner-contain .btn {
  margin-right:5px;
  font-weight:400;
  background:black;
  border-color:none;

}

@keyframes MoveUpDown{0%{position: relative; top:0;}50%{position: relative; top:10px;} 100%{position: relative; top:0;}}
/*----- Home Banner End -----*/



/*----- Feature Section -----*/
.bg-pattern{background: url(/web/20220402085821im_/https://coinexpay.com/public/front/images/wave.png); background-position: center 200px; background-repeat: no-repeat;}
.feature-box {max-width: 300px;}
.feature-icon img{transition: all 400ms ease;}
.feature-box:hover .feature-icon img {opacity: 0.5;}
.feature-title {font-size: 24px; font-weight: 600;}
/*----- Feature Section End -----*/

/*----- Timeline Section -----*/
.main-roadmap{overflow: hidden;}
.main-roadmap .owl-carousel .owl-stage-outer {overflow: unset;}
.h-border {border-bottom: 3px dashed; margin-top: 175px;}
.date-title { font-size: 18px; font-weight: 700; position: absolute; top: -60px; width: 100%; left: 0;}
.small-round {width: 38px; height: 38px; border: 2px solid; border-radius: 100%; position: absolute; top: -20px; left: 50%; transform: translate(-50%); z-index: 1;}
.small-round span {width: 24px; height: 24px; border-radius: 100%; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 1;}
.v-row {border-left: 3px dashed; height: 96px; position: relative; left: 50%; margin-left: -1px;}
.v-row:before {content: ""; width: 15px; height: 15px; border-radius: 100%; position: absolute; bottom: -15px; left: -9px;}
.roadmap-detail-box {max-width: 250px; margin: 0 auto; padding-top: 25px; width: 100%;}
.roadmap-slider .owl-item:nth-child(2n+0) .date-title{top: 35px;}
.roadmap-slider .owl-item:nth-child(2n+0) .v-row{top: -110px; position: absolute;}
.roadmap-slider .owl-item:nth-child(2n+0) .v-row:before{top: -5px;}
.roadmap-slider .owl-item:nth-child(2n+0) .roadmap-detail-box{position: absolute; bottom: 130px; left: 50%; transform: translate(-50%);;}
/*----- Timeline Section End -----*/

/*----- Team Section -----*/
.team-part {overflow: hidden;}
.team-img {width: 156px; height: 156px; border-radius: 100%; overflow: hidden; border: 5px solid; float: left; transition: all 400ms ease;}
.team-des {width: calc(100% - 156px); float: left; padding-left: 20px;}
.member-name {font-size: 20px; padding-bottom: 5px;}
.team-box ul li {display: inline-block; padding: 0px 15px;}
.team-box ul li:first-child{padding-left: 0;}
.team-box ul li:last-child{padding-right: 0;}
.team-part{overflow: hidden;}
/*----- Team Section End -----*/

/*----- Token Sale Section -----*/
.token-sale{background: url(/web/20220402085821im_/https://coinexpay.com/public/front/images/tokensale.svg) no-repeat; background-attachment: fixed;}
.token-graphic-detail ul li{position: relative; padding: 5px 0px; padding-left: 40px;}
.token-graphic-detail ul li:before{content: ""; position: absolute; top: 4px; left: 0; width: 27px; height: 27px; border-radius: 100%}
.token-graph {max-width: 400px; position: relative; margin: 0 auto;}
.token-graph-right {width: 400px; height: 400px; float: right;}
.graph-logo {position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);}
/*----- Token Sale Section End -----*/

/*----- Blog Section -----*/
.blog-box{padding: 0px 15px;}
.blog-img{border-radius: 5px; overflow: hidden; margin-bottom: 15px; position: relative;}
.blog-img a:before {content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; transition: all 400ms ease; z-index: 1; opacity: 0;}
.blog-box:hover .blog-img a:before{opacity: 1;}
.blog-img img{transition: all 400ms ease;}
.blog-box:hover .blog-img img{transform: scale(1.1);}
.blog-title{font-size: 18px; font-weight: 700;}
.blog-date{padding-top: 3px; padding-bottom: 5px;}
.blog-date li{display: inline-block; padding: 0px 15px; position: relative;}
.blog-date li:first-child {padding-left: 0;}
.blog-date li:before{content: ""; position: absolute; top: 8px; right: 0; width: 2px; height: 10px;}
.blog-date li:last-child:before{width: 0;}
.blog-des{padding-bottom: 8px;}
.read-more{text-decoration: underline;}
.read-more:hover{text-decoration: underline;}
/*----- Blog Section End -----*/

/*----- Ico Apps Section -----*/
.ico-apps{background: url(/web/20220402085821im_/https://coinexpay.com/public/front/images/ico-apps-bg.svg) no-repeat; background-attachment: fixed; overflow: hidden;}
/*----- Ico Apps Section End -----*/

/*----- FAQ Section -----*/
.faq-part {padding-bottom: 30px;}
.Frequently-tabs{display: block; text-align: center; border: 0;}
.Frequently-tabs li{padding: 0px 20px; display: inline-block;}
.Frequently-tabs li:first-child{padding-left: 0;}
.Frequently-tabs li:last-child{padding-right: 0;}
.Frequently-tabs li a{font-size: 16px; text-transform: uppercase; position: relative; display: block;}
.Frequently-tabs li a:before{content: ""; position: absolute; bottom: -10px; left: 50%; transform: translate(-50%); width: 0; height: 2px; transition: all 400ms ease;}
.Frequently-tabs li a.active:before{width: 80%;}
.faq-tab {max-width: 540px;}
.qus-title {font-size: 20px; font-family: 'Lato', sans-serif; font-weight: 700;}
/*----- FAQ Section End -----*/

/*_______________________________________________________
// Home Page Tow Style  //----------------------------
_______________________________________________________*/
/*----- Home Banner -----*/
.home-banner-2{overflow: hidden;}
#particle-canvas {width: 100%; height: 100%;}
#particle-canvas canvas{position: absolute !important; width: 100% !important; height: 100% !important; top: 0px; left: 0;     z-index: 0 !important; opacity: .5;}
.home-banner-2 {padding-top: 84px;}
.banner-heading-tow{font-size: 45px; text-transform: uppercase; margin-bottom: 15px;}
.home-banner-2 .banner-des{margin-bottom: 0;}
.coin-counter{border-radius: 40px; padding: 40px; text-align: center; max-width: 492px; float: right;}
.coin-start{font-size: 20px; font-family: 'Poppins', sans-serif; padding-bottom: 20px;}
.coin-head{font-size: 20px; font-weight: 600; margin-bottom: 25px;}
.coins-counter-loop{padding-bottom: 35px;}
.coins-counter-loop li{display: inline-block; padding: 0px 17px; position: relative;}
.coins-counter-loop li:first-child{padding-left: 0;}
.coins-counter-loop li:last-child{padding-right: 0;}
.coins-counter-loop li:before, .coins-counter-loop li:after{content: ""; position: absolute; right: -4px; width: 5px; height: 5px;}
.coins-counter-loop li:before{top: 29px;}
.coins-counter-loop li:after{top: 41px;}
.coins-counter-loop li:last-child:before, .coins-counter-loop li:last-child:after {content: unset;}
.coins-counter-loop li span{width: 75px; height: 75px; line-height: 75px; font-size: 35px; font-weight: 700; font-family: 'Poppins', sans-serif; display: block; border-radius: 5px;}
.coins-counter-loop li .coin-day{font-family: 'Poppins', sans-serif; text-transform: uppercase; padding-top: 8px; display: block;}
.coin-slide-text {text-align: left; font-weight: 700; padding-bottom: 10px;}
.coin-max {float: right;}
.coins-progress {width: 100%; height: 18px; border-radius: 20px; overflow: hidden; position: relative; margin-bottom: 50px;}
.coins-progress span {height: 100%; display: block; width: 0; position: absolute; font-size: 0; border-radius: 50px;}
/*----- Home Banner End -----*/





// About Page Style  //----------------------------
_______________________________________________________*/
.sub-page-banner {padding-top: 180px; padding-bottom: 90px; background: url(/web/20220402085821im_/https://coinexpay.com/public/front/images/sub-page-banner.svg); background-attachment: fixed; background-repeat: no-repeat;}
.sub-banner-title {font-size: 50px; font-weight: 600; padding-bottom: 10px;}
.sub-page-banner ul li {font-size: 16px; position: relative; display: inline-block; font-weight: 700; text-transform: uppercase; padding: 0px 30px;}
.sub-page-banner ul li:before{content: ""; position: absolute; top: 6px; right: -2px; width: 2px; height: 15px; transform: rotate(20deg);}
.sub-page-banner ul li:last-child:before{content: unset;}
.about-des {font-size: 16px;}
.about-main .work-box {position: relative; border-radius: 5px; overflow: hidden;}
.video-play {height: 300px;}
button.close {position: absolute; right: 0px; top: -35px; opacity: 1; font-size: 30px; z-index: 2;}
.play-icon {position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;}
.play-icon span {width: 97px; height: 97px; border-radius: 100%; line-height: 56px; border: 20px solid; font-size: 30px; padding-left: 6px; transition: all 400ms ease;}
.modal-open .modal {z-index: 999999; background: #0000006b;}
.modal-backdrop.show{display: none;}
.about-main {overflow: hidden;}
.about-part{overflow: hidden;}
.about-content p {
  margin-bottom:1rem;
}
/*__

/*----- Work Section -----*/
.work-part {overflow: hidden;}
.work-process-title {font-size: 30px; max-width: 500px; font-weight: 600;}
.work-des {max-width: 480px;}
ul.check-list {max-width: 500px;}
ul.check-list li{padding-bottom: 12px; display: inline-block; width: 100%;}
ul.check-list li{color:white; margin-bottom:16px;}
ul.check-list li:last-child{padding-bottom: 0;}
ul.check-list li span{width: 18px; height: 18px; line-height: 18px; border-radius: 100%; display: block; text-align: center; float: left; position: relative; top: 4px;}
ul.check-list li p{padding-left: 10px; width: calc(100% - 18px); float: left;}
.work-box img{position: relative;}
.rotation-img{-webkit-animation: rotation 15s infinite linear;}
.icon-how {
  font-size:14px;
}

@keyframes ripple{0%{transform: scale(0.8);}50%{transform: scale(1.2);}100%{transform: scale(0.8);}}
@-webkit-keyframes rotation {from {-webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(359deg);}}
/*----- Work Section End -----*/

/*----- Currency Section -----*/

.on-white {
  margin-bottom:1rem;
}

/*----- Currency Section End -----*/

/*----- Feature Section -----*/
#services-part {
  background: #000000 !important;
}

.heading-part {
  margin-bottom: 50px;
}
.frontend {
  padding:30px;
}
.ser-feature-block .services-box .ser-title {
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #131212;
}
.services-box {
 background:white;
}

/*----- Feature Section End -----*/


/*----- are you  Section -----*/

.ready-box {
  padding:60px 0;
}
.ready h3 {
  margin-bottom: .5rem;
  font-weight: 500;
  line-height: 1.2;
}

.ready p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.ready button {
  
    background-color: transparent;
    padding: 18px 26px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    border-radius: 5px;
    border: none;
    background-color: #000;
    color: #fff;

}
/*----- are you Section End -----*/
/*----- contact Section -----*/
.contact-part {
  padding:60px 0;
  background:black;
}
.contact-box {
  color: #fff;
  display: inline-block;
  text-align: left;
}
.contact-box .contact-box-detail {
  margin-left: 50px;
}
.contact-box .contact-title {
  font-size: 16px;
  margin-bottom: 0;
}

.contact-box-detail p {
  margin-bottom: 1rem;

}
.contact-box ul li {
  border-bottom: 1px solid #fff;
  margin-bottom: 30px;
  padding-bottom: 10px;
}
.contact-box ul li .contact-thumb {
  float: left;
  margin-right: 10px;
}

.icon-contact {
  color:#5d19db;
  font-size: 2em;
  
}
.contact-part .form-detail .col-md {
  margin-bottom: 30px;
}

.contact-part .form-detail .form-control {
  background: #f2f1f5;
  border: none;
  height: 50px;
  color: black;
  padding-left: 15px;
}
.form-detail button {
  
  background-color: transparent;
  padding: 18px 26px;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  border-radius: 5px;
  border: none;
  background-color: #000;
  color: #fff;

}
/*----- contact Section End -----*/

/*----- supportCurrency Start -----*/

.supportCurrency {
  padding:60px 0;
}
.container-fluid h2 {
  font-size: 35px;
  line-height: 40px;
  margin-bottom: 50px;
  letter-spacing: 0px;
  color: #000;
}
.container-fluid p {
  font-size: 14px;
}
.slider {
  display:flex;
  justify-content: space-around;
  align-items: center;
  padding:0 100px;
  
}
/*----- supportCurrency End -----*/

/*----- footer Start -----*/

.subscribe .form-group .form-control {
  background: #f2f1f5;
  border: none;
  height: 50px;
  color: black;
  padding-left: 15px;
}
/*----- footer End -----*/




/*----- Feature tow -----*/
.feature-part-2 {padding-bottom: 70px;}
.feature-box-2{position: relative;     height: 100%;}
.feature-box-2 .frontend, .feature-box-2 .backend {padding: 40px;     height: 100%;}
.feature-box-2 .frontend {-webkit-transform: rotateY(0deg); -moz-transform: rotateY(0deg); -o-transform: rotateY(0deg); transform: rotateY(0deg);}
.feature-icon-2 {width: 40px; float: left;}
.feature-content {width: calc(100% - 40px); float: left; padding-left: 20px;}
.feature-title-2 {font-size: 24px; font-weight: 600; padding-bottom: 10px;}
.feature-part-2 .backend { position: absolute; top: 0; left: 0; width: 100%; height: 100%; -webkit-transform: rotateY(180deg); -moz-transform: rotateY(180deg); -o-transform: rotateY(180deg); transform: rotateY(180deg);}
.feature-box-2 .frontend, .feature-box-2 .backend { z-index: 1; border-radius: inherit; -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -o-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-backface-visibility: hidden; -moz-backface-visibility: hidden; -o-backface-visibility: hidden; -ms-backface-visibility: hidden; backface-visibility: hidden; -webkit-perspective: inherit; perspective: inherit; -webkit-transition: transform 0.8s cubic-bezier(0.5,0.2,0.2,0.8); -moz-transition: transform 0.8s cubic-bezier(0.5,0.2,0.2,0.8); transition: transform 0.8s cubic-bezier(0.5,0.2,0.2,0.8);}
.feature-box-2:hover .backend{-webkit-transform: rotateY(0); -moz-transform: rotateY(0); -o-transform: rotateY(0); transform: rotateY(0); -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -o-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-transition: transform 1.5s cubic-bezier(0.3,1,0.6,1); -moz-transition: transform 1.5s cubic-bezier(0.3,1,0.6,1); transition: transform 1.5s cubic-bezier(0.3,1,0.6,1);}
.feature-box-2:hover .frontend { -webkit-transform: rotateY(-180deg); -moz-transform: rotateY(-180deg); -o-transform: rotateY(-180deg); transform: rotateY(-180deg); -webkit-transform-style: preserve-3d; -moz-transform-style: preserve-3d; -o-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-transition: transform 1.5s cubic-bezier(0.3,1,0.6,1); -moz-transition: transform 1.5s cubic-bezier(0.3,1,0.6,1); transition: transform 1.5s cubic-bezier(0.3,1,0.6,1);}
/*----- Feature tow End -----*/

/*----- Roadmap Section -----*/
.roadmap-part .heading-des{max-width: 740px;}
.roadmap-part .main-roadmap {margin-top: 80px;}
.roadmap-part .date-title {position: unset; font-size: 16px; text-transform: uppercase; padding-bottom: 5px;}
.roadmap-part .v-row:before{content: unset;}
.roadmap-part .small-round {width: 20px; height: 20px; top: -11px;}
.roadmap-part .small-round span {width: 8px; height: 8px;}
.roadmap-part .v-row {border-left: 1px solid; height: 50px; top: 22px;}
.roadmap-part .h-border {border-bottom: 2px solid; margin-top: 20px;}
.roadmap-part .roadmap-slider .owl-item:nth-child(2n+0) .roadmap-detail-box{position: unset; transform: unset;}
.roadmap-part .roadmap-slider .owl-item:nth-child(2n+0) .v-row{position: relative; top: 22px;}
/*----- Roadmap Section End -----*/

/*----- Team tow Section -----*/
.team-slide-box {padding: 0px 15px;}
.team-box-2 {border-radius: 5px; overflow: hidden;}
.team-member-name {text-align: center; padding: 25px 10px;}
.team-member-name a {font-size: 20px; font-weight: 700;}
.team-member-img {position: relative; overflow: hidden;}
.team-member-img img {transition: all .35s; -webkit-transition: all .35s; }
.team-box-2:hover .team-member-img img {opacity: .4;}
.team-member-img:after { transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg) translate3d(0, -101%, 0); transition: all .6s; -webkit-transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg) translate3d(0, -101%, 0); -webkit-transition: all .6s}
.team-box-2:hover .team-member-img:after {transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg) translate3d(0, 101%, 0); -webkit-transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg) translate3d(0, 101%, 0)}
.team-member-img:after {height: 100%; left: 0; top: 0; position: absolute; width: 100%; content: "";}
/*----- Team tow Section End -----*/

/*----- Token Sale tow Section -----*/
.token-sale-2{overflow: hidden;}
.token-sale-2 .heading-des{max-width: 740px;}
.token-sale-2 .token-graphic-detail {padding-left: 50px;}
.token-sale-2 .token-graphic-detail ul li{font-size: 16px;}
.token-sale-2 .token-graphic-detail ul li:before {top: 7px; width: 21px; height: 21px;}
/*----- Token Sale tow Section End -----*/

.ico-apps-2{overflow: hidden;}

/*----- FAQ tow Section -----*/
.faq-part-2 {overflow: hidden;}
.faq-part-2 .heading-des{max-width: 740px;}
.faq-part-2 .Frequently-tabs li a{padding: 15px 26px; border-radius: 5px;}
.faq-part-2 .Frequently-tabs li {padding: 0px 10px;}
.faq-part-2 .Frequently-tabs li a:before{content: unset;}
.faq-part-2 .faq-tab {padding: 45px 40px; border-radius: 5px; max-width: unset;}
.faq-part-2 .qus-title {font-size: 18px; font-weight: 400;}
.accordion-faq-title {font-size: 18px; border-radius: 5px; padding: 10px 40px; display: block; position: relative; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis;}
.accordion-faq-title.active{border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;}
.accordion-faq-title:before, .accordion-faq-title:after {content: ""; position: absolute; top: 15px; right: 40px; width: 2px; height: 15px; transition: all 400ms ease;}
.accordion-faq-title:after{width: 16px; height: 2px; right: 33px; top: 21px;}
.accordion-faq-title.active:before {transform: rotate(-90deg); top: 15px;}
.accordion-faq-content {display: none; padding: 10px 40px; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; padding-top: 0;}
/*----- FAQ tow Section End -----*/

_____________________________________________________
// Blog List Page Style  //----------------------------
_______________________________________________________*/
.blog-search {position: relative;}
.blog-search input { width: 100%; background: transparent; border: 1px solid; padding: 12px 60px 12px 30px;     border-radius: 5px;}
.blog-search-btn { border: 0; position: absolute; top: 0; right: 0; padding: 13px 16px; font-size: 20px; border-top-right-radius: 5px; border-bottom-right-radius: 5px;}
.blog-category {padding: 25px 30px; border-radius: 5px;}
.blog-cat-title { font-size: 20px; font-weight: 600; text-transform: uppercase; padding-bottom: 20px;}
.blog-category ul li {padding: 5px 0px 5px 40px; position: relative;}
.blog-category ul li:before {content: ""; position: absolute; top: 17px; left: 0px; width: 20px; height: 1px;}
.blog-category ul li a {font-family: 'Poppins', sans-serif;}
.trending-news-box {display: flex; align-items: center; width: 100%;}
.trending-news-img {width: 90px; float: left; border-radius: 5px; overflow: hidden;}
.trending-news-content {width: calc(100% - 90px); float: left; padding-left: 18px;}
.trending-news-title {font-size: 14px; font-weight: 600; display: block;}
.trending-news-date {font-size: 12px;}
.trending-news-box:hover .trending-news-img img{transform: scale(1.1);}
.blog-tags ul {margin: 0px -4px;}
.blog-tags ul li {display: inline-block; margin-bottom: 10px; padding: 0px 4px;}
.blog-tags ul li a {font-family: 'Poppins', sans-serif; display: block; padding: 5px 14px; border-radius: 5px;}
.archives ul{}
.archives ul li{border-bottom: 1px solid;}
.archives ul li a{font-family: 'Poppins', sans-serif; display: block; padding: 12px 15px; position: relative;}
.archives ul li:first-child a{padding-top: 0;}
.archives ul li a:before{content: "\f105"; font-family: fontawesome; position: absolute; left: 0;}
.blog-list-box {padding-bottom: 50px;}
.blog-list-img {border-radius: 5px; overflow: hidden; margin-bottom: 20px;}
.blog-list-title {font-size: 24px; font-family: 'Lato', sans-serif; padding-bottom: 10px; display: inline-block;}
.blog-list-content ul{padding-bottom: 20px;}
.blog-list-content ul li{display: inline-block; padding: 0px 20px; position: relative;}
.blog-list-content ul li:first-child {padding-left: 0;}
.blog-list-content ul li:before{content: ""; position: absolute; top: 8px; right: 0; width: 2px; height: 10px;}
.blog-list-content ul li:last-child:before{content: unset;}
.blog-list-des {padding-bottom: 15px;}
.blog-list-img img:hover{transform: scale(1.1);}
.blog-list-pagination ul li{display: inline-block; padding: 0px 5px;}
.blog-list-pagination ul li:first-child{padding-left: 0;}
.blog-list-pagination ul li a{display: block; width: 45px; height: 45px; border-radius: 5px; text-align: center; line-height: 45px; font-size: 16px;}

/*_______________________________________________________
// Blog Detail Page Style  //----------------------------
_______________________________________________________*/
.blog-detail-img {margin-bottom: 25px;}
.blog-detail-content ul{padding-bottom: 15px;}
.blog-detail-content ul li{display: inline-block; padding: 0px 20px; position: relative; font-size: 16px;}
.blog-detail-content ul li:first-child{padding-left: 0;}
.blog-detail-content ul li:before{content: ""; position: absolute; top: 8px; right: 0; width: 2px; height: 10px;}
.blog-detail-content ul li:last-child:before{content: unset;}
.blog-detail-content h2{font-size: 28px; font-family: 'Lato', sans-serif; padding-bottom: 15px;}
.blog-detail-content p{padding-bottom: 25px;}
.blog-detail-content blockquote{padding: 30px 40px; font-size: 16px; font-style: italic; border-left: 5px solid; border-radius: 5px; margin: 0; margin-bottom: 25px;}
.blog-detail-tag span{font-size: 18px; font-weight: 700;}
.blog-detail-tag ul{display: inline-block; padding-left: 20px;}
.blog-detail-tag ul li{display: inline-block; padding-right: 8px;}
.blog-detail-tag ul li:last-child{padding-right: 0;}
.blog-detail-tag ul li a{ display: block; padding: 8px 25px; border-radius: 5px;}
.blog-detail-social span{font-size: 18px; font-weight: 700;}
.blog-detail-social ul{display: inline-block; padding-left: 20px;}
.blog-detail-social ul li{display: inline-block; padding-right: 8px;}
.blog-detail-social ul li:last-child{padding-right: 0;}
.blog-detail-social ul li a{;display: block; width: 40px; height: 40px; text-align: center; line-height: 40px; border-radius: 5px;}
.blog-detail-tag-social {border-bottom: 1px solid; padding-bottom: 50px; margin-bottom: 50px;}
.blog-comment-heading {font-size: 28px; padding-bottom: 30px;}
.blog-comment-box li {display: flex; width: 100%; position: relative; margin-bottom: 28px; align-items: center;}
.comment-user {width: 90px; border-radius: 5px; overflow: hidden; float: left;}
.blog-comment-content {width: calc(100% - 90px); float: left; padding-left: 25px;}
.commenter {font-size: 18px;}
.comment-date {font-size: 12px; font-family: 'Poppins', sans-serif;}
.comment-des {font-family: 'Poppins', sans-serif;}
.comment-reply {font-size: 12px; font-family: 'Poppins', sans-serif; display: inline-block; padding: 6px 19px; border-radius: 5px; position: absolute; top: 0; right: 0;}
.comment-reply i {padding-left: 5px;}
.blog-comment-post-singel {border-bottom: 1px solid; padding-bottom: 20px; margin-bottom: 50px;}

/*_______________________________________________________
// Team Page Style  //----------------------------
_______________________________________________________*/
.advisors .team-img{float: unset; margin: 0 auto; margin-bottom: 20px;}
.advisors .team-des {width: 100%; float: unset; padding-left: 0;}
.advisors .member-des {max-width: 350px; margin: auto;}

/*_______________________________________________________
// Feature Page Style  //----------------------------
_______________________________________________________*/
.feature-main .work-box .btn{margin-bottom: 20px; margin-top: 20px;}

/*_______________________________________________________
// Roadmap Page Style  //----------------------------
_______________________________________________________*/
.roadmap-main-graph {padding: 50px 0px;}
.roadmap-chart {max-width: 958px; margin: 0 auto;}
.roadmap-center-line {position: absolute; top: 0; left: 50%; transform: translate(-50%); border-right: 2px dashed; height: 100%;}
.roadmap-center-line:before, .roadmap-center-line:after {content: ""; position: absolute; top: -15px; left: -7px; width: 15px; height: 15px; border-radius: 100%;}
.roadmap-center-line:after {bottom: -15px; top: unset;}
.roadmap-content-box {margin-bottom: 140px;}
.roadmap-content-box:last-child{margin-bottom: 0;}
.roadmap-main-content { max-width: 360px; position: relative; margin-left: 105px; float: right;}
.roadmap-animated{padding: 25px 30px; border-radius: 5px;}
.roadmap-date {font-size: 18px; font-family: 'Lato', sans-serif; padding-bottom: 8px;}
.roadmap-content-box:nth-child(2n + 0) .roadmap-main-content {margin-right: 105px; float: unset; margin-left: 0;}
.roadmap-main-content:before {content: ""; position: absolute; top: 50%; left: -120px; transform: translateY(-50%); width: 120px; border-bottom: 2px dashed;}
.roadmap-small-round {position: absolute; top: 50%; left: -138px; transform: translateY(-50%); width: 38px; height: 38px; border: 2px solid; border-radius: 100%; }
.roadmap-small-round:before {content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 24px; height: 24px; border-radius: 100%;}
.roadmap-content-box:nth-child(2n + 0) .roadmap-main-content:before{right: -120px; left: unset;}
.roadmap-content-box:nth-child(2n + 0) .roadmap-small-round{right: -138px; left: unset;}
.roadmap-main .main-roadmap{display: none;}
.roadmap-main .roadmap-detail-box{ padding: 10px 15px; border-radius: 5px;}
.roadmap-main .date-title{position: unset; margin-bottom: 10px;}
.roadmap-main .v-row:before{content: unset;}
.roadmap-main .roadmap-slider .owl-item:nth-child(2n+0) .roadmap-detail-box{bottom: 110px;}
.roadmap-main .main-roadmap {padding-top: 50px;}

/*_______________________________________________________
// Contact Page Style  //----------------------------
_______________________________________________________*/
.contact-form .heading-des{font-size: 16px;}
.contact-detail{padding-top: 40px;}
.contact-detail li{font-family: 'Poppins', sans-serif; font-size: 16px; display: flex; width: 100%; padding-bottom: 25px; align-items: center;}
.contact-detail li:last-child{padding-bottom: 0;}
.contact-detail li a, .contact-detail li span{width: calc(100% - 44px); float: left; padding-left: 15px;}
.contact-detail li i{width: 44px; height: 44px; line-height: 44px; border-radius: 100%; text-align: center; font-size: 20px; float: left;}
.contact-form .blog-comment-heading{font-size: 35px;}
.contact-map #map{width: 100%; height: 500px;}

/*_______________________________________________________
// Token Sale Page Style  //----------------------------
_______________________________________________________*/
.token-sele {overflow: hidden;}
.information-token-head {font-size: 24px; font-weight: 600; padding-bottom: 20px;}
.information-token li{font-family: 'Poppins', sans-serif; margin: 10px 0px; position: relative;}
.information-token li:first-child{margin-top: 0;}
.information-token li:last-child{margin-bottom: 0;}
.information-token li label{position: relative;}
.information-token li span{float: right; position: relative;}
.token-sale-counter {float: unset; max-width: 100%; border-radius: 5px; padding: 40px;}
.token-sale-counter .coins-counter-loop li span{font-size: 50px; font-weight: 400; width: unset; height: unset; line-height: 50px;}
.token-sale-counter .coins-counter-loop li .coin-day {font-size: 16px; padding-top: 15px;}
.token-sale-counter .coins-counter-loop li:before, .token-sale-counter .coins-counter-loop li:after {border-radius: 100%;}
.token-sale-counter .coins-counter-loop li:before {top: 10px;}
.token-sale-counter .coins-counter-loop li:after {top: 30px;}
.token-sale-counter .coins-counter-loop li {padding: 0px 25px;}
.token-sale-counter .coins-counter-loop li:first-child{padding-left: 0;}
.token-sale-counter .coins-counter-loop li:last-child{padding-right: 0;}
.token-slide-info{font-size: 12px; font-family: 'Poppins', sans-serif; text-transform: uppercase; padding-bottom: 10px; display: block; position: relative;}
.token-slide-info:before{content: ""; position: absolute; bottom: -20px; left: 50%; transform: translate(-50%); width: 1px; height: 30px; z-index: 1;}
.token-sale-counter .coins-progress {height: 20px; border-radius: 5px;}
.token-sale-counter .coins-progress span{border-radius: 0px;}
.currency-card{margin-top: 30px;}
.currency-card li{display: inline-block; padding: 0px 10px;}
.currency-card li a:hover{opacity: 0.5;}
.distribution-title { font-size: 24px; font-weight: 600; padding-bottom: 50px;}
.token-distribut .token-graph-right{float: unset; margin: auto; height: unset;}

/*----- Footer Section -----*/
footer.bg-pattern{background-position: center 125px; padding-bottom: 50px;}
.footer-logo img{transition: all 400ms ease;}
.footer-logo img:hover {opacity: 0.5;}
.footer {border-bottom: 1px solid; padding-bottom: 50px;}
.footer-icon ul li{display: inline-block; padding: 0px 5px;}
.footer-icon ul li:first-child{padding-left: 0;}
.footer-icon ul li a{display: block; width: 40px; height: 40px; line-height: 40px; text-align: center; border-radius: 100%; font-size: 16px;}
.footer-link ul{display: inline-block; width: 100%;}
.footer-link ul li{width: 33.33%; float: left; padding-bottom: 10px;}
.subscribe{position: relative;}
.subscribe label{font-size: 18px; padding-bottom: 15px;}
.subscribe .form-control{height: 50px; border: 0; border-radius: 5px; padding-left: 25px; padding-right: 125px;}
.subscribe .submit{font-size: 16px; font-weight: 700; position: absolute; bottom: 0; right: 0; height: 50px; border: 0; width: 115px; border-top-right-radius: 5px; border-bottom-right-radius: 5px;} 
.copyright{padding-top: 50px;}
.copyright p a{text-decoration: underline;}
.copyright ul{text-align: right;}
.copyright ul li{display: inline-block; padding: 0px 25px; position: relative;}
.copyright ul li:first-child{padding-left: 0;}
.copyright ul li:last-child{padding-right: 0;}
.copyright ul li:before{content: ""; position: absolute; top: 7px; right: 0; width: 2px; height: 12px;}
.copyright ul li:last-child:before{width: 0;}
 
@media(max-width: 1200px){
	.container{max-width: 1140px;}
}

@media(max-width: 1199px){
	.container{max-width: 960px;}
	.ptb-100 {padding-top: 80px; padding-bottom: 80px;}
	.pb-65 {padding-bottom: 50px;}
	.pb-80 {padding-bottom: 50px;}
	.pt-100 {padding-top: 80px;}
	.pb-55 {padding-bottom: 35px;}
	.pb-100 {padding-bottom: 60px;}

	/*----- Home Page -----*/
	.menu ul li{padding: 0px 20px;}
	.menu ul li a{font-size: 14px;}
	.signin {margin-left: 20px;}
	.signin .btn {padding: 9px 20px;}
	.home-banner {padding: 190px 0px 110px 0px;}

	/*----- Home Page Tow -----*/
	.coins-counter-loop li{padding: 0px 15px;}
	.coins-counter-loop li span {width: 65px; height: 65px; line-height: 65px; font-size: 30px;}
	.coins-counter-loop li:before {top: 25px;}
	.coins-counter-loop li:after {top: 37px;}
	.feature-part-2 {padding-bottom: 50px;}
	.feature-box-2 .frontend, .feature-box-2 .backend {padding: 30px;}
	.faq-part-2 .faq-tab {padding: 30px 30px;}
	.accordion-faq-title {padding: 10px 30px;}
	.accordion-faq-title:before{right: 30px;}
	.accordion-faq-title:after {right: 23px;}

	/*----- Roadmap Page -----*/
	.roadmap-main-content{max-width: 347px;}
	.roadmap-content-box {margin-bottom: 100px;}

	/*----- Token Sale Page -----*/
	.token-sale-counter .coins-counter-loop li {padding: 0px 15px;}
	.token-sale-counter .coins-counter-loop li span {font-size: 40px; line-height: 40px;}
	.token-sale-counter .coins-counter-loop li:after{top: 25px;}

}
@media(min-width: 992px){
	/*----- Menu Hover -----*/
	.menu > ul > li:hover > a:before {width: 100%;}
	.menu ul li:hover.mega-menu:before{transform: rotate(180deg);}
	.menu ul li:hover > ul {top: 48px; visibility: visible; opacity: 1;}
	.menu ul li:hover > ul ul {top: 31px; visibility: hidden; opacity: 0;}
	.menu ul ul li:hover ul {top: 0px; visibility: visible; opacity: 1;}
	.menu ul ul li:hover > a {padding-left: 30px;}
	.menu ul ul li:hover > a:before{width: 5px;}
	/*----- Menu Hover End-----*/

	/*----- Mega Menu -----*/
	.menu ul ul{position: absolute; left: 6px; min-width: 250px; text-align: left; z-index: 1; top: 70px; visibility: hidden; opacity: 0; box-shadow: 0px 0px 10px 1px rgb(58, 7, 152, .95); border-radius: 5px;}
	.menu ul ul li{display: block; padding: 0;}
	.menu ul ul li a{display: block; padding: 8px 20px; border-bottom: 1px solid; text-transform: unset; font-size: 15px;}
	.menu ul ul li a:before{content: ""; position: absolute; top: 0; left: 0; width: 0px; height: 100%; transition: all 400ms ease;}
	.menu ul li:last-child a {border-bottom: 0;}
	.menu ul ul ul{left: 100%; top: 0;}
	.mega-menu:before{content: "\f107"; font-family: fontawesome; position: absolute; right: 5px; transition: all 400ms ease; font-size: 20px;}
	.menu ul ul li.mega-menu:before{top: 8px;}
	/*----- Mega Menu End-----*/
}
@media(max-width: 991px){
	.container{max-width: 720px;}
	.ptb-100 {padding-top: 60px; padding-bottom: 60px;}
	.pb-65 {padding-bottom: 35px;}
	.pt-100 {padding-top: 60px;}
	.pb-80 {padding-bottom: 30px;}
	.pr-75 {padding-right: 25px;}
	.mb-r-30{margin-bottom: 30px;}
	.justify-center-r{justify-content: center; display: flex;}
	.owl-dots {padding-top: 30px;}
	.order-r-1{order: 1;}
	.order-r-2{order: 2;}
	.heading-title {font-size: 35px; padding-bottom: 10px;}
	.heading-title-2 {font-size: 35px;}
	.sub-heading-2 {font-size: 20px;}

	/*----- Home Page -----*/
	header {padding: 20px 0px;}
	.menu {display: none; position: fixed; top: 70px; right: 0; width: 50%; height: 100%; box-shadow: 0px 0px 10px 1px rgb(0 0 0 / 30%);}
	header.fixed .menu{top: 64px;}
	.menu > ul {display: block !important; text-align: left; padding-top: 10px;}
	.menu ul li{display: block; padding: 0; border-bottom: 1px solid #fff;}
	.opener{display: block;}
	.menu-toggle{display: block;}
	.mega-menu:before{content: unset;}
	.menu ul li a{padding: 8px 15px; display: block;}
	.signin {display: block !important; text-align: left; margin: 0;}
	.signin .btn {border: 0; padding: 8px 15px; border-bottom: 1px solid #fff; display: block; text-align: left; border-radius: 0; font-size: 14px;}
	.menu ul ul {padding-top: 0; padding-left: 20px; display: none; transition: unset;}
	.menu ul ul li{border: 0;}
	.menu ul ul li a{border-bottom: 0 !important;     text-transform: unset;}
	.home-banner {padding: 160px 0px 100px 0px;}
	.banner-heading {font-size: 35px;}
	.work-process-title {font-size: 25px;}
	.feature-part {padding-bottom: 30px;}
	.feature-contain {padding-top: 10px;}
	.feature-title {font-size: 20px;}
	.team-part {padding-bottom: 15px;}
	.team-img {width: 125px; height: 125px;}
	.team-des {width: calc(100% - 125px);}
	.token-sale .heading-des {max-width: unset;}
	.ico-apps .heading-des{max-width: 100%;}

	/*----- Home Page Tow -----*/
	.banner-heading-tow {font-size: 35px;}
	.coin-counter {border-radius: 40px; padding: 20px;}
	.coins-counter-loop li {padding: 0px 12px;}
	.coins-counter-loop li span {width: 48px; height: 48px; line-height: 48px; font-size: 24px;}
	.coins-counter-loop li .coin-day{font-size: 12px;}
	.coins-counter-loop li:before {top: 17px;}
	.coins-counter-loop li:after {top: 27px;}
	.coins-counter-loop {padding-bottom: 20px;}
	.coins-progress{margin-bottom: 30px;}
	.roadmap-des{padding: 0px 10px;}
	.ico-apps-2 .heading-des{max-width: 100%;}
	.ico-apps-2 .ico-apps-img {margin-top: 30px;}
	.accordion-faq-title:before {right: 20px;}
	.accordion-faq-title:after {right: 13px;}

	/*----- About Page -----*/
	.sub-page-banner {padding-top: 120px; padding-bottom: 80px;}
	.about-main .work-process-title{max-width: 100%;}
	.about-main .work-des{max-width: 100%;}

	

	/*----- Contact Page -----*/
	.contact-form .blog-comment-heading {font-size: 25px;}
	.contact-map #map {width: 100%; height: 350px;}

	/*----- Token Sale Page -----*/
	.token-sale-counter{margin-bottom: 30px;}

	/*----- Footer -----*/
	footer.bg-pattern{padding-bottom: 30px;}
	.footer {padding-bottom: 30px;}
	.subscribe {padding-top: 30px;}
	.copyright {padding-top: 30px;}
	.copyright p {text-align: center;}
	.copyright ul {text-align: center; margin-top: 20px;}
}

@media(max-width: 767px){
	.btn {padding: 6px 15px;}
	.ptb-100 {padding-top: 40px; padding-bottom: 40px;}
	.pt-100 {padding-top: 40px;}
	.pb-45 {padding-bottom: 40px;}
	.heading-title {font-size: 25px;}
	.section-heading {display: block;}
	.heading-title-2 {font-size: 30px; padding-bottom: 10px;}
	.sub-heading-2 {font-size: 18px;}

	/*----- Home Page -----*/
	.logo{max-width: 160px;}
	.menu-toggle{right: 15px;}
	.home-banner {padding: 120px 0px 50px 0px;}
	.banner-contain {text-align: center; margin-bottom: 30px;}
	.banner-heading {font-size: 30px;}
	.work-process-title {font-size: 20px;}
	.work-process-title {margin-top: 30px;}
	.feature-part {padding-bottom: 10px;}
	.feature-box {max-width: 100%; text-align: center;}
	.team-part {padding-bottom: 0px;}
	.team-box {display: inline-block; width: 100%; text-align: center;}
	.team-img {margin: 0 auto; float: unset; margin-bottom: 10px;}
	.team-des {width: 100%; padding-left: 0;}
	.faq-part .nav-tabs li{margin-bottom: 20px;}
	.work-box img{max-width: 90%;}
	.work-box-bg{max-width: 90%;}

	/*----- Home Page Tow -----*/
	.home-banner-2 {padding-top: 30px; min-height: 710px;}
	.banner-tow-content {text-align: center; margin-bottom: 30px;}
	.coin-counter{float: unset;}
	.banner-heading-tow {font-size: 30px;}
	.coins-counter-loop li {padding: 0px 9px;}
	.coins-counter-loop li span {width: 45px; height: 45px; line-height: 45px; font-size: 20px;}
	.coins-counter-loop li .coin-day {font-size: 11px;}
	.coin-start {font-size: 18px; padding-bottom: 10px;}
	.coin-head {margin-bottom: 15px;}
	.coins-progress {height: 10px;}
	.about-img {margin-bottom: 15px;}
	.feature-box-2 .frontend, .feature-box-2 .backend {padding: 15px;}
	.feature-part-2 {padding-bottom: 10px;}
	.roadmap-part .main-roadmap {margin-top: 40px;}
	.token-sale-2 .token-graphic-detail {padding-left: 0;}
	.graph-logo img{max-width: 160px;}
	.faq-part-2 .Frequently-tabs li {padding: 0px 5px; margin-bottom: 10px;}
	.faq-part-2 .Frequently-tabs li a {padding: 5px 10px;}
	.Frequently-tabs{padding-bottom: 20px;}
	.faq-part-2 .faq-tab {padding: 15px 15px;}
	.accordion-faq-title {padding: 10px 30px 10px 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 16px;}
	.accordion-faq-title:before {right: 17px;}
	.accordion-faq-title:after {right: 10px;}



	/*----- Footer -----*/
	.footer-icon {margin-bottom: 30px;}
	.footer-link {margin-bottom: 20px;}
	.subscribe {padding-top: 0;}
	.footer-link ul li {width: 50%;}

}

@media(max-width: 480px){
	/*----- Token Sale Page -----*/
	.token-sale-counter .coins-counter-loop li {padding: 0px 6px;}
	.token-sale-counter .coins-counter-loop li span {font-size: 20px; line-height: 20px;}
	.token-sale-counter .coins-counter-loop li .coin-day {font-size: 14px; padding-top: 3px;}
	.information-token li{margin: 15px 0px; text-align: center;}
	.information-token li label{width: 100%;}
	.information-token li span {float: unset; width: 100%;}

}

@media(max-width: 374px){
	/*----- Home Page -----*/
	.listtopie-svg {width: 280px; height: 280px;}
	.token-graph-right{height: 300px;}
	.listtopie-initialized {display: flex; justify-content: center;
}



`;
export default Wrapper;
