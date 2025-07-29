// import { useState } from "@wordpress/element";
// import { __ } from "@wordpress/i18n";
// import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import "../style.scss";

export const SitePreview = () => {
    console.log('sitePreview component');
//   const [hovered, setIsHovered] = useState(false);
//   const [editUrl, setEditUrl] = useState("");


//   const handleMouseOver = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };
//   const iframeOnLoad = () => {
//     if(window.frames["iframe-preview"].document.getElementById("wpadminbar")){
//       window.frames["iframe-preview"].document.getElementById(
//         "wpadminbar"
//       ).style.display = "none";
//     }
//   };

  return (
    <div className="nfd-iframe-outer nfd-flex-col nfd-h-full">
        <div className="nfd-iframe-innernfd-w-full nfd-min-h-full nfd-relative">
            <iframe
                // onLoad={iframeOnLoad}
                id="iframe-preview"
                title="Preview"
                className="nfd-iframe nfd-w-[400%] nfd-min-h-[400%] nfd-basis-full nfd-scale-[0.25] nfd-overflow-hidden nfd-absolute nfd-origin-top-left"
                src={ window.NewfoldRuntime.homeUrl + "/?preview=coming_soon"
                // !comingSoon
                    // ? window.NewfoldRuntime.homeUrl
                    // : window.NewfoldRuntime.homeUrl + "/?preview=coming_soon"
                }
                scrolling="no"
                name="iframe-preview"
                sandbox="allow-scripts allow-same-origin"
                seamless
            ></iframe>
        </div>
    </div>
  );
};
