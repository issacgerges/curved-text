import sanitizeHtml from "sanitize-html";
import { useState, useRef, useEffect } from "react";
import ContentEditable from "react-contenteditable";

const SQUIGGLE =
  "M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145";
const ARC =
  "M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97";
const LINE = "M 50,50 L 500,500";

export function Text({ fontFamily, fontSize, initialText, scale, shape }) {
  const [text, setText] = useState(initialText || "Type something...");
  const [isEditing, setEditing] = useState(false);
  const contentEditable = useRef();
  const svg = useRef();

  const focusAndSelect = () => {
    setImmediate(() => {
      contentEditable.current.focus();
      document.execCommand("selectAll", false, null);
    });
  };
  const resizeSvg = () => {
    const elem = svg.current;
    const bbox = elem.getBBox();
    elem.setAttribute("width", bbox.width + "px");
    elem.setAttribute("height", bbox.height + "px");
    elem.setAttribute(
      "viewBox",
      `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
    );
  };

  useEffect(() => {
    resizeSvg();
  }, [shape]);

  const toggleEdit = () => {
    if (isEditing) {
      setEditing(false);
    } else {
      setEditing(true);
      focusAndSelect();
    }
  };

  const handleChange = (evt) => {
    const clean = sanitizeHtml(evt.target.value, {
      allowedTags: [],
    });
    setText(clean);
    resizeSvg();
  };

  let path = LINE;
  if (shape === "squiggle") {
    path = SQUIGGLE;
  } else if (shape === "arc") {
    path = ARC;
  }

  return (
    <>
      <svg
        style={{
          userSelect: "none",
          position: "absolute",
          transform: `scale(${scale})`,
          transformOrigin: "0px 0px",
          top: 0,
          left: 0,
        }}
        ref={svg}
      >
        <path id="curve" fill="transparent" d={path} />
        <text fontFamily={fontFamily} onDoubleClick={toggleEdit} x="25">
          <textPath
            xlinkHref="#curve"
            opacity={isEditing ? 0.1 : 1}
            fontSize={fontSize}
          >
            {text}
          </textPath>
        </text>
      </svg>
      {isEditing ? (
        <ContentEditable
          innerRef={contentEditable}
          html={text}
          onChange={handleChange}
          onBlur={toggleEdit}
          style={{
            fontFamily,
            position: "absolute",
            transform: `scale(${scale}) translate(0px, calc(50% * ${scale}))`,
            fontFeatureSettings: `"dlig" 0, "liga" 0`,
            outline: "none",
            fontSize,
            transformOrigin: `center left`,
          }}
        />
      ) : null}
    </>
  );
}
