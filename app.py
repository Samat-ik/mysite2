import os
import io
import base64
from datetime import timedelta, datetime

import pyotp
import qrcode

from flask import (
    Flask, render_template, request, redirect, session,
    url_for, flash, send_from_directory, abort
)
from flask_login import (
    LoginManager, login_user, logout_user,
    login_required, current_user
)
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

from extensions import db, login_manager, init_extensions
from models import User, Camera, PostalStats
from forms import EditProfileForm

app = Flask(__name__)

# CORS қосу
from flask_cors import CORS
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

# API health-check
@app.route("/api/health")
def health():
    return {"ok": True}

app.secret_key = 'super_secret_key'

# Конфигурации
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['UPLOAD_FOLDER'] = os.path.join(basedir, 'static', 'Avatars')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:2005b@localhost:5432/womens_shop'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
app.config['USER_FILES_FOLDER'] = os.path.join(basedir, 'static', 'user_files')

# Инициализация
init_extensions(app)

login_manager.login_view = 'login'
from sqlalchemy import inspect


@app.route('/db')
@login_required
def show_database():
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    db_info = {}
    for table in tables:
        columns = inspector.get_columns(table)
        db_info[table] = [{'name': col['name'], 'type': str(col['type'])} for col in columns]
    return render_template('db.html', db_info=db_info)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form.get('email', '').strip()
        phone_number = request.form.get('phone_number', '').strip()
        password = request.form['password']

        # Email немесе телефон нөмірі міндетті
        if not email and not phone_number:
            flash('Email немесе телефон нөмірі міндетті')
            return redirect(url_for('register'))

        # Пайдаланушы атын тексеру
        if User.query.filter_by(username=username).first():
            flash('Пайдаланушы аты бұрыннан бар')
            return redirect(url_for('register'))

        # Email тексеру (егер енгізілген болса)
        if email and User.query.filter_by(email=email).first():
            flash('Бұл email бұрыннан тіркелген')
            return redirect(url_for('register'))

        # Телефон нөмірін тексеру (егер енгізілген болса)
        if phone_number and User.query.filter_by(phone_number=phone_number).first():
            flash('Бұл телефон нөмірі бұрыннан тіркелген')
            return redirect(url_for('register'))

        otp_secret = pyotp.random_base32()
        hashed_pw = generate_password_hash(password)

        user = User(
            username=username, 
            email=email if email else None,
            phone_number=phone_number if phone_number else None,
            password=hashed_pw, 
            otp_secret=otp_secret
        )
        db.session.add(user)
        db.session.commit()

        otp_uri = pyotp.totp.TOTP(otp_secret).provisioning_uri(name=username, issuer_name="2FA Flask App")
        img = qrcode.make(otp_uri)
        buf = io.BytesIO()
        img.save(buf, format='PNG')
        qr_code = base64.b64encode(buf.getvalue()).decode('utf-8')

        return render_template('register_qr.html', username=username, qr_code=qr_code)

    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            session['pre_2fa_user_id'] = user.id
            return redirect(url_for('verify_2fa'))

        flash('Неверный логин или пароль')
    return render_template('login.html')


