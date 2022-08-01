import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTag = ({
  description = "마켓클립, 영상으로 즐기는 중고거래",
  keywords = "",
  title = "마켓클립 | Market Clip",
  imgsrc = "%PUBLIC_URL%/metatag.jpg",
  url = "https://marketclip.kr",
}) => {
  // props로 content 내용을 불러올 예정임
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} data-react-helmet="true" />
      {/*<meta name="keywords" content={keywords} />*/}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} data-react-helmet="true" />
      <meta property="og:image" content={imgsrc} />
      <meta property="og:url" content={url} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgsrc} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default MetaTag;
