#!/usr/bin/env python

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify(
                message="Media-Analytics-Api",
                code='202'
            )

if __name__ == '__main__':
    app.run(debug=True)
