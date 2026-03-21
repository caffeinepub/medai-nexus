export default function BokehBackground() {
  return (
    <>
      {/* Bokeh orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* Cyan orb — top-left, large */}
        <div
          style={{
            position: "absolute",
            width: 750,
            height: 750,
            top: "-15%",
            left: "-12%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,209,255,0.28) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        {/* Pink orb — top-right */}
        <div
          style={{
            position: "absolute",
            width: 680,
            height: 680,
            top: "2%",
            right: "-10%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,93,187,0.22) 0%, transparent 65%)",
            filter: "blur(65px)",
          }}
        />
        {/* Blue accent — mid-left */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            top: "40%",
            left: "-5%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(102,126,234,0.20) 0%, transparent 65%)",
            filter: "blur(55px)",
          }}
        />
        {/* Lavender — center */}
        <div
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            top: "30%",
            left: "25%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(183,148,246,0.16) 0%, transparent 60%)",
            filter: "blur(90px)",
          }}
        />
        {/* Blue orb — bottom-left */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            bottom: "2%",
            left: "3%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(102,126,234,0.20) 0%, transparent 65%)",
            filter: "blur(65px)",
          }}
        />
        {/* Deep purple — bottom-right */}
        <div
          style={{
            position: "absolute",
            width: 580,
            height: 580,
            bottom: "5%",
            right: "5%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(118,75,162,0.25) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        {/* Hot magenta accent — mid-right */}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            top: "55%",
            right: "2%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,80,200,0.14) 0%, transparent 65%)",
            filter: "blur(45px)",
          }}
        />
      </div>

      {/* Scanline texture */}
      <div aria-hidden="true" className="scanlines" />
    </>
  );
}
