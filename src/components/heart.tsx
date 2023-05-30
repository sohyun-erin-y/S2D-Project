import { useState } from "react";

const SERVER = "https://s2dlab.click:443/data/stat";

export default function Heart() {
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const emptyHeart = (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="64px"
      height="64px"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      xmlSpace="preserve"
      fill="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="2.304"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path
            fill="#ffffff"
            d="M48,5c-4.418,0-8.418,1.793-11.312,4.688L32,14.344l-4.688-4.656C24.418,6.793,20.418,5,16,5 C7.164,5,0,12.164,0,21c0,4.418,2.852,8.543,5.75,11.438l23.422,23.426c1.562,1.562,4.094,1.562,5.656,0L58.188,32.5 C61.086,29.605,64,25.418,64,21C64,12.164,56.836,5,48,5z M32,47.375L11.375,26.75C9.926,25.305,8,23.211,8,21c0-4.418,3.582-8,8-8 c2.211,0,4.211,0.895,5.656,2.344l7.516,7.484c1.562,1.562,4.094,1.562,5.656,0l7.516-7.484C43.789,13.895,45.789,13,48,13 c4.418,0,8,3.582,8,8c0,2.211-1.926,4.305-3.375,5.75L32,47.375z"
          ></path>
          <path
            fill="#343740"
            d="M32,47.375L11.375,26.75C9.926,25.305,8,23.211,8,21c0-4.418,3.582-8,8-8c2.211,0,4.211,0.895,5.656,2.344 l7.516,7.484c1.562,1.562,4.094,1.562,5.656,0l7.516-7.484C43.789,13.895,45.789,13,48,13c4.418,0,8,3.582,8,8 c0,2.211-1.926,4.305-3.375,5.75L32,47.375z"
          ></path>
        </g>
      </g>
    </svg>
  );
  const filledHeart = (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="64px"
      height="64px"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      xmlSpace="preserve"
      fill="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="2.304"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path
            fill="#ffffff"
            d="M48,5c-4.418,0-8.418,1.793-11.312,4.688L32,14.344l-4.688-4.656C24.418,6.793,20.418,5,16,5 C7.164,5,0,12.164,0,21c0,4.418,2.852,8.543,5.75,11.438l23.422,23.426c1.562,1.562,4.094,1.562,5.656,0L58.188,32.5 C61.086,29.605,64,25.418,64,21C64,12.164,56.836,5,48,5z M32,47.375L11.375,26.75C9.926,25.305,8,23.211,8,21c0-4.418,3.582-8,8-8 c2.211,0,4.211,0.895,5.656,2.344l7.516,7.484c1.562,1.562,4.094,1.562,5.656,0l7.516-7.484C43.789,13.895,45.789,13,48,13 c4.418,0,8,3.582,8,8c0,2.211-1.926,4.305-3.375,5.75L32,47.375z"
          ></path>
          <path
            fill="#ff0000"
            d="M32,47.375L11.375,26.75C9.926,25.305,8,23.211,8,21c0-4.418,3.582-8,8-8c2.211,0,4.211,0.895,5.656,2.344 l7.516,7.484c1.562,1.562,4.094,1.562,5.656,0l7.516-7.484C43.789,13.895,45.789,13,48,13c4.418,0,8,3.582,8,8 c0,2.211-1.926,4.305-3.375,5.75L32,47.375z"
          ></path>
        </g>
      </g>
    </svg>
  );

  const clickHeart = () => {
    const type = clicked ? "decrement" : "increment";
    const payload = { metric: "heart-shake" };

    setClicked(!clicked);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);

    fetch(SERVER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        payload,
      }),
    })
      .then(async (response) => {
        console.log(await response.text());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      id="heart"
      onClick={clickHeart}
      style={{ pointerEvents: disabled ? "none" : "auto" }}
    >
      {clicked ? filledHeart : emptyHeart}
    </div>
  );
}
