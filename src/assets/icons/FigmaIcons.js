export function UploadIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.2857 27.5294H25.7143V14.8235H36L18 0L0 14.8235H10.2857V27.5294ZM18 5.99294L23.58 10.5882H20.5714V23.2941H15.4286V10.5882H12.42L18 5.99294ZM0 31.7647H36V36H0V31.7647Z"
        fill={color}
      />
    </svg>
  );
}

export function CameraIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 104 94" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M93.3333 10.6666H76.9549L67.4999 0.333252H36.4999L27.0449 10.6666H10.6666C4.98325 10.6666 0.333252 15.3166 0.333252 20.9999V82.9999C0.333252 88.6833 4.98325 93.3333 10.6666 93.3333H93.3333C99.0166 93.3333 103.667 88.6833 103.667 82.9999V20.9999C103.667 15.3166 99.0166 10.6666 93.3333 10.6666ZM93.3333 82.9999H10.6666V20.9999H31.5916L41.0466 10.6666H62.9533L72.4083 20.9999H93.3333V82.9999ZM51.9999 26.1666C37.7399 26.1666 26.1666 37.7399 26.1666 51.9999C26.1666 66.2599 37.7399 77.8333 51.9999 77.8333C66.2599 77.8333 77.8333 66.2599 77.8333 51.9999C77.8333 37.7399 66.2599 26.1666 51.9999 26.1666ZM51.9999 67.4999C43.4749 67.4999 36.4999 60.5249 36.4999 51.9999C36.4999 43.4749 43.4749 36.4999 51.9999 36.4999C60.5249 36.4999 67.4999 43.4749 67.4999 51.9999C67.4999 60.5249 60.5249 67.4999 51.9999 67.4999Z"
        fill={color}
      />
    </svg>
  );
}

export function ImageIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M83.1667 10.8333V83.1667H10.8333V10.8333H83.1667ZM83.1667 0.5H10.8333C5.15 0.5 0.5 5.15 0.5 10.8333V83.1667C0.5 88.85 5.15 93.5 10.8333 93.5H83.1667C88.85 93.5 93.5 88.85 93.5 83.1667V10.8333C93.5 5.15 88.85 0.5 83.1667 0.5ZM44.4167 72.8333L31.5 52.89L16 72.8333H78L58.0567 46.2767L44.4167 72.8333Z"
        fill={color}
      />
    </svg>
  );
}

export function MessageIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.3 0.5H2.7C1.215 0.5 0 1.715 0 3.2V27.5L5.4 22.1H24.3C25.785 22.1 27 20.885 27 19.4V3.2C27 1.715 25.785 0.5 24.3 0.5Z" />
    </svg>
  );
}

export function AlarmIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.6715 30C13.3638 30 14.7484 28.6154 14.7484 26.9231H8.59458C8.59458 28.6154 9.96381 30 11.6715 30ZM20.9023 20.7692V13.0769C20.9023 8.35385 18.3792 4.4 13.9792 3.35385V2.30769C13.9792 1.03077 12.9484 0 11.6715 0C10.3946 0 9.36381 1.03077 9.36381 2.30769V3.35385C4.94843 4.4 2.44073 8.33846 2.44073 13.0769V20.7692L0.456119 22.7538C-0.513112 23.7231 0.163811 25.3846 1.53304 25.3846H21.7946C23.1638 25.3846 23.8561 23.7231 22.8869 22.7538L20.9023 20.7692Z"
        fill={color}
      />
    </svg>
  );
}

export function PersonIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 12C15.315 12 18 9.315 18 6C18 2.685 15.315 0 12 0C8.685 0 6 2.685 6 6C6 9.315 8.685 12 12 12ZM12 15C7.995 15 0 17.01 0 21V22.5C0 23.325 0.675 24 1.5 24H22.5C23.325 24 24 23.325 24 22.5V21C24 17.01 16.005 15 12 15Z"
        fill={color}
      />
    </svg>
  );
}

