import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import data from "./sounds.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faTag, faNoteSticky, faTriangleExclamation, faXmark, faSmog, faCube, faBottleDroplet, faSkull, faHeadphones, faDog, faUsers, faRecordVinyl, faBorderNone, faArrowPointer, faCloudSun } from "@fortawesome/free-solid-svg-icons";

const dataType = data["sound_definitions"];
const initialSoundList = Object.entries(dataType)
  .map(([name, val], i) => {
    const category = Object.entries(val)[0]?.[1] ?? "";
    return [category, name, i] as const;
  })
  .sort();

const App = () => {
  const [nowSelect, setNowSelect] = useState("0");
  const [nowSoundList, setNowSoundList] = useState(initialSoundList);
  const [nowOpen, setOpen] = useState(false);
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setNowSelect(selected);
    if (selected === "0") {
      setNowSoundList(initialSoundList);
    } else {
      setNowSoundList(initialSoundList.filter((s) => s[0] === selected));
    }
  };
  const changeOpen = () => {
    setOpen(!nowOpen);
  };
  const copyClipboard = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      const text = e.currentTarget.textContent;
      await navigator.clipboard.writeText(text);
      alert(`${text}をコピーしました`);
    }
    catch (err){
      alert("コピーに失敗しました");
      console.log(err);
    }
  };
  return (
    <div>
      <h1 className="m-4 text-4xl font-bold flex justify-center text-white">
        MinecraftSounds
      </h1>
      <button className="absolute top-5 right-5 z-100 cursor-pointer text-white text-3xl hover:text-gray-300" onClick={changeOpen}>
        <FontAwesomeIcon icon={faNoteSticky}/>
      </button>
      {nowOpen && (
        <div className="fixed inset-20 bg-white rounded-xl">
          <h2 className="text-xl font-bold m-2">タグの意味一覧</h2>
          <button onClick={changeOpen} className="absolute top-3 right-3 cursor-pointer text-gray-300 hover:text-gray-500">
            <FontAwesomeIcon icon={faXmark}/>
          </button>
          <div><FontAwesomeIcon icon={faTriangleExclamation} style={{color:"red"}}/>探しているサウンドが必ずこの属性に属しているとは限りません</div>
          <ul className="m-2 text-lg">
            <li>ambient：環境</li>
            <li>block：ブロック系</li>
            <li>bottle：ボトル</li>
            <li>hostile：敵対モブ系</li>
            <li>music：音楽</li>
            <li>neutral：中立モブ系</li>
            <li>player：プレイヤー系</li>
            <li>record：レコード系</li>
            <li>true：属性なし？</li>
            <li>ui：UI、ボタン系</li>
            <li>weather：天候系</li>
          </ul>
        </div>
      )}
      <div className="flex justify-center">
        <div>
          <select
            id="category-select"
            name="category"
            className="bg-white rounded-lg px-2 py-1 cursor-pointer border-2 border-violet-500"
            value={nowSelect}
            onChange={handleSelectChange}
          >
            <option value="0">選択なし</option>
            {Array.from(new Set(initialSoundList.map((s) => s[0]).filter(Boolean))).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {nowSoundList.map((s) => (
            <label key={s[2]}>
              <button onClick={copyClipboard} type="button" className="hidden">{s[1]}</button>
            <div
              className="m-6 border-3 border-violet-500 rounded-sm p-2 text-lg flex justify-between text-white cursor-pointer"
              key={s[2]}
            >
              <span className="mx-2 font-semibold">
                <FontAwesomeIcon icon={faMusic} style={{ color: "violet" }} />
                SoundName：{s[1]}
              </span>
              <span className="mx-2 font-semibold">
                <FontAwesomeIcon icon={faTag} style={{ color: "violet" }} />
                Category：{s[0]}
                {s[0] === "ambient" && (
                  <FontAwesomeIcon icon={faSmog} className="mx-1"/>
                )}
                {s[0] === "block" && (
                  <FontAwesomeIcon icon={faCube} className="mx-1"/>
                )}
                {s[0] === "bottle" && (
                  <FontAwesomeIcon icon={faBottleDroplet} className="mx-1"/>
                )}
                {s[0] === "hostile" && (
                  <FontAwesomeIcon icon={faSkull} className="mx-1"/>
                )}
                {s[0] === "music" && (
                  <FontAwesomeIcon icon={faHeadphones} className="mx-1"/>
                )}
                {s[0] === "neutral" && (
                  <FontAwesomeIcon icon={faDog} className="mx-1"/>
                )}
                {s[0] === "player" && (
                  <FontAwesomeIcon icon={faUsers} className="mx-1"/>
                )}
                {s[0] === "record" && (
                  <FontAwesomeIcon icon={faRecordVinyl} className="mx-1"/>
                )}
                {s[0] === "true" && (
                  <FontAwesomeIcon icon={faBorderNone} className="mx-1"/>
                )}
                {s[0] === "ui" && (
                  <FontAwesomeIcon icon={faArrowPointer} className="mx-1"/>
                )}
                {s[0] === "weather" && (
                  <FontAwesomeIcon icon={faCloudSun} className="mx-1"/>
                )}
              </span>
            </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;