import React from "react";
import Image from "next/image";

const Logo = ({ height=80, width=80 }) => {
  return (
    <>
      <Image
        src="https://bitholla-sandbox.s3.ap-northeast-2.amazonaws.com/exchange/Sandbox_HollaEx/EXCHANGE_LOGO__white.png"
        alt="Vercel Logo"
        width={width}
        height={height}
        className="m-auto"
      />
    </>
  );
};

export default Logo;
