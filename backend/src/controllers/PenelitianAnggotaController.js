const dbConnection = require( '../config/Database' );

exports.getPenelitianAnggota = ( req, res ) => {
    const querystr = `
        SELECT * FROM penelitian_anggota 
        Left JOIN penelitian ON penelitian_anggota.kd_penelitian = penelitian.kd_penelitian 
        Left JOIN dosen ON penelitian_anggota.kd_dosen = dosen.kd_dosen 
        Left JOIN mahasiswa ON penelitian_anggota.kd_mahasiswa = mahasiswa.kd_mahasiswa
    `;
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

exports.insertPenelitianAnggota = ( req, res ) => {
    const param = req.body;
    const thn_akademik = param.thn_akademik;
    const kd_penelitian = param.kd_penelitian;
    const kd_dosen = param.kd_dosen;
    const kd_mahasiswa = param.kd_mahasiswa;
    const status = param.status;

    const querystr = "INSERT INTO penelitian_anggota (thn_akademik, kd_penelitian, kd_dosen, kd_mahasiswa, status) VALUES (?, ?, ?, ?, ?)";
    const values = [ thn_akademik, kd_penelitian, kd_dosen, kd_mahasiswa, status ];

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


exports.updatePenelitianAnggota = ( req, res ) => {
    const param = req.body;
    const kd_anggota = param.kd_anggota;
    const thn_akademik = param.thn_akademik;
    const kd_penelitian = param.kd_penelitian;
    const kd_dosen = param.kd_dosen;
    const kd_mahasiswa = param.kd_mahasiswa;
    const status = param.status;

    const querystr = "UPDATE penelitian_anggota SET thn_akademik = ?, kd_penelitian = ?, kd_dosen = ?, kd_mahasiswa = ?, status = ?  WHERE kd_anggota = ?";
    const values = [ thn_akademik, kd_penelitian, kd_dosen, kd_mahasiswa, status, kd_anggota ];

    dbConnection.query( querystr, values, ( err, results ) => {
        if ( err ) {
            console.error( 'Gagal', "mengupdate data" );
            return res.status( 500 ).json( {
                "success": false,
                "message": "Gagal mengupdate data",
                "data": err
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


exports.deletePenelitianAnggota = ( req, res ) => {
    const param = req.body;
    const kd_anggota = param.kd_anggota;

    const querystr = "DELETE FROM penelitian_anggota WHERE kd_anggota = ?";
    const values = kd_anggota;

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


