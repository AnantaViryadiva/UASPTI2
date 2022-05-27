var nama = "{NAMA U}",
  AvatarIMGLink,
  AvatarStyle;
var jam = 0,
  menit = 0,
  hari = 0;
var isBelajar = 0,
  lamatakbelajar = 0,
  semester = 1;
var isAFK = 1,
  endGame = 0;
var lastloc = 0;
const haris = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const hungerProgress = document.getElementById("hunger_progress");
const entertainmentProgress = document.getElementById("entertainment_progress");
const sleepProgress = document.getElementById("sleep_progress");
const educationProgress = document.getElementById("education_progress");

const Tombol = [
  document.getElementById("TombolMakan"),
  document.getElementById("TombolMain"),
  document.getElementById("TombolTidur"),
  document.getElementById("TombolBelajar")
];

function show(shown, hidden) {
  document.getElementById(shown).style.display = "block";
  document.getElementById(hidden).style.display = "none";
}

/* JAVA SCRIPT MENU */
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

/* JAVA SCRIPT CONTENT */
function bermain(slideIndex) {
  var avatar = "";
  lokasi(0);
  var x = document.getElementById("load-character");
  var y = document.createElement("img");
  y.setAttribute("class", "img-fluid");
  y.setAttribute("id", "AvatarIMG");

  if (slideIndex == 1) {
    y.setAttribute("src", "gambar/naruto.png");
    y.setAttribute("style", "width:150px; height: 250px");
    avatar = "Naruto";
    AvatarIMGLink = "gambar/naruto.png";
    AvatarStyle = "width:150px; height: 250px";
  } else if (slideIndex == 2) {
    y.setAttribute("src", "gambar/sasuke.png");
    y.setAttribute("style", "width:175px; height: 250px");
    avatar = "Sasuke";
    AvatarIMGLink = "gambar/sasuke.png";
    AvatarStyle = "width:175px; height: 250px";
  } else {
    y.setAttribute("src", "gambar/hinata.png");
    y.setAttribute("style", "width:150px; height: 250px");
    avatar = "Hinata";
    AvatarIMGLink = "gambar/hinata.png";
    AvatarStyle = "width:150px; height: 250px";
  }

  x.appendChild(y);

  if (document.getElementById("PlayerName").value != "") {
    nama = document.getElementById("PlayerName").value;
  } else {
    nama = avatar;
  }
  document.getElementById("Salam").innerHTML = "Apakabar " + nama;
}

function Waktu() {
  setTimeout(() => {
    if (isAFK == 1) {
      if (menit % 30 == 0) {
        hungerProgress.value -= 2;
        entertainmentProgress.value -= 4;
        sleepProgress.value -= 3;
        educationProgress.value -= 1;
      }

      if (menit >= 60) {
        jam++;
        menit = 0;
      }
      if (jam >= 24) {
        jam -= 24;
        lamatakbelajar++;
      }
    } else {
      isAFK = 1;
    }
    if (endGame == 0) {
      checkStats();
      menit++;
      document.getElementById("Salam").innerHTML = cekJam(jam) + nama;
      document.getElementById("Jam").innerHTML =
        pad(jam, 2, "0") + ":" + pad(menit, 2, "0");
      Waktu();
    }
  }, 1000);
}
function cekJam(jam) {
  var str = "";
  if (jam >= 6 && jam <= 10) {
    str = "Selamat Pagi ";
  } else if (jam >= 11 && jam < 14) {
    str = "Selamat Siang ";
  } else if (jam >= 15 && jam < 17) {
    str = "Selamat Sore ";
  } else if (jam >= 18 && jam < 22) {
    str = "Selamat Malam ";
  } else {
    str = "Selamat Malam ";
  }

  return str + "ini hari " + haris[hari] + " ";
}
function pad(number, width, padding) {
  padding = padding || "0";
  number = number + "";
  return number.length >= width
    ? number
    : new Array(width - number.length + 1).join(padding) + number;
}

