from flask import Flask
from flask import render_template, request, redirect
from flaskext.mysql import MySQL
from datetime import datetime
from flask import send_from_directory
import os

app = Flask(__name__)

mysql = MySQL()

app.config['MYSQL_DATABASE_HOST']='localhost'
app.config['MYSQL_DATABASE_USER']='root'
app.config['MYSQL_DATABASE_PASSWORD']=''
app.config['MYSQL_DATABASE_DB']='sitio'
mysql.init_app(app)

@app.route('/')
def inicio():
    return render_template('sitio/index.html')

@app.route('/img/<imagen>')
def imagenes(imagen):
    print(imagen)
    return send_from_directory(os.path.join('templates/sitio/img'),imagen)

@app.route('/libros')
def libros():
    
    conexion = mysql.connect()
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM libros")
    libros = cursor.fetchall()
    conexion.commit()

    return render_template('sitio/libros.html', libros=libros)

@app.route('/nosotros')
def nosotros():
    return render_template('sitio/nosotros.html')

@app.route('/admin/')
def admin_index():
    return render_template('admin/index.html')

@app.route('/admin/login')
def adminLogin():
    return render_template('admin/login.html')

@app.route('/admin/libros')
def adminLibros():
    conexion = mysql.connect()
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM libros")
    libros = cursor.fetchall()
    conexion.commit()

    return render_template('admin/libros.html', libros = libros)

@app.route('/admin/libros/guardar', methods=['POST'])
def adminLibrosGuardar():

    _nombre =  request.form['txtNombre']
    _url = request.form['txtURL']
    _imagen = request.files['txtImagen']

    tiempo = datetime.now()
    horaActual = tiempo.strftime('%Y%H%M%S')

    if _imagen.filename != "":
        nuevoNombre = horaActual+"_"+_imagen.filename
        _imagen.save("templates/sitio/img/"+nuevoNombre)

    consulta = "INSERT INTO libros (id, nombre, imagen, url) VALUES (NULL, %s, %s, %s)"
    datos = (_nombre, nuevoNombre, _url)

    conexion = mysql.connect()
    cursor = conexion.cursor()
    cursor.execute(consulta, datos)
    conexion.commit()
    
    return redirect('/admin/libros')

@app.route('/admin/libros/borrar', methods=['POST'])
def adminLibrosBorrar():
    _id = request.form['txtID']
    print(_id)

    conexion = mysql.connect()
    cursor = conexion.cursor()
    cursor.execute("SELECT imagen FROM libros WHERE id = %s", (_id))
    libro = cursor.fetchall()
    conexion.commit()

    if os.path.exists("templates/sitio/img/"+str(libro[0][0])):
        os.unlink("templates/sitio/img/"+str(libro[0][0]))

    conexion = mysql.connect()
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM libros WHERE id = %s", (_id))
    conexion.commit()

    return redirect('/admin/libros')

if __name__ == '__main__':
    app.run(debug=True)