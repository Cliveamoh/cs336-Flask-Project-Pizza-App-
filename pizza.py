"""basic Flask app - demo of using a variable in a route"""
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello():
    greet = '<h1>Welcome To Our Flask Project!</h1>'
    link = '<p><a href="index">Click me!</a></p>'
    return greet + link

@app.route('/index')
def index():
    return render_template('pizza.html')

if __name__ == '__main__':
    app.run(debug=True)