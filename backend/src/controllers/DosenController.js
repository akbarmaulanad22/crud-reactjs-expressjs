const { json } = require('express');
const dbConnection = require('../config/Database');


exports.getDosen = (req, res) => {
    const querystr = "SELECT * FROM dosen";
    dbConnection.query(querystr, (err, results) => {
        if (err) {
            res.status(500).json({
                "success": false,
                "message": "Gagal menampilkan data",
                "data": []
            });
            console.error('Error', err);
        } else {
            res.status(200).json({
                "success": true,
                "message": "Success menampilkan data",
                "data": results
            });
        }
    });
};

exports.insertDosen = (req, res) => {
    const param = req.body;
    const nip = param.nip;
    const nidn = param.nidn;
    const nuptk = param.nuptk;
    const nama = param.nama;
    const tgl_lahir = param.tgl_lahir;
    const kelamin = param.kelamin;
    const hp = param.hp;
    const email = param.email;
    const status = param.status;
    
    const querystr = "INSERT INTO dosen (nip, nidn, nuptk, nama, tgl_lahir, kelamin, hp, email, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [nip, nidn, nuptk, nama, tgl_lahir, kelamin, hp, email, status];

    dbConnection.query(querystr, values, (err, results) => {
        if (err) {
            console.error('Gagal', "menambahkan data");
            res.status(500).json({
                "success": false,
                "message": "Gagal menambahkan data",
                //"data": results
            });
        } else {
            console.log('Succes', "menambahkan data");
            res.status(200).json({
                "success": true,
                "message": "Success menambahkan data",
                //"data": results
            });
        }
    })
};


exports.updateDosen = (req, res) => {
    const param = req.body;
    const kd_dosen = param.kd_dosen;
    const nip = param.nip;
    const nidn = param.nidn;
    const nuptk = param.nuptk;
    const nama = param.nama;
    const tgl_lahir = param.tgl_lahir;
    const kelamin = param.kelamin;
    const hp = param.hp;
    const email = param.email;
    const status = param.status;

    const querystr = "UPDATE dosen SET nip = ?, nidn = ?, nuptk = ?, nama = ?, tgl_lahir = ?, kelamin = ?, hp = ?, email = ?, status = ? WHERE kd_dosen = ?";
    const values = [nip, nidn, nuptk, nama, tgl_lahir, kelamin, hp, email, status, kd_dosen];
    
    dbConnection.query(querystr, values, (err, results) => {
        if (err) {
            console.error('Gagal', "mengupdate data");
            res.status(500).json({
                "success": false,
                "message": "Gagal mengupdate data",
                //"data": results
            });
        } else {

            if(results.changedRows > 0)
            {
                console.log('Berhasil', "mengupdate data");
                res.status(200).json({
                    "success": true,
                    "message": "Berhasil mengupdate data",
                });
            }
            else
            {
                console.log('Gagal', "Data tidak ditemukan");
                res.status(400).json({
                    "success": false,
                    "message": "Data tidak ditemukan",
                });
            }
        }
    })
};


exports.deleteDosen = (req, res) => {
    const param = req.body;
    const kd_dosen = param.kd_dosen;

    const querystr = "DELETE FROM dosen WHERE kd_dosen = ?";
    const values = kd_dosen;

    dbConnection.query(querystr, values, (err, results) => {
        if (err) {
            console.error('Gagal', "menghapus data");
            res.status(500).json({
                "success": false,
                "message": "Gagal menghapus data",
                //"data": results
            });
        } else {

            if(results.affectedRows > 0)
            {
                console.log('Berhasil', "menghapus data");
                res.status(200).json({
                    "success": true,
                    "message": "Berhasil menghapus data",
                });
            }
            else
            {
                console.log('Gagal', "menghapus data");
                res.status(400).json({
                    "success": false,
                    "message": "Data tidak ditemukan",
                });
            }
        }
    })
};


