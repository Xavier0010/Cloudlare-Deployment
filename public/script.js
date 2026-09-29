function getWIBIsoString() {
    const now = new Date();
    // Offset for UTC+7 (WIB) in milliseconds
    const wibTime = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
    
    const pad = (num, len = 2) => String(num).padStart(len, '0');
    const YYYY = wibTime.getFullYear();
    const MM = pad(wibTime.getMonth() + 1);
    const DD = pad(wibTime.getDate());
    const hh = pad(wibTime.getHours());
    const mm = pad(wibTime.getMinutes());
    const ss = pad(wibTime.getSeconds());
    const ms = pad(wibTime.getMilliseconds(), 3) + "000";

    return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}.${ms}+07:00`;
}

function createQRPayload(qrType) {
    return JSON.stringify({
        id: 1,
        lemdikId: 4,
        createdAt: getWIBIsoString(),
        type: qrType
    });
}

function renderQR(containerId, qrType) {
    const payload = createQRPayload(qrType);
    const qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        type: "svg",
        data: payload,
        dotsOptions: {
            color: "#000000",
            type: "square"
        },
        backgroundOptions: {
            color: "#ffffff"
        },
        cornersSquareOptions: {
            type: "square"
        },
        cornersDotOptions: {
            type: "square"
        }
    });

    const container = document.getElementById(containerId);
    container.innerHTML = "";
    qrCode.append(container);
}

function scheduleRefresh() {
    const now = new Date();
    const next = new Date();

    next.setHours(5, 0, 0, 0);

    if (now >= next) {
        next.setDate(next.getDate() + 1);
    }

    const delay = next - now;

    setTimeout(() => {
        window.location.reload();
    }, delay);
}

document.addEventListener("DOMContentLoaded", () => {
    renderQR("qr-datang", "QR Datang");
    renderQR("qr-pulang", "QR Pulang");
    scheduleRefresh();
});
