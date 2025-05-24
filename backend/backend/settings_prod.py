from .settings import *

DEBUG = False
ALLOWED_HOSTS = ['dssl221.github.io', 'localhost', '127.0.0.1']

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True

# CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://dssl221.github.io",
    "http://localhost:5000",
    "http://127.0.0.1:5000"
]

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
