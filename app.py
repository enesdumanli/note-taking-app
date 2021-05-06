from flask import Flask, jsonify, request
from flask_restful import Api, Resource, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class userModel(db.Model):
    #id
    #id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    mail = db.Column(db.String,nullable=False,primary_key=True)
    password = db.Column(db.String,nullable=False)
    #relation

class userNotes(db.Model):
    mail = db.Column(db.String,nullable=False)
    title = db.Column(db.String,nullable=False)
    note = db.Column(db.String,nullable=False,primary_key=True)

#db.create_all()# databasei yaratmak için bir kere çalıştırılır.

# resource_fields1 = {
# #     'mail': fields.String,
# #     'password': fields.String,
# #    # 'id': fields.Integer
# # }
# #
# # resource_fields2 = {
# #     'mail': fields.String,
# #     'title': fields.String,
# #     'note': fields.String
# # }

class Hello(Resource):
    #@marshal_with(resource_fields1)
    def post(self):
        data = request.get_json()
        existingUser = userModel.query.filter_by(mail=data['mail']).first()
        if(existingUser==None):
            user = userModel(mail=data['mail'], password=data['password'])
            db.session.add(user)
            db.session.commit()
            db.session.close()
            return {'success': 'true'}
        else:
            existingUser2 = userModel.query.filter_by(mail=data['mail'],password=data['password']).first()
            if(existingUser==existingUser2):
                return {'success': 'true'}
            else:
                return {'success': 'false'}
        # mvc{'success':'true'}


class Notes(Resource):
    #@marshal_with(resource_fields2)
    def get(self,user_mail):
        result_array = []
        result = userNotes.query.filter_by(mail=user_mail).all()
        for i in result:
            result_array.append({'title':i.title, 'note':i.note})
        return result_array
    def post(self,user_mail):
        data = request.get_json()
        user = userNotes(mail=user_mail,title=data['title'],note=data['note'])
        db.session.add(user)
        db.session.commit()
        db.session.close()


class Note(Resource):
    def delete(self,user_note):
        deleteUser = userNotes.query.filter_by(note=user_note).first()
        print(deleteUser)
        db.session.delete(deleteUser)
        db.session.commit()
        db.session.close()


api.add_resource(Hello, '/hello')
api.add_resource(Notes, '/notes/<string:user_mail>') # en sona slash koyma.
api.add_resource(Note, '/note/<string:user_note>')


if __name__=='__main__':
    app.run(debug=True)
