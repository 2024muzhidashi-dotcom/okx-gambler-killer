console.log("OKX 100x Killer - ONE TIME MODE");

const DECLARATION =
  "我要做赌狗，我愿意承担失去一切的代价！（只保护一次）";

function isDerivativesPage() {
  const url = window.location.href.toLowerCase();
  return (
    url.includes("swap") ||
    url.includes("futures") ||
    url.includes("margin")
  );
}

function lockPage() {
  document.documentElement.innerHTML = "";

  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    background: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "18px",
    textAlign: "center",
    padding: "20px"
  });

  overlay.innerHTML = `
    <h2 style="margin-bottom:20px;">🚫 高杠杆交易已锁定</h2>
    <p style="margin-bottom:20px;">请输入完整宣言才可继续：</p>
    <p style="margin-bottom:30px; color:#ff5555;">
      ${DECLARATION}
    </p>
  `;

  const input = document.createElement("input");
  input.type = "text";
  input.style.padding = "10px";
  input.style.width = "350px";
  input.style.marginBottom = "20px";
  input.style.fontSize = "16px";

  const button = document.createElement("button");
  button.innerText = "确认";
  button.style.padding = "10px 20px";
  button.style.fontSize = "16px";

  button.onclick = () => {
    if (input.value.trim() === DECLARATION) {
      localStorage.setItem("okx_unlock", "true");
      location.reload();
    } else {
      alert("宣言错误。");
    }
  };

  overlay.appendChild(input);
  overlay.appendChild(button);
  document.body.appendChild(overlay);
}

if (isDerivativesPage()) {
  if (localStorage.getItem("okx_unlock") === "true") {
    console.log("Unlocked permanently.");
  } else {
    window.addEventListener("DOMContentLoaded", lockPage);
  }
}