export function MuteIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.7 0.325C0.266667 0.758333 0.266667 1.45833 0.7 1.89167L4.76667 5.95833L4.44444 6.29167H1.11111C0.5 6.29167 0 6.79167 0 7.40278V11.8472C0 12.4583 0.5 12.9583 1.11111 12.9583H4.44444L8.1 16.6139C8.8 17.3139 10 16.8139 10 15.825V11.1917L14.6444 15.8361C14.1 16.2472 13.5111 16.5917 12.8667 16.8472C12.4667 17.0139 12.2222 17.4361 12.2222 17.8694C12.2222 18.6694 13.0333 19.1806 13.7667 18.8806C14.6556 18.5139 15.4889 18.025 16.2333 17.425L17.7222 18.9139C18.1556 19.3472 18.8556 19.3472 19.2889 18.9139C19.7222 18.4806 19.7222 17.7806 19.2889 17.3472L2.27778 0.325C1.84444 -0.108333 1.14444 -0.108333 0.7 0.325ZM17.7778 9.625C17.7778 10.5361 17.6111 11.4139 17.3222 12.225L19.0222 13.925C19.6444 12.625 20 11.1694 20 9.625C20 5.36944 17.3333 1.725 13.5778 0.291666C12.9222 0.0361109 12.2222 0.547222 12.2222 1.24722V1.45833C12.2222 1.88056 12.5 2.24722 12.9 2.40278C15.7556 3.55833 17.7778 6.35833 17.7778 9.625ZM8.1 2.63611L7.91111 2.825L10 4.91389V3.41389C10 2.425 8.8 1.93611 8.1 2.63611ZM15 9.625C15 7.65833 13.8667 5.96944 12.2222 5.14722V7.13611L14.9778 9.89167C14.9889 9.80278 15 9.71389 15 9.625Z"
        fill={color}
      />
    </svg>
  );
}

export function NotMuteIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 7.17891V11.6234C0 12.2345 0.5 12.7345 1.11111 12.7345H4.44444L8.1 16.39C8.8 17.09 10 16.59 10 15.6011V3.19003C10 2.20114 8.8 1.70114 8.1 2.40114L4.44444 6.0678H1.11111C0.5 6.0678 0 6.5678 0 7.17891ZM15 9.40114C15 7.43447 13.8667 5.74558 12.2222 4.92336V13.8678C13.8667 13.0567 15 11.3678 15 9.40114ZM12.2222 1.01225V1.23447C12.2222 1.65669 12.5 2.02336 12.8889 2.17891C15.7556 3.32336 17.7778 6.13447 17.7778 9.40114C17.7778 12.6678 15.7556 15.4789 12.8889 16.6234C12.4889 16.7789 12.2222 17.1456 12.2222 17.5678V17.79C12.2222 18.49 12.9222 18.9789 13.5667 18.7345C17.3333 17.3011 20 13.6678 20 9.40114C20 5.13447 17.3333 1.50114 13.5667 0.0678028C12.9222 -0.187753 12.2222 0.312247 12.2222 1.01225Z"
        fill={color}
      />
    </svg>
  );
}

export function PlayIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 27 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 2.59204V29.408C0 31.4528 2.25192 32.6952 3.98615 31.5822L25.0558 18.1743C26.6606 17.1648 26.6606 14.8352 25.0558 13.7999L3.98615 0.417781C2.25192 -0.695235 0 0.547202 0 2.59204Z"
        fill={color}
      />
    </svg>
  );
}

export function PauseIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.85714 20C4.42857 20 5.71429 18.7143 5.71429 17.1429V2.85714C5.71429 1.28571 4.42857 0 2.85714 0C1.28571 0 0 1.28571 0 2.85714V17.1429C0 18.7143 1.28571 20 2.85714 20ZM11.4286 2.85714V17.1429C11.4286 18.7143 12.7143 20 14.2857 20C15.8571 20 17.1429 18.7143 17.1429 17.1429V2.85714C17.1429 1.28571 15.8571 0 14.2857 0C12.7143 0 11.4286 1.28571 11.4286 2.85714Z"
        fill={color}
      />
    </svg>
  );
}

export function ArrowIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.355353 0.368312C-0.118451 0.857285 -0.118451 1.64716 0.355353 2.13614L5.0691 7.00079L0.355353 11.8654C-0.118451 12.3544 -0.118451 13.1443 0.355353 13.6333C0.829157 14.1222 1.59453 14.1222 2.06834 13.6333L7.64465 7.87843C8.11845 7.38946 8.11845 6.59958 7.64465 6.11061L2.06834 0.355774C1.60668 -0.120661 0.829157 -0.120661 0.355353 0.368312Z"
        fill={color}
      />
    </svg>
  );
}

