import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          "hide-logo"?: string;
          events?: string;
        },
        HTMLElement
      >;
    }
  }
  namespace React.JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          "hide-logo"?: string;
          events?: string;
        },
        HTMLElement
      >;
    }
  }
}
