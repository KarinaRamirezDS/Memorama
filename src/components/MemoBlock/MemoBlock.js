import "./MemoBlock.css";
import { Howl } from "howler";
import volteo from "../../assets/mario-bros-hammer-throw.mp3";
//Sonido para las cartas
let sound = new Howl({
  src: [volteo],
});

const MemoBlock = ({ animating, handleMemoClick, memoBlock }) => (
  <div
    className="memo-block"
    onClick={() =>
      !memoBlock.flipped &&
      !animating &&
      sound.play() &&
      handleMemoClick(memoBlock)
    }
  >
    <div
      className={`memo-block-inner ${
        memoBlock.flipped && "memo-block-flipped"
      }`}
    >
      <div className="memo-block-front"></div>
      <div className="memo-block-back">{memoBlock.imagen}</div>
    </div>
  </div>
);

export default MemoBlock;
