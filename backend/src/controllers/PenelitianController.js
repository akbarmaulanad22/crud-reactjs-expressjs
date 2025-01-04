const { json } = require( 'express' );
const dbConnection = require( '../config/Database' );


exports.getPenelitian = ( req, res ) => {
    const querystr = "SELECT * FROM penelitian";
    dbConnection.query( querystr, ( err, results ) => {
        if ( err ) {
            res.status( 500 ).json( {
                "success": false,
                "message": "Gagal menampilkan data",
                "data": []
            } );
            console.error( 'Error', err );
        } else {
            res.status( 200 ).json( {
                "success": true,
                "message": "Success menampilkan data",
                "data": results
            } );
        }
    } );
};

exports.insertPenelitian = ( req, res ) => {
    const param = req.body;
    const thn_akademik = param.thn_akademik;
    const judul = param.judul;
    const lokasi = param.lokasi;
    const tanggal_mulai = param.tanggal_mulai;
    const tanggal_akhir = param.tanggal_akhir;
    const kd_dosen = param.kd_dosen;
    const status = param.status;

    const querystr = "INSERT INTO penelitian (thn_akademik, judul, lokasi, tanggal_mulai, tanggal_akhir, kd_dosen, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [ thn_akademik, judul, lokasi, tanggal_mulai, tanggal_akhir, kd_dosen, status ];

    dbConnection.query( querystr, values, ( err, results ) => {
        if ( err ) {
            console.error( 'Gagal', "menambahkan data" );
            res.status( 500 ).json( {
                "success": false,
                "message": "Gagal menambahkan data",
                "data": err
            } );
        } else {
            console.log( 'Succes', "menambahkan data" );
            res.status( 200 ).json( {
                "success": true,
                "message": "Success menambahkan data",
                //"data": results
            } );
        }
    } )
};


exports.updatePenelitian = ( req, res ) => {
    const param = req.body;
    const kd_penelitian = param.kd_penelitian;
    const thn_akademik = param.thn_akademik;
    const judul = param.judul;
    const lokasi = param.lokasi;
    const tanggal_mulai = param.tanggal_mulai;
    const tanggal_akhir = param.tanggal_akhir;
    const kd_dosen = param.kd_dosen;
    const status = param.status;

    const querystr = "UPDATE penelitian SET thn_akademik = ?, judul = ?, lokasi = ?, tanggal_mulai = ?, tanggal_akhir = ?, kd_dosen = ?, status = ?  WHERE kd_penelitian = ?";
    const values = [ thn_akademik, judul, lokasi, tanggal_mulai, tanggal_akhir, kd_dosen, status, kd_penelitian ];

    dbConnection.query( querystr, values, ( err, results ) => {
        if ( err ) {
            console.error( 'Gagal', "mengupdate data" );
            return res.status( 500 ).json( {
                "success": false,
                "message": "Gagal mengupdate data",
                //"data": results
            } );
        }

        if ( results.affectedRows > 0 ) {
            console.log( 'Berhasil', "mengupdate data" );
            return res.status( 200 ).json( {
                "success": true,
                "message": "Berhasil mengupdate data",
            } );
        }

        console.log( 'Gagal', "Data tidak ditemukan" );
        return res.status( 400 ).json( {
            "success": false,
            "message": "Data tidak ditemukan",
        } );
    } )
};


exports.deletePenelitian = ( req, res ) => {
    const param = req.body;
    const kd_penelitian = param.kd_penelitian;

    const querystr = "DELETE FROM penelitian WHERE kd_penelitian = ?";
    const values = kd_penelitian;

    dbConnection.query( querystr, values, ( err, results ) => {
        if ( err ) {
            console.error( 'Gagal', "menghapus data" );
            return res.status( 500 ).json( {
                "success": false,
                "message": "Gagal menghapus data",
                //"data": results
            } );
        }

        if ( results.affectedRows > 0 ) {
            console.log( 'Berhasil', "menghapus data" );
            return res.status( 200 ).json( {
                "success": true,
                "message": "Berhasil menghapus data",
            } );
        }

        console.log( 'Gagal', "menghapus data" );
        return res.status( 400 ).json( {
            "success": false,
            "message": "Data tidak ditemukan",
        } );
    } )
};


