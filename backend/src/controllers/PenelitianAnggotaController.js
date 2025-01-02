const { json } = require('express');
const dbConnection = require('../config/Database');


exports.getPenelitianAnggota = (req, res) => {
    const querystr = "SELECT * FROM penelitian_anggota";
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

exports.insertPenelitianAnggota = (req, res) => {
    const param = req.body;
    const thn_akademik = param.thn_akademik;
    const kd_penelitian = param.kd_penelitian;
    const kd_dosen = param.kd_dosen;
    const kd_mahasiswa = param.kd_mahasiswa;
    const status = param.status;

    const querystr = "INSERT INTO penelitian_anggota (thn_akademik, kd_penelitian, kd_dosen, kd_mahasiswa, status) VALUES (?, ?, ?, ?, ?)";
    const values = [thn_akademik, kd_penelitian, kd_dosen, kd_mahasiswa, status];

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


exports.updatePenelitianAnggota = (req, res) => {
    const param = req.body;
    const kd_anggota = param.kd_anggota;
    const thn_akademik = param.thn_akademik;
    const kd_penelitian = param.kd_penelitian;
    const kd_dosen = param.kd_dosen;
    const kd_mahasiswa = param.kd_mahasiswa;
    const status = param.status;

    const querystr = "UPDATE penelitian_anggota SET thn_akademik = ?, kd_penelitian = ?, kd_dosen = ?, kd_mahasiswa, status = ?  WHERE kd_anggota = ?";
    const values = [thn_akademik, kd_penelitian, kd_dosen, kd_mahasiswa, status, kd_anggota];
    
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


exports.deletePenelitianAnggota = (req, res) => {
    const param = req.body;
    const kd_anggota = param.kd_anggota;

    const querystr = "DELETE FROM penelitian_anggota WHERE kd_anggota = ?";
    const values = kd_anggota;

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