export function HamburgerIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 28 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.5 0H27.5V3H0.5V0ZM0.5 7.5H27.5V10.5H0.5V7.5ZM0.5 15H27.5V18H0.5V15Z" fill={color} />
    </svg>
  );
}

export function StarIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5377 1.37408C11.1496 0.208641 12.8506 0.208639 13.4625 1.37408L15.747 5.72525C15.9878 6.18401 16.4385 6.50201 16.959 6.58055L21.912 7.3279C23.25 7.52979 23.7797 9.14031 22.8136 10.0693L19.291 13.4564C18.9098 13.823 18.7341 14.3482 18.82 14.8647L19.6116 19.6271C19.8276 20.9265 18.4473 21.9171 17.2475 21.3238L12.7411 19.0956C12.2751 18.8652 11.725 18.8652 11.259 19.0956L6.75269 21.3238C5.55286 21.9171 4.17257 20.9265 4.38856 19.6271L5.18018 14.8647C5.26604 14.3482 5.09037 13.823 4.70912 13.4564L1.18655 10.0693C0.22047 9.14031 0.750172 7.52979 2.08818 7.3279L7.04117 6.58055C7.56169 6.50201 8.01232 6.18401 8.25318 5.72525L10.5377 1.37408Z"
        fill={color}
      />
    </svg>
  );
}

export function ChatIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.0111 0.277832H2.21108C1.05608 0.277832 0.111084 1.22283 0.111084 2.37783V21.2778L4.31108 17.0778H19.0111C20.1661 17.0778 21.1111 16.1328 21.1111 14.9778V2.37783C21.1111 1.22283 20.1661 0.277832 19.0111 0.277832Z"
        fill={color}
      />
    </svg>
  );
}

export function ConfigIcon({ color = "" }) {
  return (
    <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.9734 10.6113C18.9734 10.3698 18.9629 10.1388 18.9419 9.89733L20.8949 8.41683C21.3149 8.10183 21.4304 7.51383 21.1679 7.05183L19.2044 3.66033C18.9419 3.19833 18.3749 3.00933 17.8919 3.21933L15.6344 4.17483C15.2459 3.90183 14.8364 3.66033 14.4059 3.46083L14.1014 1.03533C14.0384 0.510328 13.5869 0.111328 13.0619 0.111328H9.14538C8.60988 0.111328 8.15838 0.510328 8.09538 1.03533L7.79088 3.46083C7.36038 3.66033 6.95088 3.90183 6.56238 4.17483L4.30488 3.21933C3.82188 3.00933 3.25488 3.19833 2.99238 3.66033L1.02888 7.06233C0.766379 7.52433 0.881879 8.10183 1.30188 8.42733L3.25488 9.90783C3.23388 10.1388 3.22338 10.3698 3.22338 10.6113C3.22338 10.8528 3.23388 11.0838 3.25488 11.3253L1.30188 12.8058C0.881879 13.1208 0.766379 13.7088 1.02888 14.1708L2.99238 17.5623C3.25488 18.0243 3.82188 18.2133 4.30488 18.0033L6.56238 17.0478C6.95088 17.3208 7.36038 17.5623 7.79088 17.7618L8.09538 20.1873C8.15838 20.7123 8.60988 21.1113 9.13488 21.1113H13.0514C13.5764 21.1113 14.0279 20.7123 14.0909 20.1873L14.3954 17.7618C14.8259 17.5623 15.2354 17.3208 15.6239 17.0478L17.8814 18.0033C18.3644 18.2133 18.9314 18.0243 19.1939 17.5623L21.1574 14.1708C21.4199 13.7088 21.3044 13.1313 20.8844 12.8058L18.9314 11.3253C18.9629 11.0838 18.9734 10.8528 18.9734 10.6113ZM11.1404 14.2863C9.11388 14.2863 7.46538 12.6378 7.46538 10.6113C7.46538 8.58483 9.11388 6.93633 11.1404 6.93633C13.1669 6.93633 14.8154 8.58483 14.8154 10.6113C14.8154 12.6378 13.1669 14.2863 11.1404 14.2863Z"
        fill={color}
      />
    </svg>
  );
}

