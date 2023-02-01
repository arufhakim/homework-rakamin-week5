// class Pendaftaran
class Pendaftaran {

    static counter = 1;

    // constructor
    constructor(nama, umur, uang, counter) {
        this.nama = nama;
        this.umur = umur;
        this.uang = uang;
        this.counter = counter;
    }

    // handle submit
    static handleSubmit(event) {
        event.preventDefault();

        let getNama = document.getElementById("nama");
        let nama = getNama.value;

        let getUmur = document.getElementById("umur");
        let umur = parseInt(getUmur.value);

        let getUang = document.getElementById("uang");
        let uang = parseInt(getUang.value);

        this.checkingData(nama, umur, uang)
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

        this.resume();
    }

    //data validation
    static checkingData(nama, umur, uang) {
        return new Promise((resolve, reject) => {
            if (nama.length < 10) {
                reject("Panjang nama minimal 10 karakter");
            } else if (umur < 25) {
                reject("Umur minimal 25 tahun");
            } else if (uang < 100000 || uang > 1000000) {
                reject("Uang saku minimal 100.000 dan maksimal 1.000.000");
            } else {
                let newPendaftar = new Pendaftaran(nama, umur, uang, this.counter++)
                newPendaftar.tableRow();
                newPendaftar.tableData();
                resolve(newPendaftar);
            }
        });
    }

    // create tr
    tableRow() {
        this.createRow = document.createElement('tr');
        this.createRow.setAttribute('id', `tr-${this.counter}`);
        document.getElementById('table-body').appendChild(this.createRow);
    }

    // create td
    tableData() {
        this.createCellNama = document.createElement('td');
        this.createDataNama = document.createTextNode(this.nama);
        this.createCellNama.appendChild(this.createDataNama);
        document.getElementById(`tr-${this.counter}`).appendChild(this.createCellNama);

        this.createCellUmur = document.createElement('td');
        this.createDataUmur = document.createTextNode(this.umur);
        this.createCellUmur.appendChild(this.createDataUmur);
        document.getElementById(`tr-${this.counter}`).appendChild(this.createCellUmur);

        this.createCellUang = document.createElement('td');
        this.createDataUang = document.createTextNode(this.uang);
        this.createCellUang.appendChild(this.createDataUang);
        document.getElementById(`tr-${this.counter}`).appendChild(this.createCellUang);
    }

    // resume
    static resume() {
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

        document.getElementById("avg-umur").innerHTML = avgUmur;
        document.getElementById("avg-uang").innerHTML = avgUang;
    }
}











