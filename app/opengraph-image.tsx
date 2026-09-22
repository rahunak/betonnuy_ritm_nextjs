import { ImageResponse } from "next/og";

export const alt =
  "Бетонный Ритм — подъём домов, замена фундамента и монолитные работы в Витебске и Беларуси";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #111110 0%, #2D2B28 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            width: 96,
            height: 6,
            background: "#C41A1A",
            marginBottom: 40,
            display: "flex",
          }}
        />
        <div
          style={{
            color: "#fff",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          Бетонный Ритм
        </div>
        <div
          style={{
            color: "#D9D2C5",
            fontSize: 30,
            lineHeight: 1.3,
            display: "flex",
            maxWidth: 920,
            marginTop: 24,
          }}
        >
          Подъём домов, замена фундамента и монолитные работы в Витебске и по всей Беларуси
        </div>
        <div
          style={{
            display: "flex",
            color: "#C41A1A",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 6,
            marginTop: 48,
            textTransform: "uppercase",
          }}
        >
          betonniy-ritm.by
        </div>
      </div>
    ),
    { ...size }
  );
}