export function KakaoIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z"
        fill="#6D4C41"
      />
      <path
        d="M18 9.5C23.5229 9.5 28 12.9895 28 17.2952C28 21.6 23.5229 25.0895 18 25.0895C17.4501 25.0898 16.9007 25.0548 16.3552 24.9848L12.1571 27.7305C11.68 27.9829 11.5114 27.9552 11.7076 27.3371L12.5571 23.8343C9.81429 22.4438 8 20.0343 8 17.2952C8 12.9905 12.4771 9.5 18 9.5ZM23.6257 17.1762L25.0257 15.82C25.1065 15.7361 25.1516 15.6241 25.1514 15.5077C25.1513 15.3912 25.1059 15.2793 25.025 15.1956C24.944 15.1119 24.8337 15.0629 24.7173 15.0589C24.6009 15.055 24.4875 15.0963 24.401 15.1743L22.5648 16.9514V15.4829C22.5648 15.3636 22.5174 15.2493 22.4331 15.165C22.3488 15.0807 22.2345 15.0333 22.1152 15.0333C21.996 15.0333 21.8817 15.0807 21.7974 15.165C21.7131 15.2493 21.6657 15.3636 21.6657 15.4829V17.9181C21.6489 17.9876 21.6489 18.0601 21.6657 18.1295V19.5C21.6657 19.6192 21.7131 19.7336 21.7974 19.8179C21.8817 19.9022 21.996 19.9495 22.1152 19.9495C22.2345 19.9495 22.3488 19.9022 22.4331 19.8179C22.5174 19.7336 22.5648 19.6192 22.5648 19.5V18.2019L22.9714 17.8086L24.3314 19.7448C24.3654 19.7931 24.4085 19.8343 24.4584 19.8659C24.5083 19.8976 24.5639 19.9191 24.6221 19.9293C24.6803 19.9395 24.7399 19.9381 24.7976 19.9252C24.8552 19.9123 24.9098 19.8882 24.9581 19.8543C25.0064 19.8203 25.0476 19.7772 25.0793 19.7273C25.1109 19.6774 25.1325 19.6218 25.1426 19.5636C25.1528 19.5054 25.1514 19.4458 25.1386 19.3882C25.1257 19.3305 25.1016 19.276 25.0676 19.2276L23.6257 17.1752V17.1762ZM20.8086 19.0086H19.4181V15.4971C19.4128 15.3816 19.3631 15.2726 19.2795 15.1927C19.1959 15.1129 19.0847 15.0683 18.969 15.0683C18.8534 15.0683 18.7422 15.1129 18.6586 15.1927C18.575 15.2726 18.5253 15.3816 18.52 15.4971V19.4581C18.52 19.7057 18.72 19.9076 18.9686 19.9076H20.8086C20.9278 19.9076 21.0421 19.8603 21.1264 19.776C21.2107 19.6917 21.2581 19.5773 21.2581 19.4581C21.2581 19.3389 21.2107 19.2245 21.1264 19.1402C21.0421 19.0559 20.9278 19.0086 20.8086 19.0086ZM15.2305 17.9686L15.8933 16.3429L16.501 17.9686H15.2305ZM17.6333 18.4333L17.6352 18.4181C17.635 18.3048 17.5918 18.1959 17.5143 18.1133L16.5181 15.4467C16.4763 15.3196 16.3968 15.2083 16.2901 15.1276C16.1834 15.0469 16.0546 15.0008 15.921 14.9952C15.7863 14.9946 15.6547 15.0351 15.5436 15.1111C15.4325 15.1872 15.3472 15.2952 15.299 15.421L13.7171 19.3019C13.6948 19.3566 13.6835 19.4151 13.6838 19.4741C13.6841 19.5332 13.696 19.5916 13.7188 19.646C13.7417 19.7004 13.7751 19.7498 13.817 19.7914C13.859 19.8329 13.9087 19.8658 13.9633 19.8881C14.018 19.9104 14.0765 19.9218 14.1355 19.9215C14.1946 19.9212 14.253 19.9093 14.3074 19.8864C14.3618 19.8635 14.4112 19.8302 14.4528 19.7882C14.4943 19.7463 14.5272 19.6966 14.5495 19.6419L14.8638 18.8676H16.8352L17.12 19.6295C17.1394 19.6865 17.17 19.739 17.21 19.7839C17.25 19.8288 17.2986 19.8652 17.353 19.891C17.4073 19.9168 17.4663 19.9314 17.5264 19.934C17.5865 19.9365 17.6465 19.927 17.7028 19.906C17.7592 19.8849 17.8107 19.8528 17.8544 19.8115C17.8981 19.7702 17.9331 19.7205 17.9573 19.6654C17.9814 19.6103 17.9943 19.5509 17.9951 19.4908C17.9959 19.4306 17.9846 19.3709 17.9619 19.3152L17.6333 18.4333ZM14.4695 15.5019C14.4695 15.3828 14.4223 15.2687 14.3382 15.1844C14.2541 15.1001 14.14 15.0526 14.021 15.0524H10.9305C10.8113 15.0524 10.6969 15.0997 10.6126 15.184C10.5283 15.2683 10.481 15.3827 10.481 15.5019C10.481 15.6211 10.5283 15.7355 10.6126 15.8198C10.6969 15.9041 10.8113 15.9514 10.9305 15.9514H12.0352V19.5095C12.0352 19.6287 12.0826 19.7431 12.1669 19.8274C12.2512 19.9117 12.3655 19.959 12.4848 19.959C12.604 19.959 12.7183 19.9117 12.8026 19.8274C12.8869 19.7431 12.9343 19.6287 12.9343 19.5095V15.9514H14.02C14.1392 15.9514 14.2536 15.9041 14.3379 15.8198C14.4222 15.7355 14.4695 15.6211 14.4695 15.5019Z"
        fill="#FFE247"
      />
    </svg>
  );
}

