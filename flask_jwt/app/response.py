from flask import jsonify, make_response

def succes(values, message):
    res = {
        "data" : values,
        "message" : message
    }
    response = make_response(jsonify(res), 200)
    return response

def badRequest(values, message):
    res = {
        "data" : values,
        "message" : message
    }
    response = make_response(jsonify(res), 400)
    return response