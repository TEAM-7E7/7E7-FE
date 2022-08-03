import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTag = ({
  description = "마켓클립, 영상으로 즐기는 중고거래",
  keywords = "",
  title = "마켓클립 | Market Clip",
  imgsrc = "https://marketclipimages.s3.ap-northeast-2.amazonaws.com/Market_Clip_OG_Image.jpg",
  url = "https://marketclip.kr",
}) => {
  // props로 content 내용을 불러올 예정임
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} data-react-helmet="true" />
      {/*<meta name="keywords" content={keywords} />*/}
      <meta charSet="utf-8" />
      <meta property="og:type" content="website" data-react-helmet="true" />
      <meta property="og:title" content="마켓클립 | Market Clip" data-react-helmet="true" />
      <meta property="og:site_name" content={title} data-react-helmet="true" />
      <meta property="og:description" content={description} data-react-helmet="true" />
      <meta property="og:image" content={imgsrc} data-react-helmet="true" />
      <meta property="og:url" content={url} data-react-helmet="true" />

      <meta name="twitter:title" content="마켓클립 | Market Clip" />
      <meta name="twitter:description" content={description} data-react-helmet="true" />
      <meta name="twitter:image" content={imgsrc} data-react-helmet="true" />

      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default MetaTag;
