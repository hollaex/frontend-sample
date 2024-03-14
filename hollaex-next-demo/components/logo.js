import Image from "next/image";
import React from "react";

const Logo = ({ src, alt, className }) => {
  return (
    <>
      <Image
        src="https://bitholla-sandbox.s3.ap-northeast-2.amazonaws.com/exchange/Sandbox_HollaEx/EXCHANGE_LOGO__white.png"
        alt="Vercel Logo"
        width={80}
        height={80}
        className="m-auto"
      />
    </>
  );
};

export default Logo;
