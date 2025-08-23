from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, FileField
from wtforms.validators import DataRequired, Optional

class EditProfileForm(FlaskForm):
    username = StringField('Имя пользователя', validators=[DataRequired()])
    email = StringField('Email', validators=[Optional()])
    postal_code = StringField('Почтовый индекс', validators=[Optional()])
    password = PasswordField('Пароль (если хотите сменить)', validators=[Optional()])
    avatar = FileField('Аватар')
