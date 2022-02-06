// Dependencies
import { useContext } from "react";

// Contexts
import { AppContext } from "Contexts/App";

// Style
import * as S from "./style";

// Template
const InfoAbout = ({ isAdult, about }) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  const domparser = new DOMParser();
  const html = domparser.parseFromString(about, "text/html");

  const tagsWhitelist = [
    "a",
    "b",
    "big",
    "blockquote",
    "br",
    "center",
    "dd",
    "div",
    "dl",
    "dt",
    "font",
    "hr",
    "i",
    "img",
    "li",
    "ol",
    "p",
    "pre",
    "s",
    "small",
    "span",
    "strike",
    "strong",
    "sub",
    "sup",
    "table",
    "tbody",
    "td",
    "th",
    "tr",
    "u",
    "ul",
  ];

  for (let el of html.querySelectorAll("body *")) {
    if (!tagsWhitelist.includes(el.tagName.toLowerCase())) {
      el.parentNode.removeChild(el);
    }
  }

  return (
    <S.AboutWrapper>
      <S.About isBlured={isAdult && !displayAdult}>
        <div
          dangerouslySetInnerHTML={{
            __html: html.querySelector("body").innerHTML,
          }}
        />
      </S.About>
    </S.AboutWrapper>
  );
};

export default InfoAbout;