export function SellIcon({ color = "#ADADAD" }) {
  return (
    <svg viewBox="0 0 36 33" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M35.8219 10.6054L33.9313 2.73688C33.5351 1.11636 32.1307 0 30.4922 0H5.48211C3.86159 0 2.43913 1.13436 2.06101 2.73688L0.170399 10.6054C-0.26174 12.442 0.134387 14.3146 1.28676 15.7911C1.4308 15.9891 1.62887 16.1332 1.79092 16.3132V28.8093C1.79092 30.7899 3.41144 32.4104 5.39208 32.4104H30.6002C32.5808 32.4104 34.2014 30.7899 34.2014 28.8093V16.3132C34.3634 16.1512 34.5615 15.9891 34.7055 15.8091C35.8579 14.3326 36.272 12.442 35.8219 10.6054ZM30.4381 3.58315L32.3287 11.4517C32.5088 12.2079 32.3468 12.9642 31.8786 13.5584C31.6265 13.8825 31.0863 14.4046 30.1861 14.4046C29.0877 14.4046 28.1334 13.5224 28.0074 12.352L26.963 3.60116L30.4381 3.58315ZM19.7967 3.60116H23.3258L24.2982 11.7398C24.3882 12.442 24.1721 13.1442 23.704 13.6664C23.3078 14.1345 22.7317 14.4046 21.9934 14.4046C20.787 14.4046 19.7967 13.3423 19.7967 12.0459V3.60116ZM11.6761 11.7398L12.6664 3.60116H16.1956V12.0459C16.1956 13.3423 15.2052 14.4046 13.8728 14.4046C13.2606 14.4046 12.7024 14.1345 12.2703 13.6664C11.8201 13.1442 11.6041 12.442 11.6761 11.7398ZM3.66352 11.4517L5.48211 3.60116H9.02925L7.98491 12.352C7.84087 13.5224 6.90457 14.4046 5.80621 14.4046C4.92393 14.4046 4.36575 13.8825 4.13167 13.5584C3.64552 12.9822 3.48346 12.2079 3.66352 11.4517Z"
        fill={color}
      />
    </svg>
  );
}

export function BuyIcon({ color = "#ADADAD" }) {
  return (
    <svg viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28 8H24C24 3.58 20.42 0 16 0C11.58 0 8 3.58 8 8H4C1.8 8 0 9.8 0 12L2 36C2 38.2 3.8 40 6 40H26C28.2 40 30 38.2 30 36L32 12C32 9.8 30.2 8 28 8ZM16 4C18.2 4 20 5.8 20 8H12C12 5.8 13.8 4 16 4Z"
        fill={color}
      />
    </svg>
  );
}

