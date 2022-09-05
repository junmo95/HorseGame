from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from .forms import UserForm


def signup(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')

            user = authenticate(username=username, password=raw_password)
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')

        return redirect('accounts:login')
    else:
        form = UserForm()
    return render(request, 'accounts/signup.html', {'form': form})


def get_list(request):
    user_list = User.objects.all().order_by('-cash')
    # print(type(user_list.values()))

    return HttpResponse(user_list[0].username)
    # return HttpResponse(user_list.values())
