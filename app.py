from flask import Flask
from flask import render_template, request, redirect

app = Flask(__name__)

@app.route('/')
def inicio():
    return render_template('sitio/index.html')

@app.route('/libros')
def libros():
    return render_template('sitio/libros.html')

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
    return render_template('admin/libros.html')

@app.route('/admin/libros/guardar', methods=['POST'])
def adminLibrosGuardar():

    _nombre =  request.form['txtNombre']
    _url = request.form['txtURL']
    _imagen = request.files['txtImagen']

    print(_nombre)
    print(_url)
    print(_imagen)
    
    return redirect('/admin/libros')

if __name__ == '__main__':
    app.run(debug=True)