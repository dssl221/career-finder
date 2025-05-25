from .settings import *

DEBUG = False
ALLOWED_HOSTS = ['dssl221.pythonanywhere.com']

# Static files configuration
STATIC_ROOT = '/home/dssl221/career-finder/static'
STATIC_URL = '/static/'

# CORS settings for production
CORS_ALLOWED_ORIGINS = [
    "https://dssl221.github.io",
]

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Database settings (using SQLite for simplicity)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