function clamping(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function checkStats() {
  if (hungerProgress.value <= 0) {
    alert("GameOver\n" + nama + " Mati Kelaparan");
    location.reload();
  }
  if (lamatakbelajar > 15) {
    alert(
      nama +
        " Diperingati untuk belajar, jika tidak akan terkena Drop Out (DO)."
    );
  } else if (lamatakbelajar > 30) {
    alert("GameOver\n" + nama + " kena Drop Out (DO).");
    location.reload();
  }
  if (sleepProgress.value <= 0) {
    alert(nama + " terlalu lelah dan tertidur.");
    tidur();
  }
  if (educationProgress.value >= 100) {
    semester++;
    if (semester > 8) {
      alert("Selamat " + nama + " Lulus Kuliah");
      endGame = 1;
    } else {
      document.getElementById("semester").innerHTML = "Semester " + semester;
      alert("Selamat " + nama + " sekarang berada di Semester " + semester);
      educationProgress.value = 0;
    }
  }
  if (!(jam > 8 && jam < 17) && lastloc === 1) {
    //kuliah
    alert("Kuliah sudah tutup, pulang sekarang");
    lokasi(0);
  }
  if (!(jam > 7 && jam < 21) && lastloc === 2) {
    //kuliah
    alert("Restoran sudah tutup, pulang sekarang");
    lokasi(0);
  }
}

function disableButton(opt) {
  for (var i = 0; i < 4; i++) {
    Tombol[i].disabled = opt;
  }
}
function lokasi(loc) {
  if (loc === 0) {
    //Rumah
    disableButton(false);
    Tombol[0].disabled = true;
    Tombol[3].innerText = "Belajar";
    lastloc = loc;
  } else if (loc === 1) {
    if (jam > 8 && jam < 17 && hari != 0) {
      //kuliah
      disableButton(false);
      disableButton(true);
      Tombol[3].disabled = false;
      Tombol[3].innerText = "Masuk Kelas";
      lastloc = loc;
    } else {
      alert(
        "kamu hanya bisa pergi ke Kuliah hari senin sampai sabtu pukul 8 sampai 17"
      );
    }
  } else if (loc === 2) {
    if (jam > 7 && jam < 21) {
      //restoran
      disableButton(false);
      disableButton(true);
      Tombol[0].disabled = false;
      Tombol[3].innerText = "Belajar";
      lastloc = loc;
    } else {
      alert("Restorant sudah pada tutup");
    }
  }
}
function makan() {
  disableButton(true);
  document.getElementById("AvatarIMG").setAttribute("src", "gambar/hunger.png");
  document
    .getElementById("AvatarIMG")
    .setAttribute("style", "width:235px; height:250px");
  hungerProgress.value = clamping(hungerProgress.value + 80, 0, 100);
  entertainmentProgress.value = clamping(
    entertainmentProgress.value - 5,
    0,
    100
  );
  sleepProgress.value = clamping(sleepProgress.value - 2, 0, 100);
  educationProgress.value = clamping(educationProgress.value - 1, 0, 100);
  menit += 20;
  isAFK = 0;
  setTimeout(() => {
    lokasi(lastloc);
    document.getElementById("AvatarIMG").setAttribute("src", AvatarIMGLink);
    document.getElementById("AvatarIMG").setAttribute("style", AvatarStyle);
  }, 1500);
}
function main() {
  disableButton(true);
  document.getElementById("AvatarIMG").setAttribute("src", "gambar/game.png");
  document
    .getElementById("AvatarIMG")
    .setAttribute("style", "width:325px; height:250px");
  hungerProgress.value = clamping(hungerProgress.value - 2, 0, 100);
  entertainmentProgress.value = clamping(
    entertainmentProgress.value + 70,
    0,
    100
  );

  sleepProgress.value = clamping(sleepProgress.value - 3, 0, 100);
  educationProgress.value = clamping(educationProgress.value - 5, 0, 100);
  menit += 20;
  isAFK = 0;
  setTimeout(() => {
    lokasi(lastloc);
    document.getElementById("AvatarIMG").setAttribute("src", AvatarIMGLink);
    document.getElementById("AvatarIMG").setAttribute("style", AvatarStyle);
  }, 1500);
}
function tidur() {
  disableButton(true);
  document.getElementById("AvatarIMG").setAttribute("src", "gambar/sleep.png");
  document
    .getElementById("AvatarIMG")
    .setAttribute("style", "width:235px; height:250px");

  if (isBelajar == 1) {
    educationProgress.value = clamping(
      educationProgress.value + educationProgress.value * 0.01,
      0,
      100
    );
    isBelajar = 0;
  } else {
    educationProgress.value = clamping(educationProgress.value - 5, 0, 100);
  }
  entertainmentProgress.value = clamping(
    entertainmentProgress.value - 7,
    0,
    100
  );
  var lamatidur = 0;
  if (jam > 19 || jam < 8) {
    if (jam > 19) {
      lamatidur = 24 - jam + 8;
      hari += 1;
    } else lamatidur = 8 - jam + 5;
    sleepProgress.value = clamping(
      sleepProgress.value + lamatidur * 10,
      0,
      100
    );
    hungerProgress.value = clamping(hungerProgress.value - lamatidur, 0, 100);

    jam = 8;
  } else {
    sleepProgress.value = clamping(sleepProgress.value + 20, 0, 100);
    jam += 2;
  }
  isAFK = 0;
  setTimeout(() => {
    lokasi(lastloc);
    document.getElementById("AvatarIMG").setAttribute("src", AvatarIMGLink);
    document.getElementById("AvatarIMG").setAttribute("style", AvatarStyle);
  }, 1500);
}
function belajar() {
  disableButton(true);
  document.getElementById("AvatarIMG").setAttribute("src", "gambar/book.png");
  document
    .getElementById("AvatarIMG")
    .setAttribute("style", "width:235px; height:250px");
  var stress = 5;
  if (entertainmentProgress.value < 20) {
    stress = 5;
  } else {
    stress = -2;
  }
  if (lastloc == 1) {
    educationProgress.value = clamping(
      educationProgress.value +
        sleepProgress.value * 0.01 -
        stress +
        hungerProgress.value * 0.01 +
        10,
      0,
      100
    );
    hungerProgress.value = clamping(hungerProgress.value - 20, 0, 100);
    entertainmentProgress.value = clamping(
      entertainmentProgress.value - 15,
      0,
      100
    );
    sleepProgress.value = clamping(sleepProgress.value - 10, 0, 100);
    isBelajar = 1;
    lamatakbelajar = 0;
    jam += 2;
    isAFK = 0;
    setTimeout(() => {
      lokasi(lastloc);
      document.getElementById("AvatarIMG").setAttribute("src", AvatarIMGLink);
      document.getElementById("AvatarIMG").setAttribute("style", AvatarStyle);
    }, 1500);
  } else {
    educationProgress.value = clamping(
      educationProgress.value +
        sleepProgress.value * 0.01 -
        stress +
        hungerProgress.value * 0.01 +
        5,
      0,
      100
    );
    hungerProgress.value = clamping(hungerProgress.value - 10, 0, 100);
    entertainmentProgress.value = clamping(
      entertainmentProgress.value - 15,
      0,
      100
    );
    sleepProgress.value = clamping(sleepProgress.value - 5, 0, 100);
    isBelajar = 1;
    lamatakbelajar = 0;
    jam += 1;
    isAFK = 0;
    setTimeout(() => {
      lokasi(lastloc);
      document.getElementById("AvatarIMG").setAttribute("src", AvatarIMGLink);
      document.getElementById("AvatarIMG").setAttribute("style", AvatarStyle);
    }, 1500);
  }
}