export function BookMarkIcon({ color = "#ADADAD" }) {
  return (
    <svg viewBox="0 0 32 39" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27.1667 0H4.94444C2.5 0 0.5 2 0.5 4.44444V36.9669C0.5 38.4028 1.9681 39.3708 3.28784 38.8052L16.0556 33.3333L28.8233 38.8052C30.143 39.3708 31.6111 38.4028 31.6111 36.9669V4.44444C31.6111 2 29.6111 0 27.1667 0Z"
        fill={color}
      />
    </svg>
  );
}

export function KebabIcon() {
  return (
    <svg viewBox="0 0 6 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 6C4.65 6 6 4.65 6 3C6 1.35 4.65 0 3 0C1.35 0 0 1.35 0 3C0 4.65 1.35 6 3 6ZM3 9C1.35 9 0 10.35 0 12C0 13.65 1.35 15 3 15C4.65 15 6 13.65 6 12C6 10.35 4.65 9 3 9ZM3 18C1.35 18 0 19.35 0 21C0 22.65 1.35 24 3 24C4.65 24 6 22.65 6 21C6 19.35 4.65 18 3 18Z"
        fill="#030303"
      />
    </svg>
  );
}

export function DeleteIcon() {
  return (
    <svg viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.99984 21.0747C1.99984 21.7623 2.28079 22.4218 2.78089 22.908C3.28098 23.3942 3.95926 23.6673 4.6665 23.6673H15.3332C16.0404 23.6673 16.7187 23.3942 17.2188 22.908C17.7189 22.4218 17.9998 21.7623 17.9998 21.0747V6.51917C17.9998 5.96689 17.5521 5.51917 16.9998 5.51917H2.99984C2.44755 5.51917 1.99984 5.96689 1.99984 6.51917V21.0747ZM14.6665 1.63028L13.6243 0.61699C13.4376 0.435513 13.1875 0.333984 12.9272 0.333984H7.07249C6.81215 0.333984 6.56207 0.435512 6.37541 0.616989L5.33317 1.63028H1.6665C1.11422 1.63028 0.666504 2.078 0.666504 2.63028V3.22287C0.666504 3.77516 1.11422 4.22287 1.6665 4.22287H18.3332C18.8855 4.22287 19.3332 3.77516 19.3332 3.22287V2.63028C19.3332 2.078 18.8855 1.63028 18.3332 1.63028H14.6665Z"
        fill="#030303"
      />
    </svg>
  );
}

export function EditIcon() {
  return (
    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.1617 5.2143C21.6167 4.7593 21.6167 4.00096 21.1617 3.5693L18.4317 0.839297C18 0.384297 17.2417 0.384297 16.7867 0.839297L14.64 2.9743L19.015 7.3493M0.792573 16.8331C0.605232 17.0206 0.5 17.2749 0.5 17.5399V20.501C0.5 21.0532 0.947715 21.501 1.5 21.501H4.46052C4.72589 21.501 4.98039 21.3955 5.16795 21.2078L17.7783 8.58596L13.4033 4.21096L0.792573 16.8331Z"
        fill="black"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.2941 17.912H19.0437L18.6005 17.4847C20.4999 15.2687 21.4812 12.2455 20.9431 9.03241C20.1991 4.63216 16.527 1.11829 12.0951 0.580131C5.39973 -0.242937 -0.235124 5.39191 0.587944 12.0873C1.1261 16.5192 4.63997 20.1913 9.04022 20.9352C12.2534 21.4734 15.2765 20.492 17.4925 18.5927L17.9199 19.0359V20.2863L24.6469 27.0133C25.2958 27.6622 26.3563 27.6622 27.0053 27.0133C27.6542 26.3643 27.6542 25.3038 27.0053 24.6549L20.2941 17.912ZM10.7972 17.912C6.85592 17.912 3.67445 14.7306 3.67445 10.7893C3.67445 6.84811 6.85592 3.66664 10.7972 3.66664C14.7384 3.66664 17.9199 6.84811 17.9199 10.7893C17.9199 14.7306 14.7384 17.912 10.7972 17.912Z"
        fill="#6F4EF2"
      />
    </svg>
  );
}
