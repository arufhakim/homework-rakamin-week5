// class Pendaftaran
class Pendaftaran {
    constructor(nama, umur, uang, counter) {

        this.createRow = document.createElement('tr');
        this.createRow.setAttribute('id', `tr-${counter}`);

        document.getElementById('table-body').appendChild(this.createRow);

        this.createCellNama = document.createElement('td');
        this.createDataNama = document.createTextNode(nama);

        this.createCellUmur = document.createElement('td');
        this.createDataUmur = document.createTextNode(umur);

        this.createCellUang = document.createElement('td');
        this.createDataUang = document.createTextNode(uang);

        this.createCellNama.appendChild(this.createDataNama);
        this.createCellUmur.appendChild(this.createDataUmur);
        this.createCellUang.appendChild(this.createDataUang);

        document.getElementById(`tr-${counter}`).appendChild(this.createCellNama);
        document.getElementById(`tr-${counter}`).appendChild(this.createCellUmur);
        document.getElementById(`tr-${counter}`).appendChild(this.createCellUang);
    }
}

// data validation
let counter = 1;
const checkingData = (nama, umur, uang) => {
    return new Promise((resolve, reject) => {
        if (nama.length < 10) {
            reject("Panjang nama minimal 10 karakter");
        } else if (umur < 25) {
            reject("Umur minimal 25 tahun");
        } else if (uang < 100000 || uang > 1000000) {
            reject("Uang saku minimal 100.000 dan maksimal 1.000.000");
        } else {
            resolve(new Pendaftaran(nama, umur, uang, counter++));
        }
    });
};

// resume
const resume = () => {
    let totalUmur = 0;
    let totalUang = 0;
    let countUmur = 0;
    let countUang = 0;
    let umur = document.getElementsByTagName("td");
    let uang = document.getElementsByTagName("td");

    for (let index = 1; index <= umur.length; index += 3) {
        totalUmur += parseInt(umur[index].innerHTML);
        countUmur++;
    }

    for (let index = 2; index <= uang.length; index += 3) {
        totalUang += parseInt(uang[index].innerHTML);
        countUang++;
    }

    let avgUmur = Math.round(totalUmur / countUmur);
    let avgUang = Math.round(totalUang / countUang);

    console.log(countUang);

    document.getElementById("avg-umur").innerHTML = avgUmur;
    document.getElementById("avg-uang").innerHTML = avgUang;
};

// handle submit
const handleSubmit = (event) => {
    event.preventDefault();

    let getNama = document.getElementById("nama");
    let nama = getNama.value;

    let getUmur = document.getElementById("umur");
    let umur = parseInt(getUmur.value);

    let getUang = document.getElementById("uang");
    let uang = parseInt(getUang.value);

    checkingData(nama, umur, uang)
        .then(() => {
            let success = document.getElementById("success");
            success.innerHTML = "Data berhasil ditambahkan";
            success.classList.remove("d-none");

            let danger = document.getElementById("danger");
            danger.classList.add("d-none");
        })
        .catch((error) => {
            let danger = document.getElementById("danger");
            danger.innerHTML = error;
            danger.classList.remove("d-none");

            let success = document.getElementById("success");
            success.classList.add("d-none");
        });

    resume();
};







