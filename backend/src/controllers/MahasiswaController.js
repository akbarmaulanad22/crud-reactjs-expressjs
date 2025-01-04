const { json } = require( 'express' );
const dbConnection = require( '../config/Database' );


exports.getMahasiswa = ( req, res ) => {
    const querystr = "SELECT * FROM mahasiswa";
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

exports.insertMahasiswa = ( req, res ) => {
    const param = req.body;
    const npm = param.npm;
    const nama = param.nama;
    const tgl_lahir = param.tgl_lahir;
    const kelamin = param.kelamin;
    const hp = param.hp;
    const email = param.email;
    const status = param.status;

    const querystr = "INSERT INTO mahasiswa (npm, nama, tgl_lahir, kelamin, hp, email, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [ npm, nama, tgl_lahir, kelamin, hp, email, status ];

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


exports.updateMahasiswa = ( req, res ) => {
    const param = req.body;
    const kd_mahasiswa = param.kd_mahasiswa;
    const npm = param.npm;
    const nama = param.nama;
    const tgl_lahir = param.tgl_lahir;
    const kelamin = param.kelamin;
    const hp = param.hp;
    const email = param.email;
    const status = param.status;

    const querystr = "UPDATE mahasiswa SET npm = ?, nama = ?, tgl_lahir = ?, kelamin = ?, hp = ?, email = ?, status = ?  WHERE kd_mahasiswa = ?";
    const values = [ npm, nama, tgl_lahir, kelamin, hp, email, status, kd_mahasiswa ];

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


exports.deleteMahasiswa = ( req, res ) => {
    const param = req.body;
    const kd_mahasiswa = param.kd_mahasiswa;

    const querystr = "DELETE FROM mahasiswa WHERE kd_mahasiswa = ?";
    const values = kd_mahasiswa;

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


