import { forwardRef, LegacyRef } from "react";
import { Link, To } from "react-router-dom";

export const RouterLink = forwardRef(function RouterLink(props: {href: To}, ref:  LegacyRef<HTMLAnchorElement> | undefined) {
    const { href } = props;
  
    return (
      <Link
        ref={ref}
        to={href} 
      />
    );
  });