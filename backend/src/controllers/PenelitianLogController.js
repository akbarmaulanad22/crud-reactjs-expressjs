const { json } = require( 'express' );
const dbConnection = require( '../config/Database' );


exports.getPenelitianLog = ( req, res ) => {
    const querystr = `SELECT * FROM penelitian_log 
        LEFT JOIN dosen ON penelitian_log.kd_dosen = dosen.kd_dosen 
        LEFT JOIN penelitian ON penelitian_log.kd_penelitian = penelitian.kd_penelitian`;
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

exports.insertPenelitianLog = ( req, res ) => {
    const param = req.body;
    const kd_penelitian = param.kd_penelitian;
    const judul = param.judul;
    const keterangan = param.keterangan;
    const kd_dosen = param.kd_dosen;
    const tgl_log = param.tgl_log;

    const querystr = "INSERT INTO penelitian_log (kd_penelitian, judul, keterangan, kd_dosen, tgl_log) VALUES (?, ?, ?, ?, ?)";
    const values = [ kd_penelitian, judul, keterangan, kd_dosen, tgl_log ];

    dbConnection.query( querystr, values, ( err, results ) => {
        if ( err ) {
            console.error( 'Gagal', "menambahkan data" );
            res.status( 500 ).json( {
                "success": false,
                "message": "Gagal menambahkan data",
                // "data": err
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


exports.updatePenelitianLog = ( req, res ) => {
    const param = req.body;
    const kd_penelitian_log = param.kd_penelitian_log;
    const kd_penelitian = param.kd_penelitian;
    const judul = param.judul;
    const keterangan = param.keterangan;
    const kd_dosen = param.kd_dosen;
    const tgl_log = param.tgl_log;

    const querystr = "UPDATE penelitian_log SET kd_penelitian = ?, judul = ?, keterangan = ?, kd_dosen = ?, tgl_log = ? WHERE kd_penelitian_log = ?";
    const values = [ kd_penelitian, judul, keterangan, kd_dosen, tgl_log, kd_penelitian_log ];

    dbConnection.query( querystr, values, ( err, results ) => {
        if ( err ) {
            console.error( 'Gagal', "mengupdate data" );
            return res.status( 500 ).json( {
                "success": false,
                "message": "Gagal mengupdate data",
                // "data": err
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


exports.deletePenelitianLog = ( req, res ) => {
    const param = req.body;
    const kd_penelitian_log = param.kd_penelitian_log;

    const querystr = "DELETE FROM penelitian_log WHERE kd_penelitian_log = ?";
    const values = kd_penelitian_log;

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


