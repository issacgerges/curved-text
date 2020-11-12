export function Inspector({
  fontFamily,
  setFontFamily,
  scale,
  setScale,
  shape,
  setShape,
}) {
  return (
    <div className="inspector">
      <div>
        <input
          type="text"
          placeholder="Font Family"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        />
      </div>
      <div>
        <input
          type="range"
          placeholder="Scale"
          value={scale}
          min="0"
          max="15"
          onChange={(e) => {
            setScale(e.target.value);
          }}
        />
      </div>
      <div>
        <select
          name="shape"
          value={shape}
          onChange={(e) => setShape(e.target.value)}
        >
          <option value="squiggle">Squiggle</option>
          <option value="arc">Arc</option>
          <option value="line">Line</option>
        </select>
      </div>
    </div>
  );
}