@app.route('/verify-2fa', methods=['GET', 'POST'])
def verify_2fa():
    user_id = session.get('pre_2fa_user_id')
    if not user_id:
        return redirect(url_for('login'))

    user = User.query.get(int(user_id))

    if request.method == 'POST':
        code = request.form.get('code')
        if pyotp.TOTP(user.otp_secret).verify(code):
            session.pop('pre_2fa_user_id', None)
            login_user(user, remember=True)
            return redirect(url_for('dashboard'))

        flash('Неверный код подтверждения')

    return render_template('verify_2fa.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/edit-profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    form = EditProfileForm(obj=current_user)
    if form.validate_on_submit():
        current_user.username = form.username.data
        if form.password.data:
            current_user.password = generate_password_hash(form.password.data)
        if form.avatar.data:
            filename = secure_filename(f"{current_user.id}.png")
            path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            form.avatar.data.save(path)
            current_user.avatar = filename
        db.session.commit()
        flash("Профиль обновлён")
        return redirect(url_for('dashboard'))
    return render_template('edit_profile.html', form=form)


@app.route('/cameras')
@login_required
def cameras():
    all_cameras = Camera.query.all()
    return render_template('cameras.html', cameras=all_cameras)


@app.route('/add_camera', methods=['GET', 'POST'])
@login_required
def add_camera():
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        stream_url = request.form['stream_url']
        new_camera = Camera(name=name, description=description, stream_url=stream_url,
                            user_id=current_user.id, created_at=datetime.utcnow())

        db.session.add(new_camera)
        db.session.commit()
        flash('Камера добавлена!', 'success')
        return redirect(url_for('cameras'))
    return render_template('add_camera.html')


@app.route('/camera/<int:camera_id>')
@login_required
def watch_camera(camera_id):
    camera = Camera.query.get_or_404(camera_id)
    return render_template('watch_camera.html', camera=camera)


@app.route('/stats')
@login_required
def statistics():
    total = Camera.query.count()
    today = Camera.query.filter(Camera.created_at >= datetime.utcnow().date()).count()
    active = Camera.query.filter_by(status='active').count()
    types = db.session.query(Camera.type).distinct().count()
    latest_cameras = Camera.query.order_by(Camera.created_at.desc()).limit(5).all()
    return render_template('statistics.html', total=total, today=today,
                           active=active, types=types, latest_cameras=latest_cameras)


@app.route('/storage', methods=['GET', 'POST'])
@login_required
def storage():
    search_query = request.args.get('q', '').lower()
    user_folder = os.path.join(app.config['USER_FILES_FOLDER'], str(current_user.id))
    os.makedirs(user_folder, exist_ok=True)

    if request.method == 'POST':
        file = request.files.get('file')
        if file and file.filename:
            filename = secure_filename(file.filename)
            file.save(os.path.join(user_folder, filename))
            flash('Файл успешно загружен!', 'success')
            return redirect(url_for('storage'))

    files = os.listdir(user_folder)
    if search_query:
        files = [f for f in files if search_query in f.lower()]
    return render_template('storage.html', files=files, user_id=current_user.id, search=search_query)


@app.route('/download/<filename>')
@login_required
def download_file(filename):
    user_folder = os.path.join(app.config['USER_FILES_FOLDER'], str(current_user.id))
    return send_from_directory(user_folder, filename, as_attachment=True)


@app.route('/rename/<filename>', methods=['POST'])
@login_required
def rename_file(filename):
    new_name = request.form.get('new_name')
    if not new_name:
        flash('Новое имя не указано', 'danger')
        return redirect(url_for('storage'))

    user_folder = os.path.join(app.config['USER_FILES_FOLDER'], str(current_user.id))
    old_path = os.path.join(user_folder, filename)
    new_name = secure_filename(new_name)

    if '.' not in new_name and '.' in filename:
        ext = filename.rsplit('.', 1)[1]
        new_name = f"{new_name}.{ext}"

    new_path = os.path.join(user_folder, new_name)

    if not os.path.exists(old_path):
        flash('Файл не найден', 'danger')
        return redirect(url_for('storage'))

    if os.path.exists(new_path):
        flash('Файл с таким именем уже существует', 'danger')
        return redirect(url_for('storage'))

    try:
        os.rename(old_path, new_path)
        flash('Файл переименован успешно', 'success')
    except Exception as e:
        flash(f'Ошибка при переименовании: {e}', 'danger')

    return redirect(url_for('storage'))


@app.route('/dashboard')
@login_required
def dashboard():
    user = current_user

    branches = ['Алматы', 'Астана', 'Шымкент', 'Актобе', 'Караганда']
    counts = [276, 113, 156, 80, 63]

    user_cameras = Camera.query.filter_by(user_id=user.id).all()
    total_cameras = len(user_cameras)
    last_camera = user_cameras[-1].name if user_cameras else '—'

    return render_template('dashboard.html',
                           user=user,
                           total_cameras=total_cameras,
                           last_camera=last_camera,
                           branches=branches,
                           counts=counts)


@app.route('/postal-services', methods=['GET', 'POST'])
@login_required
def postal_services():
    entries = StatisticsEntry.query.all()

    # Суммируем статистику по всем городам (или фильтруем, если надо)
    total_print2card = sum(e.print2card for e in entries)
    total_14_31 = sum(e.storage_14_31 for e in entries)
    total_over_31 = sum(e.storage_over_31 for e in entries)

    stats = {
        'print2card': total_print2card,
        'storage_14_31': total_14_31,
        'storage_over_31': total_over_31
    }

    return render_template("postal_services.html", stats=stats)

@app.route('/update-statistics', methods=['GET', 'POST'])
@login_required
def update_statistics():
    if request.method == 'POST':
        city = request.form['city']
        print2card = int(request.form['print2card'])
        storage_14_31 = int(request.form['storage_14_31'])
        storage_over_31 = int(request.form['storage_over_31'])

        entry = StatisticsEntry(
            city=city,
            print2card=print2card,
            storage_14_31=storage_14_31,
            storage_over_31=storage_over_31,
            user_id=current_user.id
        )
        db.session.add(entry)
        db.session.commit()
        flash("Статистика добавлена!", "success")
        return redirect(url_for('postal_services'))

    return render_template("update_statistics.html")


@app.route('/users')
@login_required
def users():
    all_users = User.query.all()
    return render_template('users.html', users=all_users)


# Запуск
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)