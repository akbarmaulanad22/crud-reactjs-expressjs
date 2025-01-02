const { json } = require('express');
const dbConnection = require('../config/Database');


exports.getPenelitianDokumen = (req, res) => {
    const querystr = "SELECT * FROM penelitian_dokumen";
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

exports.insertPenelitianDokumen = (req, res) => {
    const param = req.body;
    const kd_penelitian = param.kd_penelitian;
    const upload_proposal = param.upload_proposal;
    const tgl_upload_proposal = param.tgl_upload_proposal;
    const status_proposal = param.status_proposal;
    const tgl_status_proposal = param.tgl_status_proposal;
    const upload_surat_tugas = param.upload_surat_tugas;
    const tgl_upload_surat_tugas = param.tgl_upload_surat_tugas;
    const upload_penelitian = param.upload_penelitian;
    const tgl_upload_penelitian = param.tgl_upload_penelitian;
    const status_penelitian = param.status_penelitian;
    const tgl_status_penelitian = param.tgl_status_penelitian;
    const upload_sertifikat = param.upload_sertifikat;
    const tgl_upload_sertifikat = param.tgl_upload_sertifikat;
    const upload_laporan_penelitian = param.upload_laporan_penelitian;
    const tgl_upload_laporan_penelitian = param.tgl_upload_laporan_penelitian;
    const status_laporan_penelitian = param.status_laporan_penelitian;
    const tgl_status_laporan_penelitian = param.tgl_status_laporan_penelitian;

    const querystr = "INSERT INTO penelitian_dokumen (kd_penelitian, upload_proposal, tgl_upload_proposal, status_proposal, tgl_status_proposal, upload_surat_tugas, tgl_upload_surat_tugas, upload_penelitian, tgl_upload_penelitian, status_penelitian, tgl_status_penelitian,upload_sertifikat, tgl_upload_sertifikat, upload_laporan_penelitian, tgl_upload_laporan_penelitian, status_laporan_penelitian, tgl_status_laporan_penelitian ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [kd_penelitian, upload_proposal, tgl_upload_proposal, status_proposal, tgl_status_proposal, upload_surat_tugas, tgl_upload_surat_tugas, upload_penelitian, tgl_upload_penelitian, status_penelitian, tgl_status_penelitian, upload_sertifikat, tgl_upload_sertifikat, upload_laporan_penelitian, tgl_upload_laporan_penelitian, status_laporan_penelitian, tgl_status_laporan_penelitian];

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


exports.updatePenelitianDokumen = (req, res) => {
    const param = req.body;
    const kd_penelitian_dokumen = param.kd_penelitian_dokumen;
    const kd_penelitian = param.kd_penelitian;
    const upload_proposal = param.upload_proposal;
    const tgl_upload_proposal = param.tgl_upload_proposal;
    const status_proposal = param.status_proposal;
    const tgl_status_proposal = param.tgl_status_proposal;
    const upload_surat_tugas = param.upload_surat_tugas;
    const tgl_upload_surat_tugas = param.tgl_upload_surat_tugas;
    const upload_penelitian = param.upload_penelitian;
    const tgl_upload_penelitian = param.tgl_upload_penelitian;
    const status_penelitian = param.status_penelitian;
    const tgl_status_penelitian = param.tgl_status_penelitian;
    const upload_sertifikat = param.upload_sertifikat;
    const tgl_upload_sertifikat = param.tgl_upload_sertifikat;
    const upload_laporan_penelitian = param.upload_laporan_penelitian;
    const tgl_upload_laporan_penelitian = param.tgl_upload_laporan_penelitian;
    const status_laporan_penelitian = param.status_laporan_penelitian;
    const tgl_status_laporan_penelitian = param.tgl_status_laporan_penelitian;

    const querystr = "UPDATE penelitian_dokumen SET kd_penelitian = ?, upload_proposal = ?, tgl_upload_proposal, status_proposal = ?, tgl_status_proposal = ?, upload_surat_tugas = ?, tgl_upload_surat_tugas = ?, upload_penelitian = ?, tgl_upload_penelitian = ?, status_penelitian = ?, tgl_status_penelitian = ?, upload_sertifikat = ?, tgl_upload_sertifikat = ?, upload_laporan_penelitian = ?, tgl_upload_laporan_penelitian = ?, status_laporan_penelitian = ?, tgl_status_laporan_penelitian = ?  WHERE kd_penelitian_dokumen = ?";
    const values = [kd_penelitian, upload_proposal, tgl_upload_proposal, status_proposal, tgl_status_proposal, upload_surat_tugas, tgl_upload_surat_tugas, upload_penelitian, tgl_upload_penelitian, status_penelitian, tgl_status_penelitian, upload_sertifikat, tgl_upload_sertifikat, upload_laporan_penelitian, tgl_upload_laporan_penelitian, status_laporan_penelitian, tgl_status_laporan_penelitian, kd_penelitian_dokumen];
    
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


exports.deletePenelitianDokumen = (req, res) => {
    const param = req.body;
    const kd_penelitian_dokumen = param.kd_penelitian_dokumen;

    const querystr = "DELETE FROM penelitian_dokumen WHERE kd_penelitian_dokumen = ?";
    const values = kd_penelitian_dokumen;

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


