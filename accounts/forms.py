from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model


User = get_user_model()


class UserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'last_login', 'email', 'cash']
