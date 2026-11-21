import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f0e4",
      }}
    >
      <div
        style={{
          width: 124,
          height: 124,
          border: "7px solid #252c38",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 54,
          fontWeight: 700,
          color: "#252c38",
          position: "relative",
        }}
      >
        DB
        <div
          style={{
            position: "absolute",
            top: -14,
            right: -14,
            width: 26,
            height: 26,
            background: "#ba6818",
          }}
        />
      </div>
    </div>,
    size,
  );
}
